import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/astro/react';
import {
  getAccountMe,
  getAccountUsageWithMeta,
  createCustomerPortal,
  KapitDashboardApiError,
} from '../../lib/kapit-dashboard-api';
import type {
  AccountMe,
  AccountUsage,
  MetaWarning,
  Plan,
} from '../../lib/kapit-dashboard-api';
import CheckoutStatusBanner from './CheckoutStatusBanner';
import CurrentPlanCard from './CurrentPlanCard';
import UsageQuotaCard from './UsageQuotaCard';
import BillingActions from './BillingActions';
import PastDueBanner from './PastDueBanner';
import CanceledBanner from './CanceledBanner';
import HardLimitBanner from '../shared/HardLimitBanner';

type CheckoutStatus = 'success' | 'cancelled' | null;

function mapErrorMessage(err: unknown): { message: string; notReady: boolean; redirect: boolean } {
  if (err instanceof KapitDashboardApiError) {
    if (err.status === 401) {
      return { message: 'Please sign in to continue.', notReady: false, redirect: true };
    }
    if (err.status === 403) {
      return {
        message: 'You do not have access to this billing account.',
        notReady: false,
        redirect: false,
      };
    }
    if (err.code === 'not_ready' || err.status === 404) {
      return { message: 'Billing is not available yet.', notReady: true, redirect: false };
    }
    return {
      message: err.message || 'Something went wrong. Please try again.',
      notReady: false,
      redirect: false,
    };
  }
  return {
    message: 'Network error. Please check your connection and try again.',
    notReady: false,
    redirect: false,
  };
}

