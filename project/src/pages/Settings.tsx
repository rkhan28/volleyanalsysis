import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Bell, Shield, Database, Palette, Monitor } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          name: 'Theme',
          description: 'Choose your preferred color scheme',
          type: 'select',
          value: theme,
          onChange: setTheme,
          options: [
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'auto', label: 'System', icon: Monitor }
          ]
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          name: 'Live Updates',
          description: 'Receive real-time match notifications',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications
        }
      ]
    },
    {
      title: 'Data & Privacy',
      icon: Shield,
      settings: [
        {
          name: 'Auto-save',
          description: 'Automatically save match data',
          type: 'toggle',
          value: autoSave,
          onChange: setAutoSave
        }
      ]
    }
  ];

  const metricFilters = [
    { name: 'Include warm-up serves', enabled: false },
    { name: 'Count assisted blocks', enabled: true },
    { name: 'Track defensive digs', enabled: true },
    { name: 'Include practice points', enabled: false },
  ];

  return (
    <div className="p-6 pb-20 md:pb-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your dashboard experience and preferences</p>
      </div>

      <div className="space-y-8">
        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <section.icon size={24} className="text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            </div>

            <div className="space-y-6">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{setting.name}</h3>
                    <p className="text-gray-600 mt-1">{setting.description}</p>
                  </div>

                  <div className="ml-6">
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => setting.onChange(!setting.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          setting.value ? 'bg-orange-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}

                    {setting.type === 'select' && (
                      <div className="flex gap-2">
                        {setting.options?.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setting.onChange(option.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                              setting.value === option.value
                                ? 'border-orange-300 bg-orange-50 text-orange-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <option.icon size={16} />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Metric Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Metric Filters</h2>
          </div>

          <div className="space-y-4">
            {metricFilters.map((filter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{filter.name}</span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    filter.enabled ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      filter.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <h3 className="font-medium text-blue-900">Export Match Data</h3>
                <p className="text-sm text-blue-700">Download all match statistics as CSV</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <h3 className="font-medium text-green-900">Backup Settings</h3>
                <p className="text-sm text-green-700">Save current configuration</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Backup
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h3 className="font-medium text-red-900">Reset All Data</h3>
                <p className="text-sm text-red-700">Clear all match data and statistics</p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Reset
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;