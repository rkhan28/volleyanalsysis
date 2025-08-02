import { useState, useEffect } from 'react';
import { Player, Match, Action, LiveUpdate } from '../types';
import { mockPlayers, mockMatches, mockActions } from '../data/mockData';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlayers(mockPlayers);
      setLoading(false);
    }, 800);
  }, []);

  return { players, loading };
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 600);
  }, []);

  return { matches, loading };
}

export function useActions(matchId?: string) {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setActions(mockActions);
      setLoading(false);
    }, 500);
  }, [matchId]);

  return { actions, loading };
}

export function useLiveUpdates() {
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      const newUpdate: LiveUpdate = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        message: `Player ${Math.floor(Math.random() * 4) + 1} scored a point!`,
        type: Math.random() > 0.7 ? 'success' : 'info'
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return updates;
}