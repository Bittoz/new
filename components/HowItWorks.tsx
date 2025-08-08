'use client';

import { useState, useEffect } from 'react';

export default function HowItWorks() {
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

  const steps = [
    {
      number: '01',
      title: 'Browse & Select',
      description: 'Explore thousands of digital services and products from verified sellers',
      icon: 'ri-search-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Secure Payment',
      description: 'Pay safely with our escrow system that protects both buyers and sellers',
      icon: 'ri-shield-check-line',
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '03',
      title: 'Work Delivered',
      description: 'Receive your completed project with revisions included until satisfied',
      icon: 'ri-check-double-line',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '04',
      title: 'Release Payment',
      description: 'Payment is released to the seller once you approve the final delivery',
      icon: 'ri-money-dollar-circle-line',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            How It Works
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Simple, secure, and straightforward process to get your digital projects completed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${isDarkMode ? 'shadow-xl' : 'shadow-lg'} hover:scale-105 transition-all duration-300`}
            >
              <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${step.color} mb-6 ${isDarkMode ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'shadow-lg'}`}>
                <i className={`${step.icon} text-white text-2xl`}></i>
                <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                  {step.number}
                </div>
              </div>

              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                {step.title}
              </h3>
              
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-gray-50 to-gray-100'} rounded-xl p-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'} rounded-full mb-4`}>
            <i className={`ri-customer-service-line ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} text-2xl`}></i>
          </div>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Need Help?
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Our support team is available 24/7 to assist you with any questions or concerns
          </p>
          <button className={`inline-flex items-center space-x-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'} border px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap hover:scale-105`}>
            <i className="ri-chat-3-line"></i>
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </section>
  );
}