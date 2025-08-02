import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Baseline as Timeline, Users, Play, Settings, Menu, X, Bell, LogOut } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/timeline', icon: Timeline, label: 'Timeline' },
    { path: '/players', icon: Users, label: 'Players' },
    { path: '/video', icon: Play, label: 'Video' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-8 flex-1">
          <Link to="/dashboard" className="flex items-center gap-2 text-navy-900 font-bold text-xl">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            VolleyStats
          </Link>
          
          <div className="flex gap-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive(path)
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <img
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Coach"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium">Adolf Hitler</span>
            <button className="p-1 text-gray-500 hover:text-red-600 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-navy-900 font-bold text-lg">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            VolleyStats
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                    isActive(path)
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex">
          {navItems.slice(0, 4).map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${
                isActive(path)
                  ? 'text-orange-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;