import { c as createComponent } from "./astro-component_C-dX4Z7q.mjs";
import "piccolore";
import { b3 as renderHead, b7 as renderTemplate } from "./params-and-props_BO-CuAf5.mjs";
import { r as renderComponent } from "./entrypoint_DpuGg60V.mjs";
import { u as useAuth, l as listApiKeys, K as KapitDashboardApiError, c as createApiKey, r as revokeApiKey, d as getAccountUsage, N as NavbarAuthActions } from "./kapit-dashboard-api_BO7CdYbG.mjs";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Q as QuotaWarningBanner } from "./QuotaWarningBanner_f0Ytz45_.mjs";
import { c as clerkClient } from "./index_BKeONVeX.mjs";
function ApiKeysCard() {
  const { getToken } = useAuth();
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    async function fetchKeys() {
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await listApiKeys(token);
        if (!cancelled) setKeys(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof KapitDashboardApiError && err.code === "not_ready") {
          setKeys([]);
        } else {
          setError("Failed to load API keys. Please refresh.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchKeys();
    return () => {
      cancelled = true;
    };
  }, []);
  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) return;
      const { key, raw_key } = await createApiKey(token, { mode: "live" });
      setNewKey(raw_key);
      setKeys((prev) => [key, ...prev]);
    } catch (err) {
      if (err instanceof KapitDashboardApiError && err.code === "not_ready") {
        setError("API key creation is not yet available.");
      } else {
        setError("Failed to generate key. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };
  const handleCopy = async () => {
    if (!newKey) return;
    await navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleRevoke = async (id) => {
    setError(null);
    try {
      const token = await getToken();
      if (!token) return;
      await revokeApiKey(token, id);
      try {
        const freshKeys = await listApiKeys(token);
        setKeys(freshKeys);
      } catch {
        setKeys((prev) => prev.map((k) => k.id === id ? { ...k, status: "revoked" } : k));
      }
    } catch {
      setError("Failed to revoke key. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg", children: "API Keys" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm mt-0.5", children: "Keys used by your AI agents to call Kapit" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleGenerate,
          disabled: generating || loading,
          className: "inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors disabled:opacity-50 cursor-pointer",
          children: generating ? "Generating…" : "+ Generate Key"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-3 bg-[#1A0D0D] border border-[#3D1515] rounded-lg px-4 py-2.5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#F87171] text-sm", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setError(null),
          className: "shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer",
          "aria-label": "Dismiss error",
          children: "×"
        }
      )
    ] }),
    newKey && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-[#0D1A0D] border border-[#1A4A1A] rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#4ADE80] text-sm font-medium", children: "Copy this key now. You won't be able to see it again." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setNewKey(null),
            className: "shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer",
            "aria-label": "Dismiss",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("code", { className: "flex-1 text-[#EDEDED] text-sm bg-[#0A0A0A] px-3 py-2 rounded-md break-all", style: { fontFamily: "'JetBrains Mono', monospace" }, children: newKey }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCopy,
            className: "shrink-0 text-sm px-3 py-2 rounded-md bg-[#1C1C1C] text-[#ADADAD] hover:text-[#EDEDED] transition-colors cursor-pointer",
            children: copied ? "Copied!" : "Copy"
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsx("div", { className: "h-10 bg-[#1C1C1C] rounded-lg animate-pulse" }, i)) }) : keys.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-10 border border-dashed border-[#262626] rounded-lg", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm", children: "No API keys yet." }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A4A4A] text-sm mt-1", children: "Generate your first key to start using Kapit." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-[#6E6E6E] border-b border-[#1F1F1F]", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left pb-3 font-medium", children: "Key" }),
        /* @__PURE__ */ jsx("th", { className: "text-left pb-3 font-medium", children: "Created" }),
        /* @__PURE__ */ jsx("th", { className: "text-left pb-3 font-medium", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "text-right pb-3 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-[#1F1F1F]", children: keys.map((key) => /* @__PURE__ */ jsxs("tr", { className: "text-[#ADADAD]", children: [
        /* @__PURE__ */ jsx("td", { className: "py-3 text-[#EDEDED]", style: { fontFamily: "'JetBrains Mono', monospace" }, children: key.prefix }),
        /* @__PURE__ */ jsx("td", { className: "py-3", children: new Date(key.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${key.status === "active" ? "bg-[#0D1A0D] text-[#4ADE80]" : "bg-[#1A0D0D] text-[#F87171]"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${key.status === "active" ? "bg-[#4ADE80]" : "bg-[#F87171]"}` }),
          key.status
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "py-3 text-right", children: key.status === "active" && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleRevoke(key.id),
            className: "text-xs text-[#F87171] hover:text-[#EF4444] transition-colors cursor-pointer",
            children: "Revoke"
          }
        ) })
      ] }, key.id)) })
    ] }) })
  ] });
}
function UsageCard() {
  const { getToken } = useAuth();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notReady, setNotReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    async function fetchUsage() {
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getAccountUsage(token);
        if (!cancelled) setUsage(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof KapitDashboardApiError && err.code === "not_ready") {
          setNotReady(true);
        } else {
          setError("Failed to load usage data. Please refresh.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchUsage();
    return () => {
      cancelled = true;
    };
  }, []);
  const limit = usage?.limit ?? null;
  const used = usage?.used ?? 0;
  const remaining = limit !== null ? Math.max(0, limit - used) : null;
  const pct = usage && limit && limit > 0 ? Math.min(100, Math.round(used / limit * 100)) : 0;
  const isLow = usage && limit ? remaining !== null && remaining < limit * 0.1 : false;
  const isExhausted = usage && limit ? remaining === 0 : false;
  const resetLabel = usage ? new Date(usage.reset_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg", children: "Usage" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm mt-0.5", children: "Today's API requests" })
      ] }),
      usage && /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-xs px-2.5 py-1 rounded-full bg-[#1C1C1C] text-[#ADADAD] uppercase tracking-wide",
          style: { fontFamily: "'JetBrains Mono', monospace" },
          children: usage.plan
        }
      )
    ] }),
    loading && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-1/3 bg-[#1C1C1C] rounded animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-[#1C1C1C] rounded-full animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/2 bg-[#1C1C1C] rounded animate-pulse" })
    ] }),
    !loading && error && /* @__PURE__ */ jsx("p", { className: "text-[#F87171] text-sm", children: error }),
    !loading && !error && notReady && /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm", children: "Usage will appear after your first API key is created." }),
    !loading && !error && !notReady && usage && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-[#EDEDED]", style: { fontFamily: "'JetBrains Mono', monospace" }, children: used.toLocaleString() }),
          /* @__PURE__ */ jsxs("span", { className: "text-[#6E6E6E] text-sm ml-2", children: [
            "/ ",
            limit === null ? "∞" : limit.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-[#6E6E6E]", children: limit === null ? "Unlimited" : `${(remaining ?? 0).toLocaleString()} remaining` })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-2 bg-[#1C1C1C] rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("span", { children: [
          pct,
          "% used"
        ] })
      ] }),
      (isLow || isExhausted || (usage.overage_units ?? 0) > 0) && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(QuotaWarningBanner, { warning: null, usage }) })
    ] })
  ] });
}
const PLAN_ORDER = ["free", "starter", "builder", "scale", "enterprise"];
const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$19/mo",
    requests: "50K / mo",
    rateLimit: "60 req/min",
    apiKeys: "3 keys"
  },
  {
    id: "builder",
    name: "Builder",
    price: "$49/mo",
    requests: "200K / mo",
    rateLimit: "300 req/min",
    apiKeys: "10 keys"
  },
  {
    id: "scale",
    name: "Scale",
    price: "$149/mo",
    requests: "1M / mo",
    rateLimit: "1,000 req/min",
    apiKeys: "Unlimited"
  }
];
function UpgradeCard() {
  const { getToken } = useAuth();
  const [currentPlan, setCurrentPlan] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = await getToken();
      if (!token) return;
      try {
        const usage = await getAccountUsage(token);
        if (!cancelled) setCurrentPlan(usage.plan);
      } catch (err) {
        if (err instanceof KapitDashboardApiError && err.code === "not_ready") return;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const currentIndex = currentPlan ? PLAN_ORDER.indexOf(currentPlan) : -1;
  const isCurrentPlan = (planId) => planId === currentPlan;
  const isUpgrade = (planId) => currentIndex !== -1 && PLAN_ORDER.indexOf(planId) > currentIndex;
  const isDowngrade = (planId) => currentIndex !== -1 && PLAN_ORDER.indexOf(planId) < currentIndex;
  const sectionTitle = currentPlan && currentPlan !== "free" ? "Your plan & upgrades" : "Upgrade your plan";
  return /* @__PURE__ */ jsxs("div", { id: "upgrade", className: "bg-[#111111] border border-[#262626] rounded-xl p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-[#EDEDED] font-semibold text-lg mb-1", children: sectionTitle }),
    /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-sm mb-6", children: "Higher limits, faster rate limits, and more API keys." }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: plans.map((plan) => {
      const isCurrent = isCurrentPlan(plan.id);
      const upgrade = isUpgrade(plan.id);
      const downgrade = isDowngrade(plan.id);
      const cardClass = isCurrent ? "border-[#7C3AED] bg-[#0D0B14]" : "border-[#262626]";
      let btnLabel = "View plan";
      let btnClass = "bg-[#1C1C1C] text-[#A1A1A1] hover:bg-[#262626] hover:text-[#EDEDED]";
      let btnDisabled = false;
      if (isCurrent) {
        btnLabel = "Current plan";
        btnClass = "bg-[#1C1C1C] text-[#6E6E6E] cursor-not-allowed";
        btnDisabled = true;
      } else if (upgrade) {
        btnLabel = "Upgrade";
        btnClass = "bg-[#7C3AED] text-white hover:bg-[#8B5CF6]";
      } else if (downgrade) {
        btnLabel = "Downgrade";
        btnClass = "bg-[#1C1C1C] text-[#6E6E6E] hover:bg-[#262626] hover:text-[#A1A1A1]";
      }
      return /* @__PURE__ */ jsxs("div", { className: `border rounded-lg p-4 flex flex-col gap-3 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#EDEDED] font-medium", children: plan.name }),
          isCurrent && /* @__PURE__ */ jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-[#7C3AED]/20 text-[#A78BFA] font-medium", children: "Current" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#EDEDED] font-bold text-lg", children: plan.price }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-xs", children: plan.requests }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-xs", children: plan.rateLimit }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6E6E6E] text-xs", children: plan.apiKeys })
        ] }),
        btnDisabled ? /* @__PURE__ */ jsx(
          "button",
          {
            disabled: true,
            className: `w-full text-xs py-2 rounded-md text-center transition-colors ${btnClass}`,
            children: btnLabel
          }
        ) : /* @__PURE__ */ jsx(
          "a",
          {
            href: "/pricing",
            className: `w-full text-xs py-2 rounded-md text-center transition-colors ${btnClass}`,
            children: btnLabel
          }
        )
      ] }, plan.id);
    }) }),
    /* @__PURE__ */ jsxs("p", { className: "text-[#6E6E6E] text-xs text-center", children: [
      "Need more than 1M requests?",
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:hey@kapit.dev", className: "text-[#7C3AED] hover:underline", children: "Contact sales" })
    ] })
  ] });
}
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/");
  const user = await clerkClient(Astro2).users.getUser(userId);
  const displayName = user.firstName || user.username || "there";
  const email = user.emailAddresses[0]?.emailAddress;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>Dashboard — Kapit</title><meta name="robots" content="noindex"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead()}</head> <body class="min-h-screen bg-[#0A0A0A] text-[#EDEDED] antialiased"> <!-- Navbar --> <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#262626] h-16"> <div class="max-w-5xl mx-auto px-6 h-full flex items-center justify-between"> <a href="/"> <img src="/kapit_logo.png" alt="Kapit" class="h-12 w-auto"> </a> <div class="flex items-center gap-6"> <a href="/docs" class="text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors">Docs</a> ${renderComponent($$result, "NavbarAuthActions", NavbarAuthActions, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/NavbarAuthActions.tsx", "client:component-export": "default" })} </div> </div> </nav> <!-- Main content --> <main class="max-w-5xl mx-auto px-6 pt-24 pb-16"> <!-- Welcome (server-rendered) --> <div class="mb-8"> <h1 class="text-2xl font-bold text-[#EDEDED]">Welcome back, ${displayName}</h1> ${email && renderTemplate`<p class="text-[#6E6E6E] mt-1 text-sm">${email}</p>`} </div> <!-- Cards --> <div class="flex flex-col gap-6"> ${renderComponent($$result, "ApiKeysCard", ApiKeysCard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/dashboard/ApiKeysCard.tsx", "client:component-export": "default" })} ${renderComponent($$result, "UsageCard", UsageCard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/dashboard/UsageCard.tsx", "client:component-export": "default" })} ${renderComponent($$result, "UpgradeCard", UpgradeCard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/components/dashboard/UpgradeCard.tsx", "client:component-export": "default" })} </div> </main> </body></html>`;
}, "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/pages/dashboard/index.astro", void 0);
const $$file = "/Users/aryanbhargav/Desktop/LandingPages/Kapit_LP/src/pages/dashboard/index.astro";
const $$url = "/dashboard";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
