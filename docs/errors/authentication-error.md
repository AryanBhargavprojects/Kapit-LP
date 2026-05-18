# Authentication Error (401)

Your API key is missing, invalid, or expired.

## What Happened

The request did not include a valid `Authorization: Bearer` header, or the API key format is wrong. Kapit uses Bearer token authentication exclusively — no OAuth, no API-key header, no query-param auth.

## Is It Retriable?

**No.** Do not retry without fixing authentication.

## Agent Recovery Steps

1. Ensure every request includes the header: `Authorization: Bearer kap_live_xxx`
2. Check the key format — production keys start with `kap_live_`, test keys with `kap_test_`.
3. If your key is missing or lost, generate a new one at https://kapit.dev.
4. Do not attempt other auth schemes — only Bearer tokens are accepted.

## Example Response

```json
{
  "error": {
    "code": "authentication_error",
    "message": "Missing or invalid Authorization header. Expected: Bearer kap_live_xxx",
    "doc_url": "https://docs.kapit.io/errors/authentication-error.md",
    "is_retriable": false,
    "recovery": {
      "action": "authenticate",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "Include an 'Authorization: Bearer kap_live_xxx' header in every request. Do not use other auth schemes (no OAuth, no API-key header, no query param)."
    }
  }
}
```

## What Not to Do

- Do not retry without adding valid auth.
- Do not try to use query parameters for the API key.
- Do not use `X-API-Key` headers.
