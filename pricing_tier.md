

- Validate willingness to pay
- Attract adoption *and* generate real revenue if the value proposition lands

---

## 2. Metering Model

**Decision:** Flat per-request metering. One request = one unit.

Why flat instead of weighted credits: v1 endpoints are uniform snapshot calls with similar upstream costs. Weighted credit systems add cognitive load for developers and only make sense once endpoint costs diverge (historical data, streaming, options chains, etc.).

---

## 3. Cost Basis (COGS)

Bottleneck at every tier is CoinGecko. FMP + Twelve Data fallback handle stocks.

| Scenario | Upstream cost / mo | Max requests / mo | Cost per 1K requests |
|---|---|---|---|
| Free upstream | $0 | ~10K | $0 |
| Minimum paid | $51 | 100K | $0.51 |
| Mid-tier | $241 | 500K | $0.48 |
| High-tier | $777 | 2M | $0.39 |

Add roughly **$6–$24/mo** for VPS / Redis / Postgres infra. Margin expands with scale.

---

## 4. Competitive Landscape (summary)

| Provider | Entry paid | Approx $ / 1K req | Key gap vs Kapit |
|---|---|---|---|
| Twelve Data | $79/mo | $0.005–$0.21 | No prediction markets, no agent recovery |
| Alpha Vantage | $49.99/mo | ~$0.001 | Limited free tier, no prediction markets |
| Tiingo | $30/mo | ~$0.0003 | No prediction markets, no AI features |
| Polygon | $29/mo (stocks) | ~$0 | Per-asset pricing, not unified |
| Finnhub | $3,500/mo | $0.01–$0.05 | Enterprise-only |

**Positioning takeaway:** Kapit cannot win on raw $/1K — competitors source raw data directly. Kapit wins on **agent UX + Polymarket + unified envelope**, and prices accordingly.

---

## 5. Tier Structure

| | **Free** | **Starter** | **Builder** | **Scale** |
|---|---|---|---|---|
| **Target audience** | Hobbyists, evaluators, tutorial users | Solo indie devs, side projects in production | Indie devs with real traction, small AI startups | Funded startups, agent platforms with real volume |
| **Pricing** | $0 forever | **$19/mo** or $190/yr (2 mo free) | **$49/mo** or $490/yr | **$149/mo** or $1,490/yr |
| **Included requests** | 500/day (~15K/mo) | 50K/mo | 200K/mo | 1M/mo |
| **Quota behavior** | Hard cap (429 with structured retry hint) | Soft cap | Soft cap | Soft cap |
| **Overage** | n/a | $1.50 per 1K extra | $1.20 per 1K extra | $0.80 per 1K extra |
| **Rate limit** | 10 req/min | 60 req/min | 300 req/min | 1,000 req/min |
| **Assets** | Stocks + Crypto + Polymarket | All | All | All |
| **Agent features** | ✅ (envelope, recovery, /llms.txt, source metadata) | ✅ | ✅ | ✅ |
| **API keys** | 1 | 3 | 10 | Unlimited |
| **Support** | Community / docs | Email (72hr) | Email (24hr) | Priority email (12hr) + Discord |
| **SLA** | None | None | 99.5% uptime target | 99.9% uptime + status page |
| **Free trial** | n/a | 14-day trial of Builder (no card) | 14-day trial of Scale | Contact sales |

**Enterprise tier** sits above this — custom volume (>1M/mo), dedicated infra, contractual SLAs. Priced by conversation, not on the page.

---

## 6. Reasoning

### Why four tiers

Free → Starter → Builder → Scale → Enterprise maps cleanly to customer lifecycle: evaluate → ship side project → get traction → raise / scale. Each step is ~3–4x the previous on volume — small enough that upgrades feel inevitable, big enough to avoid nickel-and-diming.

### Why these price points

- **$19 Starter** is deliberately below Twelve Data ($79), Alpha Vantage ($50), and Tiingo ($30). Low entry maximizes the number of people who actually swipe a card — which is the signal you need to validate willingness to pay.
- **$49 Builder** sits at Alpha Vantage's price with 4x their request volume *and* unique agent features. Expected to be the bread-and-butter tier. At 200K requests, effective rate ≈ $0.24/1K vs. ~$0.48/1K COGS — healthy margin.
- **$149 Scale** is priced above Twelve Data's $79 entry. Justified by Polymarket + agent recovery + 1M requests. If buyers won't pay $149 here, it's a critical signal that the differentiation isn't as valuable as you think — *exactly* the validation you want.

### Why hard cap on Free, soft cap on Paid

- **Hard cap on Free** protects against abusive scrapers and signals "this tier is for evaluation."
- **Soft cap on Paid** is friendlier — a paying customer's traffic spike should not break their product. Overage rates are higher than in-plan effective rates ($1.50/1K Starter overage vs. $0.38/1K in-plan), which nudges customers to upgrade tiers rather than ride overage forever.

### Why 500/day on Free (not 100 total)

100 requests total is enough for one tutorial. Devs will bounce before they finish building anything. 500/day is essentially free for Kapit (within upstream free limits) and lets a hobbyist run a real prototype for weeks. Highest-leverage adoption lever in this strategy.

### Why agent features are in every tier

Your differentiation (KapitResponse envelope, structured recovery, /llms.txt) is your *product*, not a premium feature. Gating it defeats the positioning. Premium tiers earn their price on **volume, rate limits, support, and SLA** — the standard axes.