
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface Transaction {
  id: string;
  type: 'deposit' | 'purchase' | 'sale' | 'withdrawal' | 'escrow_freeze' | 'escrow_release';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'frozen';
  timestamp: string;
  orderId?: string;
}

export default function WalletPage() {
  const [walletBalance] = useState(2847.50);
  const [frozenBalance] = useState(349.98);
  const [totalEarnings] = useState(5420.75);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
    
    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(newIsDark);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      type: 'escrow_freeze',
      amount: -199.99,
      description: 'Escrow freeze for Custom Logo Design Service',
      status: 'frozen',
      timestamp: '2024-01-15T14:30:00Z',
      orderId: 'ORD-002'
    },
    {
      id: 'TXN-002',
      type: 'escrow_release',
      amount: 49.99,
      description: 'Payment received for UI/UX Design System',
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      orderId: 'ORD-001'
    },
    {
      id: 'TXN-003',
      type: 'deposit',
      amount: 500.00,
      description: 'Wallet top-up via credit card',
      status: 'completed',
      timestamp: '2024-01-14T16:45:00Z'
    },
    {
      id: 'TXN-004',
      type: 'purchase',
      amount: -89.99,
      description: 'Purchase: React Components Library',
      status: 'completed',
      timestamp: '2024-01-13T09:15:00Z',
      orderId: 'ORD-003'
    },
    {
      id: 'TXN-005',
      type: 'withdrawal',
      amount: -1200.00,
      description: 'Withdrawal to bank account',
      status: 'completed',
      timestamp: '2024-01-12T11:20:00Z'
    }
  ]);

  const themeClass = isDarkMode ? 'dark' : '';
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return `ri-add-circle-line ${isDarkMode ? 'text-green-400' : 'text-green-500'}`;
      case 'purchase':
        return `ri-shopping-cart-line ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`;
      case 'sale':
        return `ri-money-dollar-circle-line ${isDarkMode ? 'text-green-400' : 'text-green-500'}`;
      case 'withdrawal':
        return `ri-bank-line ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`;
      case 'escrow_freeze':
        return `ri-lock-line ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`;
      case 'escrow_release':
        return `ri-unlock-line ${isDarkMode ? 'text-green-400' : 'text-green-500'}`;
      default:
        return `ri-exchange-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800';
      case 'pending':
        return isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800';
      case 'frozen':
        return isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800';
      default:
        return isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen ${bgClass} ${themeClass}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>My Wallet</h1>
          <p className={textSecondary}>Manage your funds and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${cardBg} rounded-xl p-6 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'shadow-sm'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                    <i className={`ri-wallet-line ${isDarkMode ? 'text-green-400' : 'text-green-600'} text-xl`}></i>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>Available</span>
                </div>
                <div className={`text-2xl font-bold ${textPrimary}`}>${walletBalance.toLocaleString()}</div>
                <div className={`text-sm ${textSecondary} mt-1`}>Ready to spend</div>
              </div>

              <div className={`${cardBg} rounded-xl p-6 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'shadow-sm'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'} rounded-lg flex items-center justify-center`}>
                    <i className={`ri-lock-line ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} text-xl`}></i>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} font-medium`}>Frozen</span>
                </div>
                <div className={`text-2xl font-bold ${textPrimary}`}>${frozenBalance.toLocaleString()}</div>
                <div className={`text-sm ${textSecondary} mt-1`}>In escrow</div>
              </div>

              <div className={`${cardBg} rounded-xl p-6 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'shadow-sm'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                    <i className={`ri-trophy-line ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-xl`}></i>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>Total Earned</span>
                </div>
                <div className={`text-2xl font-bold ${textPrimary}`}>${totalEarnings.toLocaleString()}</div>
                <div className={`text-sm ${textSecondary} mt-1`}>All time</div>
              </div>
            </div>

            {/* Transaction History */}
            <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'shadow-sm'}`}>
              <div className={`p-6 border-b ${border}`}>
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Transactions</h3>
              </div>
              <div className={`divide-y ${border.replace('border-', 'divide-')}`}>
                {transactions.map((transaction) => (
                  <div key={transaction.id} className={`p-6 ${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <i className={`${getTransactionIcon(transaction.type)} text-xl`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${textPrimary} truncate`}>
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-3">
                            <span className={`text-lg font-semibold ${
                              transaction.amount > 0 
                                ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                                : (isDarkMode ? 'text-red-400' : 'text-red-600')
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-sm ${textSecondary}`}>
                            {formatDate(transaction.timestamp)}
                            {transaction.orderId && (
                              <span className="ml-2">
                                • Order: <Link href={`/orders`} className={`${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} transition-colors`}>{transaction.orderId}</Link>
                              </span>
                            )}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`p-6 text-center border-t ${border}`}>
                <button className={`${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} font-medium cursor-pointer transition-colors`}>
                  View All Transactions
                </button>
              </div>
            </div>
          </div>

          {/* Wallet Actions */}
          <div className="space-y-6">
            <div className={`${cardBg} rounded-xl p-6 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'shadow-sm'}`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/deposit"
                  className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-[1.02]`}
                >
                  <i className="ri-add-line"></i>
                  <span>Add Funds</span>
                </Link>
                <button className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'} border py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'hover:shadow-md'}`}>
                  <i className="ri-bank-line"></i>
                  <span>Withdraw Funds</span>
                </button>
                <Link
                  href="/orders"
                  className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'} border py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'hover:shadow-md'}`}
                >
                  <i className="ri-list-check-line"></i>
                  <span>View Orders</span>
                </Link>
              </div>
            </div>

            {/* Security Notice */}
            <div className={`${isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50'} rounded-xl p-6 ${isDarkMode ? 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <i className={`ri-shield-check-line ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}></i>
                </div>
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'} mb-2`}>Security Notice</h4>
                  <div className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'} space-y-2`}>
                    <p>• Deposited funds cannot be withdrawn directly</p>
                    <p>• Only earnings from sales can be withdrawn</p>
                    <p>• Purchase funds are held in escrow until delivery</p>
                    <p>• All transactions are encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Escrow Explanation */}
            <div className={`${isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50'} rounded-xl p-6 ${isDarkMode ? 'shadow-[0_0_15px_rgba(245,158,11,0.1)]' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <i className={`ri-information-line ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}></i>
                </div>
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-amber-300' : 'text-amber-900'} mb-2`}>How Escrow Works</h4>
                  <div className={`text-sm ${isDarkMode ? 'text-amber-200' : 'text-amber-800'} space-y-1`}>
                    <p>1. Funds freeze when you make a purchase</p>
                    <p>2. Seller delivers the product/service</p>
                    <p>3. Warranty period begins after delivery</p>
                    <p>4. Funds release to seller after warranty ends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
