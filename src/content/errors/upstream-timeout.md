# Upstream Timeout (504)

An upstream data provider timed out.

## What Happened

Kapit sent a request to an upstream data provider but the provider did not respond within the timeout window (10 seconds). This is usually a transient network issue or temporary provider slowness.

## Is It Retriable?

**Yes.** Retry with exponential backoff (max 2 retries).

## Agent Recovery Steps

1. Wait for `retry_after_seconds` (default: 5 seconds).
2. Retry the request with exponential backoff.
3. If the error persists, the upstream provider may be experiencing degraded performance.

## Example Response

```json
{
  "error": {
    "code": "upstream_timeout",
    "message": "Upstream timeout after 10.0s",
    "doc_url": "https://docs.kapit.io/errors/upstream-timeout.md",
    "is_retriable": true,
    "retry_after_seconds": 5,
    "recovery": {
      "action": "wait_and_retry",
      "backoff_strategy": "exponential",
      "max_retries": 2,
      "retry_after_seconds": 5,
      "guidance": "The upstream provider did not respond in time. This is usually transient. Retry with exponential backoff."
    }
  }
}
```

## What Not to Do

- Do not retry immediately — respect the backoff strategy.
