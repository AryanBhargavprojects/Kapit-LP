import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/astro/react';
import { getAccountUsage, KapitDashboardApiError } from '../../lib/kapit-dashboard-api';
import type { Plan } from '../../lib/kapit-dashboard-api';

const PLAN_ORDER: Plan[] = ['free', 'starter', 'builder', 'scale', 'enterprise'];

const plans = [
  {
    id: 'starter' as Plan,
    name: 'Starter',
    price: '$19/mo',
    requests: '50K / mo',
    rateLimit: '60 req/min',
    apiKeys: '3 keys',
  },
  {
    id: 'builder' as Plan,
    name: 'Builder',
    price: '$49/mo',
    requests: '200K / mo',
    rateLimit: '300 req/min',
    apiKeys: '10 keys',
  },
  {
    id: 'scale' as Plan,
    name: 'Scale',
    price: '$149/mo',
    requests: '1M / mo',
    rateLimit: '1,000 req/min',
    apiKeys: 'Unlimited',
  },
];

export default function UpgradeCard() {
  const { getToken } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = await getToken();
      if (!token) return;
      try {
        const usage = await getAccountUsage(token);
        if (!cancelled) setCurrentPlan(usage.plan);
      } catch (err) {
        if (err instanceof KapitDashboardApiError && err.code === 'not_ready') return;
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const currentIndex = currentPlan ? PLAN_ORDER.indexOf(currentPlan) : -1;

  const isCurrentPlan = (planId: Plan) => planId === currentPlan;
  const isUpgrade = (planId: Plan) => currentIndex !== -1 && PLAN_ORDER.indexOf(planId) > currentIndex;
  const isDowngrade = (planId: Plan) => currentIndex !== -1 && PLAN_ORDER.indexOf(planId) < currentIndex;

  const sectionTitle = currentPlan && currentPlan !== 'free'
    ? 'Your plan & upgrades'
    : 'Upgrade your plan';

  return (
    <div id="upgrade" className="bg-[#111111] border border-[#262626] rounded-xl p-6">
      <h2 className="text-[#EDEDED] font-semibold text-lg mb-1">{sectionTitle}</h2>
      <p className="text-[#6E6E6E] text-sm mb-6">Higher limits, faster rate limits, and more API keys.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {plans.map(plan => {
          const isCurrent = isCurrentPlan(plan.id);
          const upgrade = isUpgrade(plan.id);
          const downgrade = isDowngrade(plan.id);

          const cardClass = isCurrent
            ? 'border-[#7C3AED] bg-[#0D0B14]'
            : 'border-[#262626]';

          let btnLabel = 'View plan';
          let btnClass = 'bg-[#1C1C1C] text-[#A1A1A1] hover:bg-[#262626] hover:text-[#EDEDED]';
          let btnDisabled = false;

          if (isCurrent) {
            btnLabel = 'Current plan';
            btnClass = 'bg-[#1C1C1C] text-[#6E6E6E] cursor-not-allowed';
            btnDisabled = true;
          } else if (upgrade) {
            btnLabel = 'Upgrade';
            btnClass = 'bg-[#7C3AED] text-white hover:bg-[#8B5CF6]';
          } else if (downgrade) {
            btnLabel = 'Downgrade';
            btnClass = 'bg-[#1C1C1C] text-[#6E6E6E] hover:bg-[#262626] hover:text-[#A1A1A1]';
          }

          return (
            <div key={plan.id} className={`border rounded-lg p-4 flex flex-col gap-3 ${cardClass}`}>
              <div className="flex items-center justify-between">
                <p className="text-[#EDEDED] font-medium">{plan.name}</p>
                {isCurrent && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7C3AED]/20 text-[#A78BFA] font-medium">
                    Current
                  </span>
                )}
              </div>
              <p className="text-[#EDEDED] font-bold text-lg">{plan.price}</p>
              <div className="flex flex-col gap-1">
                <p className="text-[#6E6E6E] text-xs">{plan.requests}</p>
                <p className="text-[#6E6E6E] text-xs">{plan.rateLimit}</p>
                <p className="text-[#6E6E6E] text-xs">{plan.apiKeys}</p>
              </div>
              {btnDisabled ? (
                <button
                  disabled
                  className={`w-full text-xs py-2 rounded-md text-center transition-colors ${btnClass}`}
                >
                  {btnLabel}
                </button>
              ) : (
                <a
                  href="/pricing"
                  className={`w-full text-xs py-2 rounded-md text-center transition-colors ${btnClass}`}
                >
                  {btnLabel}
                </a>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[#6E6E6E] text-xs text-center">
        Need more than 1M requests?{' '}
        <a href="mailto:hey@kapit.dev" className="text-[#7C3AED] hover:underline">
          Contact sales
        </a>
      </p>
    </div>
  );
}
