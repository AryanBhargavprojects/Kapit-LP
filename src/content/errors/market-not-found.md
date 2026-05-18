# Market Not Found (404)

The requested prediction market was not found on Polymarket.

## What Happened

Kapit queried Polymarket's Gamma API for the given `market_id` and received a 404. The market may not exist, may have been closed/resolved, or the ID format may be wrong.

## Is It Retriable?

**No.** Do not retry with the same `market_id`.

## Agent Recovery Steps

1. Verify the `market_id` — it can be a numeric Polymarket ID or a URL-friendly slug.
2. Check Polymarket directly to confirm the market exists and is active.
3. If using a slug, ensure it matches the Polymarket URL exactly (e.g. `will-bitcoin-exceed-100k-by-dec-31-2026`).

## Example Response

```json
{
  "error": {
    "code": "market_not_found",
    "message": "Market '999999' not found",
    "doc_url": "https://docs.kapit.io/errors/market-not-found.md",
    "is_retriable": false,
    "param": "market_id",
    "recovery": {
      "action": "change_parameter",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "Check the market_id — it may be a numeric ID or a URL slug. The market may be closed, resolved, or nonexistent."
    }
  }
}
```

## What Not to Do

- Do not retry with the same market_id.
- Do not assume the market exists just because it existed previously — prediction markets close.
