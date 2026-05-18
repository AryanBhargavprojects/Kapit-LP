import { useState } from 'react';
import { useAuth, SignInButton } from '@clerk/astro/react';
import type { BillingCycle, Plan } from '../../lib/kapit-dashboard-api';
import {
  createCheckout,
  KapitDashboardApiError,
} from '../../lib/kapit-dashboard-api';
import { PRICING_TIERS } from '../../lib/pricing-tiers';
import BillingCycleToggle from './BillingCycleToggle';
import PricingCard from './PricingCard';

interface PricingPageProps {
  currentPlan: Plan | null;
}

type CheckoutPlan = 'starter' | 'builder' | 'scale';

function mapErrorMessage(err: unknown): string {
  if (err instanceof KapitDashboardApiError) {
    if (err.status === 401) return 'Please sign in to continue.';
    if (err.status === 403) return 'You do not have access to this billing account.';
    if (err.status === 404) return 'Billing account not found. Try refreshing or contact support.';
    if (err.status === 429) {
      return err.message || 'Too many requests. Please try again shortly.';
    }
    if (err.code === 'not_ready') return 'Billing is not available yet.';
    return err.message || 'Something went wrong. Please try again.';
  }
  return 'Network error. Please check your connection and try again.';
}

export default function PricingPage({ currentPlan }: PricingPageProps) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingSignInPlan, setPendingSignInPlan] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setError(null);

    if (!isLoaded) return;
    if (!isSignedIn) {
      setPendingSignInPlan(planId);
      return;
    }

    if (planId !== 'starter' && planId !== 'builder' && planId !== 'scale') {
      setError('This plan is not available for self-service upgrades.');
      return;
    }
    if (planId === currentPlan) {
      return;
    }

    setLoadingPlan(planId);
    try {
      const token = await getToken();
      if (!token) {
        setError('Please sign in to continue.');
        setLoadingPlan(null);
        return;
      }
      const origin = window.location.origin;
      const res = await createCheckout(token, {
        plan: planId as CheckoutPlan,
        billing_cycle: billing,
        success_url: `${origin}/dashboard/billing?checkout=success`,
        cancel_url: `${origin}/pricing?checkout=cancelled`,
      });
      if (!res || !res.checkout_url) {
        setError('Could not start checkout. Please try again.');
        setLoadingPlan(null);
        return;
      }
      window.location.href = res.checkout_url;
    } catch (err) {
      if (err instanceof KapitDashboardApiError && err.status === 401) {
        setPendingSignInPlan(planId);
        setLoadingPlan(null);
        return;
      }
      setError(mapErrorMessage(err));
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#EDEDED] tracking-tight">
          Pricing
        </h1>
        <p className="text-[#A1A1A1] mt-4 max-w-2xl mx-auto">
          Start free. Pay only when your agents need more. No seat fees, no hidden charges.
        </p>
        <div className="mt-8 flex justify-center">
          <BillingCycleToggle value={billing} onChange={setBilling} />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 max-w-3xl mx-auto flex items-center justify-between gap-3 bg-[#1A0D0D] border border-[#3D1515] rounded-lg px-4 py-3"
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

      {pendingSignInPlan && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 max-w-3xl mx-auto flex items-center justify-between gap-3 bg-[#0D0B14] border border-[#7C3AED] rounded-lg px-4 py-3"
        >
          <p className="text-[#EDEDED] text-sm">
            Sign in to upgrade to the {pendingSignInPlan} plan.
          </p>
          <div className="flex items-center gap-2">
            <SignInButton mode="redirect" forceRedirectUrl="/pricing">
              <button
                type="button"
                className="text-sm bg-[#7C3AED] text-white font-medium px-3 py-1.5 rounded-md hover:bg-[#8B5CF6] transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </SignInButton>
            <button
              type="button"
              onClick={() => setPendingSignInPlan(null)}
              className="shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {PRICING_TIERS.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billing={billing}
            currentPlan={currentPlan}
            onUpgrade={handleUpgrade}
            loading={loadingPlan === tier.id}
          />
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto bg-[#111111] border border-[#262626] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-[#EDEDED]">
          Need more than 1M requests/month?
        </h2>
        <p className="text-[#A1A1A1] mt-3">
          Enterprise plans include custom volume, dedicated capacity, SOC 2 paperwork, and SLAs tailored to your team.
        </p>
        <a
          href="mailto:sales@kapit.dev?subject=Kapit%20Enterprise%20inquiry"
          className="inline-flex mt-6 items-center bg-[#7C3AED] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#8B5CF6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
        >
          Contact sales
        </a>
      </div>
    </>
  );
}
