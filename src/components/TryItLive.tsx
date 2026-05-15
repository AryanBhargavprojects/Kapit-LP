import { useState, useCallback, type JSX } from 'react';

type Endpoint = 'stocks' | 'crypto' | 'polymarket';

interface EndpointConfig {
  label: string;
  path: string;
  placeholder: string;
  inputLabel: string;
  helper?: string;
}

const ENDPOINTS: Record<Endpoint, EndpointConfig> = {
  stocks: {
    label: 'Stock quote',
    path: '/v1/stocks/quotes',
    placeholder: 'AAPL',
    inputLabel: 'Symbol',
  },
  crypto: {
    label: 'Crypto price',
    path: '/v1/crypto/prices',
    placeholder: 'bitcoin',
    inputLabel: 'Coin ID (CoinGecko)',
    helper: 'Use the CoinGecko ID, e.g. bitcoin not BTC',
  },
  polymarket: {
    label: 'Prediction market',
    path: '/v1/polymarket/markets',
    placeholder: 'bitcoin-all-time-high-by-september-30-2026',
    inputLabel: 'Market ID or slug',
  },
};

function JsonHighlight({ data }: { data: unknown }) {
  const indent = (depth: number) => '  '.repeat(depth);

  const renderValue = (value: unknown, depth: number, keyPrefix: string): JSX.Element => {
    if (value === null) {
      return <span className="text-[#FF6B6B]">null</span>;
    }
    if (typeof value === 'boolean') {
      return <span className="text-[#F7B500]">{String(value)}</span>;
    }
    if (typeof value === 'number') {
      return <span className="text-[#7C9EFF]">{String(value)}</span>;
    }
    if (typeof value === 'string') {
      return <span className="text-[#EDEDED]">"{value}"</span>;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-[#6E6E6E]">[]</span>;
      }
      return (
        <>
          <span className="text-[#6E6E6E]">[</span>
          {value.map((item, i) => (
            <span key={`${keyPrefix}-${i}`}>
              {'\n'}
              {indent(depth + 1)}
              {renderValue(item, depth + 1, `${keyPrefix}-${i}`)}
              {i < value.length - 1 ? <span className="text-[#6E6E6E]">,</span> : null}
            </span>
          ))}
          {'\n'}
          {indent(depth)}
          <span className="text-[#6E6E6E]">]</span>
        </>
      );
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) {
        return <span className="text-[#6E6E6E]">{'{}'}</span>;
      }
      return (
        <>
          <span className="text-[#6E6E6E]">{'{'}</span>
          {entries.map(([k, v], i) => (
            <span key={`${keyPrefix}-${k}`}>
              {'\n'}
              {indent(depth + 1)}
              <span className="text-[#A1A1A1]">"{k}"</span>
              <span className="text-[#6E6E6E]">: </span>
              {renderValue(v, depth + 1, `${keyPrefix}-${k}`)}
              {i < entries.length - 1 ? <span className="text-[#6E6E6E]">,</span> : null}
            </span>
          ))}
          {'\n'}
          {indent(depth)}
          <span className="text-[#6E6E6E]">{'}'}</span>
        </>
      );
    }
    return <span className="text-[#EDEDED]">{String(value)}</span>;
  };

  return (
    <pre
      className="text-xs leading-relaxed overflow-x-auto whitespace-pre"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <code>{renderValue(data, 0, 'root')}</code>
    </pre>
  );
}

function ResponseSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-3 bg-[#1C1C1C] rounded w-1/3" />
      <div className="h-3 bg-[#1C1C1C] rounded w-2/3" />
      <div className="h-3 bg-[#1C1C1C] rounded w-1/2" />
      <div className="h-3 bg-[#1C1C1C] rounded w-3/4" />
      <div className="h-3 bg-[#1C1C1C] rounded w-2/5" />
      <div className="h-3 bg-[#1C1C1C] rounded w-3/5" />
    </div>
  );
}

