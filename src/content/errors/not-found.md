# Not Found (404)

The requested resource was not found.

## What Happened

The server could not find the requested resource at the given path. This is a generic 404 — it could be a mistyped URL, an invalid endpoint path, or a resource that doesn't exist.

## Is It Retriable?

**No.** Do not retry with the same URL.

## Agent Recovery Steps

1. Check the URL path is correct.
2. Verify the resource identifier (symbol, market_id, etc.) is valid.
3. Consult the API documentation for valid endpoints and parameters.

## Example Response

```json
{
  "error": {
    "code": "not_found",
    "message": "The requested resource was not found.",
    "doc_url": "https://docs.kapit.io/errors/not-found.md",
    "is_retriable": false,
    "recovery": {
      "action": "change_parameter",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "Check the resource identifier and try again."
    }
  }
}
```

## What Not to Do

- Do not retry without changing the URL or identifier.
