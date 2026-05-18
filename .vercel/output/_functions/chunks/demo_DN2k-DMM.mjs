const prerender = false;
const DEMO_KEY = "";
const ALLOWED_ENDPOINTS = {
  stocks: "/v1/stocks/quotes",
  crypto: "/v1/crypto/prices",
  polymarket: "/v1/polymarket/markets"
};
function sanitizeSymbol(symbol) {
  return symbol.replace(/[^a-zA-Z0-9\-._]/g, "").slice(0, 100);
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { endpoint, symbol } = body;
    if (!ALLOWED_ENDPOINTS[endpoint]) {
      return new Response(
        JSON.stringify({
          error: {
            code: "invalid_endpoint",
            message: "Invalid endpoint selected."
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const cleanSymbol = sanitizeSymbol(String(symbol || ""));
    if (!cleanSymbol) {
      return new Response(
        JSON.stringify({
          error: {
            code: "missing_symbol",
            message: "Symbol is required."
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!DEMO_KEY) {
      return getMockResponse(endpoint, cleanSymbol);
    }
    const url = `https://api.kapit.dev${ALLOWED_ENDPOINTS[endpoint]}/${encodeURIComponent(cleanSymbol)}`;
    const upstream = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DEMO_KEY}`,
        "Content-Type": "application/json"
      }
    });
    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: {
          code: "demo_error",
          message: "Demo request failed. Please try again.",
          is_retriable: true
        }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
function getMockResponse(endpoint, symbol) {
  const requestId = `req_demo_${Math.random().toString(36).slice(2, 10)}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const mocks = {
    stocks: {
      data: {
        symbol: symbol.toUpperCase(),
        name: symbol.toUpperCase() === "AAPL" ? "Apple Inc." : `${symbol.toUpperCase()} Corp.`,
        price: 213.49,
        change: 1.84,
        change_percent: 0.87,
        volume: 42819300,
        market_cap: 3241e9,
        pe_ratio: 34.2,
        fifty_two_week_high: 237.23,
        fifty_two_week_low: 164.08
      },
      meta: {
        request_id: requestId,
        source: { provider: "fmp", primary_provider: "fmp", fallback_used: false },
        freshness: { as_of: now, cache_ttl_seconds: 60 },
        usage: { cache: false },
        rate_limit: {
          limit: 10,
          remaining: 9,
          reset_at: new Date(Date.now() + 864e5).toISOString()
        }
      }
    },
    crypto: {
      data: {
        id: symbol,
        symbol: symbol === "bitcoin" ? "btc" : symbol.slice(0, 4),
        name: symbol === "bitcoin" ? "Bitcoin" : symbol,
        current_price: symbol === "bitcoin" ? 103450 : 2841.33,
        market_cap: symbol === "bitcoin" ? 205e10 : 342e9,
        price_change_percentage_24h: 2.34,
        total_volume: symbol === "bitcoin" ? 382e8 : 142e8
      },
      meta: {
        request_id: requestId,
        source: { provider: "coingecko", primary_provider: "coingecko", fallback_used: false },
        freshness: { as_of: now, cache_ttl_seconds: 120 },
        usage: { cache: false },
        rate_limit: {
          limit: 10,
          remaining: 8,
          reset_at: new Date(Date.now() + 864e5).toISOString()
        }
      }
    },
    polymarket: {
      data: {
        id: symbol,
        question: "Will Bitcoin reach an all-time high by September 30, 2026?",
        outcomes: [
          { name: "Yes", probability: 0.67, price: 0.67 },
          { name: "No", probability: 0.33, price: 0.33 }
        ],
        volume: 482e4,
        liquidity: 89e4,
        end_date: "2026-09-30",
        resolution_status: "open"
      },
      meta: {
        request_id: requestId,
        source: { provider: "polymarket", primary_provider: "polymarket", fallback_used: false },
        freshness: { as_of: now, cache_ttl_seconds: 30 },
        usage: { cache: false },
        rate_limit: {
          limit: 10,
          remaining: 7,
          reset_at: new Date(Date.now() + 864e5).toISOString()
        }
      }
    }
  };
  return new Response(JSON.stringify(mocks[endpoint] || mocks.stocks), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
