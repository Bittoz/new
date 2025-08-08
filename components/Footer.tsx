
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
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

  const themeClass = isDarkMode ? 'dark' : '';
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <footer className={`${bgClass} ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'} ${themeClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'shadow-lg'}`}>
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className={`text-xl font-bold ${textPrimary} font-['Pacifico']`}>MarketPlace</span>
            </div>
            <p className={`${textSecondary} text-sm mb-4`}>
              The trusted marketplace for digital products. Buy and sell with confidence.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className={`w-10 h-10 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-cyan-600'} rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'hover:shadow-md'}`}
              >
                <i className="ri-twitter-line"></i>
              </a>
              <a
                href="#"
                className={`w-10 h-10 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-cyan-600'} rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'hover:shadow-md'}`}
              >
                <i className="ri-telegram-line"></i>
              </a>
              <a
                href="#"
                className={`w-10 h-10 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-cyan-600'} rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'hover:shadow-md'}`}
              >
                <i className="ri-discord-line"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className={`font-semibold ${textPrimary} mb-4`}>Marketplace</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/sell" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/orders" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/wallet" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Wallet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`font-semibold ${textPrimary} mb-4`}>Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/disputes" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Disputes
                </Link>
              </li>
              <li>
                <Link href="/reviews" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`font-semibold ${textPrimary} mb-4`}>Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className={`${textSecondary} hover:${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} transition-colors cursor-pointer`}>
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${border} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${textSecondary} text-sm`}>
            © 2024 MarketPlace. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className={`${textSecondary} text-sm`}>Secure payments powered by</span>
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded text-xs font-medium ${textSecondary}`}>
                SSL Encrypted
              </div>
              <div className={`px-3 py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded text-xs font-medium ${textSecondary}`}>
                Escrow Protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
