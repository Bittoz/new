
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthService } from '../lib/auth-service';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

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

    // Check authentication status
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      const userSession = AuthService.getUserSession();
      setIsAuthenticated(authenticated);
      setUser(userSession);
    };

    checkAuth();
    
    // Listen for auth changes
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      clearInterval(interval);
    };
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

  return (
    <header className={`${isDarkMode ? 'dark bg-black border-gray-800' : 'bg-white border-gray-200'} shadow-2xl border-b transition-all duration-300`} style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]' : 'shadow-lg group-hover:shadow-xl'} group-hover:scale-105`}>
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className={`text-xl font-bold font-['Pacifico'] transition-all duration-300 ${isDarkMode ? 'text-white group-hover:text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'text-gray-900 group-hover:text-cyan-600'}`}>
              MarketPlace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                {['Products', 'Sell', 'Orders', 'Wallet'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase()}`} 
                    className={`font-medium transition-all duration-200 cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'text-gray-600 hover:text-cyan-600'} hover:scale-105`}
                  >
                    {item}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]' : 'bg-gray-300 shadow-sm hover:shadow-md'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-lg transform transition-all duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'} absolute top-0.5 ${isDarkMode ? 'shadow-[0_0_8px_rgba(0,0,0,0.3)]' : ''}`}></div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800 hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'}`}
            >
              <i className="ri-menu-line"></i>
            </button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className={`px-4 py-2 border rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'text-gray-300 border-gray-600 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-gray-800' : 'text-gray-700 border-gray-300 hover:text-gray-900 hover:border-cyan-500 hover:shadow-md hover:bg-gray-50'}`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap hover:from-cyan-400 hover:to-purple-500 transform hover:scale-105 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]' : 'shadow-lg hover:shadow-xl'}`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-4 py-2 border rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'text-gray-300 border-gray-600 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-gray-800' : 'text-gray-700 border-gray-300 hover:text-gray-900 hover:border-cyan-500 hover:shadow-md hover:bg-gray-50'}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap hover:from-cyan-400 hover:to-purple-500 transform hover:scale-105 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]' : 'shadow-lg hover:shadow-xl'} flex items-center space-x-2`}
                  >
                    {user?.photoUrl && (
                      <img 
                        src={user.photoUrl} 
                        alt={user.firstName}
                        className="w-5 h-5 rounded-full object-cover object-top"
                      />
                    )}
                    <span>{user?.firstName || 'Profile'}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t mt-4 py-4 transition-all duration-300 ${isDarkMode ? 'border-gray-700 bg-gray-900/50 backdrop-blur-sm' : 'border-gray-200 bg-gray-50/80'}`}>
            <div className="flex flex-col space-y-4">
              {isAuthenticated && (
                <>
                  {['Products', 'Sell', 'Orders', 'Wallet'].map((item) => (
                    <Link 
                      key={item}
                      href={`/${item.toLowerCase()}`} 
                      className={`font-medium transition-all duration-200 cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-cyan-400 hover:pl-2' : 'text-gray-600 hover:text-cyan-600 hover:pl-2'}`}
                    >
                      {item}
                    </Link>
                  ))}
                </>
              )}
              <div className={`flex items-center space-x-3 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {!isAuthenticated ? (
                  <>
                    <Link
                      href="/login"
                      className={`flex-1 px-4 py-2 border rounded-lg font-medium text-center transition-all duration-300 cursor-pointer ${isDarkMode ? 'text-gray-300 border-gray-600 hover:text-white hover:border-cyan-500 hover:bg-gray-800' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={`flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium text-center transition-all duration-300 cursor-pointer whitespace-nowrap hover:from-cyan-400 hover:to-purple-500 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'}`}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className={`flex-1 px-4 py-2 border rounded-lg font-medium text-center transition-all duration-300 cursor-pointer ${isDarkMode ? 'text-gray-300 border-gray-600 hover:text-white hover:border-cyan-500 hover:bg-gray-800' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className={`flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium text-center transition-all duration-300 cursor-pointer whitespace-nowrap hover:from-cyan-400 hover:to-purple-500 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'}`}
                    >
                      Profile
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
