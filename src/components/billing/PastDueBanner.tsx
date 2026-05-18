interface PastDueBannerProps {
  onFixPayment: () => void;
  fixing: boolean;
}

export default function PastDueBanner({ onFixPayment, fixing }: PastDueBannerProps) {
  return (
    <div
      role="alert"
      className="bg-[#1A0D0D] border border-[#3D1515] rounded-xl p-5"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 9v4" />
            <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0z" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#F87171] font-semibold text-base mb-1">
            Payment failed — subscription past due
          </h3>
          <p className="text-[#EDEDED] text-sm mb-4">
            Your payment method could not be charged. To avoid service interruption, please
            update your payment method.
          </p>
          <button
            type="button"
            onClick={onFixPayment}
            disabled={fixing}
            aria-busy={fixing}
            className="inline-flex items-center gap-2 bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {fixing && (
              <span
                className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
            )}
            <span>{fixing ? 'Opening billing portal…' : 'Update payment method'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
