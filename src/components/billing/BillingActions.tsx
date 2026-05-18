import type { Plan } from '../../lib/kapit-dashboard-api';

interface BillingActionsProps {
  currentPlan: Plan | null;
  onManageBilling: () => void;
  managingBilling: boolean;
  manageDisabled?: boolean;
}

export default function BillingActions({
  currentPlan,
  onManageBilling,
  managingBilling,
  manageDisabled,
}: BillingActionsProps) {
  const isPaid =
    currentPlan === 'starter' ||
    currentPlan === 'builder' ||
    currentPlan === 'scale' ||
    currentPlan === 'enterprise';

  return (
    <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
      <h2 className="text-[#EDEDED] font-semibold text-lg mb-1">Billing actions</h2>
      <p className="text-[#6E6E6E] text-sm mb-5">
        Update payment methods, view invoices, or change your plan.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {isPaid && (
          <button
            type="button"
            onClick={onManageBilling}
            disabled={managingBilling || manageDisabled === true}
            aria-busy={managingBilling ? 'true' : 'false'}
            className="inline-flex items-center gap-2 bg-[#1C1C1C] text-[#EDEDED] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#262626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
          >
            {managingBilling && (
              <span
                className="inline-block h-3.5 w-3.5 border-2 border-[#6E6E6E] border-t-[#EDEDED] rounded-full animate-spin"
                aria-hidden="true"
              />
            )}
            {managingBilling ? 'Opening portal…' : 'Manage billing'}
          </button>
        )}
        <a
          href="/pricing"
          className="inline-flex items-center bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
        >
          {isPaid ? 'Change plan' : 'Upgrade plan'}
        </a>
      </div>
    </div>
  );
}
