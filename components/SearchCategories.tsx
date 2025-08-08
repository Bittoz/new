'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchCategories() {
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

  const categories = [
    {
      name: 'Graphics & Design',
      icon: 'ri-palette-line',
      count: '12,450',
      color: 'from-pink-500 to-rose-500',
      bgColor: isDarkMode ? 'bg-pink-500/20' : 'bg-pink-100',
      textColor: isDarkMode ? 'text-pink-400' : 'text-pink-600'
    },
    {
      name: 'Digital Marketing',
      icon: 'ri-megaphone-line',
      count: '8,230',
      color: 'from-blue-500 to-indigo-500',
      bgColor: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
      textColor: isDarkMode ? 'text-blue-400' : 'text-blue-600'
    },
    {
      name: 'Writing & Translation',
      icon: 'ri-edit-line',
      count: '15,670',
      color: 'from-green-500 to-emerald-500',
      bgColor: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
      textColor: isDarkMode ? 'text-green-400' : 'text-green-600'
    },
    {
      name: 'Video & Animation',
      icon: 'ri-video-line',
      count: '6,890',
      color: 'from-purple-500 to-violet-500',
      bgColor: isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100',
      textColor: isDarkMode ? 'text-purple-400' : 'text-purple-600'
    },
    {
      name: 'Music & Audio',
      icon: 'ri-music-line',
      count: '4,520',
      color: 'from-orange-500 to-amber-500',
      bgColor: isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100',
      textColor: isDarkMode ? 'text-orange-400' : 'text-orange-600'
    },
    {
      name: 'Programming & Tech',
      icon: 'ri-code-line',
      count: '9,340',
      color: 'from-cyan-500 to-teal-500',
      bgColor: isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100',
      textColor: isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
    }
  ];

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Browse by Category
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Find the perfect digital services and products across all major categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
              className={`group ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700 hover:border-cyan-500' : 'border-gray-200 hover:border-cyan-400'} transition-all duration-300 cursor-pointer hover:scale-105 ${isDarkMode ? 'shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'shadow-lg hover:shadow-2xl'}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 ${category.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${category.icon} ${category.textColor} text-2xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>
                    {category.name}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                    {category.count} services available
                  </p>
                </div>
                <div className={`w-8 h-8 ${isDarkMode ? 'text-gray-600 group-hover:text-cyan-400' : 'text-gray-400 group-hover:text-cyan-600'} transition-colors`}>
                  <i className="ri-arrow-right-line text-xl"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className={`inline-flex items-center space-x-2 ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} font-medium transition-colors cursor-pointer group`}
          >
            <span>View All Categories</span>
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}