import { c as createComponent } from "./astro-component_C-dX4Z7q.mjs";
import "piccolore";
import { aj as createRenderInstruction, a5 as addAttribute, b3 as renderHead, b4 as renderSlot, b7 as renderTemplate, aV as maybeRenderHead } from "./params-and-props_BO-CuAf5.mjs";
import { r as renderComponent } from "./entrypoint_NqyTKoqU.mjs";
import "clsx";
import { N as NavbarAuthActions, u as useAuth, S as SignInButton, a as createCheckout, K as KapitDashboardApiError, g as getAccountMe } from "./kapit-dashboard-api_Dktmrfm7.mjs";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}<\/script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Kapit — Financial data, built for agents.",
    description = "Stocks, crypto, and Polymarket through one base URL, one API key, and one response envelope your agent can parse."
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><!-- AI/Agent discoverability --><link rel="alternate" type="text/plain" href="/?view=machine" title="Machine-readable version"><meta name="ai-content" content="machine-readable-available"><meta name="llms-txt" content="https://api.kapit.dev/llms.txt"><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead()}</head> <body class="min-h-screen bg-[#0A0A0A] text-[#EDEDED] antialiased"> <video autoplay muted loop playsinline style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3; z-index: -1; pointer-events: none; transition: opacity 0.3s ease;"> <source src="/bg.mp4" type="video/mp4"> </video> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/layouts/Layout.astro", void 0);
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#262626] h-17"> <div class="w-full px-8 h-full flex items-center justify-between"> <a href="/" class="flex items-center"> <img src="/kapit_logo.png" alt="Kapit" class="h-20 w-auto"> </a> <div class="hidden md:flex items-center gap-8"> <a href="/docs" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Docs</a> <a href="/pricing" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Pricing</a> <a href="https://github.com/aryanbhargav/kapit" target="_blank" rel="noopener" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">GitHub</a> <div class="hidden md:flex items-center border border-[#2A2A2A] rounded-full p-0.5 gap-0.5 mr-2"> <button id="view-human" data-active="true" class="text-xs px-3 py-1 rounded-full transition-all bg-[#1C1C1C] text-[#EDEDED]" style="font-family: 'JetBrains Mono', monospace;">HUMAN</button> <button id="view-machine" data-active="false" class="text-xs px-3 py-1 rounded-full transition-all text-[#6E6E6E] hover:text-[#ADADAD]" style="font-family: 'JetBrains Mono', monospace;">MACHINE</button> </div> ${renderComponent($$result, "NavbarAuthActions", NavbarAuthActions, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/NavbarAuthActions.tsx", "client:component-export": "default" })} </div> <button id="mobile-menu-btn" class="md:hidden text-[#A1A1A1] hover:text-[#EDEDED]" aria-label="Toggle menu"> <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> <div id="mobile-menu" class="hidden md:hidden bg-[#0A0A0A] border-b border-[#262626] px-6 pb-4"> <div class="flex flex-col gap-3 pt-3"> <a href="/docs" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Docs</a> <a href="/pricing" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Pricing</a> <a href="https://github.com/aryanbhargav/kapit" target="_blank" rel="noopener" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">GitHub</a> ${renderComponent($$result, "NavbarAuthActions", NavbarAuthActions, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/NavbarAuthActions.tsx", "client:component-export": "default" })} </div> </div> </nav> ${renderScript($$result, "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/Navbar.astro", void 0);
const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    includedRequests: "500/day (~15K/mo)",
    quotaBehavior: "Hard cap",
    overage: null,
    rateLimit: "10 req/min",
    apiKeys: "1",
    support: "Community / docs",
    sla: "None"
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 190,
    includedRequests: "50K/mo",
    quotaBehavior: "Soft cap",
    overage: "$1.50 per 1K extra",
    rateLimit: "60 req/min",
    apiKeys: "3",
    support: "Email, 72hr",
    sla: "None"
  },
  {
    id: "builder",
    name: "Builder",
    monthlyPrice: 49,
    yearlyPrice: 490,
    includedRequests: "200K/mo",
    quotaBehavior: "Soft cap",
    overage: "$1.20 per 1K extra",
    rateLimit: "300 req/min",
    apiKeys: "10",
    support: "Email, 24hr",
    sla: "99.5% uptime target",
    highlighted: true
  },
  {
    id: "scale",
    name: "Scale",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    includedRequests: "1M/mo",
    quotaBehavior: "Soft cap",
    overage: "$0.80 per 1K extra",
    rateLimit: "1,000 req/min",
    apiKeys: "Unlimited",
    support: "Priority email + Discord",
    sla: "99.9% uptime + status page"
  }
];
const SHARED_FEATURES = [
  "Stocks + Crypto + Polymarket",
  "KapitResponse envelope",
  "Structured recovery errors",
  "/llms.txt",
  "Source / provider metadata"
];
function BillingCycleToggle({ value, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        role: "radiogroup",
        "aria-label": "Billing cycle",
        className: "inline-flex items-center border border-[#262626] rounded-full p-1 bg-[#111111]",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": value === "monthly",
              onClick: () => onChange("monthly"),
              className: `text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${value === "monthly" ? "bg-[#1C1C1C] text-[#EDEDED]" : "text-[#A1A1A1] hover:text-[#EDEDED]"}`,
              children: "Monthly"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": value === "yearly",
              onClick: () => onChange("yearly"),
              className: `text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${value === "yearly" ? "bg-[#1C1C1C] text-[#EDEDED]" : "text-[#A1A1A1] hover:text-[#EDEDED]"}`,
              children: "Yearly"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-xs px-2 py-1 rounded-full bg-[#0D1A0D] text-[#00D26A] border border-[#1A4A1A]",
        style: { fontFamily: "'JetBrains Mono', monospace" },
        children: "Save 17%"
      }
    )
  ] });
}
function CheckIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 20 20",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "shrink-0 mt-0.5",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("polyline", { points: "4 10 8 14 16 6" })
    }
  );
}
function PricingCard({
  tier,
  billing,
  currentPlan,
  onUpgrade,
  loading
}) {
  const isCurrent = currentPlan === tier.id;
  const isFree = tier.id === "free";
  const isHighlighted = tier.highlighted === true;
  const displayPrice = billing === "yearly" ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice;
  const priceSuffix = tier.monthlyPrice === 0 ? "" : "/mo";
  let ctaLabel = "Upgrade";
  let ctaDisabled = false;
  let ctaHref = null;
  let ctaOnClick = () => onUpgrade(tier.id);
  if (isCurrent) {
    ctaLabel = "Current plan";
    ctaDisabled = true;
    ctaOnClick = null;
  } else if (isFree) {
    if (!currentPlan) {
      ctaLabel = "Start free";
      ctaHref = "/";
      ctaOnClick = null;
    } else {
      ctaLabel = "Downgrade";
      ctaDisabled = true;
      ctaOnClick = null;
    }
  } else if (loading) {
    ctaLabel = "Redirecting…";
    ctaDisabled = true;
  }
  const cardClasses = isHighlighted ? "relative bg-[#0D0B14] border border-[#7C3AED] rounded-2xl p-6 flex flex-col" : "relative bg-[#111111] border border-[#262626] rounded-2xl p-6 flex flex-col";
  const ctaClasses = ctaDisabled ? "w-full text-center inline-flex items-center justify-center bg-[#1C1C1C] text-[#6E6E6E] font-medium text-sm px-4 py-2.5 rounded-lg cursor-not-allowed" : isHighlighted ? "w-full text-center inline-flex items-center justify-center bg-[#7C3AED] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-[#8B5CF6] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]" : "w-full text-center inline-flex items-center justify-center bg-[#1C1C1C] text-[#EDEDED] font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-[#262626] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]";
  return /* @__PURE__ */ jsxs("div", { className: cardClasses, children: [
    isHighlighted && /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-2.5 py-1 rounded-full bg-[#7C3AED] text-white font-medium tracking-wide",
        style: { fontFamily: "'JetBrains Mono', monospace" },
        children: "RECOMMENDED"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[#EDEDED] font-semibold text-lg", children: tier.name }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-baseline gap-1.5", children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "text-4xl font-bold text-[#EDEDED]",
            style: { fontFamily: "'JetBrains Mono', monospace" },
            children: [
              "$",
              displayPrice
            ]
          }
        ),
        priceSuffix && /* @__PURE__ */ jsx("span", { className: "text-[#6E6E6E] text-sm", children: priceSuffix })
      ] }),
      billing === "yearly" && tier.yearlyPrice > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#6E6E6E] mt-1", children: [
        "$",
        tier.yearlyPrice,
        " billed annually"
      ] }),
      billing === "monthly" && tier.monthlyPrice > 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6E6E6E] mt-1", children: "Billed monthly" }),
      tier.monthlyPrice === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6E6E6E] mt-1", children: "No credit card required" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: ctaHref ? /* @__PURE__ */ jsx("a", { href: ctaHref, className: ctaClasses, children: ctaLabel }) : /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        disabled: ctaDisabled,
        "aria-busy": loading === true ? "true" : "false",
        onClick: ctaOnClick ?? void 0,
        className: ctaClasses,
        children: ctaLabel
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: isHighlighted ? "text-[#7C3AED]" : "text-[#00D26A]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsxs("span", { className: "text-[#EDEDED]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: tier.includedRequests }),
          /* @__PURE__ */ jsx("span", { className: "text-[#6E6E6E]", children: " included" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: isHighlighted ? "text-[#7C3AED]" : "text-[#00D26A]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsxs("span", { className: "text-[#ADADAD]", children: [
          tier.quotaBehavior,
          tier.overage && /* @__PURE__ */ jsxs("span", { className: "text-[#6E6E6E]", children: [
            " · ",
            tier.overage
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: isHighlighted ? "text-[#7C3AED]" : "text-[#00D26A]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsx("span", { className: "text-[#ADADAD]", children: tier.rateLimit })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: isHighlighted ? "text-[#7C3AED]" : "text-[#00D26A]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsxs("span", { className: "text-[#ADADAD]", children: [
          tier.apiKeys,
          " ",
          tier.apiKeys === "Unlimited" ? "API keys" : tier.apiKeys === "1" ? "API key" : "API keys"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: isHighlighted ? "text-[#7C3AED]" : "text-[#00D26A]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsx("span", { className: "text-[#ADADAD]", children: tier.support })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: isHighlighted ? "text-[#7C3AED]" : "text-[#00D26A]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsx("span", { className: "text-[#ADADAD]", children: tier.sla })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-3 mt-3 border-t border-[#1F1F1F] space-y-2", children: SHARED_FEATURES.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[#6E6E6E]", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
        /* @__PURE__ */ jsx("span", { className: "text-[#6E6E6E] text-xs", children: f })
      ] }, f)) })
    ] })
  ] });
}
function mapErrorMessage(err) {
  if (err instanceof KapitDashboardApiError) {
    if (err.status === 401) return "Please sign in to continue.";
    if (err.status === 403) return "You do not have access to this billing account.";
    if (err.status === 404) return "Billing account not found. Try refreshing or contact support.";
    if (err.status === 429) {
      return err.message || "Too many requests. Please try again shortly.";
    }
    if (err.code === "not_ready") return "Billing is not available yet.";
    return err.message || "Something went wrong. Please try again.";
  }
  return "Network error. Please check your connection and try again.";
}
function PricingPage({ currentPlan }) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [billing, setBilling] = useState("monthly");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState(null);
  const [pendingSignInPlan, setPendingSignInPlan] = useState(null);
  const handleUpgrade = async (planId) => {
    setError(null);
    if (!isLoaded) return;
    if (!isSignedIn) {
      setPendingSignInPlan(planId);
      return;
    }
    if (planId !== "starter" && planId !== "builder" && planId !== "scale") {
      setError("This plan is not available for self-service upgrades.");
      return;
    }
    if (planId === currentPlan) {
      return;
    }
    setLoadingPlan(planId);
    try {
      const token = await getToken();
      if (!token) {
        setError("Please sign in to continue.");
        setLoadingPlan(null);
        return;
      }
      const origin = window.location.origin;
      const res = await createCheckout(token, {
        plan: planId,
        billing_cycle: billing,
        success_url: `${origin}/dashboard/billing?checkout=success`,
        cancel_url: `${origin}/pricing?checkout=cancelled`
      });
      if (!res || !res.checkout_url) {
        setError("Could not start checkout. Please try again.");
        setLoadingPlan(null);
        return;
      }
      window.location.href = res.checkout_url;
    } catch (err) {
      if (err instanceof KapitDashboardApiError && err.status === 401) {
        setPendingSignInPlan(planId);
        setLoadingPlan(null);
        return;
      }
      setError(mapErrorMessage(err));
      setLoadingPlan(null);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#EDEDED] tracking-tight", children: "Pricing" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#A1A1A1] mt-4 max-w-2xl mx-auto", children: "Start free. Pay only when your agents need more. No seat fees, no hidden charges." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsx(BillingCycleToggle, { value: billing, onChange: setBilling }) })
    ] }),
    error && /* @__PURE__ */ jsxs(
      "div",
      {
        role: "alert",
        "aria-live": "polite",
        className: "mb-6 max-w-3xl mx-auto flex items-center justify-between gap-3 bg-[#1A0D0D] border border-[#3D1515] rounded-lg px-4 py-3",
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
    pendingSignInPlan && /* @__PURE__ */ jsxs(
      "div",
      {
        role: "alert",
        "aria-live": "polite",
        className: "mb-6 max-w-3xl mx-auto flex items-center justify-between gap-3 bg-[#0D0B14] border border-[#7C3AED] rounded-lg px-4 py-3",
        children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[#EDEDED] text-sm", children: [
            "Sign in to upgrade to the ",
            pendingSignInPlan,
            " plan."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(SignInButton, { mode: "redirect", forceRedirectUrl: "/pricing", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "text-sm bg-[#7C3AED] text-white font-medium px-3 py-1.5 rounded-md hover:bg-[#8B5CF6] transition-colors cursor-pointer",
                children: "Sign in"
              }
            ) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPendingSignInPlan(null),
                className: "shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer",
                "aria-label": "Dismiss",
                children: "×"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto", children: PRICING_TIERS.map((tier) => /* @__PURE__ */ jsx(
      PricingCard,
      {
        tier,
        billing,
        currentPlan,
        onUpgrade: handleUpgrade,
        loading: loadingPlan === tier.id
      },
      tier.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 max-w-3xl mx-auto bg-[#111111] border border-[#262626] rounded-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#EDEDED]", children: "Need more than 1M requests/month?" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#A1A1A1] mt-3", children: "Enterprise plans include custom volume, dedicated capacity, SOC 2 paperwork, and SLAs tailored to your team." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "mailto:sales@kapit.dev?subject=Kapit%20Enterprise%20inquiry",
          className: "inline-flex mt-6 items-center bg-[#7C3AED] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#8B5CF6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]",
          children: "Contact sales"
        }
      )
    ] })
  ] });
}
const prerender = false;
const $$Pricing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pricing;
  let currentPlan = null;
  const { userId, getToken } = Astro2.locals.auth();
  if (userId) {
    try {
      const token = await getToken();
      if (token) {
        const me = await getAccountMe(token);
        currentPlan = me?.user?.plan ?? null;
      }
    } catch (err) {
      if (!(err instanceof KapitDashboardApiError && err.code === "not_ready")) {
        currentPlan = null;
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pricing — Kapit", "description": "Simple, usage-based pricing for AI agents. Start free." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-24 pb-20 px-6"> ${renderComponent($$result2, "PricingPage", PricingPage, { "client:load": true, "currentPlan": currentPlan, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/pricing/PricingPage.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/pages/pricing.astro", void 0);
const $$file = "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/pages/pricing.astro";
const $$url = "/pricing";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
