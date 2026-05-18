# Upstream Error (502)

An upstream data provider returned an unexpected error.

## What Happened

Kapit successfully routed the request to an upstream data provider, but the provider returned a 5xx server error. This is the provider's problem, not yours.

## Is It Retriable?

**Yes.** Retry with exponential backoff (max 3 retries).

## Agent Recovery Steps

1. Wait for `retry_after_seconds` (default: 5 seconds).
2. Retry the request. Use exponential backoff.
3. If the error persists beyond 3 retries, the upstream provider may be experiencing an extended outage.
4. Check `context.attempted_providers` to see which providers failed.

## Example Response

```json
{
  "error": {
    "code": "upstream_error",
    "message": "Upstream HTTP 503: Service Unavailable",
    "doc_url": "https://docs.kapit.io/errors/upstream-error.md",
    "is_retriable": true,
    "retry_after_seconds": 30,
    "recovery": {
      "action": "wait_and_retry",
      "backoff_strategy": "exponential",
      "max_retries": 3,
      "retry_after_seconds": 5,
      "guidance": "The upstream provider is experiencing issues. Retry with exponential backoff."
    }
  }
}
```

## What Not to Do

- Do not retry aggressively — respect the backoff strategy.
- Do not try alternate symbols — the issue is with the provider, not your request.
