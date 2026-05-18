import { jsx, jsxs, Fragment } from "react/jsx-runtime";
function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
function QuotaWarningBanner({
  warning,
  usage,
  onUpgrade
}) {
  let guidance = null;
  let monthlyUsed;
  let monthlyLimit;
  let overageUnits;
  let overageCostCents;
  let upgradeUrl;
  if (warning) {
    guidance = warning.guidance ?? warning.recommended_action ?? null;
    monthlyUsed = warning.monthly_used;
    monthlyLimit = warning.monthly_limit;
    overageUnits = warning.overage_units;
    overageCostCents = warning.overage_cost_cents;
    upgradeUrl = warning.upgrade_url;
  } else if (usage && (usage.overage_units ?? 0) > 0) {
    overageUnits = usage.overage_units;
    overageCostCents = usage.estimated_overage_cost_cents;
    monthlyUsed = usage.used;
    monthlyLimit = usage.limit ?? void 0;
    guidance = "You have exceeded your plan quota. Overage charges apply.";
  } else if (usage && usage.limit !== null) {
    const remaining = Math.max(0, usage.limit - usage.used);
    const isExhausted = remaining === 0;
    const isLow = remaining < usage.limit * 0.1;
    if (isExhausted) {
      guidance = "Quota reached. Upgrade to keep making requests.";
      monthlyUsed = usage.used;
      monthlyLimit = usage.limit;
    } else if (isLow) {
      guidance = "Running low on requests. Consider upgrading your plan.";
      monthlyUsed = usage.used;
      monthlyLimit = usage.limit;
    } else {
      return null;
    }
  } else {
    return null;
  }
  const handleUpgrade = (e) => {
    if (onUpgrade) {
      e.preventDefault();
      onUpgrade();
    }
  };
  const href = upgradeUrl ?? "/pricing";
  const hasOverage = typeof overageUnits === "number" && overageUnits > 0;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: "bg-[#1A1200] border border-[#3D2E00] rounded-lg p-4",
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          guidance && /* @__PURE__ */ jsx("p", { className: "text-[#F59E0B] text-sm font-medium mb-2", children: guidance }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#A1A1A1]", children: [
            typeof monthlyUsed === "number" && typeof monthlyLimit === "number" && /* @__PURE__ */ jsxs("span", { style: { fontFamily: "'JetBrains Mono', monospace" }, children: [
              monthlyUsed.toLocaleString(),
              " / ",
              monthlyLimit.toLocaleString(),
              " used"
            ] }),
            hasOverage && /* @__PURE__ */ jsxs("span", { style: { fontFamily: "'JetBrains Mono', monospace" }, children: [
              overageUnits.toLocaleString(),
              " overage",
              typeof overageCostCents === "number" && /* @__PURE__ */ jsxs(Fragment, { children: [
                " · est. ",
                formatCents(overageCostCents)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href,
            onClick: handleUpgrade,
            className: "shrink-0 text-sm text-white bg-[#7C3AED] px-3 py-1.5 rounded-md hover:bg-[#8B5CF6] transition-colors font-medium",
            children: "Upgrade plan"
          }
        )
      ] })
    }
  );
}
export {
  QuotaWarningBanner as Q
};
