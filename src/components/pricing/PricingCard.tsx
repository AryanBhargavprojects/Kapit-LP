import type { Plan } from '../../lib/kapit-dashboard-api';
import type { PricingTier } from '../../lib/pricing-tiers';
import { SHARED_FEATURES } from '../../lib/pricing-tiers';

interface PricingCardProps {
  tier: PricingTier;
  billing: 'monthly' | 'yearly';
  currentPlan?: Plan | null;
  onUpgrade: (tierId: string) => void;
  loading?: boolean;
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <polyline points="4 10 8 14 16 6" />
    </svg>
  );
}

export default function PricingCard({
  tier,
  billing,
  currentPlan,
  onUpgrade,
  loading,
}: PricingCardProps) {
  const isCurrent = currentPlan === tier.id;
  const isFree = tier.id === 'free';
  const isHighlighted = tier.highlighted === true;

  const displayPrice =
    billing === 'yearly'
      ? Math.round(tier.yearlyPrice / 12)
      : tier.monthlyPrice;

  const priceSuffix = tier.monthlyPrice === 0 ? '' : '/mo';

  let ctaLabel = 'Upgrade';
  let ctaDisabled = false;
  let ctaHref: string | null = null;
  let ctaOnClick: (() => void) | null = () => onUpgrade(tier.id);

  if (isCurrent) {
    ctaLabel = 'Current plan';
    ctaDisabled = true;
    ctaOnClick = null;
  } else if (isFree) {
    if (!currentPlan) {
      ctaLabel = 'Start free';
      ctaHref = '/';
      ctaOnClick = null;
    } else {
      ctaLabel = 'Downgrade';
      ctaDisabled = true;
      ctaOnClick = null;
    }
  } else if (loading) {
    ctaLabel = 'Redirecting…';
    ctaDisabled = true;
  }

  const cardClasses = isHighlighted
    ? 'relative bg-[#0D0B14] border border-[#7C3AED] rounded-2xl p-6 flex flex-col'
    : 'relative bg-[#111111] border border-[#262626] rounded-2xl p-6 flex flex-col';

  const ctaClasses = ctaDisabled
    ? 'w-full text-center inline-flex items-center justify-center bg-[#1C1C1C] text-[#6E6E6E] font-medium text-sm px-4 py-2.5 rounded-lg cursor-not-allowed'
    : isHighlighted
    ? 'w-full text-center inline-flex items-center justify-center bg-[#7C3AED] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-[#8B5CF6] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]'
    : 'w-full text-center inline-flex items-center justify-center bg-[#1C1C1C] text-[#EDEDED] font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-[#262626] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]';

  return (
    <div className={cardClasses}>
      {isHighlighted && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-2.5 py-1 rounded-full bg-[#7C3AED] text-white font-medium tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          RECOMMENDED
        </span>
      )}

      <div className="mb-5">
        <h3 className="text-[#EDEDED] font-semibold text-lg">{tier.name}</h3>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span
            className="text-4xl font-bold text-[#EDEDED]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ${displayPrice}
          </span>
          {priceSuffix && (
            <span className="text-[#6E6E6E] text-sm">{priceSuffix}</span>
          )}
        </div>
        {billing === 'yearly' && tier.yearlyPrice > 0 && (
          <p className="text-xs text-[#6E6E6E] mt-1">
            ${tier.yearlyPrice} billed annually
          </p>
        )}
        {billing === 'monthly' && tier.monthlyPrice > 0 && (
          <p className="text-xs text-[#6E6E6E] mt-1">Billed monthly</p>
        )}
        {tier.monthlyPrice === 0 && (
          <p className="text-xs text-[#6E6E6E] mt-1">No credit card required</p>
        )}
      </div>

      <div className="mb-5">
        {ctaHref ? (
          <a href={ctaHref} className={ctaClasses}>
            {ctaLabel}
          </a>
        ) : (
          <button
            type="button"
            disabled={ctaDisabled}
            aria-busy={loading === true ? 'true' : 'false'}
            onClick={ctaOnClick ?? undefined}
            className={ctaClasses}
          >
            {ctaLabel}
          </button>
        )}
      </div>

      <div className="space-y-3 text-sm flex-1">
        <div className="flex items-start gap-2">
          <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
            <CheckIcon />
          </span>
          <span className="text-[#EDEDED]">
            <span className="font-medium">{tier.includedRequests}</span>
            <span className="text-[#6E6E6E]"> included</span>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
            <CheckIcon />
          </span>
          <span className="text-[#ADADAD]">
            {tier.quotaBehavior}
            {tier.overage && (
              <span className="text-[#6E6E6E]"> · {tier.overage}</span>
            )}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
            <CheckIcon />
          </span>
          <span className="text-[#ADADAD]">{tier.rateLimit}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
            <CheckIcon />
          </span>
          <span className="text-[#ADADAD]">
            {tier.apiKeys} {tier.apiKeys === 'Unlimited' ? 'API keys' : tier.apiKeys === '1' ? 'API key' : 'API keys'}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
            <CheckIcon />
          </span>
          <span className="text-[#ADADAD]">{tier.support}</span>
        </div>
        {tier.sla ? (
          <div className="flex items-start gap-2">
            <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
              <CheckIcon />
            </span>
            <span className="text-[#ADADAD]">{tier.sla}</span>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <span className="text-[#3A3A3A] shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="4" y1="10" x2="16" y2="10" />
              </svg>
            </span>
            <span className="text-[#4A4A4A] text-sm">No uptime SLA</span>
          </div>
        )}
        {tier.extraFeature && (
          <div className="flex items-start gap-2">
            <span className={isHighlighted ? 'text-[#7C3AED]' : 'text-[#00D26A]'}>
              <CheckIcon />
            </span>
            <span className="text-[#ADADAD]">{tier.extraFeature}</span>
          </div>
        )}

        <div className="pt-3 mt-3 border-t border-[#1F1F1F] space-y-2">
          {SHARED_FEATURES.map((f) => (
            <div key={f} className="flex items-start gap-2">
              <span className="text-[#6E6E6E]">
                <CheckIcon />
              </span>
              <span className="text-[#6E6E6E] text-xs">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
