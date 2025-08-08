'use client';

import { useState, useEffect } from 'react';

export default function TelegramCTA() {
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

  return (
    <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-blue-600 to-purple-700'} rounded-2xl p-8 md:p-12 text-center overflow-hidden relative`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
          </div>

          <div className="relative z-10">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${isDarkMode ? 'bg-blue-500/20' : 'bg-white/20'} rounded-full mb-6`}>
              <i className={`ri-telegram-line ${isDarkMode ? 'text-blue-400' : 'text-white'} text-3xl`}></i>
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-white'} mb-4`}>
              Join Our Telegram Community
            </h2>
            
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-blue-100'} mb-8 max-w-2xl mx-auto`}>
              Get instant updates on new products, exclusive deals, and connect with thousands of buyers and sellers in our active community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-green-500/20' : 'bg-white/20'} rounded-lg flex items-center justify-center`}>
                  <i className={`ri-notification-line ${isDarkMode ? 'text-green-400' : 'text-white'} text-sm`}></i>
                </div>
                <span>Instant Deal Alerts</span>
              </div>
              
              <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-purple-500/20' : 'bg-white/20'} rounded-lg flex items-center justify-center`}>
                  <i className={`ri-group-line ${isDarkMode ? 'text-purple-400' : 'text-white'} text-sm`}></i>
                </div>
                <span>Community Support</span>
              </div>
              
              <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-cyan-500/20' : 'bg-white/20'} rounded-lg flex items-center justify-center`}>
                  <i className={`ri-star-line ${isDarkMode ? 'text-cyan-400' : 'text-white'} text-sm`}></i>
                </div>
                <span>Exclusive Content</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://t.me/marketplace_community"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100'} ${isDarkMode ? 'text-white' : 'text-gray-900'} px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-105 ${isDarkMode ? 'shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'shadow-lg hover:shadow-xl'}`}
              >
                <i className="ri-telegram-line text-2xl"></i>
                <span>Join Telegram</span>
                <span className={`px-2 py-1 ${isDarkMode ? 'bg-blue-700' : 'bg-gray-200'} rounded-full text-sm`}>
                  15,000+ Members
                </span>
              </a>

              <a
                href="https://discord.gg/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-3 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600' : 'bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white'} border px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-105`}
              >
                <i className="ri-discord-line text-2xl"></i>
                <span>Join Discord</span>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                  <div className="font-semibold mb-1">📢 Daily Updates</div>
                  <div>New products and trending deals</div>
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                  <div className="font-semibold mb-1">💬 Expert Tips</div>
                  <div>Learn from successful sellers</div>
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                  <div className="font-semibold mb-1">🎁 Exclusive Offers</div>
                  <div>Member-only discounts and bonuses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}