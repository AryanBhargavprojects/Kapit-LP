import { c as createComponent } from "./astro-component_C-dX4Z7q.mjs";
import "piccolore";
import { b3 as renderHead, b7 as renderTemplate } from "./params-and-props_BO-CuAf5.mjs";
import { r as renderComponent } from "./entrypoint_B6cJSNVz.mjs";
import { u as useAuth, g as getAccountMe, e as getAccountUsageWithMeta, K as KapitDashboardApiError, b as createCustomerPortal, N as NavbarAuthActions } from "./kapit-dashboard-api_B80WnFla.mjs";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Q as QuotaWarningBanner } from "./QuotaWarningBanner_f0Ytz45_.mjs";
function CheckoutStatusBanner({ status, onDismiss }) {
  if (!status) return null;
  if (status === "success") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        className: "mb-6 flex items-start justify-between gap-3 bg-[#0D1A0D] border border-[#1A4A1A] rounded-lg px-4 py-3",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00D26A]/20 text-[#00D26A]", children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "4 10 8 14 16 6" }) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[#00D26A] text-sm font-medium", children: "Payment received" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#A1A1A1] text-sm", children: "Your plan may take a moment to activate." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onDismiss,
              className: "shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded",
              "aria-label": "Dismiss notification",
              children: "×"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: "mb-6 flex items-start justify-between gap-3 bg-[#1A1200] border border-[#3D2E00] rounded-lg px-4 py-3",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B]/20 text-[#F59E0B]", children: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("line", { x1: "10", y1: "5", x2: "10", y2: "11" }),
            /* @__PURE__ */ jsx("line", { x1: "10", y1: "14", x2: "10", y2: "14.5" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#F59E0B] text-sm font-medium", children: "Checkout cancelled" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#A1A1A1] text-sm", children: "No changes were made to your account." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            className: "shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded",
            "aria-label": "Dismiss notification",
            children: "×"
          }
        )
      ]
    }
  );
}
function planLabel(plan) {
  if (!plan) return "—";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}
