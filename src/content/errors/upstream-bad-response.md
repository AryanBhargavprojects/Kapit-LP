# Upstream Bad Response (502)

An upstream data provider returned malformed or incomplete data.

## What Happened

The upstream provider returned a response that Kapit could not parse or validate. The data may be missing required fields, have out-of-range values, or have an unexpected structure.

## Is It Retriable?

**Yes.** One retry is recommended (max 1).

## Agent Recovery Steps

1. Wait for `retry_after_seconds` (default: 5 seconds).
2. Retry the request once.
3. If the error persists, the upstream provider's data format may have changed. Report the `request_id` to support.

## Example Response

```json
{
  "error": {
    "code": "upstream_bad_response",
    "message": "Malformed upstream response: 'price' is missing",
    "doc_url": "https://docs.kapit.io/errors/upstream-bad-response.md",
    "is_retriable": true,
    "retry_after_seconds": 5,
    "recovery": {
      "action": "retry",
      "backoff_strategy": "fixed",
      "max_retries": 1,
      "retry_after_seconds": 5,
      "guidance": "The upstream provider returned a response that Kapit could not parse. One retry is recommended."
    }
  }
}
```

## What Not to Do

- Do not retry more than once — this is likely a persistent data format issue.
