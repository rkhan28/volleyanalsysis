import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Settings } from 'lucide-react';

const VideoReview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(30);
  const [duration] = useState(180);
  const [selectedAction, setSelectedAction] = useState('serve');

  const actionMarkers = [
    { time: 15, type: 'serve', success: true, player: 'Sarah Johnson' },
    { time: 32, type: 'spike', success: true, player: 'Emma Rodriguez' },
    { time: 58, type: 'block', success: false, player: 'Maya Chen' },
    { time: 89, type: 'dig', success: true, player: 'Jessica Park' },
    { time: 112, type: 'set', success: true, player: 'Emma Rodriguez' },
    { time: 145, type: 'serve', success: false, player: 'Sarah Johnson' },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getActionColor = (type: string) => {
    const colors = {
      serve: 'bg-blue-500',
      spike: 'bg-orange-500',
      block: 'bg-green-500',
      dig: 'bg-purple-500',
      set: 'bg-yellow-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="p-6 pb-20 md:pb-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Review</h1>
        <p className="text-gray-600">Match footage with action detection and analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-xl overflow-hidden relative"
          >
            {/* Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <img
                src="https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg"
                alt="Volleyball match"
                className="w-full h-full object-cover opacity-60"
              />
              
              {/* Action Overlays */}
              <div className="absolute inset-0">
                {actionMarkers
                  .filter(marker => Math.abs(marker.time - currentTime) < 5)
                  .map((marker, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getActionColor(marker.type)}`}>
                        {marker.type.toUpperCase()} - {marker.player}
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-white" />
                  ) : (
                    <Play size={32} className="text-white ml-1" />
                  )}
                </button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-gray-900 p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="relative">
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-orange-500 rounded-full relative"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Action markers on timeline */}
                  {actionMarkers.map((marker, index) => (
                    <div
                      key={index}
                      className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${getActionColor(marker.type)} cursor-pointer`}
                      style={{ left: `${(marker.time / duration) * 100}%` }}
                      onClick={() => setCurrentTime(marker.time)}
                      title={`${marker.type} by ${marker.player}`}
                    ></div>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-orange-500 transition-colors">
                    <SkipBack size={20} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button className="text-white hover:text-orange-500 transition-colors">
                    <SkipForward size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Volume2 size={16} className="text-white" />
                    <div className="w-20 h-1 bg-gray-700 rounded-full">
                      <div className="w-3/4 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="text-white hover:text-orange-500 transition-colors">
                    <Settings size={20} />
                  </button>
                  <button className="text-white hover:text-orange-500 transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Detection Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['serve', 'spike', 'block', 'dig', 'set'].map((action) => (
                <button
                  key={action}
                  onClick={() => setSelectedAction(action)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedAction === action
                      ? 'border-orange-300 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${getActionColor(action)}`}></div>
                  <div className="text-sm font-medium capitalize">{action}</div>
                  <div className="text-xs text-gray-500">
                    {actionMarkers.filter(m => m.type === action).length}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Timeline Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Timeline</h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {actionMarkers.map((marker, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    Math.abs(marker.time - currentTime) < 5
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentTime(marker.time)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getActionColor(marker.type)}`}></div>
                    <span className="text-sm font-medium capitalize">{marker.type}</span>
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      marker.success 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {marker.success ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {marker.player} • {formatTime(marker.time)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Actions</span>
                <span className="font-semibold">{actionMarkers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-green-600">
                  {Math.round((actionMarkers.filter(m => m.success).length / actionMarkers.length) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Serves</span>
                <span className="font-semibold">
                  {actionMarkers.filter(m => m.type === 'serve').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spikes</span>
                <span className="font-semibold">
                  {actionMarkers.filter(m => m.type === 'spike').length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VideoReview;