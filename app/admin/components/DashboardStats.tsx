
'use client';

import { useState, useEffect } from 'react';

export default function DashboardStats() {
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

  const stats = [
    {
      name: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'increase',
      icon: 'ri-user-line',
      color: isDarkMode ? 'from-purple-500 to-pink-500' : 'from-purple-400 to-pink-400',
      glowColor: 'rgba(168,85,247,0.4)'
    },
    {
      name: 'Total Orders',
      value: '1,429',
      change: '+8%',
      changeType: 'increase',
      icon: 'ri-shopping-cart-line',
      color: isDarkMode ? 'from-cyan-500 to-blue-500' : 'from-cyan-400 to-blue-400',
      glowColor: 'rgba(6,182,212,0.4)'
    },
    {
      name: 'Revenue',
      value: '₹5,000+',
      change: '+23%',
      changeType: 'increase',
      icon: 'ri-money-dollar-circle-line',
      color: isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-400 to-emerald-400',
      glowColor: 'rgba(16,185,129,0.4)'
    },
    {
      name: 'Products',
      value: '847',
      change: '+5%',
      changeType: 'increase',
      icon: 'ri-store-line',
      color: isDarkMode ? 'from-amber-400 to-orange-500' : 'from-amber-400 to-orange-400',
      glowColor: 'rgba(245,158,11,0.4)'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className={`rounded-xl p-6 transition-all duration-300 cursor-pointer group ${
            isDarkMode 
              ? 'bg-gray-900 border border-gray-800 shadow-2xl hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-500/30' 
              : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300'
          } hover:scale-105`}
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            boxShadow: isDarkMode ? `0 0 0 1px rgba(6,182,212,0.1), 0 4px 20px rgba(0,0,0,0.3)` : undefined
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                style={{ 
                  boxShadow: isDarkMode ? `0 0 15px ${stat.glowColor}` : '0 4px 12px rgba(0,0,0,0.1)',
                  filter: isDarkMode ? `drop-shadow(0 0 8px ${stat.glowColor})` : undefined
                }}
              >
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div>
                <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.name}
                </p>
                <p className={`text-2xl font-bold transition-all duration-300 ${isDarkMode ? 'text-white group-hover:text-cyan-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
              stat.changeType === 'increase'
                ? (isDarkMode 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                    : 'bg-green-100 text-green-800')
                : (isDarkMode 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]' 
                    : 'bg-red-100 text-red-800')
            }`}>
              {stat.change}
            </div>
          </div>
          
          {/* Neon border effect on hover */}
          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}`}></div>
        </div>
      ))}
    </div>
  );
}
