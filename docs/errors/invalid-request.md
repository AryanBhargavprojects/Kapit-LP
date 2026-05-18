# Invalid Request (400)

The request is malformed or missing required parameters.

## What Happened

The server could not process the request because it is syntactically incorrect or violates the endpoint's parameter constraints.

## Is It Retriable?

**No.** Do not retry the same request. Fix the parameters first.

## Agent Recovery Steps

1. Check the `param` field in the error response — it tells you which parameter is invalid.
2. Read the `message` for the specific validation error.
3. Check the endpoint's OpenAPI schema for required fields, types, and constraints.
4. Fix the invalid parameter value and resend the request.

## Example Response

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid request: Field required",
    "doc_url": "https://docs.kapit.io/errors/invalid-request.md",
    "is_retriable": false,
    "param": "symbol",
    "recovery": {
      "action": "change_parameter",
      "backoff_strategy": "none",
      "max_retries": 0,
      "retry_after_seconds": null,
      "guidance": "Check the endpoint documentation for required parameters, valid values, and accepted formats. Fix the invalid parameter and retry."
    }
  }
}
```

## What Not to Do

- Do not retry without changing the request.
- Do not guess parameter values — check the schema.
