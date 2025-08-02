// project/src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { socket } from '../lib/socket';

// Tell TS about our VITE_ env vars
declare global {
  interface ImportMetaEnv {
    readonly VITE_MATCH_ID: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

interface Metric {
  id: number;
  match_id:      string;
  player_id:     string;
  serve_accuracy: number;
  spike_success:  number;
  block_eff:     number;
  updated_at:    string;
}

export default function Dashboard() {
  // pull the matchId from your .env
  const matchId = import.meta.env.VITE_MATCH_ID;

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Fetch existing metrics from our proxied API
    setLoading(true);
    fetch(`/api/metrics/${matchId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Metric[]>;
      })
      .then(setMetrics)
      .catch(err => console.error('Failed to load metrics:', err))
      .finally(() => setLoading(false));

    // 2) Subscribe to real-time INSERT events
    socket.on('connect', () => {
      console.log('🟢 WebSocket connected:', socket.id);
    });
    socket.on('metric_inserted', (newMetric: Metric) => {
      if (newMetric.match_id === matchId) {
        setMetrics(prev => [...prev, newMetric]);
      }
    });

    // 3) Cleanup on unmount
    return () => {
      socket.off('metric_inserted');
      socket.off('connect');
    };
  }, [matchId]);

  if (loading) {
    return <p>Loading metrics…</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Match Metrics</h1>

      {metrics.length === 0 ? (
        <p>No metrics recorded yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b text-left">Player ID</th>
              <th className="border-b text-right">Serve Acc</th>
              <th className="border-b text-right">Spike Succ</th>
              <th className="border-b text-right">Block Eff</th>
              <th className="border-b text-right">Updated</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(m => (
              <tr key={m.id}>
                <td className="py-1">{m.player_id}</td>
                <td className="py-1 text-right">
                  {(m.serve_accuracy * 100).toFixed(1)}%
                </td>
                <td className="py-1 text-right">
                  {(m.spike_success * 100).toFixed(1)}%
                </td>
                <td className="py-1 text-right">
                  {(m.block_eff * 100).toFixed(1)}%
                </td>
                <td className="py-1 text-right">
                  {new Date(m.updated_at).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


