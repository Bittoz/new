
'use client';

import { useState } from 'react';

export default function SecurityLogs() {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');

  const activities = [
    {
      id: 1,
      type: 'login',
      action: 'Account Login',
      details: 'Successful login from Chrome on Windows',
      ip: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-15T14:30:00Z',
      status: 'success',
      device: 'Chrome 120.0 on Windows 11'
    },
    {
      id: 2,
      type: 'profile',
      action: 'Profile Updated',
      details: 'Changed profile picture and bio',
      ip: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-15T12:15:00Z',
      status: 'success',
      device: 'Chrome 120.0 on Windows 11'
    },
    {
      id: 3,
      type: 'security',
      action: 'Password Changed',
      details: 'Password successfully updated',
      ip: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-14T16:45:00Z',
      status: 'success',
      device: 'Chrome 120.0 on Windows 11'
    },
    {
      id: 4,
      type: 'login',
      action: 'Failed Login Attempt',
      details: 'Invalid password attempt',
      ip: '203.0.113.45',
      location: 'Unknown',
      timestamp: '2024-12-13T09:22:00Z',
      status: 'failed',
      device: 'Firefox 121.0 on Linux'
    },
    {
      id: 5,
      type: 'login',
      action: 'Account Login',
      details: 'Successful login from mobile app',
      ip: '192.168.1.105',
      location: 'New York, USA',
      timestamp: '2024-12-12T08:30:00Z',
      status: 'success',
      device: 'Mobile App on iOS 17.2'
    },
    {
      id: 6,
      type: 'security',
      action: '2FA Enabled',
      details: 'Two-factor authentication was enabled',
      ip: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-10T14:20:00Z',
      status: 'success',
      device: 'Chrome 120.0 on Windows 11'
    },
    {
      id: 7,
      type: 'profile',
      action: 'Email Verified',
      details: 'Email address verification completed',
      ip: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-09T11:15:00Z',
      status: 'success',
      device: 'Chrome 119.0 on Windows 11'
    },
    {
      id: 8,
      type: 'login',
      action: 'Account Logout',
      details: 'User initiated logout',
      ip: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-08T17:45:00Z',
      status: 'success',
      device: 'Chrome 119.0 on Windows 11'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const getActivityIcon = (type: string, status: string) => {
    if (status === 'failed') return 'ri-error-warning-line';
    
    switch (type) {
      case 'login': return 'ri-login-circle-line';
      case 'profile': return 'ri-user-settings-line';
      case 'security': return 'ri-shield-check-line';
      default: return 'ri-information-line';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Security Overview</h2>
            <p className="text-gray-400 text-sm">Monitor your account security and activity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-green-400"></i>
            </div>
            <div className="text-lg font-bold text-white mb-1">Secure</div>
            <div className="text-xs text-gray-400">Account Status</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-login-circle-line w-5 h-5 flex items-center justify-center text-blue-400"></i>
            </div>
            <div className="text-lg font-bold text-white mb-1">47</div>
            <div className="text-xs text-gray-400">Total Logins</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center text-yellow-400"></i>
            </div>
            <div className="text-lg font-bold text-white mb-1">3</div>
            <div className="text-xs text-gray-400">Failed Attempts</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-device-line w-5 h-5 flex items-center justify-center text-purple-400"></i>
            </div>
            <div className="text-lg font-bold text-white mb-1">5</div>
            <div className="text-xs text-gray-400">Active Sessions</div>
          </div>
        </div>
      </div>

      {/* Activity Filters */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Activity Type Filter */}
            <div className="flex bg-gray-800/50 rounded-lg p-1">
              {[
                { key: 'all', label: 'All', icon: 'ri-list-check' },
                { key: 'login', label: 'Login', icon: 'ri-login-circle-line' },
                { key: 'profile', label: 'Profile', icon: 'ri-user-settings-line' },
                { key: 'security', label: 'Security', icon: 'ri-shield-check-line' }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                    filter === filterOption.key
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <i className={`${filterOption.icon} w-3 h-3 flex items-center justify-center`}></i>
                  <span>{filterOption.label}</span>
                </button>
              ))}
            </div>

            {/* Time Range */}
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="1day">Last 24 hours</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredActivities.map((activity) => {
            const { date, time } = formatDate(activity.timestamp);
            
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.status === 'failed' 
                    ? 'bg-red-500/20' 
                    : activity.type === 'login' 
                      ? 'bg-blue-500/20'
                      : activity.type === 'security'
                        ? 'bg-green-500/20'
                        : 'bg-purple-500/20'
                }`}>
                  <i className={`${getActivityIcon(activity.type, activity.status)} w-4 h-4 flex items-center justify-center ${getStatusColor(activity.status)}`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">{activity.action}</div>
                      <div className="text-xs text-gray-400 mt-1">{activity.details}</div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <i className="ri-map-pin-line w-3 h-3 flex items-center justify-center"></i>
                          <span>{activity.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <i className="ri-global-line w-3 h-3 flex items-center justify-center"></i>
                          <span>{activity.ip}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <i className="ri-device-line w-3 h-3 flex items-center justify-center"></i>
                          <span>{activity.device}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{date}</div>
                      <div className="text-xs text-gray-500">{time}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Export Options */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Showing {filteredActivities.length} of {activities.length} activities
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded flex items-center space-x-1 whitespace-nowrap">
              <i className="ri-download-line w-3 h-3 flex items-center justify-center"></i>
              <span>Export CSV</span>
            </button>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded flex items-center space-x-1 whitespace-nowrap">
              <i className="ri-file-pdf-line w-3 h-3 flex items-center justify-center"></i>
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <i className="ri-shield-star-line w-4 h-4 flex items-center justify-center text-white"></i>
          </div>
          <h4 className="text-lg font-semibold text-white">Security Recommendations</h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center text-yellow-400 mt-0.5"></i>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Enable Two-Factor Authentication</div>
              <div className="text-xs text-gray-400 mt-1">Add an extra layer of security to your account</div>
            </div>
            <button className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded hover:bg-yellow-500/30 whitespace-nowrap">
              Enable 2FA
            </button>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <i className="ri-information-line w-4 h-4 flex items-center justify-center text-blue-400 mt-0.5"></i>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Review Active Sessions</div>
              <div className="text-xs text-gray-400 mt-1">Check and logout from unused devices</div>
            </div>
            <button className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 whitespace-nowrap">
              View Sessions
            </button>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-400 mt-0.5"></i>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Strong Password</div>
              <div className="text-xs text-gray-400 mt-1">Your password meets security requirements</div>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded whitespace-nowrap">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
