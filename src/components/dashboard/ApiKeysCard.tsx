import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/astro/react';
import {
  listApiKeys,
  createApiKey,
  revokeApiKey,
  KapitDashboardApiError,
} from '../../lib/kapit-dashboard-api';
import type { ApiKey } from '../../lib/kapit-dashboard-api';

export default function ApiKeysCard() {
  const { getToken } = useAuth();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchKeys() {
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await listApiKeys(token);
        if (!cancelled) setKeys(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof KapitDashboardApiError && err.code === 'not_ready') {
          setKeys([]);
        } else {
          setError('Failed to load API keys. Please refresh.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchKeys();
    return () => { cancelled = true; };
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) return;
      const { key, raw_key } = await createApiKey(token, { mode: 'live' });
      setNewKey(raw_key);
      setKeys(prev => [key, ...prev]);
    } catch (err) {
      if (err instanceof KapitDashboardApiError && err.code === 'not_ready') {
        setError('API key creation is not yet available.');
      } else {
        setError('Failed to generate key. Please try again.');
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!newKey) return;
    await navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRevoke = async (id: string) => {
    setError(null);
    try {
      const token = await getToken();
      if (!token) return;
      await revokeApiKey(token, id);
      try {
        const freshKeys = await listApiKeys(token);
        setKeys(freshKeys);
      } catch {
        setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k));
      }
    } catch {
      setError('Failed to revoke key. Please try again.');
    }
  };

  return (
    <div className="bg-[#111111] border border-[#262626] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[#EDEDED] font-semibold text-lg">API Keys</h2>
          <p className="text-[#6E6E6E] text-sm mt-0.5">Keys used by your AI agents to call Kapit</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating || loading}
          className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#8B5CF6] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {generating ? 'Generating…' : '+ Generate Key'}
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center justify-between gap-3 bg-[#1A0D0D] border border-[#3D1515] rounded-lg px-4 py-2.5">
          <p className="text-[#F87171] text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {newKey && (
        <div className="mb-6 bg-[#0D1A0D] border border-[#1A4A1A] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#4ADE80] text-sm font-medium">
              Copy this key now. You won't be able to see it again.
            </p>
            <button
              onClick={() => setNewKey(null)}
              className="shrink-0 text-[#6E6E6E] hover:text-[#ADADAD] text-lg leading-none cursor-pointer"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 text-[#EDEDED] text-sm bg-[#0A0A0A] px-3 py-2 rounded-md break-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {newKey}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 text-sm px-3 py-2 rounded-md bg-[#1C1C1C] text-[#ADADAD] hover:text-[#EDEDED] transition-colors cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="h-10 bg-[#1C1C1C] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : keys.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-[#262626] rounded-lg">
          <p className="text-[#6E6E6E] text-sm">No API keys yet.</p>
          <p className="text-[#4A4A4A] text-sm mt-1">Generate your first key to start using Kapit.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#6E6E6E] border-b border-[#1F1F1F]">
                <th className="text-left pb-3 font-medium">Key</th>
                <th className="text-left pb-3 font-medium">Created</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-right pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F]">
              {keys.map(key => (
                <tr key={key.id} className="text-[#ADADAD]">
                  <td className="py-3 text-[#EDEDED]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {key.prefix}
                  </td>
                  <td className="py-3">{new Date(key.created_at).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${
                      key.status === 'active' ? 'bg-[#0D1A0D] text-[#4ADE80]' : 'bg-[#1A0D0D] text-[#F87171]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${key.status === 'active' ? 'bg-[#4ADE80]' : 'bg-[#F87171]'}`} />
                      {key.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {key.status === 'active' && (
                      <button
                        onClick={() => handleRevoke(key.id)}
                        className="text-xs text-[#F87171] hover:text-[#EF4444] transition-colors cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
