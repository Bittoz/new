
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductForm from './components/ProductForm';

export default function SellPage() {
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
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} ${themeClass}`}>
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Sell Your Product</h1>
          <p className={`${textSecondary} max-w-2xl mx-auto`}>
            Create your product listing and start selling to thousands of customers. 
            Fill out the details below to get your product live on the marketplace.
          </p>
        </div>

        {/* Form Container */}
        <div className={`${cardBg} rounded-xl ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'shadow-sm border border-gray-200'}`}>
          <ProductForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
