import { useEffect, useState } from 'react';
import type { KapitDashboardApiError } from '../../lib/kapit-dashboard-api';

interface HardLimitBannerProps {
  error: KapitDashboardApiError;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export default function HardLimitBanner({ error, onDismiss, onRetry }: HardLimitBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    typeof error.retryAfterSeconds === 'number' ? error.retryAfterSeconds : null,
  );

  useEffect(() => {
    setSecondsLeft(
      typeof error.retryAfterSeconds === 'number' ? error.retryAfterSeconds : null,
    );
  }, [error]);

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [error]);

  const message = error.recovery ?? error.message;
  const canRetryNow = secondsLeft === 0 && typeof onRetry === 'function';

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-[#1A0D0D] border border-[#3D1515] rounded-lg p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[#F87171] font-semibold text-sm mb-1">Request limit reached</h3>
          <p className="text-[#EDEDED] text-sm mb-2">{message}</p>

          {error.rateLimitContext && (
            <p
              className="text-[#A1A1A1] text-xs mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {error.rateLimitContext}
            </p>
          )}

          {error.alternativeAction && (
            <p className="text-[#A1A1A1] text-xs mb-2">{error.alternativeAction}</p>
          )}

          {secondsLeft !== null && secondsLeft > 0 && (
            <p
              className="text-[#A1A1A1] text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Retry in {secondsLeft}s
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {canRetryNow && (
            <button
              type="button"
              onClick={onRetry}
              className="text-sm text-white bg-[#262626] hover:bg-[#333333] px-3 py-1.5 rounded-md transition-colors font-medium border border-[#3D1515]"
            >
              Retry now
            </button>
          )}
          <a
            href="/pricing"
            className="text-sm text-white bg-[#7C3AED] hover:bg-[#8B5CF6] px-3 py-1.5 rounded-md transition-colors font-medium"
          >
            Upgrade plan
          </a>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer px-1"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
