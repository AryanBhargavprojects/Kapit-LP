import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/astro/react';
import {
  getAccountUsage,
  KapitDashboardApiError,
} from '../../lib/kapit-dashboard-api';
import type { AccountUsage } from '../../lib/kapit-dashboard-api';
import QuotaWarningBanner from '../shared/QuotaWarningBanner';

export default function UsageCard() {
  const { getToken } = useAuth();
  const [usage, setUsage] = useState<AccountUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchUsage() {
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getAccountUsage(token);
        if (!cancelled) setUsage(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof KapitDashboardApiError && err.code === 'not_ready') {
          setNotReady(true);
        } else {
          setError('Failed to load usage data. Please refresh.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchUsage();
    return () => { cancelled = true; };
  }, []);

  const limit = usage?.limit ?? null;
  const used = usage?.used ?? 0;
  const remaining = limit !== null ? Math.max(0, limit - used) : null;
  const pct = usage && limit && limit > 0
    ? Math.min(100, Math.round((used / limit) * 100))
    : 0;
  const isLow = usage && limit ? remaining !== null && remaining < limit * 0.1 : false;
  const isExhausted = usage && limit ? remaining === 0 : false;

  const resetLabel = usage
    ? new Date(usage.reset_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  return (
    <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[#EDEDED] font-semibold text-lg">Usage</h2>
          <p className="text-[#6E6E6E] text-sm mt-0.5">Today's API requests</p>
        </div>
        {usage && (
          <span
            className="text-xs px-2.5 py-1 rounded-full bg-[#1C1C1C] text-[#ADADAD] uppercase tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {usage.plan}
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          <div className="h-8 w-1/3 bg-[#1C1C1C] rounded animate-pulse" />
          <div className="h-2 w-full bg-[#1C1C1C] rounded-full animate-pulse" />
          <div className="h-4 w-1/2 bg-[#1C1C1C] rounded animate-pulse" />
        </div>
      )}

      {!loading && error && (
        <p className="text-[#F87171] text-sm">{error}</p>
      )}

      {!loading && !error && notReady && (
        <p className="text-[#6E6E6E] text-sm">
          Usage will appear after your first API key is created.
        </p>
      )}

      {!loading && !error && !notReady && usage && (
        <>
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-3xl font-bold text-[#EDEDED]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {used.toLocaleString()}
              </span>
              <span className="text-[#6E6E6E] text-sm ml-2">
                / {limit === null ? '∞' : limit.toLocaleString()}
              </span>
            </div>
            <span className="text-sm text-[#6E6E6E]">
              {limit === null ? 'Unlimited' : `${(remaining ?? 0).toLocaleString()} remaining`}
            </span>
          </div>

          <div className="w-full h-2 bg-[#1C1C1C] rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isExhausted ? 'bg-[#EF4444]' : isLow ? 'bg-[#F59E0B]' : 'bg-[#7C3AED]'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-[#6E6E6E]">
            <span>Resets {resetLabel}</span>
            <span>{pct}% used</span>
          </div>

          {(isLow || isExhausted || (usage.overage_units ?? 0) > 0) && (
            <div className="mt-4">
              <QuotaWarningBanner warning={null} usage={usage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
