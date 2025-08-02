import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayers } from '../hooks/useApi';
import CircularProgress from '../components/UI/CircularProgress';
import { Search, Filter, Star, TrendingUp } from 'lucide-react';

const Players = () => {
  const { players, loading } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPlayerData = players.find(p => p.id === selectedPlayer);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 md:pb-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Players</h1>
        <p className="text-gray-600">Individual player statistics and performance</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player List */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  selectedPlayer === player.id
                    ? 'border-orange-300 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedPlayer(player.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                    <p className="text-gray-600">{player.position}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        {Math.round((player.stats.serveAccuracy + player.stats.spikeSuccess + player.stats.blockEfficiency) / 3)}% avg
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{player.stats.points}</div>
                    <div className="text-sm text-gray-600">points</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Player Detail Panel */}
        <div className="lg:col-span-2">
          {selectedPlayerData ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Player Header */}
              <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                <img
                  src={selectedPlayerData.photo}
                  alt={selectedPlayerData.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedPlayerData.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-2">{selectedPlayerData.position}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{selectedPlayerData.stats.points} Total Points</span>
                    <span>{selectedPlayerData.stats.assists} Assists</span>
                    <span>{selectedPlayerData.stats.errors} Errors</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <CircularProgress
                      percentage={selectedPlayerData.stats.serveAccuracy}
                      color="#10B981"
                      label="Serve Accuracy"
                      size={120}
                    />
                  </div>
                  <div className="text-center">
                    <CircularProgress
                      percentage={selectedPlayerData.stats.spikeSuccess}
                      color="#3B82F6"
                      label="Spike Success"
                      size={120}
                    />
                  </div>
                  <div className="text-center">
                    <CircularProgress
                      percentage={selectedPlayerData.stats.blockEfficiency}
                      color="#F97316"
                      label="Block Efficiency"
                      size={120}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Offensive Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Points</span>
                      <span className="font-semibold">{selectedPlayerData.stats.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spike Success</span>
                      <span className="font-semibold">{selectedPlayerData.stats.spikeSuccess}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Serve Accuracy</span>
                      <span className="font-semibold">{selectedPlayerData.stats.serveAccuracy}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Defensive Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Block Efficiency</span>
                      <span className="font-semibold">{selectedPlayerData.stats.blockEfficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assists</span>
                      <span className="font-semibold">{selectedPlayerData.stats.assists}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Errors</span>
                      <span className="font-semibold">{selectedPlayerData.stats.errors}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Court Heatmap Placeholder */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Court Coverage Heatmap</h4>
                <div className="bg-green-50 rounded-lg p-8 border-2 border-green-200">
                  <div className="text-center text-gray-600">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp size={32} className="text-green-600" />
                    </div>
                    <p>Court coverage heatmap visualization</p>
                    <p className="text-sm">Shows player movement and action hotspots</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Star size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Player</h3>
              <p className="text-gray-600">Click on a player from the list to view their detailed statistics and performance metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Players;