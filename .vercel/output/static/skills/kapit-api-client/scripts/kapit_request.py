#!/usr/bin/env python3
"""
Kapit API Request Helper — stdlib only.

Reads KAPIT_API_KEY from environment, calls a supported Kapit V1 endpoint,
prints the data and metadata, and handles errors with recovery guidance.

Usage:
  export KAPIT_API_KEY=kap_live_...
  python kapit_request.py stocks AAPL
  python kapit_request.py crypto bitcoin
  python kapit_request.py polymarket bitcoin-all-time-high-by-september-30-2026
  python kapit_request.py usage
"""

import json
import os
import sys
import urllib.error
import urllib.request

BASE_URL = "https://api.kapit.dev"

ENDPOINTS = {
    "stocks": "/v1/stocks/quotes/{arg}",
    "crypto": "/v1/crypto/prices/{arg}",
    "polymarket": "/v1/polymarket/markets/{arg}",
    "usage": "/v1/usage",
}


def get_api_key() -> str:
    key = os.environ.get("KAPIT_API_KEY")
    if not key:
        print("Error: KAPIT_API_KEY environment variable not set.")
        print("Sign up at https://kapit.dev/dashboard to get an API key.")
        print("Then: export KAPIT_API_KEY=kap_live_...")
        sys.exit(1)
    if not (key.startswith("kap_live_") or key.startswith("kap_test_")):
        print("Warning: API key does not look like a Kapit key (kap_live_... or kap_test_...).")
    return key


def build_url(endpoint: str, arg: str | None) -> str:
    path = ENDPOINTS[endpoint]
    if arg is not None:
        path = path.format(arg=arg)
    return f"{BASE_URL}{path}"


def make_request(url: str, api_key: str) -> dict:
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {api_key}"})
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            error_data = json.loads(body)
        except json.JSONDecodeError:
            error_data = {"error": {"code": "unknown", "message": body}}
        print(f"\nHTTP {e.code} — {error_data.get('error', {}).get('code', 'unknown')}")
        recovery = error_data.get("error", {}).get("recovery", {})
        if recovery:
            print(f"Recovery action: {recovery.get('action')}")
            print(f"Guidance: {recovery.get('guidance')}")
            retry = recovery.get("retry_after_seconds")
            if retry:
                print(f"Retry after: {retry} seconds")
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Network error: {e.reason}")
        print("Check your connection or Kapit status.")
        sys.exit(1)


def print_response(data: dict):
    print("\n=== Response ===")
    print(json.dumps(data, indent=2))

    # Print key fields
    meta = data.get("meta", {})
    rate = meta.get("rate_limit", {})
    source = meta.get("source", {})
    freshness = meta.get("freshness", {})
    warning = meta.get("warning")

    print(f"\n--- Summary ---")
    print(f"Request ID: {meta.get('request_id', 'N/A')}")
    print(f"Provider: {source.get('provider', 'N/A')}")
    if source.get("fallback_used"):
        print(f"⚠️  Fallback used: {source.get('fallback_provider')}")
    print(f"Freshness: as_of={freshness.get('as_of')}, stale={freshness.get('is_stale')}, delayed={freshness.get('is_delayed')}")
    print(f"Rate limit: {rate.get('remaining')}/{rate.get('limit')} remaining (tier: {rate.get('tier')})")
    if warning:
        print(f"⚠️  Warning: {warning}")

    # Print asset-specific data
    payload = data.get("data", {})
    if payload:
        print(f"\n--- Data ---")
        asset_type = payload.get("asset", {}).get("asset_class", "")
        if asset_type == "stock":
            print(f"Symbol: {payload.get('asset', {}).get('symbol')}")
            print(f"Price: ${payload.get('price')}")
            print(f"Change: {payload.get('change')} ({payload.get('change_percent')}%)")
            print(f"Volume: {payload.get('volume')}")
        elif asset_type == "crypto":
            print(f"Coin: {payload.get('asset', {}).get('name')} ({payload.get('asset', {}).get('symbol')})")
            print(f"Price: ${payload.get('price')}")
            print(f"24h Change: {payload.get('price_change_percentage_24h')}%")
            print(f"Market Cap: ${payload.get('market_cap')}")
            print(f"Rank: #{payload.get('market_cap_rank')}")
        elif asset_type == "prediction_market":
            print(f"Market: {payload.get('asset', {}).get('name')}")
            print(f"Status: {payload.get('status')}")
            print(f"Volume: ${payload.get('volume')}")
            outcomes = payload.get("outcomes", [])
            for o in outcomes:
                print(f"  {o.get('label')}: {o.get('implied_probability', 0) * 100:.1f}%")
        elif "tier" in payload:
            print(f"Tier: {payload.get('tier')}")
            print(f"Requests today: {payload.get('requests_today')}/{payload.get('requests_limit')}")
            print(f"Reset at: {payload.get('reset_at')}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python kapit_request.py <endpoint> [arg]")
        print(f"Endpoints: {', '.join(sorted(ENDPOINTS.keys()))}")
        print(f"Examples:")
        print(f"  python kapit_request.py stocks AAPL")
        print(f"  python kapit_request.py crypto bitcoin")
        print(f"  python kapit_request.py polymarket bitcoin-all-time-high-by-september-30-2026")
        print(f"  python kapit_request.py usage")
        sys.exit(1)

    endpoint = sys.argv[1].lower()
    if endpoint not in ENDPOINTS:
        print(f"Unknown endpoint '{endpoint}'. Supported: {', '.join(sorted(ENDPOINTS.keys()))}")
        sys.exit(1)

    arg = sys.argv[2] if len(sys.argv) > 2 else None
    if endpoint != "usage" and not arg:
        print(f"Endpoint '{endpoint}' requires an argument.")
        sys.exit(1)

    api_key = get_api_key()
    url = build_url(endpoint, arg)
    print(f"Request: GET {url}")

    response = make_request(url, api_key)
    print_response(response)


if __name__ == "__main__":
    main()
