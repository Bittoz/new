
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const newIsDarkMode = savedTheme === 'dark';
    setIsDarkMode(newIsDarkMode);
    document.documentElement.classList.toggle('dark', newIsDarkMode);
    
    // Apply CSS variables
    if (newIsDarkMode) {
      document.documentElement.style.setProperty('--bg-primary', '#0a0a0a');
      document.documentElement.style.setProperty('--bg-secondary', '#0d0d0d');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f9fafb');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#111827');
      document.documentElement.style.setProperty('--text-secondary', '#6b7280');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newIsDarkMode);
    
    // Update CSS variables
    if (newIsDarkMode) {
      document.documentElement.style.setProperty('--bg-primary', '#0a0a0a');
      document.documentElement.style.setProperty('--bg-secondary', '#0d0d0d');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f9fafb');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#111827');
      document.documentElement.style.setProperty('--text-secondary', '#6b7280');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: 'ri-dashboard-line' },
    { name: 'Users', href: '/admin/users', icon: 'ri-user-line' },
    { name: 'Products', href: '/admin/products', icon: 'ri-store-line' },
    { name: 'Orders', href: '/admin/orders', icon: 'ri-shopping-cart-line' },
    { name: 'Withdrawals', href: '/admin/withdrawals', icon: 'ri-money-dollar-circle-line' },
    { name: 'Crypto Config', href: '/admin/crypto', icon: 'ri-bitcoin-line' },
    { name: 'Settings', href: '/admin/settings', icon: 'ri-settings-line' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-black' : 'bg-gray-50'}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/75 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDarkMode ? 'bg-gray-900 border-gray-800 shadow-2xl shadow-cyan-500/10' : 'bg-white border-gray-200 shadow-lg'} border-r overflow-y-auto`} style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className={`flex items-center justify-between h-16 px-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex-shrink-0`}>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'shadow-md'}`}>
              <i className="ri-admin-line text-white text-lg"></i>
            </div>
            <span className={`font-['Pacifico'] text-xl transition-all duration-300 ${isDarkMode ? 'text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-gray-900'}`}>Admin</span>
          </div>
          
          {/* Theme Toggle in Sidebar */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`w-10 h-5 rounded-full relative transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-gray-300 shadow-sm'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-all duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'} absolute top-0.5`}></div>
            </button>
            
            <button 
              className={`lg:hidden p-2 rounded-md transition-colors cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <nav className="mt-6 px-4 flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer group ${
                    isActive(item.href)
                      ? (isDarkMode 
                          ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm')
                      : (isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                  }`}
                >
                  <i className={`${item.icon} text-lg w-5 h-5 flex items-center justify-center transition-all duration-300 ${isActive(item.href) && isDarkMode ? 'drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]' : ''} group-hover:scale-110`}></i>
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 flex-shrink-0">
          <div className={`rounded-lg p-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)]' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-amber-100'}`}>
                <i className={`ri-user-line ${isDarkMode ? 'text-white' : 'text-amber-600'}`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium transition-colors duration-300 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin User</p>
                <p className={`text-xs transition-colors duration-300 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>admin@techmarket.com</p>
              </div>
            </div>
            <button className={`mt-3 w-full text-left text-xs transition-all duration-200 cursor-pointer hover:scale-105 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-0 min-w-0">
        {/* Top bar */}
        <div className={`shadow-xl border-b transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800 shadow-cyan-500/5' : 'bg-white border-gray-200 shadow-sm'}`} style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              className={`lg:hidden p-2 rounded-md transition-all duration-200 cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'}`}
              onClick={() => setSidebarOpen(true)}
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
            
            <div className="flex items-center space-x-4 ml-auto">
              <button className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'}`}>
                <i className="ri-notification-line text-xl w-5 h-5 flex items-center justify-center"></i>
              </button>
              <Link 
                href="/" 
                className={`text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${isDarkMode ? 'text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]' : 'text-gray-600 hover:text-amber-600'}`}
              >
                View Site
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6 min-w-0" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="max-w-full overflow-x-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
