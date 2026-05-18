import type { BillingCycle } from '../../lib/kapit-dashboard-api';

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (v: BillingCycle) => void;
}

export default function BillingCycleToggle({ value, onChange }: BillingCycleToggleProps) {
  return (
    <div className="inline-flex items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Billing cycle"
        className="inline-flex items-center border border-[#262626] rounded-full p-1 bg-[#111111]"
      >
        <button
          type="button"
          role="radio"
          aria-checked={value === 'monthly'}
          onClick={() => onChange('monthly')}
          className={`text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${
            value === 'monthly'
              ? 'bg-[#1C1C1C] text-[#EDEDED]'
              : 'text-[#A1A1A1] hover:text-[#EDEDED]'
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === 'yearly'}
          onClick={() => onChange('yearly')}
          className={`text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${
            value === 'yearly'
              ? 'bg-[#1C1C1C] text-[#EDEDED]'
              : 'text-[#A1A1A1] hover:text-[#EDEDED]'
          }`}
        >
          Yearly
        </button>
      </div>
      <span
        className="text-xs px-2 py-1 rounded-full bg-[#0D1A0D] text-[#00D26A] border border-[#1A4A1A]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Save 17%
      </span>
    </div>
  );
}
