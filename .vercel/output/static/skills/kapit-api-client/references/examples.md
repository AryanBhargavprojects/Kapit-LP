# Worked Examples for AI Agents

## Example 1: First-Time Agent — No API Key

**Scenario:** User asks "What's the AAPL stock price?" Agent has no API key.

**Agent actions:**
1. Attempt discovery: `curl https://api.kapit.dev/llms.txt` (no auth needed)
2. Tell user: "I can fetch that via the Kapit API, but I need an API key."
3. Instruct user:
   - Sign up at https://kapit.dev/dashboard
   - Create an API key (kap_live_... or kap_test_...)
   - Set `export KAPIT_API_KEY=kap_live_...`
4. Wait for user to confirm key is set before making requests.

---

## Example 2: Fetch Stock Quote

**Scenario:** User has API key, asks "Get me Apple's current stock price."

**Agent actions:**
1. Call `GET /v1/stocks/quotes/AAPL` with `Authorization: Bearer $KAPIT_API_KEY`
2. Parse response:
   - `data.price` → current price
   - `data.change_percent` → daily change
   - `meta.source.provider` → which provider served data
   - `meta.rate_limit.remaining` → remaining quota

**Response to user:**
```
AAPL is at $213.49 (+0.58% today). Source: FMP.
```

---

## Example 3: Handle Rate Limit on Free Tier

**Scenario:** Agent on free tier has made 500 requests today. User asks for another stock quote.

**Agent actions:**
1. Call `GET /v1/stocks/quotes/MSFT`
2. Receive 429 with:
   ```json
   { "error": { "code": "rate_limited", "recovery": { "action": "wait_and_retry", "retry_after_seconds": 43200 } } }
   ```
3. Check `error.is_retriable` = true, `recovery.action` = `wait_and_retry`
4. Calculate: 43200 seconds = 12 hours until reset
5. Tell user: "Free tier daily quota (500 req) exhausted. Resets in ~12 hours. Upgrade to Starter ($19/mo, 50K/mo) for more: https://kapit.dev/dashboard"

**Do NOT** retry immediately — wait for the reset window.

---

## Example 4: Auto-Correct Crypto Symbol

**Scenario:** User asks "What's the price of BTC?"

**Agent actions:**
1. Call `GET /v1/crypto/prices/BTC` (user's literal input)
2. Receive 404 with `code: "symbol_not_found"`
3. Agent knows: crypto endpoints use CoinGecko coin IDs, not tickers
4. Auto-correct: `BTC` → `bitcoin`
5. Call `GET /v1/crypto/prices/bitcoin`
6. Receive 200 with price data

**Response to user:**
```
Bitcoin (BTC) is at $67,234.12 (+1.87% in 24h). Market cap: $1.32T.
```

**Common mappings:**
| Ticker | CoinGecko ID |
|--------|-------------|
| BTC | bitcoin |
| ETH | ethereum |
| SOL | solana |
| ADA | cardano |
| DOGE | dogecoin |
| XRP | ripple |
| DOT | polkadot |

---

## Example 5: Polymarket Market

**Scenario:** User asks "What are the odds Bitcoin hits an all-time high by September 2026?"

**Agent actions:**
1. Call `GET /v1/polymarket/markets/bitcoin-all-time-high-by-september-30-2026`
2. Parse `data.outcomes` for probabilities:
   - "Yes": 62% implied probability
   - "No": 38%
3. Check `data.status` — "active" (not resolved)
4. Note `data.volume` ($1.25M) for context

**Response to user:**
```
Polymarket odds: 62% Yes / 38% No. Volume: $1.25M. Market is active.
```

---

## Example 6: Batch Requests with Rate Limit Awareness

**Scenario:** User asks "Get me stock prices for AAPL, MSFT, GOOGL, TSLA, AMZN."

**Agent actions:**
1. Check current remaining: call `GET /v1/usage` or read last `meta.rate_limit.remaining`
2. If remaining < 5 on free tier (10 RPM): space requests 6+ seconds apart
3. Make all 5 calls sequentially
4. After each call, check `meta.rate_limit.remaining`
5. If a 429 hits mid-batch, wait `retry_after_seconds` before continuing

**Response to user:**
```
AAPL: $213.49 (+0.58%)
MSFT: $427.31 (-0.23%)
GOOGL: $178.45 (+1.12%)
TSLA: $248.67 (-1.89%)
AMZN: $195.32 (+0.41%)
Rate limit: 493 remaining today.
```

---

## Example 7: Handling Soft Overage (Paid Tier)

**Scenario:** Builder tier user ($49/mo, 200K/mo) has used 200,500 requests this month.

**Agent actions:**
1. Call `GET /v1/stocks/quotes/AAPL`
2. Receive 200 with:
   ```json
   { "meta": { "warning": "Monthly request quota reached (200,000). Overage billing applies ($1.20/1K)." } } }
   ```
3. Data is valid — agent should use it
4. Tell user: "Monthly quota exceeded. Overage at $1.20/1K applies. Consider upgrading to Scale (1M/mo, $149/mo)."

---

## Example 8: Upstream Failure Recovery

**Scenario:** FMP (stock provider) returns 503. Twelve Data (fallback) succeeds.

**Agent actions:**
1. Call `GET /v1/stocks/quotes/TSLA`
2. Receive 200 — Kapit automatically fell back to Twelve Data
3. Check `meta.source.fallback_used` = true
4. Check `meta.source.provider` = "twelve_data"

**Response to user:**
```
TSLA: $248.67. Note: primary provider FMP was unavailable; data served from Twelve Data fallback.
```
