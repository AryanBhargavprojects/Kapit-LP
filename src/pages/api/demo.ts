import type { APIRoute } from 'astro';

export const prerender = false;

const DEMO_KEY = import.meta.env.KAPIT_DEMO_KEY || '';

const ALLOWED_ENDPOINTS: Record<string, string> = {
  stocks: '/v1/stocks/quotes',
  crypto: '/v1/crypto/prices',
  polymarket: '/v1/polymarket/markets',
};

function sanitizeSymbol(symbol: string): string {
  return symbol.replace(/[^a-zA-Z0-9\-._]/g, '').slice(0, 100);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { endpoint, symbol } = body;

    if (!ALLOWED_ENDPOINTS[endpoint]) {
      return new Response(
        JSON.stringify({
          error: {
            code: 'invalid_endpoint',
            message: 'Invalid endpoint selected.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const cleanSymbol = sanitizeSymbol(String(symbol || ''));
    if (!cleanSymbol) {
      return new Response(
        JSON.stringify({
          error: {
            code: 'missing_symbol',
            message: 'Symbol is required.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (!DEMO_KEY) {
      return getMockResponse(endpoint, cleanSymbol);
    }

    const url = `https://api.kapit.dev${ALLOWED_ENDPOINTS[endpoint]}/${encodeURIComponent(cleanSymbol)}`;

    const upstream = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DEMO_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await upstream.json();

    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: {
          code: 'demo_error',
          message: 'Demo request failed. Please try again.',
          is_retriable: true,
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

function getMockResponse(endpoint: string, symbol: string): Response {
  const requestId = `req_demo_${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();

  const mocks: Record<string, unknown> = {
    stocks: {
      data: {
        symbol: symbol.toUpperCase(),
        name: symbol.toUpperCase() === 'AAPL' ? 'Apple Inc.' : `${symbol.toUpperCase()} Corp.`,
        price: 213.49,
        change: 1.84,
        change_percent: 0.87,
        volume: 42819300,
        market_cap: 3241000000000,
        pe_ratio: 34.2,
        fifty_two_week_high: 237.23,
        fifty_two_week_low: 164.08,
      },
      meta: {
        request_id: requestId,
        source: { provider: 'fmp', primary_provider: 'fmp', fallback_used: false },
        freshness: { as_of: now, cache_ttl_seconds: 60 },
        usage: { cache: false },
        rate_limit: {
          limit: 10,
          remaining: 9,
          reset_at: new Date(Date.now() + 86400000).toISOString(),
        },
      },
    },
    crypto: {
      data: {
        id: symbol,
        symbol: symbol === 'bitcoin' ? 'btc' : symbol.slice(0, 4),
        name: symbol === 'bitcoin' ? 'Bitcoin' : symbol,
        current_price: symbol === 'bitcoin' ? 103450.0 : 2841.33,
        market_cap: symbol === 'bitcoin' ? 2050000000000 : 342000000000,
        price_change_percentage_24h: 2.34,
        total_volume: symbol === 'bitcoin' ? 38200000000 : 14200000000,
      },
      meta: {
        request_id: requestId,
        source: { provider: 'coingecko', primary_provider: 'coingecko', fallback_used: false },
        freshness: { as_of: now, cache_ttl_seconds: 120 },
        usage: { cache: false },
        rate_limit: {
          limit: 10,
          remaining: 8,
          reset_at: new Date(Date.now() + 86400000).toISOString(),
        },
      },
    },
    polymarket: {
      data: {
        id: symbol,
        question: 'Will Bitcoin reach an all-time high by September 30, 2026?',
        outcomes: [
          { name: 'Yes', probability: 0.67, price: 0.67 },
          { name: 'No', probability: 0.33, price: 0.33 },
        ],
        volume: 4820000,
        liquidity: 890000,
        end_date: '2026-09-30',
        resolution_status: 'open',
      },
      meta: {
        request_id: requestId,
        source: { provider: 'polymarket', primary_provider: 'polymarket', fallback_used: false },
        freshness: { as_of: now, cache_ttl_seconds: 30 },
        usage: { cache: false },
        rate_limit: {
          limit: 10,
          remaining: 7,
          reset_at: new Date(Date.now() + 86400000).toISOString(),
        },
      },
    },
  };

  return new Response(JSON.stringify(mocks[endpoint] || mocks.stocks), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
