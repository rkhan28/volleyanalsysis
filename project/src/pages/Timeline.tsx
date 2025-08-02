import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useActions } from '../hooks/useApi';
import { Play, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

const Timeline = () => {
  const { actions, loading } = useActions();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const getActionIcon = (type: string) => {
    const iconClass = "w-8 h-8 p-1.5 rounded-full";
    switch (type) {
      case 'serve':
        return <div className={`${iconClass} bg-blue-100 text-blue-600`}>🏐</div>;
      case 'spike':
        return <div className={`${iconClass} bg-orange-100 text-orange-600`}>⚡</div>;
      case 'block':
        return <div className={`${iconClass} bg-green-100 text-green-600`}>🛡️</div>;
      case 'dig':
        return <div className={`${iconClass} bg-purple-100 text-purple-600`}>🤲</div>;
      case 'set':
        return <div className={`${iconClass} bg-yellow-100 text-yellow-600`}>👋</div>;
      default:
        return <div className={`${iconClass} bg-gray-100 text-gray-600`}>●</div>;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 md:pb-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Timeline</h1>
        <p className="text-gray-600">Interactive timeline of match events</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 transform -translate-x-1/2">
                {getActionIcon(action.type)}
              </div>

              {/* Content */}
              <div className="ml-16">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    selectedAction === action.id
                      ? 'border-orange-300 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedAction(selectedAction === action.id ? null : action.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 capitalize">
                        {action.type} by {action.playerName}
                      </h3>
                      {action.success ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <XCircle size={16} className="text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      {formatTime(action.timestamp)}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{action.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      Position ({action.position.x}, {action.position.y})
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      action.success 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {action.success ? 'Success' : 'Error'}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {selectedAction === action.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Action Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Player: {action.playerName}</p>
                            <p>Type: {action.type}</p>
                            <p>Result: {action.success ? 'Successful' : 'Failed'}</p>
                            <p>Court Position: ({action.position.x}, {action.position.y})</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Video Clip</h4>
                          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                            <Play size={16} />
                            Play Clip
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {actions.filter(a => a.type === 'serve').length}
            </div>
            <div className="text-sm text-gray-600">Serves</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {actions.filter(a => a.type === 'spike').length}
            </div>
            <div className="text-sm text-gray-600">Spikes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {actions.filter(a => a.type === 'block').length}
            </div>
            <div className="text-sm text-gray-600">Blocks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {actions.filter(a => a.success).length}
            </div>
            <div className="text-sm text-gray-600">Successful</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;