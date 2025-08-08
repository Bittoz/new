'use client';

interface ActivityLogsProps {
  productId: number;
  isDarkMode: boolean;
}

export default function ActivityLogs({ productId, isDarkMode }: ActivityLogsProps) {
  const activities = [
    {
      id: 1,
      action: 'Product Submitted',
      user: 'Emma Davis',
      userType: 'Seller',
      timestamp: '2024-02-01T10:30:00Z',
      details: 'Product submitted for review with all required information',
      icon: 'ri-upload-line',
      iconColor: isDarkMode ? 'text-blue-400' : 'text-blue-600'
    },
    {
      id: 2,
      action: 'Auto Validation Passed',
      user: 'System',
      userType: 'Automated',
      timestamp: '2024-02-01T10:31:00Z',
      details: 'Product passed automated security and content validation checks',
      icon: 'ri-shield-check-line',
      iconColor: isDarkMode ? 'text-green-400' : 'text-green-600'
    },
    {
      id: 3,
      action: 'Assigned for Review',
      user: 'Admin System',
      userType: 'System',
      timestamp: '2024-02-01T10:32:00Z',
      details: 'Product added to review queue and assigned to admin team',
      icon: 'ri-user-add-line',
      iconColor: isDarkMode ? 'text-purple-400' : 'text-purple-600'
    },
    {
      id: 4,
      action: 'Review Started',
      user: 'Current User',
      userType: 'Admin',
      timestamp: '2024-02-20T14:25:00Z',
      details: 'Admin started reviewing product details and compliance',
      icon: 'ri-eye-line',
      iconColor: isDarkMode ? 'text-amber-400' : 'text-amber-600'
    }
  ];

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className={`rounded-xl shadow-xl border transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800 shadow-cyan-500/5' : 'bg-white border-gray-200'}`}>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <i className={`ri-history-line text-xl w-6 h-6 flex items-center justify-center ${isDarkMode ? 'text-cyan-400' : 'text-amber-600'}`}></i>
          <h3 className={`text-lg font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Activity Log
          </h3>
        </div>

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {/* Timeline Line */}
              {index < activities.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-10 transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  activity.userType === 'Admin' 
                    ? (isDarkMode ? 'bg-cyan-900/30 border border-cyan-500/30' : 'bg-cyan-50 border border-cyan-200')
                    : activity.userType === 'Seller'
                    ? (isDarkMode ? 'bg-blue-900/30 border border-blue-500/30' : 'bg-blue-50 border border-blue-200')
                    : (isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200')
                }`}>
                  <i className={`${activity.icon} text-lg ${activity.iconColor} w-5 h-5 flex items-center justify-center`}></i>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {activity.action}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          by {activity.user}
                        </span>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          activity.userType === 'Admin' 
                            ? (isDarkMode ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-800')
                            : activity.userType === 'Seller'
                            ? (isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800')
                            : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600')
                        }`}>
                          {activity.userType}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <span className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                      <span className={`text-xs transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {activity.details && (
                    <p className={`text-sm mt-2 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Activity Button */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className={`w-full px-4 py-3 rounded-lg border-2 border-dashed font-medium transition-all duration-200 cursor-pointer ${isDarkMode ? 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 hover:bg-gray-800/50' : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}>
            <i className="ri-add-line mr-2 w-4 h-4 flex items-center justify-center"></i>
            Add Note or Comment
          </button>
        </div>
      </div>
    </div>
  );
}