
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import SearchCategories from '../components/SearchCategories';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import TelegramCTA from '../components/TelegramCTA';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const newIsDarkMode = savedTheme === 'dark';
    setIsDarkMode(newIsDarkMode);
    
    // Apply theme classes and CSS variables
    document.documentElement.classList.toggle('dark', newIsDarkMode);
    
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
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gray-50'}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Header />
      <main>
        <Hero />
        <SearchCategories />
        <FeaturedProducts />
        <HowItWorks />
        <Testimonials />
        <TelegramCTA />
      </main>
      <Footer />
    </div>
  );
}