function StatusBadge({ status }) {
  if (!status || status === "none") return null;
  let label = status;
  let dotColor = "bg-[#00D26A]";
  let textColor = "text-[#00D26A]";
  let bg = "bg-[#0D1A0D]";
  let border = "border-[#1A4A1A]";
  if (status === "active") {
    label = "Active";
  } else if (status === "trialing") {
    label = "Trialing";
    dotColor = "bg-[#60A5FA]";
    textColor = "text-[#60A5FA]";
    bg = "bg-[#0D1422]";
    border = "border-[#1E3A5F]";
  } else if (status === "past_due") {
    label = "Past due";
    dotColor = "bg-[#EF4444]";
    textColor = "text-[#F87171]";
    bg = "bg-[#1A0D0D]";
    border = "border-[#3D1515]";
  } else if (status === "canceled") {
    label = "Canceled";
    dotColor = "bg-[#6E6E6E]";
    textColor = "text-[#A1A1A1]";
    bg = "bg-[#1C1C1C]";
    border = "border-[#262626]";
  } else if (status === "incomplete") {
    label = "Incomplete";
    dotColor = "bg-[#F59E0B]";
    textColor = "text-[#F59E0B]";
    bg = "bg-[#1A1200]";
    border = "border-[#3D2E00]";
  }
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${bg} ${border} ${textColor}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${dotColor}` }),
        label
      ]
    }
  );
}
function CurrentPlanCard({ account, loading }) {
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-5 w-24 bg-[#1C1C1C] rounded animate-pulse mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-1/2 bg-[#1C1C1C] rounded animate-pulse mb-3" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/3 bg-[#1C1C1C] rounded animate-pulse" })
    ] });
  }
  const plan = account?.user.plan;
  const status = account?.user.subscription_status;
  const cycle = account?.user.billing_cycle;
  const email = account?.user.email;
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg", children: "Current plan" }),
      /* @__PURE__ */ jsx(StatusBadge, { status })
    ] }),
    email && /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm mb-5", children: email }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-[#EDEDED]", children: planLabel(plan) }),
      cycle && /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-xs px-2 py-0.5 rounded-full bg-[#1C1C1C] text-[#A1A1A1] uppercase tracking-wide",
          style: { fontFamily: "'JetBrains Mono', monospace" },
          children: cycle
        }
      )
    ] }),
    account?.api_keys && /* @__PURE__ */ jsxs("p", { className: "text-[#6E6E6E] text-sm mt-3", children: [
      account.api_keys.active_count,
      " active API key",
      account.api_keys.active_count === 1 ? "" : "s",
      account.api_keys.limit !== null && ` of ${account.api_keys.limit}`
    ] })
  ] });
}
function UsageQuotaCard({ usage, loading, warning }) {
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-5 w-20 bg-[#1C1C1C] rounded animate-pulse mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-1/2 bg-[#1C1C1C] rounded animate-pulse mb-3" }),
      /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-[#1C1C1C] rounded-full animate-pulse mb-3" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/3 bg-[#1C1C1C] rounded animate-pulse" })
    ] });
  }
  if (!usage) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg mb-2", children: "Usage" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm", children: "Usage will appear after your first API request." })
    ] });
  }
  const used = usage.used;
  const limit = usage.limit;
  const isUnlimited = limit === null;
  const remaining = isUnlimited ? null : Math.max(0, limit - used);
  const pct = !isUnlimited && limit > 0 ? Math.min(100, Math.round(used / limit * 100)) : 0;
  const isExhausted = !isUnlimited && remaining === 0;
  const isLow = !isUnlimited && remaining !== null && remaining < limit * 0.1;
  const resetLabel = new Date(usage.reset_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const periodLabel = usage.period === "daily" ? "Today's" : "This month's";
  const hasBanner = warning !== null || (usage.overage_units ?? 0) > 0 || !isUnlimited && (isExhausted || isLow);
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg", children: "Usage" }),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-xs px-2.5 py-1 rounded-full bg-[#1C1C1C] text-[#ADADAD]",
          style: { fontFamily: "'JetBrains Mono', monospace" },
          children: usage.rate_limit
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-[#6E6E6E] text-sm mb-5", children: [
      periodLabel,
      " API requests"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-3xl font-bold text-[#EDEDED]",
            style: { fontFamily: "'JetBrains Mono', monospace" },
            children: used.toLocaleString()
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-[#6E6E6E] text-sm ml-2", children: [
          "/ ",
          isUnlimited ? "Unlimited" : limit.toLocaleString()
        ] })
      ] }),
      !isUnlimited && /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#6E6E6E]", children: [
        (remaining ?? 0).toLocaleString(),
        " remaining"
      ] })
    ] }),
    !isUnlimited && /* @__PURE__ */ jsx("div", { className: "w-full h-2 bg-[#1C1C1C] rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `h-full rounded-full transition-all duration-500 ${isExhausted ? "bg-[#EF4444]" : isLow ? "bg-[#F59E0B]" : "bg-[#7C3AED]"}`,
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-[#6E6E6E]", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Resets ",
        resetLabel
      ] }),
      !isUnlimited && /* @__PURE__ */ jsxs("span", { children: [
        pct,
        "% used"
      ] })
    ] }),
    hasBanner && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(QuotaWarningBanner, { warning, usage }) })
  ] });
}
function BillingActions({
  currentPlan,
  onManageBilling,
  managingBilling,
  manageDisabled
}) {
  const isPaid = currentPlan === "starter" || currentPlan === "builder" || currentPlan === "scale" || currentPlan === "enterprise";
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg mb-1", children: "Billing actions" }),
    /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm mb-5", children: "Update payment methods, view invoices, or change your plan." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      isPaid && /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onManageBilling,
          disabled: managingBilling || manageDisabled === true,
          "aria-busy": managingBilling ? "true" : "false",
          className: "inline-flex items-center gap-2 bg-[#1C1C1C] text-[#EDEDED] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#262626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]",
          children: [
            managingBilling && /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block h-3.5 w-3.5 border-2 border-[#6E6E6E] border-t-[#EDEDED] rounded-full animate-spin",
                "aria-hidden": "true"
              }
            ),
            managingBilling ? "Opening portal…" : "Manage billing"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/pricing",
          className: "inline-flex items-center bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]",
          children: isPaid ? "Change plan" : "Upgrade plan"
        }
      )
    ] })
  ] });
}
function PastDueBanner({ onFixPayment, fixing }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "alert",
      className: "bg-[#1A0D0D] border border-[#3D1515] rounded-xl p-5",
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 mt-0.5", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#F87171",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M12 9v4" }),
              /* @__PURE__ */ jsx("path", { d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0z" }),
              /* @__PURE__ */ jsx("path", { d: "M12 17h.01" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[#F87171] font-semibold text-base mb-1", children: "Payment failed — subscription past due" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#EDEDED] text-sm mb-4", children: "Your payment method could not be charged. To avoid service interruption, please update your payment method." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: onFixPayment,
              disabled: fixing,
              "aria-busy": fixing,
              className: "inline-flex items-center gap-2 bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
              children: [
                fixing && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: fixing ? "Opening billing portal…" : "Update payment method" })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function CanceledBanner({
  periodEnd,
  onManageBilling,
  managing
}) {
  const endLabel = periodEnd ? formatDate(periodEnd) : null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "status",
      className: "bg-[#1A1200] border border-[#3D2E00] rounded-xl p-5",
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 mt-0.5", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#F59E0B",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
              /* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[#F59E0B] font-semibold text-base mb-1", children: "Subscription canceled" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#EDEDED] text-sm mb-4", children: endLabel ? `Your subscription has been canceled. You will retain access until ${endLabel}.` : "Your subscription has been canceled. You may still have access until the end of your billing period." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/pricing",
                className: "inline-flex items-center bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors",
                children: "Resubscribe"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: onManageBilling,
                disabled: managing,
                "aria-busy": managing,
                className: "inline-flex items-center gap-2 bg-[#1C1C1C] border border-[#262626] text-[#EDEDED] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#262626] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
                children: [
                  managing && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "inline-block h-4 w-4 border-2 border-[#EDEDED]/40 border-t-[#EDEDED] rounded-full animate-spin",
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: managing ? "Opening billing portal…" : "Manage billing" })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function HardLimitBanner({ error, onDismiss, onRetry }) {
  const [secondsLeft, setSecondsLeft] = useState(
    typeof error.retryAfterSeconds === "number" ? error.retryAfterSeconds : null
  );
  useEffect(() => {
    setSecondsLeft(
      typeof error.retryAfterSeconds === "number" ? error.retryAfterSeconds : null
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
    }, 1e3);
    return () => window.clearInterval(id);
  }, [error]);
  const message = error.recovery ?? error.message;
  const canRetryNow = secondsLeft === 0 && typeof onRetry === "function";
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "alert",
      "aria-live": "assertive",
      className: "bg-[#1A0D0D] border border-[#3D1515] rounded-lg p-4",
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[#F87171] font-semibold text-sm mb-1", children: "Request limit reached" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#EDEDED] text-sm mb-2", children: message }),
          error.rateLimitContext && /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-[#A1A1A1] text-xs mb-2",
              style: { fontFamily: "'JetBrains Mono', monospace" },
              children: error.rateLimitContext
            }
          ),
          error.alternativeAction && /* @__PURE__ */ jsx("p", { className: "text-[#A1A1A1] text-xs mb-2", children: error.alternativeAction }),
          secondsLeft !== null && secondsLeft > 0 && /* @__PURE__ */ jsxs(
            "p",
            {
              className: "text-[#A1A1A1] text-xs",
              style: { fontFamily: "'JetBrains Mono', monospace" },
              children: [
                "Retry in ",
                secondsLeft,
                "s"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          canRetryNow && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onRetry,
              className: "text-sm text-white bg-[#262626] hover:bg-[#333333] px-3 py-1.5 rounded-md transition-colors font-medium border border-[#3D1515]",
              children: "Retry now"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/pricing",
              className: "text-sm text-white bg-[#7C3AED] hover:bg-[#8B5CF6] px-3 py-1.5 rounded-md transition-colors font-medium",
              children: "Upgrade plan"
            }
          ),
          onDismiss && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onDismiss,
              "aria-label": "Dismiss",
              className: "text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer px-1",
              children: "×"
            }
          )
        ] })
      ] })
    }
  );
}
function mapErrorMessage(err) {
  if (err instanceof KapitDashboardApiError) {
    if (err.status === 401) {
      return { message: "Please sign in to continue.", notReady: false, redirect: true };
    }
    if (err.status === 403) {
      return {
        message: "You do not have access to this billing account.",
        notReady: false,
        redirect: false
      };
    }
    if (err.code === "not_ready" || err.status === 404) {
      return { message: "Billing is not available yet.", notReady: true, redirect: false };
    }
    return {
      message: err.message || "Something went wrong. Please try again.",
      notReady: false,
      redirect: false
    };
  }
  return {
    message: "Network error. Please check your connection and try again.",
    notReady: false,
    redirect: false
  };
}
function BillingDashboard() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [account, setAccount] = useState(null);
  const [usage, setUsage] = useState(null);
  const [warning, setWarning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hardLimitError, setHardLimitError] = useState(null);
  const [notReady, setNotReady] = useState(false);
  const [managingBilling, setManagingBilling] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [polling, setPolling] = useState(false);
  const pollTimer = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const co = url.searchParams.get("checkout");
    if (co === "success" || co === "cancelled") {
      setCheckoutStatus(co);
      url.searchParams.delete("checkout");
      const next = url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : "") + url.hash;
      window.history.replaceState({}, "", next);
    }
  }, []);
  const fetchAll = async (signal) => {
    const token = await getToken();
    if (!token) {
      setLoading(false);
      return null;
    }
    try {
      const [me, usageResult] = await Promise.all([
        getAccountMe(token),
        getAccountUsageWithMeta(token).catch((e) => {
          if (e instanceof KapitDashboardApiError && e.code === "not_ready") {
            return null;
          }
          throw e;
        })
      ]);
      if (signal?.cancelled) return null;
      setAccount(me);
      setUsage(usageResult ? usageResult.data : null);
      setWarning(usageResult ? usageResult.warning : null);
      setNotReady(false);
      setError(null);
      setHardLimitError(null);
      return me;
    } catch (err) {
      if (signal?.cancelled) return null;
      if (err instanceof KapitDashboardApiError && err.status === 429) {
        setHardLimitError(err);
        return null;
      }
      const mapped = mapErrorMessage(err);
      if (mapped.redirect && typeof window !== "undefined") {
        window.location.href = "/";
        return null;
      }
      if (mapped.notReady) {
        setNotReady(true);
        setAccount(null);
        setUsage(null);
        setWarning(null);
      } else {
        setError(mapped.message);
      }
      return null;
    }
  };
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      if (typeof window !== "undefined") window.location.href = "/";
      return;
    }
    let signal = { cancelled: false };
    (async () => {
      setLoading(true);
      await fetchAll(signal);
      if (!signal.cancelled) setLoading(false);
    })();
    return () => {
      signal.cancelled = true;
    };
  }, [isLoaded, isSignedIn]);
  useEffect(() => {
    if (checkoutStatus !== "success") return;
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    const startedAt = Date.now();
    const initialPlan = account?.user.plan ?? null;
    const initialStatus = account?.user.subscription_status ?? null;
    setPolling(true);
    const tick = async () => {
      if (cancelled) return;
      const me = await fetchAll({ cancelled });
      if (cancelled) return;
      const changed = me && (me.user.plan !== initialPlan || me.user.subscription_status !== initialStatus);
      const elapsed = Date.now() - startedAt;
      if (changed || elapsed >= 3e4) {
        setPolling(false);
        return;
      }
      pollTimer.current = window.setTimeout(tick, 2e3);
    };
    pollTimer.current = window.setTimeout(tick, 2e3);
    return () => {
      cancelled = true;
      if (pollTimer.current !== null) {
        window.clearTimeout(pollTimer.current);
        pollTimer.current = null;
      }
      setPolling(false);
    };
  }, [checkoutStatus, isLoaded, isSignedIn]);
  const handleManageBilling = async () => {
    setError(null);
    setManagingBilling(true);
    try {
      const token = await getToken();
      if (!token) {
        setError("Please sign in to continue.");
        setManagingBilling(false);
        return;
      }
      const res = await createCustomerPortal(token, {
        return_url: window.location.href
      });
      if (!res || !res.portal_url) {
        setError("Could not open billing portal. Please try again.");
        setManagingBilling(false);
        return;
      }
      window.location.href = res.portal_url;
    } catch (err) {
      if (err instanceof KapitDashboardApiError && err.status === 429) {
        setHardLimitError(err);
        setManagingBilling(false);
        return;
      }
      const mapped = mapErrorMessage(err);
      if (mapped.redirect) {
        window.location.href = "/";
        return;
      }
      setError(mapped.message);
      setManagingBilling(false);
    }
  };
  const currentPlan = account?.user.plan ?? null;
  const subscriptionStatus = account?.user.subscription_status ?? null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(CheckoutStatusBanner, { status: checkoutStatus, onDismiss: () => setCheckoutStatus(null) }),
    hardLimitError && /* @__PURE__ */ jsx(
      HardLimitBanner,
      {
        error: hardLimitError,
        onDismiss: () => setHardLimitError(null)
      }
    ),
    subscriptionStatus === "past_due" && !loading && /* @__PURE__ */ jsx(PastDueBanner, { onFixPayment: handleManageBilling, fixing: managingBilling }),
    subscriptionStatus === "canceled" && !loading && /* @__PURE__ */ jsx(CanceledBanner, { onManageBilling: handleManageBilling, managing: managingBilling }),
    polling && /* @__PURE__ */ jsxs(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        className: "flex items-center gap-3 bg-[#0D0B14] border border-[#7C3AED] rounded-lg px-4 py-3",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block h-4 w-4 border-2 border-[#7C3AED]/40 border-t-[#7C3AED] rounded-full animate-spin",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[#EDEDED] text-sm", children: "Activating your plan…" })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxs(
      "div",
      {
        role: "alert",
        "aria-live": "polite",
        className: "flex items-center justify-between gap-3 bg-[#1A0D0D] border border-[#3D1515] rounded-lg px-4 py-3",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#F87171] text-sm", children: error }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setError(null),
              className: "shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer",
              "aria-label": "Dismiss error",
              children: "×"
            }
          )
        ]
      }
    ),
    notReady && !loading && /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg mb-2", children: "Billing" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#A1A1A1] text-sm", children: "Billing is not available yet. Check back soon." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/pricing",
          className: "inline-flex mt-4 items-center bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors",
          children: "View pricing"
        }
      )
    ] }),
    !notReady && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(CurrentPlanCard, { account, loading }),
      /* @__PURE__ */ jsx(UsageQuotaCard, { usage, loading, warning }),
      /* @__PURE__ */ jsx(
        BillingActions,
        {
          currentPlan,
          onManageBilling: handleManageBilling,
          managingBilling,
          manageDisabled: loading
        }
      )
    ] })
  ] });
}
const prerender = false;
const $$Billing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Billing;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/");
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>Billing — Kapit</title><meta name="robots" content="noindex"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead()}</head> <body class="min-h-screen bg-[#0A0A0A] text-[#EDEDED] antialiased"> <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#262626] h-14"> <div class="max-w-5xl mx-auto px-6 h-full flex items-center justify-between"> <a href="/" class="font-bold text-lg text-[#EDEDED] tracking-tight" style="font-family: Inter, sans-serif;">
kapit
</a> <div class="flex items-center gap-6"> <a href="/dashboard" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Dashboard</a> <a href="/docs" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Docs</a> ${renderComponent($$result, "NavbarAuthActions", NavbarAuthActions, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/NavbarAuthActions.tsx", "client:component-export": "default" })} </div> </div> </nav> <main class="max-w-5xl mx-auto px-6 pt-24 pb-16"> <div class="mb-8"> <h1 class="text-2xl font-bold text-[#EDEDED]">Billing</h1> <p class="text-[#6E6E6E] mt-1 text-sm">
Manage your plan, payment methods, and invoices.
</p> </div> ${renderComponent($$result, "BillingDashboard", BillingDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/billing/BillingDashboard.tsx", "client:component-export": "default" })} </main> </body></html>`;
}, "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/pages/dashboard/billing.astro", void 0);
const $$file = "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/pages/dashboard/billing.astro";
const $$url = "/dashboard/billing";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Billing,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
