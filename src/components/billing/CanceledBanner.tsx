interface CanceledBannerProps {
  periodEnd?: string | null;
  onManageBilling: () => void;
  managing: boolean;
}

function formatDate(iso: string): string | null {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function CanceledBanner({
  periodEnd,
  onManageBilling,
  managing,
}: CanceledBannerProps) {
  const endLabel = periodEnd ? formatDate(periodEnd) : null;

  return (
    <div
      role="status"
      className="bg-[#1A1200] border border-[#3D2E00] rounded-xl p-5"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#F59E0B] font-semibold text-base mb-1">Subscription canceled</h3>
          <p className="text-[#EDEDED] text-sm mb-4">
            {endLabel
              ? `Your subscription has been canceled. You will retain access until ${endLabel}.`
              : 'Your subscription has been canceled. You may still have access until the end of your billing period.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/pricing"
              className="inline-flex items-center bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors"
            >
              Resubscribe
            </a>
            <button
              type="button"
              onClick={onManageBilling}
              disabled={managing}
              aria-busy={managing}
              className="inline-flex items-center gap-2 bg-[#1C1C1C] border border-[#262626] text-[#EDEDED] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#262626] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {managing && (
                <span
                  className="inline-block h-4 w-4 border-2 border-[#EDEDED]/40 border-t-[#EDEDED] rounded-full animate-spin"
                  aria-hidden="true"
                />
              )}
              <span>{managing ? 'Opening billing portal…' : 'Manage billing'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
