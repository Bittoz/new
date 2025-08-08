
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '../../lib/auth-service';
import NotificationPanel from './components/NotificationPanel';

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [stats] = useState({
    totalClients: 324,
    revenue: 15847.50,
    orders: 89,
    wallet: 2847.50,
    referralCommission: 524.75,
    changes: {
      clients: 12.5,
      revenue: 8.3,
      orders: -2.1,
      wallet: 5.7,
      commission: 15.2
    }
  });

  const [recentOrders] = useState([
    { id: 'ORD-001', name: 'Sarah Johnson', product: 'UI Design System', price: 149.99, quantity: 1, status: 'delivered', email: 'sarah@example.com' },
    { id: 'ORD-002', name: 'Mike Chen', product: 'Marketing Bundle', price: 89.99, quantity: 2, status: 'in-progress', email: 'mike@example.com' },
    { id: 'ORD-003', name: 'Emma Davis', product: 'Photo Editor', price: 199.99, quantity: 1, status: 'pending', email: 'emma@example.com' },
    { id: 'ORD-004', name: 'David Wilson', product: 'Icon Pack', price: 29.99, quantity: 3, status: 'delivered', email: 'david@example.com' },
    { id: 'ORD-005', name: 'Lisa Brown', product: 'Business Template', price: 79.99, quantity: 1, status: 'in-progress', email: 'lisa@example.com' }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'order', message: 'New order from Sarah Johnson', time: '2 mins ago', unread: true },
    { id: 2, type: 'commission', message: 'Referral commission earned: $24.99', time: '1 hour ago', unread: true },
    { id: 3, type: 'status', message: 'Order ORD-001 has been delivered', time: '3 hours ago', unread: false },
    { id: 4, type: 'order', message: 'Payment received for UI Design System', time: '1 day ago', unread: false }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Check authentication
    if (!AuthService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const userSession = AuthService.getUserSession();
    if (userSession) {
      setUser(userSession);
      // Update stats with user's wallet balance
      stats.wallet = userSession.walletBalance;
    }
    
    setIsLoading(false);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const themeClass = isDarkMode ? 'dark' : '';
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'delivered':
        return `${baseClasses} bg-green-500/20 text-green-400 ${isDarkMode ? 'shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-green-100 text-green-800'}`;
      case 'in-progress':
        return `${baseClasses} bg-amber-500/20 text-amber-400 ${isDarkMode ? 'shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-amber-100 text-amber-800'}`;
      case 'pending':
        return `${baseClasses} bg-blue-500/20 text-blue-400 ${isDarkMode ? 'shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-blue-100 text-blue-800'}`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-400`;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (change < 0) return isDarkMode ? 'text-red-400' : 'text-red-600';
    return isDarkMode ? 'text-gray-400' : 'text-gray-600';
  };

  const filteredOrders = recentOrders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={`min-h-screen ${bgClass} ${themeClass}`}>
      <header className={`${cardBg} ${isDarkMode ? 'shadow-2xl border-b border-gray-700' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className={`w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.5)]' : ''}`}>
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className={`text-xl font-bold ${textPrimary} font-['Pacifico']`}>MarketPlace</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-cyan-500' : 'bg-gray-300'} relative transition-colors cursor-pointer`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'} absolute top-0.5`}></div>
              </button>

              <NotificationPanel isDarkMode={isDarkMode} unreadCount={unreadCount} />

              <Link href="/wallet" className={`${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30' : 'bg-amber-50'} px-4 py-2 rounded-lg border ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.2)]' : ''} cursor-pointer hover:opacity-80 transition-opacity`}>
                <div className={`text-sm ${isDarkMode ? 'text-cyan-400' : 'text-amber-800'}`}>
                  <span className="font-medium">${user.walletBalance.toLocaleString()}</span>
                  <span className={`${isDarkMode ? 'text-cyan-300' : 'text-amber-600'} ml-1`}>Available</span>
                </div>
              </Link>

              <div className="flex items-center space-x-3">
                <Link href="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
                  {user.photoUrl && (
                    <img 
                      src={user.photoUrl} 
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover object-top"
                    />
                  )}
                  <div className="hidden sm:block">
                    <div className={`text-sm font-medium ${textPrimary}`}>{user.firstName} {user.lastName}</div>
                    <div className={`text-xs ${textSecondary}`}>@{user.username}</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Welcome back, {user.firstName}!</h1>
          <p className={textSecondary}>Here's your marketplace performance overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.1)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}`}>
                <i className="ri-team-line text-white text-xl"></i>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getChangeColor(stats.changes.clients)}`}>
                {stats.changes.clients > 0 ? '+' : ''}{stats.changes.clients}%
              </span>
            </div>
            <div className={`text-2xl font-bold ${textPrimary} mb-1`}>{stats.totalClients}</div>
            <div className={`text-sm ${textSecondary}`}>Total Clients</div>
          </div>

          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(34,197,94,0.1)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_15px_rgba(34,197,94,0.3)]' : ''}`}>
                <i className="ri-money-dollar-circle-line text-white text-xl"></i>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getChangeColor(stats.changes.revenue)}`}>
                {stats.changes.revenue > 0 ? '+' : ''}{stats.changes.revenue}%
              </span>
            </div>
            <div className={`text-2xl font-bold ${textPrimary} mb-1`}>${stats.revenue.toLocaleString()}</div>
            <div className={`text-sm ${textSecondary}`}>Revenue</div>
          </div>

          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(245,158,11,0.1)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' : ''}`}>
                <i className="ri-shopping-bag-line text-white text-xl"></i>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getChangeColor(stats.changes.orders)}`}>
                {stats.changes.orders > 0 ? '+' : ''}{stats.changes.orders}%
              </span>
            </div>
            <div className={`text-2xl font-bold ${textPrimary} mb-1`}>{stats.orders}</div>
            <div className={`text-sm ${textSecondary}`}>Orders</div>
          </div>

          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(168,85,247,0.1)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}`}>
                <i className="ri-wallet-line text-white text-xl"></i>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getChangeColor(stats.changes.wallet)}`}>
                {stats.changes.wallet > 0 ? '+' : ''}{stats.changes.wallet}%
              </span>
            </div>
            <div className={`text-2xl font-bold ${textPrimary} mb-1`}>${user.walletBalance.toLocaleString()}</div>
            <div className={`text-sm ${textSecondary}`}>Wallet</div>
          </div>

          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(236,72,153,0.1)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_15px_rgba(236,72,153,0.3)]' : ''}`}>
                <i className="ri-gift-line text-white text-xl"></i>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getChangeColor(stats.changes.commission)}`}>
                {stats.changes.commission > 0 ? '+' : ''}{stats.changes.commission}%
              </span>
            </div>
            <div className={`text-2xl font-bold ${textPrimary} mb-1`}>${stats.referralCommission.toLocaleString()}</div>
            <div className={`text-sm ${textSecondary}`}>Referral</div>
          </div>
        </div>

        {/* Rest of the dashboard content remains the same... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.1)]' : ''}`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Revenue Trend</h3>
              <div className="h-40 flex items-end space-x-2">
                {[65, 85, 45, 95, 75, 88, 92].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full ${isDarkMode ? 'bg-gradient-to-t from-cyan-500 to-purple-500' : 'bg-gradient-to-t from-amber-400 to-orange-500'} rounded-t transition-all duration-300 ${isDarkMode ? 'shadow-[0_0_10px_rgba(6,182,212,0.3)]' : ''}`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className={`text-xs ${textSecondary} mt-2`}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(34,197,94,0.1)]' : ''}`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Order Status</h3>
              <div className="flex items-center justify-center h-40">
                <div className="relative w-32 h-32">
                  <div className={`w-32 h-32 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500' : 'bg-gradient-to-r from-green-400 via-blue-400 to-purple-400'} ${isDarkMode ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}`}></div>
                  <div className={`absolute inset-4 ${cardBg} rounded-full`}></div>
                  <div className={`absolute inset-0 flex items-center justify-center ${textPrimary} font-bold text-lg`}>
                    89
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-green-400'}`}></div>
                  <span className={`text-sm ${textSecondary}`}>Delivered: 45</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
                  <span className={`text-sm ${textSecondary}`}>In Progress: 32</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'}`}></div>
                  <span className={`text-sm ${textSecondary}`}>Pending: 12</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(168,85,247,0.1)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${textPrimary}`}>Notifications</h3>
              {unreadCount > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? (isDarkMode ? 'bg-gray-700/50 border border-cyan-500/20' : 'bg-blue-50') : (isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50')} transition-colors`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ 
                      notification.type === 'order' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') :
                      notification.type === 'commission' ? (isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600') :
                      isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <i className={`ri-${notification.type === 'order' ? 'shopping-bag' : notification.type === 'commission' ? 'gift' : 'check'}-line text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${textPrimary} font-medium`}>{notification.message}</p>
                      <p className={`text-xs ${textSecondary} mt-1`}>{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.1)]' : ''}`}>
          <div className={`p-6 border-b ${border}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Orders</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                  />
                  <i className={`ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`}></i>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-4 py-2 pr-8 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Customer</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Product</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Price</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Quantity</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Email</th>
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-transparent' : 'bg-white'} divide-y ${border.replace('border-', 'divide-')}`}>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={`${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${textPrimary}`}>{order.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>{order.product}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${textPrimary}`}>${order.price}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>{order.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`p-6 border-t ${border} flex items-center justify-between`}>
            <span className={`text-sm ${textSecondary}`}>
              Showing {filteredOrders.length} of {recentOrders.length} orders
            </span>
            <div className="flex items-center space-x-2">
              <button className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'} border rounded cursor-pointer hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                Previous
              </button>
              <button className={`px-3 py-1 bg-cyan-500 text-white border border-cyan-500 rounded cursor-pointer hover:bg-cyan-600 ${isDarkMode ? 'shadow-[0_0_10px_rgba(6,182,212,0.3)]' : ''}`}>
                1
              </button>
              <button className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'} border rounded cursor-pointer hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                2
              </button>
              <button className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'} border rounded cursor-pointer hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(168,85,247,0.1)]' : ''}`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Wallet Overview</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20' : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'} ${isDarkMode ? 'shadow-[0_0_15px_rgba(168,85,247,0.1)]' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>${user.walletBalance.toLocaleString()}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`}>Available Balance</div>
                  </div>
                  <div className={`w-12 h-12 ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-lg flex items-center justify-center`}>
                    <i className={`ri-wallet-line text-xl ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/deposit"
                  className={`p-3 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 text-cyan-700 hover:from-cyan-100 hover:to-blue-100'} transition-all cursor-pointer flex items-center justify-center space-x-2 ${isDarkMode ? 'shadow-[0_0_10px_rgba(6,182,212,0.2)]' : ''}`}
                >
                  <i className="ri-add-line"></i>
                  <span className="font-medium whitespace-nowrap">Deposit</span>
                </Link>
                <button className={`p-3 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 hover:from-amber-500/30 hover:to-orange-500/30' : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 hover:from-amber-100 hover:to-orange-100'} transition-all cursor-pointer flex items-center justify-center space-x-2 ${isDarkMode ? 'shadow-[0_0_10px_rgba(245,158,11,0.2)]' : ''}`}>
                  <i className="ri-bank-line"></i>
                  <span className="font-medium whitespace-nowrap">Withdraw</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} p-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(236,72,153,0.1)]' : ''}`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-6`}>Referral Program</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/20' : 'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200'} ${isDarkMode ? 'shadow-[0_0_15px_rgba(236,72,153,0.1)]' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className={`text-xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>${stats.referralCommission.toLocaleString()}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-pink-300' : 'text-pink-500'}`}>Total Commission (15%)</div>
                  </div>
                  <div className={`w-12 h-12 ${isDarkMode ? 'bg-pink-500/20' : 'bg-pink-100'} rounded-lg flex items-center justify-center`}>
                    <i className={`ri-gift-line text-xl ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}></i>
                  </div>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-pink-300' : 'text-pink-500'} mb-2`}>Referral Link:</div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`https://marketplace.com/ref/${user.username}`}
                    readOnly
                    className={`flex-1 px-3 py-2 text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-600'} border rounded focus:ring-2 focus:ring-pink-500`}
                  />
                  <button className={`px-3 py-2 ${isDarkMode ? 'bg-pink-500 hover:bg-pink-600' : 'bg-pink-500 hover:bg-pink-600'} text-white rounded transition-colors cursor-pointer whitespace-nowrap`}>
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
              </div>
              <div className={`text-sm ${textSecondary}`}>
                <p>• Earn 15% commission on every referral</p>
                <p>• 42 users referred so far</p>
                <p>• Instant commission payouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
