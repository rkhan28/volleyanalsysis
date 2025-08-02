import { Player, Match, Action, CourtHeatmapData } from '../types';

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Outside Hitter',
    photo: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      serveAccuracy: 87,
      spikeSuccess: 72,
      blockEfficiency: 65,
      points: 342,
      errors: 28,
      assists: 156
    }
  },
  {
    id: '2',
    name: 'Emma Rodriguez',
    position: 'Setter',
    photo: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      serveAccuracy: 92,
      spikeSuccess: 45,
      blockEfficiency: 38,
      points: 198,
      errors: 15,
      assists: 524
    }
  },
  {
    id: '3',
    name: 'Maya Chen',
    position: 'Middle Blocker',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      serveAccuracy: 78,
      spikeSuccess: 68,
      blockEfficiency: 85,
      points: 267,
      errors: 22,
      assists: 89
    }
  },
  {
    id: '4',
    name: 'Jessica Park',
    position: 'Libero',
    photo: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      serveAccuracy: 95,
      spikeSuccess: 0,
      blockEfficiency: 0,
      points: 45,
      errors: 8,
      assists: 234
    }
  }
];

export const mockMatches: Match[] = [
  {
    id: '1',
    date: '2024-01-15',
    opponent: 'Blue Eagles',
    score: '3-1',
    result: 'win'
  },
  {
    id: '2',
    date: '2024-01-12',
    opponent: 'Red Hawks',
    score: '2-3',
    result: 'loss'
  },
  {
    id: '3',
    date: '2024-01-08',
    opponent: 'Green Tigers',
    score: '3-0',
    result: 'win'
  }
];

export const mockActions: Action[] = [
  {
    id: '1',
    timestamp: 1640995200000,
    playerId: '1',
    playerName: 'Sarah Johnson',
    type: 'serve',
    success: true,
    position: { x: 10, y: 85 },
    description: 'Ace serve to position 1'
  },
  {
    id: '2',
    timestamp: 1640995260000,
    playerId: '2',
    playerName: 'Emma Rodriguez',
    type: 'set',
    success: true,
    position: { x: 50, y: 40 },
    description: 'Perfect set to outside hitter'
  },
  {
    id: '3',
    timestamp: 1640995320000,
    playerId: '3',
    playerName: 'Maya Chen',
    type: 'block',
    success: true,
    position: { x: 60, y: 20 },
    description: 'Solo block at the net'
  }
];

export const mockHeatmapData: CourtHeatmapData[] = [
  { x: 1, y: 1, value: 23 },
  { x: 1, y: 2, value: 15 },
  { x: 1, y: 3, value: 8 },
  { x: 2, y: 1, value: 45 },
  { x: 2, y: 2, value: 67 },
  { x: 2, y: 3, value: 34 },
  { x: 3, y: 1, value: 12 },
  { x: 3, y: 2, value: 78 },
  { x: 3, y: 3, value: 56 },
];