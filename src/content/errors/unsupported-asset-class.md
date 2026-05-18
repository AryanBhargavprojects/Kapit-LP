# Unsupported Asset Class (400)

The requested asset class is not supported by Kapit.

## What Happened

The request referenced an asset class that Kapit does not currently handle. Kapit supports three asset classes: `stock`, `crypto`, and `prediction_market`.

## Is It Retriable?

**No.** Do not retry — this endpoint does not exist for this asset class.

## Agent Recovery Steps

1. Verify the endpoint you are calling is one of:
   - `GET /v1/stocks/quotes/{symbol}` — for stocks
   - `GET /v1/crypto/prices/{symbol}` — for cryptocurrencies
   - `GET /v1/polymarket/markets/{market_id}` — for prediction markets
2. If you need an unsupported asset class (forex, commodities, etc.), contact support.

## Example Response

```json
{
  "error": {
    "code": "unsupported_asset_class",
    "message": "The requested asset class is not supported.",
    "doc_url": "https://docs.kapit.io/errors/unsupported-asset-class.md",
    "is_retriable": false,
    "recovery": {
      "action": "do_not_retry",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "Kapit currently supports stocks, crypto, and prediction markets. Check that you are using a supported endpoint."
    }
  }
}
```

## What Not to Do

- Do not retry.
- Do not try to use stock endpoints for crypto or vice versa.
