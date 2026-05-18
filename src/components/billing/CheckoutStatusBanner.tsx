interface CheckoutStatusBannerProps {
  status: 'success' | 'cancelled' | null;
  onDismiss: () => void;
}

export default function CheckoutStatusBanner({ status, onDismiss }: CheckoutStatusBannerProps) {
  if (!status) return null;

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mb-6 flex items-start justify-between gap-3 bg-[#0D1A0D] border border-[#1A4A1A] rounded-lg px-4 py-3"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00D26A]/20 text-[#00D26A]">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4 10 8 14 16 6" />
            </svg>
          </span>
          <div>
            <p className="text-[#00D26A] text-sm font-medium">Payment received</p>
            <p className="text-[#A1A1A1] text-sm">Your plan may take a moment to activate.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-6 flex items-start justify-between gap-3 bg-[#1A1200] border border-[#3D2E00] rounded-lg px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="10" y1="5" x2="10" y2="11" />
            <line x1="10" y1="14" x2="10" y2="14.5" />
          </svg>
        </span>
        <div>
          <p className="text-[#F59E0B] text-sm font-medium">Checkout cancelled</p>
          <p className="text-[#A1A1A1] text-sm">No changes were made to your account.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
