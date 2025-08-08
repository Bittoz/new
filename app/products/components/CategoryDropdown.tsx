'use client';

import { useState } from 'react';

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryDropdown({ selectedCategory, onCategoryChange }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'ri-apps-line' },
    { id: 'ebooks', name: 'E-Books', icon: 'ri-book-line' },
    { id: 'templates', name: 'Templates', icon: 'ri-layout-line' },
    { id: 'software', name: 'Software', icon: 'ri-computer-line' },
    { id: 'graphics', name: 'Graphics', icon: 'ri-image-line' },
    { id: 'music', name: 'Music & Audio', icon: 'ri-music-line' },
    { id: 'video', name: 'Video', icon: 'ri-video-line' },
    { id: 'courses', name: 'Online Courses', icon: 'ri-graduation-cap-line' },
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-64 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <i className={`${selectedCategoryData.icon} text-amber-600`}></i>
          </div>
          <span className="text-gray-900 font-medium">{selectedCategoryData.name}</span>
        </div>
        <i className={`ri-arrow-down-line text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedCategory === category.id ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedCategory === category.id ? 'bg-amber-200' : 'bg-gray-100'
                }`}>
                  <i className={`${category.icon} ${
                    selectedCategory === category.id ? 'text-amber-700' : 'text-gray-600'
                  }`}></i>
                </div>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}