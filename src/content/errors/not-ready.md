# Not Ready (501)

The requested dashboard feature is not configured or not available yet on this Kapit deployment.

## What Happened

The endpoint exists, but the backend is missing required configuration or an integration is intentionally not live yet.

Common cases:

- Clerk dashboard authentication is not configured on this backend.
- Billing checkout has not been connected to a payment provider yet.

## Is It Retriable?

**No.** Do not retry automatically. Show a friendly setup, empty, or coming-soon state.

## Client Recovery Steps

1. If this is a frontend dashboard, show a friendly not-ready state.
2. If this is a deployment issue, set the missing environment variables.
3. If this is billing, hide/disable checkout until the payment provider is connected.

## Example Response

```json
{
  "error": {
    "code": "not_ready",
    "message": "Billing checkout is not configured yet.",
    "doc_url": "https://docs.kapit.io/errors/not-ready.md",
    "is_retriable": false,
    "recovery": {
      "action": "do_not_retry",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "The requested dashboard feature is not available on this Kapit deployment yet. Do not retry automatically; show a friendly setup or coming-soon state."
    }
  }
}
```
