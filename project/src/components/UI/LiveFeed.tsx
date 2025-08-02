import React, { useEffect, useState } from 'react';
import { socket } from '../../lib/socket';

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

export default function LiveFeed() {
  const matchId = import.meta.env.VITE_MATCH_ID;
  const [feed, setFeed] = useState<Metric[]>([]);

  useEffect(() => {
    // Listen for new metrics
    socket.on('metric_inserted', (newMetric: Metric) => {
      if (newMetric.match_id === matchId) {
        setFeed(prev => [newMetric, ...prev]);
      }
    });
    return () => {
      socket.off('metric_inserted');
    };
  }, [matchId]);

  return (
    <div className="fixed bottom-0 right-0 m-4 w-64 bg-white shadow-lg rounded p-2 overflow-y-auto max-h-96">
      <h2 className="font-bold mb-2">Live Feed</h2>
      {feed.length === 0 ? (
        <p className="text-sm text-gray-500">No new metrics yet.</p>
      ) : (
        feed.map(m => (
          <div key={m.id} className="border-b py-1 text-sm">
            <strong>{m.player_id}:</strong>{' '}
            Serve {(m.serve_accuracy * 100).toFixed(0)}% •
            Spike {(m.spike_success * 100).toFixed(0)}% •
            Block {(m.block_eff * 100).toFixed(0)}%
          </div>
        ))
      )}
    </div>
  );
}
