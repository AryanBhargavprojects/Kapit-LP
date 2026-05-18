# Error Recovery Reference

## Error Envelope

Every error returns `KapitErrorResponse` with structured recovery instructions:

```json
{
  "error": {
    "code": "...",
    "message": "...",
    "doc_url": "https://docs.kapit.io/errors/...",
    "is_retriable": true,
    "retry_after_seconds": 60,
    "param": null,
    "recovery": {
      "action": "wait_and_retry",
      "backoff_strategy": "fixed",
      "max_retries": 3,
      "retry_after_seconds": 60,
      "guidance": "..."
    },
    "context": {
      "method": "GET",
      "path": "/v1/...",
      "status_code": 429,
      "attempted_providers": [...],
      "rate_limit": {...}
    }
  }
}
```

## Error Catalog

| Code | HTTP | Retriable | Recovery Action | Backoff | Agent Guidance |
|------|------|-----------|-----------------|---------|----------------|
| `invalid_request` | 400 | No | `change_parameter` | none | Fix the invalid parameter and retry |
| `authentication_error` | 401 | No | `authenticate` | none | Tell user to set KAPIT_API_KEY |
| `permission_denied` | 403 | No | `upgrade_plan` | none | Tell user to upgrade at dashboard |
| `rate_limited` | 429 | Yes | `wait_and_retry` | fixed | Wait for window reset; suggest upgrade |
| `symbol_not_found` | 404 | No | `change_parameter` | none | Verify symbol; crypto uses CoinGecko IDs |
| `market_not_found` | 404 | No | `change_parameter` | none | Verify market_id slug or numeric ID |
| `not_found` | 404 | No | `change_parameter` | none | Check resource identifier |
| `upstream_error` | 502 | Yes | `wait_and_retry` | exponential | Upstream provider 5xx; retry with backoff |
| `upstream_rate_limited` | 502 | Yes | `wait_and_retry` | fixed | Upstream provider 429; wait and retry |
| `upstream_timeout` | 504 | Yes | `wait_and_retry` | exponential | Upstream timed out; retry with backoff |
| `upstream_bad_response` | 502 | Yes | `retry` | fixed | Upstream data malformed; retry once |
| `internal_error` | 500 | Yes | `report_request_id` | exponential | Kapit error; retry then report request_id |
| `unsupported_asset_class` | 400 | No | `do_not_retry` | none | Use only stocks/crypto/polymarket endpoints |

## Agent Recovery Patterns

### Pattern 1: Rate Limited (429)
```
1. Read error.recovery.retry_after_seconds
2. If free tier: tell user quota exhausted, suggest upgrade
3. If paid tier: wait retry_after_seconds, retry
4. Notify user of the delay
```

### Pattern 2: Authentication Error (401)
```
1. Tell user: "Your API key appears invalid or missing."
2. Direct user to https://kapit.dev/dashboard to create/verify key
3. Ask user to set KAPIT_API_KEY=kap_live_... or kap_test_...
4. Do NOT retry until key is confirmed
```

### Pattern 3: Upstream Failure (502/504)
```
1. Check error.recovery.backoff_strategy
2. If "exponential": retry with increasing delays (1s, 2s, 4s, 8s...)
3. If "fixed": retry after recovery.retry_after_seconds
4. Notify user: "Kapit's upstream provider is having issues. Retrying..."
5. After max_retries, report request_id and stop
```

### Pattern 4: Symbol Not Found (404)
```
1. Check if the user provided a crypto ticker instead of CoinGecko ID
2. Auto-correct common mistakes: "BTC" → "bitcoin", "ETH" → "ethereum"
3. If unsure, ask user to verify the symbol
4. Common CoinGecko IDs: bitcoin, ethereum, solana, cardano, dogecoin, ripple
```

### Pattern 5: Soft Overage Warning (200 with meta.warning)
```
1. Read meta.warning message
2. Tell user: "Monthly quota reached. Overage billing at $X/1K applies."
3. Suggest upgrade at https://kapit.dev/dashboard
4. Continue the request (the data is still valid)
```

## Key Decision Rules

- **Match on `error.code`** — never parse `error.message` (it may change).
- **Check `error.is_retriable`** before retrying.
- **Follow `error.recovery.action`** — it is the recommended action.
- **Non-retriable errors (400, 401, 403, 404)** — fix and retry with corrected parameters, do not loop.
- **Retriable errors (429, 500, 502, 504)** — use the backoff strategy from `error.recovery`.
- **`error.doc_url`** links to a human-readable error page for the specific code.
