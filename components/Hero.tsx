'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
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
    <section className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'} overflow-hidden`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20digital%20marketplace%20with%20floating%20geometric%20shapes%2C%20futuristic%20technology%20background%2C%20clean%20minimalist%20design%2C%20holographic%20elements%2C%20digital%20commerce%20atmosphere%2C%20professional%20lighting%2C%20gradient%20colors%20from%20cyan%20to%20purple&width=1920&height=800&seq=hero-bg&orientation=landscape')`
        }}
      >
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            The Ultimate{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Digital Marketplace
            </span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Buy and sell digital products with confidence. Secure escrow payments, instant delivery, and 24/7 support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/products"
              className={`w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]' : 'shadow-xl hover:shadow-2xl'} transform hover:scale-105`}
            >
              Browse Marketplace
            </Link>
            <Link
              href="/sell"
              className={`w-full sm:w-auto ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700' : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300'} border px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105`}
            >
              Start Selling
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-sm rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <i className={`ri-shield-check-line ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} text-2xl`}></i>
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Secure Escrow</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Funds are held securely until delivery is confirmed
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-sm rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <i className={`ri-flashlight-line ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} text-2xl`}></i>
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Instant Delivery</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Get your digital products delivered immediately
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-sm rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <i className={`ri-customer-service-line ${isDarkMode ? 'text-green-400' : 'text-green-600'} text-2xl`}></i>
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>24/7 Support</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Round-the-clock customer support for any issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}