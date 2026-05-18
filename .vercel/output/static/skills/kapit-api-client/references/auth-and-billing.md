# Auth, Rate Limits, Billing & Free Tier

## Getting an API Key

1. Sign up at **https://kapit.dev/dashboard**
2. Create an API key — choose `kap_live_...` for production or `kap_test_...` for testing
3. Set `KAPIT_API_KEY` environment variable

```
export KAPIT_API_KEY=kap_live_your_key_here
```

- `kap_live_*` — production keys, counted toward quota
- `kap_test_*` — test keys for development and smoke testing

No OAuth, no redirects, no CAPTCHAs.

## Rate Limit Tiers

| Tier | Quota | Per-Minute Limit | Cap Behavior | Overage Rate |
|------|-------|-------------------|--------------|--------------|
| **Free** | 500 req/day | 10 RPM | **Hard cap** — 429 with structured retry hint | n/a |
| **Starter** | 50,000 req/mo ($19/mo) | 60 RPM | **Soft cap** — 200 with `meta.warning` | $1.50 per 1K extra |
| **Builder** | 200,000 req/mo ($49/mo) | 300 RPM | **Soft cap** — 200 with `meta.warning` | $1.20 per 1K extra |
| **Scale** | 1,000,000 req/mo ($149/mo) | 1,000 RPM | **Soft cap** — 200 with `meta.warning` | $0.80 per 1K extra |
| **Enterprise** | Unlimited (custom) | 5,000 RPM | Custom | Custom |

### Hard Cap vs Soft Cap

**Hard cap (Free tier only):**
- When the daily quota is exhausted, the API returns `429 rate_limited`.
- Response includes `error.recovery.retry_after_seconds` = seconds until the window resets.
- Agent must wait, not retry immediately. Tell the user to upgrade for higher limits.

**Soft cap (Starter, Builder, Scale):**
- When the monthly quota is exceeded, the API returns `200 OK` with `meta.warning`.
- `meta.warning` contains a message like `"Monthly request quota reached. Overage billing applies."`
- Agent should notify the user but may continue — overage charges apply.
- Overages are billed at the tier's overage rate per 1,000 extra requests.

### Checking Remaining Quota

- Every 200 response includes `meta.rate_limit.remaining`.
- Call `GET /v1/usage` for a full usage summary: `requests_today`, `requests_limit`, `requests_remaining`, `reset_at`.
- Headers `X-RateLimit-Remaining`, `X-RateLimit-Limit`, `X-RateLimit-Reset` carry the same data.

### Agent Best Practices

- Check `meta.rate_limit.remaining` before batch calls.
- On free tier: budget 500 requests/day — spread them across the day (10 RPM).
- When approaching limit, warn the user and suggest upgrade.
- Cache responses using `meta.freshness.cache_ttl_seconds`.

## Free Tier

- **500 requests/day**, **10 RPM**, hard cap.
- All asset classes included: stocks, crypto, Polymarket.
- Agent features (envelope, recovery, /llms.txt) fully available.
- Stock data may be 15 minutes delayed — check `meta.freshness.is_delayed`.
- Free tier is designed for evaluation and prototypes — not production volume.

## Billing & Upgrades

- Upgrade at **https://kapit.dev/dashboard**
- 14-day free trial of Builder tier (no credit card).
- Yearly billing available: 2 months free vs monthly.
- Usage is tracked per API key; dashboard users see aggregate usage across all owned keys.
