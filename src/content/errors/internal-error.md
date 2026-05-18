# Internal Error (500)

An unexpected internal error occurred on Kapit's side.

## What Happened

Something went wrong within Kapit that was not anticipated — an unhandled exception, a logic bug, or an infrastructure failure. Our team has been automatically notified.

## Is It Retriable?

**Yes.** Retry with exponential backoff (max 2 retries). However, the issue may be persistent.

## Agent Recovery Steps

1. Wait for `retry_after_seconds` (default: 30 seconds).
2. Retry the request once or twice.
3. If the error persists, **report the `request_id`** to support. The `request_id` is in:
   - The response body: `meta.request_id`
   - The response header: `X-Request-ID`
4. Include the `request_id` in any support communication.

## Example Response

```json
{
  "error": {
    "code": "internal_error",
    "message": "An unexpected internal error occurred. Our team has been notified.",
    "doc_url": "https://docs.kapit.io/errors/internal-error.md",
    "is_retriable": true,
    "retry_after_seconds": 30,
    "recovery": {
      "action": "report_request_id",
      "backoff_strategy": "exponential",
      "max_retries": 2,
      "retry_after_seconds": 30,
      "guidance": "Something went wrong on Kapit's side. Retry the request. If the error persists, report the request_id to support."
    }
  },
  "meta": {
    "request_id": "req_a1b2c3d4e5f6",
    "fetched_at": "2026-05-13T14:30:00Z"
  }
}
```

## What Not to Do

- Do not retry aggressively.
- Do not change your request — the issue is on Kapit's side.
