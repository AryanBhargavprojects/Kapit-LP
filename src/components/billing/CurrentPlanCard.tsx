import type { AccountMe, SubscriptionStatus } from '../../lib/kapit-dashboard-api';

interface CurrentPlanCardProps {
  account: AccountMe | null;
  loading: boolean;
}

function planLabel(plan: string | undefined): string {
  if (!plan) return '—';
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

function StatusBadge({ status }: { status: SubscriptionStatus | undefined }) {
  if (!status || status === 'none') return null;

  let label: string = status;
  let dotColor = 'bg-[#00D26A]';
  let textColor = 'text-[#00D26A]';
  let bg = 'bg-[#0D1A0D]';
  let border = 'border-[#1A4A1A]';

  if (status === 'active') {
    label = 'Active';
  } else if (status === 'trialing') {
    label = 'Trialing';
    dotColor = 'bg-[#60A5FA]';
    textColor = 'text-[#60A5FA]';
    bg = 'bg-[#0D1422]';
    border = 'border-[#1E3A5F]';
  } else if (status === 'past_due') {
    label = 'Past due';
    dotColor = 'bg-[#EF4444]';
    textColor = 'text-[#F87171]';
    bg = 'bg-[#1A0D0D]';
    border = 'border-[#3D1515]';
  } else if (status === 'canceled') {
    label = 'Canceled';
    dotColor = 'bg-[#6E6E6E]';
    textColor = 'text-[#A1A1A1]';
    bg = 'bg-[#1C1C1C]';
    border = 'border-[#262626]';
  } else if (status === 'incomplete') {
    label = 'Incomplete';
    dotColor = 'bg-[#F59E0B]';
    textColor = 'text-[#F59E0B]';
    bg = 'bg-[#1A1200]';
    border = 'border-[#3D2E00]';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${bg} ${border} ${textColor}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}

export default function CurrentPlanCard({ account, loading }: CurrentPlanCardProps) {
  if (loading) {
    return (
      <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
        <div className="h-5 w-24 bg-[#1C1C1C] rounded animate-pulse mb-4" />
        <div className="h-8 w-1/2 bg-[#1C1C1C] rounded animate-pulse mb-3" />
        <div className="h-4 w-1/3 bg-[#1C1C1C] rounded animate-pulse" />
      </div>
    );
  }

  const plan = account?.user.plan;
  const status = account?.user.subscription_status;
  const cycle = account?.user.billing_cycle;
  const email = account?.user.email;

  return (
    <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[#EDEDED] font-semibold text-lg">Current plan</h2>
        <StatusBadge status={status} />
      </div>
      {email && <p className="text-[#6E6E6E] text-sm mb-5">{email}</p>}

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#EDEDED]">{planLabel(plan)}</span>
        {cycle && (
          <span
            className="text-xs px-2 py-0.5 rounded-full bg-[#1C1C1C] text-[#A1A1A1] uppercase tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {cycle}
          </span>
        )}
      </div>

      {account?.api_keys && (
        <p className="text-[#6E6E6E] text-sm mt-3">
          {account.api_keys.active_count} active API key
          {account.api_keys.active_count === 1 ? '' : 's'}
          {account.api_keys.limit !== null && ` of ${account.api_keys.limit}`}
        </p>
      )}
    </div>
  );
}
