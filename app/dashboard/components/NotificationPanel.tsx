
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Notification {
  id: number;
  type: 'order' | 'commission' | 'status' | 'system' | 'message';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    url?: string;
    onClick?: () => void;
  };
}

interface NotificationPanelProps {
  isDarkMode: boolean;
  unreadCount: number;
}

export default function NotificationPanel({ isDarkMode, unreadCount }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'New Order',
      message: 'Sarah Johnson purchased your UI Design System',
      time: '2 minutes ago',
      unread: true,
      priority: 'high',
      action: { label: 'View Order', url: '/orders/ORD-001' }
    },
    {
      id: 2,
      type: 'commission',
      title: 'Referral Commission',
      message: 'You earned a referral commission of $24.99',
      time: '1 hour ago',
      unread: true,
      priority: 'medium',
      action: { label: 'View Wallet', url: '/wallet' }
    },
    {
      id: 3,
      type: 'status',
      title: 'Order Status Update',
      message: 'Order ORD-001 has been completed successfully',
      time: '3 hours ago',
      unread: false,
      priority: 'medium',
      action: { label: 'View Details', url: '/orders/ORD-001' }
    },
    {
      id: 4,
      type: 'system',
      title: 'System Maintenance',
      message: 'Platform maintenance scheduled for tonight at 11:00 PM',
      time: '6 hours ago',
      unread: false,
      priority: 'low'
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'Mike Chen sent you a new message',
      time: '1 day ago',
      unread: false,
      priority: 'medium',
      action: { label: 'Reply', url: '/messages/mike-chen' }
    },
    {
      id: 6,
      type: 'order',
      title: 'Refund Request',
      message: 'Order ORD-003 refund request requires your attention',
      time: '2 days ago',
      unread: false,
      priority: 'high',
      action: { label: 'Process Refund', url: '/orders/ORD-003' }
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      'order': 'ri-shopping-bag-line',
      'commission': 'ri-gift-line',
      'status': 'ri-check-line',
      'system': 'ri-settings-line',
      'message': 'ri-message-line'
    };
    return iconMap[type as keyof typeof iconMap] || 'ri-notification-line';
  };

  const getNotificationColor = (type: string, priority: string) => {
    const colorMap = {
      'order': isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600',
      'commission': isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
      'status': isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
      'system': isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600',
      'message': isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'
    };

    if (priority === 'high') {
      return isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600';
    }

    return colorMap[type as keyof typeof colorMap] || (isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-600');
  };

  const getPriorityBadge = (priority: string) => {
    const badgeMap = {
      'high': { text: 'Urgent', class: 'bg-red-500 text-white' },
      'medium': { text: 'Medium', class: isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600' },
      'low': { text: 'Low', class: isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-600' }
    };
    return badgeMap[priority as keyof typeof badgeMap];
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications;

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    // Prioritize unread notifications first
    if (a.unread && !b.unread) return -1;
    if (!a.unread && b.unread) return 1;

    // Then sort by priority
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];

    return bPriority - aPriority;
  });

  return (
    <div className="relative" ref={panelRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg flex items-center justify-center border ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'} transition-all duration-200 cursor-pointer relative group ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'hover:shadow-md'}`}
      >
        <i className={`ri-notification-line ${isDarkMode ? 'text-white' : 'text-gray-700'} text-lg transition-transform group-hover:scale-110`}></i>
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className={`absolute right-0 top-12 w-96 max-w-[90vw] ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl z-50 ${isDarkMode ? 'shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'shadow-xl'} transition-all duration-300 transform animate-in slide-in-from-top-2`}>
        {/* Panel Header */}
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notification Center
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'} transition-colors cursor-pointer`}
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          {/* Filter and Action Buttons */}
          <div className="flex items-center justify-between">
            <div className={`flex rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-1`}>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  filter === 'all'
                    ? (isDarkMode ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-white text-gray-900 shadow-sm')
                    : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap relative ${
                  filter === 'unread'
                    ? (isDarkMode ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-white text-gray-900 shadow-sm')
                    : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`text-xs font-medium px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10' : 'text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50'}`}
              >
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Notification List */}
        <div className="max-h-96 overflow-y-auto">
          {sortedNotifications.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors cursor-pointer relative group ${
                    notification.unread ? (isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50') : ''
                  }`}
                  onClick={() => {
                    if (notification.unread) markAsRead(notification.id);
                    if (notification.action?.url) {
                      window.location.href = notification.action.url;
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    {/* Notification Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type, notification.priority)}`}>
                      <i className={`${getNotificationIcon(notification.type)} text-lg`}></i>
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                              {notification.title}
                            </h4>
                            {notification.priority === 'high' && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(notification.priority).class}`}>
                                {getPriorityBadge(notification.priority).text}
                              </span>
                            )}
                            {notification.unread && (
                              <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {notification.time}
                            </span>
                            {notification.action && (
                              <Link
                                href="/orders"
                                className="text-xs font-medium px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                              >
                                {notification.action.label}
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className={`ml-2 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' : 'hover:bg-gray-200 text-gray-500 hover:text-red-500'}`}
                        >
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className={`w-16 h-16 mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mb-3`}>
                <i className={`ri-notification-off-line text-2xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}></i>
              </div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            className={`w-full text-center text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10' : 'text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50'}`}
            onClick={() => {
              setIsOpen(false);
              // Navigate to notifications page
              window.location.href = '/notifications';
            }}
          >
            View all notifications
          </button>
        </div>
      </div>
      )}
    </div>
  );
}