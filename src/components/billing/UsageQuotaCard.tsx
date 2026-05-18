import type { AccountUsage, MetaWarning } from '../../lib/kapit-dashboard-api';
import QuotaWarningBanner from '../shared/QuotaWarningBanner';

interface UsageQuotaCardProps {
  usage: AccountUsage | null;
  loading: boolean;
  warning: MetaWarning | null;
}

export default function UsageQuotaCard({ usage, loading, warning }: UsageQuotaCardProps) {
  if (loading) {
    return (
      <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
        <div className="h-5 w-20 bg-[#1C1C1C] rounded animate-pulse mb-4" />
        <div className="h-8 w-1/2 bg-[#1C1C1C] rounded animate-pulse mb-3" />
        <div className="h-2 w-full bg-[#1C1C1C] rounded-full animate-pulse mb-3" />
        <div className="h-4 w-1/3 bg-[#1C1C1C] rounded animate-pulse" />
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
        <h2 className="text-[#EDEDED] font-semibold text-lg mb-2">Usage</h2>
        <p className="text-[#6E6E6E] text-sm">
          Usage will appear after your first API request.
        </p>
      </div>
    );
  }

  const used = usage.used;
  const limit = usage.limit;
  const isUnlimited = limit === null;
  const remaining = isUnlimited ? null : Math.max(0, (limit as number) - used);
  const pct =
    !isUnlimited && (limit as number) > 0
      ? Math.min(100, Math.round((used / (limit as number)) * 100))
      : 0;
  const isExhausted = !isUnlimited && remaining === 0;
  const isLow =
    !isUnlimited && remaining !== null && remaining < (limit as number) * 0.1;

  const resetLabel = new Date(usage.reset_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const periodLabel = usage.period === 'daily' ? "Today's" : "This month's";
  const hasBanner =
    warning !== null ||
    (usage.overage_units ?? 0) > 0 ||
    (!isUnlimited && (isExhausted || isLow));

  return (
    <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[#EDEDED] font-semibold text-lg">Usage</h2>
        <span
          className="text-xs px-2.5 py-1 rounded-full bg-[#1C1C1C] text-[#ADADAD]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {usage.rate_limit}
        </span>
      </div>
      <p className="text-[#6E6E6E] text-sm mb-5">{periodLabel} API requests</p>

      <div className="flex items-end justify-between mb-2">
        <div>
          <span
            className="text-3xl font-bold text-[#EDEDED]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {used.toLocaleString()}
          </span>
          <span className="text-[#6E6E6E] text-sm ml-2">
            / {isUnlimited ? 'Unlimited' : (limit as number).toLocaleString()}
          </span>
        </div>
        {!isUnlimited && (
          <span className="text-sm text-[#6E6E6E]">
            {(remaining ?? 0).toLocaleString()} remaining
          </span>
        )}
      </div>

      {!isUnlimited && (
        <div className="w-full h-2 bg-[#1C1C1C] rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isExhausted ? 'bg-[#EF4444]' : isLow ? 'bg-[#F59E0B]' : 'bg-[#7C3AED]'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-[#6E6E6E]">
        <span>Resets {resetLabel}</span>
        {!isUnlimited && <span>{pct}% used</span>}
      </div>

      {hasBanner && (
        <div className="mt-4">
          <QuotaWarningBanner warning={warning} usage={usage} />
        </div>
      )}
    </div>
  );
}
