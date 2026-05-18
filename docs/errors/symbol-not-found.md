# Symbol Not Found (404)

The requested symbol was not found by any upstream provider.

## What Happened

Kapit queried all configured providers for this asset class and none could find the requested symbol. This may mean the symbol is invalid, delisted, or not covered by our upstream data sources.

## Is It Retriable?

**No.** Do not retry with the same symbol. The symbol must be corrected.

## Agent Recovery Steps

1. Verify the ticker symbol spelling and format.
2. **For stocks**: Use the standard exchange ticker (e.g. `AAPL`, `TSLA`, `MSFT`). Some OTC or international stocks may not be available.
3. **For crypto**: You MUST use a CoinGecko coin ID, NOT a ticker symbol:
   - ✅ `bitcoin` — NOT `BTC`
   - ✅ `ethereum` — NOT `ETH`
   - ✅ `solana` — NOT `SOL`
   - Check https://www.coingecko.com for the correct ID.
4. Check the `context.attempted_providers` to see which upstream sources were tried.

## Example Response

```json
{
  "error": {
    "code": "symbol_not_found",
    "message": "Symbol 'NONEXISTENT' not found",
    "doc_url": "https://docs.kapit.io/errors/symbol-not-found.md",
    "is_retriable": false,
    "param": "symbol",
    "recovery": {
      "action": "change_parameter",
      "backoff_strategy": "none",
      "max_retries": 0,
      "guidance": "For crypto, use CoinGecko coin IDs (bitcoin, ethereum) not tickers (BTC, ETH). Verify the symbol is correct and try again."
    },
    "context": {
      "param": "symbol",
      "provider": "fmp",
      "primary_provider": "fmp",
      "fallback_provider": "twelve_data",
      "attempted_providers": [
        {"provider": "fmp", "status_code": 404, "is_retriable": false},
        {"provider": "twelve_data", "status_code": 404, "is_retriable": false}
      ]
    }
  }
}
```

## What Not to Do

- Do not retry with the same symbol.
- Do not use crypto tickers (BTC) — use CoinGecko IDs (bitcoin).