export default function BillingDashboard() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [account, setAccount] = useState<AccountMe | null>(null);
  const [usage, setUsage] = useState<AccountUsage | null>(null);
  const [warning, setWarning] = useState<MetaWarning | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hardLimitError, setHardLimitError] = useState<KapitDashboardApiError | null>(null);
  const [notReady, setNotReady] = useState(false);
  const [managingBilling, setManagingBilling] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>(null);
  const [polling, setPolling] = useState(false);
  const pollTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const co = url.searchParams.get('checkout');
    if (co === 'success' || co === 'cancelled') {
      setCheckoutStatus(co);
      url.searchParams.delete('checkout');
      const next = url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : '') + url.hash;
      window.history.replaceState({}, '', next);
    }
  }, []);

  const fetchAll = async (signal?: { cancelled: boolean }) => {
    const token = await getToken();
    if (!token) {
      setLoading(false);
      return null;
    }
    try {
      const [me, usageResult] = await Promise.all([
        getAccountMe(token),
        getAccountUsageWithMeta(token).catch((e) => {
          if (e instanceof KapitDashboardApiError && e.code === 'not_ready') {
            return null;
          }
          throw e;
        }),
      ]);
      if (signal?.cancelled) return null;
      setAccount(me);
      setUsage(usageResult ? usageResult.data : null);
      setWarning(usageResult ? usageResult.warning : null);
      setNotReady(false);
      setError(null);
      setHardLimitError(null);
      return me;
    } catch (err) {
      if (signal?.cancelled) return null;
      if (err instanceof KapitDashboardApiError && err.status === 429) {
        setHardLimitError(err);
        return null;
      }
      const mapped = mapErrorMessage(err);
      if (mapped.redirect && typeof window !== 'undefined') {
        window.location.href = '/';
        return null;
      }
      if (mapped.notReady) {
        setNotReady(true);
        setAccount(null);
        setUsage(null);
        setWarning(null);
      } else {
        setError(mapped.message);
      }
      return null;
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      if (typeof window !== 'undefined') window.location.href = '/';
      return;
    }
    let signal = { cancelled: false };
    (async () => {
      setLoading(true);
      await fetchAll(signal);
      if (!signal.cancelled) setLoading(false);
    })();
    return () => {
      signal.cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (checkoutStatus !== 'success') return;
    if (!isLoaded || !isSignedIn) return;

    let cancelled = false;
    const startedAt = Date.now();
    const initialPlan = account?.user.plan ?? null;
    const initialStatus = account?.user.subscription_status ?? null;
    setPolling(true);

    const tick = async () => {
      if (cancelled) return;
      const me = await fetchAll({ cancelled });
      if (cancelled) return;
      const changed =
        me &&
        (me.user.plan !== initialPlan || me.user.subscription_status !== initialStatus);
      const elapsed = Date.now() - startedAt;
      if (changed || elapsed >= 30000) {
        setPolling(false);
        return;
      }
      pollTimer.current = window.setTimeout(tick, 2000);
    };

    pollTimer.current = window.setTimeout(tick, 2000);
    return () => {
      cancelled = true;
      if (pollTimer.current !== null) {
        window.clearTimeout(pollTimer.current);
        pollTimer.current = null;
      }
      setPolling(false);
    };
  }, [checkoutStatus, isLoaded, isSignedIn]);

  const handleManageBilling = async () => {
    setError(null);
    setManagingBilling(true);
    try {
      const token = await getToken();
      if (!token) {
        setError('Please sign in to continue.');
        setManagingBilling(false);
        return;
      }
      const res = await createCustomerPortal(token, {
        return_url: window.location.href,
      });
      if (!res || !res.portal_url) {
        setError('Could not open billing portal. Please try again.');
        setManagingBilling(false);
        return;
      }
      window.location.href = res.portal_url;
    } catch (err) {
      if (err instanceof KapitDashboardApiError && err.status === 429) {
        setHardLimitError(err);
        setManagingBilling(false);
        return;
      }
      const mapped = mapErrorMessage(err);
      if (mapped.redirect) {
        window.location.href = '/';
        return;
      }
      setError(mapped.message);
      setManagingBilling(false);
    }
  };

  const currentPlan: Plan | null = account?.user.plan ?? null;
  const subscriptionStatus = account?.user.subscription_status ?? null;

  return (
    <div className="flex flex-col gap-6">
      <CheckoutStatusBanner status={checkoutStatus} onDismiss={() => setCheckoutStatus(null)} />

      {hardLimitError && (
        <HardLimitBanner
          error={hardLimitError}
          onDismiss={() => setHardLimitError(null)}
        />
      )}

      {subscriptionStatus === 'past_due' && !loading && (
        <PastDueBanner onFixPayment={handleManageBilling} fixing={managingBilling} />
      )}

      {subscriptionStatus === 'canceled' && !loading && (
        <CanceledBanner onManageBilling={handleManageBilling} managing={managingBilling} />
      )}

      {polling && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 bg-[#0D0B14] border border-[#7C3AED] rounded-lg px-4 py-3"
        >
          <span
            className="inline-block h-4 w-4 border-2 border-[#7C3AED]/40 border-t-[#7C3AED] rounded-full animate-spin"
            aria-hidden="true"
          />
          <p className="text-[#EDEDED] text-sm">Activating your plan…</p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-center justify-between gap-3 bg-[#1A0D0D] border border-[#3D1515] rounded-lg px-4 py-3"
        >
          <p className="text-[#F87171] text-sm">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {notReady && !loading && (
        <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
          <h2 className="text-[#EDEDED] font-semibold text-lg mb-2">Billing</h2>
          <p className="text-[#A1A1A1] text-sm">
            Billing is not available yet. Check back soon.
          </p>
          <a
            href="/pricing"
            className="inline-flex mt-4 items-center bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors"
          >
            View pricing
          </a>
        </div>
      )}

      {!notReady && (
        <>
          <CurrentPlanCard account={account} loading={loading} />
          <UsageQuotaCard usage={usage} loading={loading} warning={warning} />
          <BillingActions
            currentPlan={currentPlan}
            onManageBilling={handleManageBilling}
            managingBilling={managingBilling}
            manageDisabled={loading}
          />
        </>
      )}
    </div>
  );
}
