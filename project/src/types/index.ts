export interface Player {
  id: string;
  name: string;
  position: string;
  photo: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  serveAccuracy: number;
  spikeSuccess: number;
  blockEfficiency: number;
  points: number;
  errors: number;
  assists: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  score: string;
  result: 'win' | 'loss';
}

export interface Action {
  id: string;
  timestamp: number;
  playerId: string;
  playerName: string;
  type: 'serve' | 'spike' | 'block' | 'dig' | 'set';
  success: boolean;
  position: { x: number; y: number };
  description: string;
}

export interface LiveUpdate {
  id: string;
  timestamp: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface CourtHeatmapData {
  x: number;
  y: number;
  value: number;
}