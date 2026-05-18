# Upstream Rate Limited (502)

Kapit's upstream data provider rate-limited the request.

## What Happened

Kapit itself is not rate-limited — the upstream data provider (FMP, Twelve Data, CoinGecko, or Polymarket) returned a 429 Too Many Requests. This happens when Kapit's aggregate usage hits the provider's limits.

## Is It Retriable?

**Yes.** Wait for `retry_after_seconds` and retry (max 2 retries).

## Agent Recovery Steps

1. Wait for the `retry_after_seconds` value in the error response.
2. Retry the request.
3. This is transient — upstream rate limits typically reset within 60 seconds.
4. Note: this is different from Kapit's own rate limit (code: `rate_limited`, status: 429). This error comes back as a 502 because Kapit cannot fulfill the request.

## Example Response

```json
{
  "error": {
    "code": "upstream_rate_limited",
    "message": "Upstream HTTP 429: Too Many Requests",
    "doc_url": "https://docs.kapit.io/errors/upstream-rate-limited.md",
    "is_retriable": true,
    "retry_after_seconds": 30,
    "recovery": {
      "action": "wait_and_retry",
      "backoff_strategy": "fixed",
      "max_retries": 2,
      "retry_after_seconds": 30,
      "guidance": "Kapit's upstream provider is rate-limited. This is NOT your Kapit rate limit. Wait and retry."
    }
  }
}
```

## What Not to Do

- Do not confuse this with your Kapit rate limit (code: `rate_limited`). This is an upstream issue.
