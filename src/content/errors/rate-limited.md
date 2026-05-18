# Rate Limited (429) — Hard Cap

The authenticated Kapit API key has exhausted its **hard** quota window.

This applies to:
- **Per-minute RPM** — all tiers (rate-limit window reset every 60 seconds).
- **Monthly hard cap** — **free tier only** (500 requests/month, resets at start of next UTC month).

For dashboard-created keys, quota is shared at the user/account level. Creating additional API keys does **not** increase the free-tier quota.

> **Paid tiers (starter/builder/scale) use soft caps.**  When paid tiers exceed their monthly quota, requests still succeed (HTTP 200) with overage billing and a `meta.warning` object in the response. See [Soft Cap Overage](#soft-cap-overage-200) below.

## What Happened

Kapit accepted the API key, but the associated plan has no remaining requests in the current window.

## Is It Retriable?

**Yes, after reset.** Do not retry immediately. Use `retry_after_seconds` and `error.context.rate_limit.reset_at`.

If the task must continue now, the correct recovery is to upgrade the plan.

## Agent Recovery Steps

1. Stop making repeated calls immediately.
2. Read `error.retry_after_seconds` and `error.context.rate_limit.reset_at`.
3. If the task can wait, retry after reset.
4. If the task must continue now, tell the user to upgrade at https://kapit.dev/dashboard.
5. Add client-side caching to reduce repeated requests.

## Example Response (Free Tier Monthly Hard Cap)

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Monthly quota of 500 requests exceeded for tier 'free'. Used: 500. Reset at the start of the next calendar month.",
    "doc_url": "https://docs.kapit.io/errors/rate-limited.md",
    "is_retriable": true,
    "retry_after_seconds": 1234567,
    "alternative_action": "Upgrade your plan at https://kapit.dev/dashboard or wait until the next calendar month.",
    "recovery": {
      "action": "wait_and_retry",
      "backoff_strategy": "fixed",
      "max_retries": 3,
      "retry_after_seconds": 1234567,
      "guidance": "Your 'free' tier includes 500 requests per month. You have used 500. Upgrade your plan at https://kapit.dev/dashboard for a higher monthly quota."
    },
    "context": {
      "method": "GET",
      "path": "/v1/stocks/quotes/AAPL",
      "status_code": 429,
      "rate_limit": {
        "limit": 500,
        "remaining": 0,
        "reset_at": "2026-06-01T00:00:00Z",
        "tier": "free",
        "retry_after_seconds": 1234567
      }
    }
  },
  "meta": {
    "request_id": "req_abc123def456",
    "fetched_at": "2026-05-18T12:00:00Z"
  }
}
```

### Response Headers (429 Hard Cap)

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1747569660
Retry-After: 1234567
X-Kapit-Monthly-Quota-Limit: 500
X-Kapit-Monthly-Quota-Used: 500
X-Kapit-Monthly-Quota-Remaining: 0
X-Kapit-Monthly-Quota-Exceeded: true
```

---

## Soft Cap Overage (200)

Paid tiers (starter/builder/scale) use **soft** monthly caps. When the monthly quota is exceeded, requests still succeed with HTTP 200, but the response includes:

1. **`meta.warning`** — a machine-readable guidance object.
2. **Over-age headers** — `X-Kapit-Overage-Units` and `X-Kapit-Overage-Cost-Cents`.
3. **`meta.rate_limit.monthly_exceeded: true`** — the raw monthly quota state.

### Warning Object Schema

```json
{
  "meta": {
    "warning": {
      "code": "monthly_quota_exceeded",
      "message": "Monthly quota of 50,000 requests exceeded (65,000 used).",
      "severity": "warning",
      "recommended_action": "continue_with_overage_or_upgrade",
      "upgrade_url": "https://kapit.dev/dashboard",
      "monthly_limit": 50000,
      "monthly_used": 65000,
      "monthly_remaining": 0,
      "overage_units": 15,
      "overage_cost_cents": 2250,
      "guidance": "Your starter plan includes 50,000 requests/month. You have used 65,000 requests (15 overage blocks of 1,000 requests). Estimated overage cost: $22.50 USD. You may continue with overage billing, reduce/cool down usage, upgrade your plan at https://kapit.dev/dashboard, or contact sales for enterprise pricing."
    }
  }
}
```

### `recommended_action` Values

| Value | Meaning |
|-------|---------|
| `continue_with_overage_or_upgrade` | Normal overage. Agent may keep going (overage billed) or suggest upgrade. |
| `upgrade_plan` | Very high overage (>2x quota). Strong nudge to upgrade the plan. |

### Response Headers (200 Soft Cap Overage)

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1747569660
X-Kapit-Monthly-Quota-Limit: 50000
X-Kapit-Monthly-Quota-Used: 65000
X-Kapit-Monthly-Quota-Remaining: 0
X-Kapit-Monthly-Quota-Exceeded: true
X-Kapit-Overage-Units: 15
X-Kapit-Overage-Cost-Cents: 2250
```

### Agent Guidance for Soft Cap

When `meta.warning` is present:
1. **Read `meta.warning.recommended_action`** for the suggested next step.
2. **Check overage cost** via `meta.warning.overage_cost_cents` to inform the user.
3. **Continue if acceptable** — overage billing applies automatically.
4. **Suggest upgrade** via `meta.warning.upgrade_url` if volume will stay high.
5. **Reduce pacing** if the agent can batch or cache requests.
6. **Enterprise sales** for sustained >1M requests/month.

## What Not to Do

- Do not loop/retry immediately on hard-cap 429.
- Do not create extra API keys to bypass quota; account-created keys share user quota.
- Do not treat upstream provider 429s as your quota. Upstream provider limits use `upstream_rate_limited` instead.
- Do not treat a soft-cap warning as a fatal error — requests are still allowed.
