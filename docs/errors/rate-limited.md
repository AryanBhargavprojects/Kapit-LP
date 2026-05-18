# Rate Limited (429)

You've exceeded your rate limit for the current window.

## What Happened

Your API key has made more requests than your tier allows in the current time window.

## How to Fix

1. **Wait and retry**: Use the `retry_after_seconds` value in the error response to know exactly how long to wait.
2. **Check remaining quota**: Call `GET /v1/usage` to see your current usage.
3. **Upgrade your plan**: Visit https://kapit.dev to upgrade from Free to Starter or Pro.
4. **Add client-side caching**: Store responses and re-use them within the `cache_ttl_seconds` window.

## Example

```python
import asyncio

async def fetch_with_backoff(client, url, headers):
    response = await client.get(url, headers=headers)
    if response.status_code == 429:
        retry_after = response.json()["error"]["retry_after_seconds"]
        await asyncio.sleep(retry_after)
        return await fetch_with_backoff(client, url, headers)
    return response
```
