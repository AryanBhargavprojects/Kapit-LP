# Endpoint Reference

## Base URL
```
https://api.kapit.dev
```

## GET /v1/stocks/quotes/{symbol}

Real-time stock quote with price, change, volume, market cap, day high/low.

- **Primary provider:** FMP
- **Fallback:** Twelve Data (automatic on FMP failure)
- **Path param:** `symbol` — ticker, e.g. `AAPL`, `MSFT`, `TSLA`
- **Response:** `KapitResponse[StockQuote]`

### Example request
```bash
curl https://api.kapit.dev/v1/stocks/quotes/AAPL \
  -H "Authorization: Bearer $KAPIT_API_KEY"
```

### Example response (200)
```json
{
  "data": {
    "asset": {
      "symbol": "AAPL",
      "asset_class": "stock",
      "name": "Apple Inc.",
      "exchange": "NASDAQ",
      "currency": "USD",
      "provider_id": "AAPL"
    },
    "price": 213.49,
    "change": 1.23,
    "change_percent": 0.58,
    "day_high": 215.00,
    "day_low": 212.00,
    "previous_close": 212.26,
    "volume": 45678900,
    "market_cap": 3300000000000,
    "timestamp": "2026-05-18T14:30:00Z"
  },
  "meta": {
    "source": { "provider": "fmp", "primary_provider": "fmp", "fallback_provider": null, "fallback_used": false },
    "freshness": { "as_of": "2026-05-18T14:30:00Z", "is_stale": false, "is_delayed": false, "cache_ttl_seconds": 60 },
    "rate_limit": { "limit": 500, "remaining": 498, "reset_at": "2026-05-19T00:00:00Z", "tier": "free" }
  }
}
```

### Possible errors
- 404 `symbol_not_found` — ticker does not exist
- 429 `rate_limited` — quota exhausted
- 502 `upstream_error` / `upstream_rate_limited` / `upstream_timeout` — upstream provider failure

---

## GET /v1/crypto/prices/{symbol}

Real-time crypto price with 24h change, market cap, supply data.

- **Provider:** CoinGecko (`/coins/markets`)
- **Path param:** `symbol` — **CoinGecko coin ID**, e.g. `bitcoin` (not `BTC`), `ethereum`, `solana`
- **Response:** `KapitResponse[CryptoPrice]`

### Example request
```bash
curl https://api.kapit.dev/v1/crypto/prices/bitcoin \
  -H "Authorization: Bearer $KAPIT_API_KEY"
```

### Example response (200)
```json
{
  "data": {
    "asset": {
      "symbol": "BTC",
      "asset_class": "crypto",
      "name": "Bitcoin",
      "exchange": "coingecko",
      "currency": "USD",
      "provider_id": "bitcoin"
    },
    "price": 67234.12,
    "price_change_24h": 1234.56,
    "price_change_percentage_24h": 1.87,
    "high_24h": 68000.00,
    "low_24h": 65800.00,
    "market_cap": 1320000000000,
    "market_cap_rank": 1,
    "total_volume": 28000000000,
    "circulating_supply": 19500000,
    "total_supply": 19500000,
    "max_supply": 21000000,
    "fully_diluted_valuation": 1410000000000,
    "last_updated": "2026-05-18T14:30:00Z"
  },
  "meta": {
    "source": { "provider": "coingecko", "primary_provider": "coingecko", "fallback_provider": null, "fallback_used": false },
    "freshness": { "as_of": "2026-05-18T14:30:00Z", "is_stale": false, "is_delayed": false, "cache_ttl_seconds": 30 },
    "rate_limit": { "limit": 500, "remaining": 497, "reset_at": "2026-05-19T00:00:00Z", "tier": "free" }
  }
}
```

### Important footguns
- The path param is a **CoinGecko coin ID**, not a ticker. `bitcoin` works; `BTC` returns `symbol_not_found`.
- Crypto prices change rapidly — do not cache longer than `cache_ttl_seconds` (typically 30s).
- `data.asset.symbol` returns the ticker-like symbol (e.g. `BTC`); `data.asset.provider_id` returns the CoinGecko ID (e.g. `bitcoin`).

---

## GET /v1/polymarket/markets/{market_id}

Single prediction market with outcomes, implied probabilities, volume, liquidity, order book, resolution status.

- **Provider:** Polymarket Gamma API
- **Path param:** `market_id` — numeric ID or slug
- **Response:** `KapitResponse[PolymarketMarket]`

### Example request
```bash
curl https://api.kapit.dev/v1/polymarket/markets/bitcoin-all-time-high-by-september-30-2026 \
  -H "Authorization: Bearer $KAPIT_API_KEY"
```

### Example response (200)
```json
{
  "data": {
    "asset": {
      "symbol": "bitcoin-ath-sep-2026",
      "asset_class": "prediction_market",
      "name": "Bitcoin all-time high by September 30, 2026?",
      "exchange": "polymarket",
      "currency": "USDC",
      "provider_id": "bitcoin-all-time-high-by-september-30-2026"
    },
    "status": "active",
    "volume": 1250000.50,
    "liquidity": 450000.00,
    "outcomes": [
      { "label": "Yes", "price": 0.62, "implied_probability": 0.62 },
      { "label": "No", "price": 0.38, "implied_probability": 0.38 }
    ],
    "resolution": null,
    "order_book": { "bids": [], "asks": [] }
  },
  "meta": {
    "source": { "provider": "polymarket", "primary_provider": "polymarket", "fallback_provider": null, "fallback_used": false },
    "freshness": { "as_of": "2026-05-18T14:30:00Z", "is_stale": false, "is_delayed": false, "cache_ttl_seconds": 120 },
    "rate_limit": { "limit": 500, "remaining": 496, "reset_at": "2026-05-19T00:00:00Z", "tier": "free" }
  }
}
```

### Important footguns
- Prediction market prices reflect probability, not certainty.
- Market status can be `active`, `closed`, or `resolved` — check before interpreting outcomes.

---

## GET /v1/usage

Current quota and rate limit status for the authenticated API key.

### Example request
```bash
curl https://api.kapit.dev/v1/usage \
  -H "Authorization: Bearer $KAPIT_API_KEY"
```

### Example response (200)
```json
{
  "data": {
    "tier": "free",
    "requests_today": 42,
    "requests_limit": 500,
    "requests_remaining": 458,
    "rate_limit": { "limit": 10, "remaining": 9, "reset_at": "2026-05-18T14:31:00Z", "tier": "free" },
    "reset_at": "2026-05-19T00:00:00Z"
  },
  "meta": {
    "rate_limit": { "limit": 10, "remaining": 9, "reset_at": "2026-05-18T14:31:00Z", "tier": "free" }
  }
}
```
