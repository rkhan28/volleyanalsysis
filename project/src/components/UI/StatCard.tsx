import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'blue' | 'green' | 'orange' | 'red';
  onClick?: () => void;
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-900',
  green: 'bg-green-50 border-green-200 text-green-900',
  orange: 'bg-orange-50 border-orange-200 text-orange-900',
  red: 'bg-red-50 border-red-200 text-red-900'
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  color = 'blue',
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${colorClasses[color]}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold opacity-80">{title}</h3>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.direction === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend.value}%
          </div>
        )}
      </div>
      
      <div className="mb-1">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-lg opacity-70">%</span>
      </div>
      
      {subtitle && (
        <p className="text-sm opacity-70">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default StatCard;