export default function TryItLive() {
  const [endpoint, setEndpoint] = useState<Endpoint>('stocks');
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [hasTriedOnce, setHasTriedOnce] = useState(false);

  const config = ENDPOINTS[endpoint];

  const handleEndpointChange = (ep: Endpoint) => {
    setEndpoint(ep);
    setSymbol(ENDPOINTS[ep].placeholder);
    setResponse(null);
    setError(null);
    setErrorStatus(null);
    setResponseTime(null);
  };

  const sendRequest = useCallback(async () => {
    if (!symbol.trim()) return;
    setLoading(true);
    setResponse(null);
    setError(null);
    setErrorStatus(null);
    setHasTriedOnce(true);
    const start = Date.now();

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, symbol }),
      });
      const data = await res.json();
      setResponseTime(Date.now() - start);
      if (!res.ok) {
        setError(data);
        setErrorStatus(res.status);
      } else {
        setResponse(data);
      }
    } catch (e) {
      setResponseTime(Date.now() - start);
      setError({
        error: {
          code: 'network_error',
          message: e instanceof Error ? e.message : String(e),
          is_retriable: true,
        },
      });
      setErrorStatus(0);
    } finally {
      setLoading(false);
    }
  }, [endpoint, symbol]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      sendRequest();
    }
  };

  const requestPath = `${config.path}/${symbol || '{symbol}'}`;
  const isRateLimited = errorStatus === 429;

  return (
    <section className="py-24 border-b border-[#262626]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span
            className="font-mono text-xs text-[#00D26A] uppercase tracking-widest"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            TRY IT LIVE
          </span>
          <h2
            className="text-4xl md:text-5xl font-semibold text-[#EDEDED] mt-3 tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Try it without signing up
          </h2>
          <p className="text-[#A1A1A1] mt-4 max-w-2xl text-base md:text-lg">
            Real responses. Real provider metadata. No API key required for demo requests.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 flex flex-col gap-6">
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[#6E6E6E] mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Endpoint
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(Object.keys(ENDPOINTS) as Endpoint[]).map((ep) => {
                  const active = ep === endpoint;
                  return (
                    <button
                      key={ep}
                      type="button"
                      onClick={() => handleEndpointChange(ep)}
                      className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                        active
                          ? 'bg-[#1C1C1C] border-[#3A3A3A] text-[#EDEDED]'
                          : 'bg-[#0A0A0A] border-[#262626] text-[#A1A1A1] hover:bg-[#1C1C1C] hover:text-[#EDEDED]'
                      }`}
                    >
                      {ENDPOINTS[ep].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="symbol-input"
                className="block text-xs uppercase tracking-widest text-[#6E6E6E] mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {config.inputLabel}
              </label>
              <input
                id="symbol-input"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={config.placeholder}
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-[#0A0A0A] border border-[#262626] focus:border-[#3A3A3A] focus:outline-none rounded-lg px-3.5 py-2.5 text-[#EDEDED] placeholder:text-[#6E6E6E] text-sm transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              {config.helper && (
                <p className="mt-2 text-xs text-[#6E6E6E]">{config.helper}</p>
              )}
            </div>

            <div className="mt-auto">
              <button
                type="button"
                onClick={sendRequest}
                disabled={loading || !symbol.trim()}
                className="w-full bg-[#00D26A] hover:bg-[#00B85C] disabled:bg-[#1C1C1C] disabled:text-[#6E6E6E] disabled:cursor-not-allowed text-[#0A0A0A] font-semibold text-sm px-4 py-3 rounded-lg transition-colors"
              >
                {loading ? 'Sending…' : 'Send request'}
              </button>
              <p className="mt-3 text-xs text-[#6E6E6E]">
                Demo quota: 10 requests/day per IP. Get an API key for unlimited access.
              </p>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 min-h-[400px] flex flex-col">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs uppercase tracking-widest text-[#6E6E6E]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Request
                </span>
                {responseTime !== null && (
                  <span
                    className="text-xs text-[#6E6E6E]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {responseTime} ms
                  </span>
                )}
              </div>
              <div
                className="bg-[#0A0A0A] border border-[#262626] rounded-lg p-3 text-xs leading-relaxed"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <div>
                  <span className="text-[#00D26A]">GET</span>{' '}
                  <span className="text-[#EDEDED]">{requestPath}</span>
                </div>
                <div className="text-[#A1A1A1]">
                  Authorization:{' '}
                  <span className="text-[#EDEDED]">Bearer kap_demo_***</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs uppercase tracking-widest text-[#6E6E6E]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Response
                </span>
                {!loading && (response || error) && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      error
                        ? 'bg-[#1C1C1C] text-[#FF6B6B] border border-[#262626]'
                        : 'bg-[#1C1C1C] text-[#00D26A] border border-[#262626]'
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {error ? `${errorStatus || 'ERR'} ${isRateLimited ? 'rate_limited' : 'error'}` : '200 OK'}
                  </span>
                )}
              </div>

              <div className="bg-[#0A0A0A] border border-[#262626] rounded-lg p-4 flex-1 overflow-auto">
                {!hasTriedOnce && !loading && (
                  <p
                    className="text-sm text-[#6E6E6E]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    // Click "Send request" to see a live response.
                  </p>
                )}
                {loading && <ResponseSkeleton />}
                {!loading && response !== null && <JsonHighlight data={response} />}
                {!loading && error !== null && (
                  <>
                    {isRateLimited && (
                      <p className="text-xs text-[#A1A1A1] mb-3 leading-relaxed">
                        This IS the Kapit error envelope. Your agent uses{' '}
                        <span
                          className="text-[#EDEDED]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          error.recovery
                        </span>{' '}
                        to handle this.
                      </p>
                    )}
                    <JsonHighlight data={error} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {!loading && response !== null && (
          <div className="mt-8 flex items-center justify-center">
            <a
              href="/signup"
              className="group inline-flex items-center gap-2 text-[#00D26A] hover:text-[#00B85C] text-sm font-medium transition-colors"
            >
              Like what you see? Get your API key for unlimited access
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
