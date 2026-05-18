# Permission Denied (403)

Your API key does not have permission for this resource.

## What Happened

Your API key is valid but your account tier does not include access to this endpoint or resource. This typically happens when a free-tier key tries to access a premium feature.

## Is It Retriable?

**No.** Do not retry without upgrading.

## Agent Recovery Steps

1. Check your current tier at https://kapit.dev.
2. Compare your tier's capabilities against the endpoint you're calling.
3. Upgrade your plan if needed.
4. If you believe this is an error, contact support with the `request_id`.

## Example Response

```json
{
  "error": {
    "code": "permission_denied",
    "message": "Your API key does not have permission for this resource.",
    "doc_url": "https://docs.kapit.io/errors/permission-denied.md",
    "is_retriable": false,
    "recovery": {
      "action": "upgrade_plan",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "Check that your API key tier supports this endpoint. Upgrade your plan at https://kapit.dev if needed."
    }
  }
}
```

## What Not to Do

- Do not retry with the same key.
- Do not try to bypass tier restrictions.
