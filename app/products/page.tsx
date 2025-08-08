
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGrid from './components/ProductGrid';
import CategoryDropdown from './components/CategoryDropdown';
import ProductFilters from './components/ProductFilters';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState('grid');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const newIsDarkMode = savedTheme === 'dark';
    setIsDarkMode(newIsDarkMode);
    
    // Apply theme and CSS variables
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 transition-all duration-300 ${isDarkMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-gray-900'}`}>
            Browse Products
          </h1>
          <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover amazing digital products from our marketplace
          </p>
        </div>

        {/* Category Dropdown */}
        <div className="mb-6">
          <CategoryDropdown 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Filters and Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters 
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              category={selectedCategory}
              sortBy={sortBy}
              priceRange={priceRange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
