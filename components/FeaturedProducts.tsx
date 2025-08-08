'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeaturedProducts() {
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

  const featuredProducts = [
    {
      id: 1,
      title: 'Premium Logo Design Package',
      seller: 'DesignMaster Pro',
      price: 49.99,
      rating: 4.9,
      reviews: 234,
      category: 'Graphics & Design',
      image: 'https://readdy.ai/api/search-image?query=professional%20logo%20design%20showcase%20with%20modern%20minimalist%20business%20logos%2C%20creative%20branding%20elements%2C%20vector%20graphics%2C%20clean%20white%20background%2C%20premium%20design%20portfolio%20display&width=400&height=300&seq=logo-design&orientation=landscape',
      badges: ['Best Seller', 'Premium']
    },
    {
      id: 2,
      title: 'Complete Website Development',
      seller: 'WebDevExpert',
      price: 299.99,
      rating: 4.8,
      reviews: 156,
      category: 'Programming & Tech',
      image: 'https://readdy.ai/api/search-image?query=modern%20responsive%20website%20design%20on%20multiple%20devices%2C%20web%20development%20showcase%2C%20clean%20professional%20layout%2C%20coding%20workspace%2C%20technology%20background&width=400&height=300&seq=web-dev&orientation=landscape',
      badges: ['Pro Service']
    },
    {
      id: 3,
      title: 'Social Media Marketing Bundle',
      seller: 'MarketingGuru',
      price: 89.99,
      rating: 4.7,
      reviews: 89,
      category: 'Digital Marketing',
      image: 'https://readdy.ai/api/search-image?query=social%20media%20marketing%20strategy%20with%20analytics%20dashboard%2C%20engagement%20metrics%2C%20social%20platforms%20icons%2C%20digital%20marketing%20tools%2C%20modern%20business%20environment&width=400&height=300&seq=social-marketing&orientation=landscape',
      badges: ['Popular']
    },
    {
      id: 4,
      title: 'Professional Video Editing',
      seller: 'VideoProStudio',
      price: 149.99,
      rating: 4.9,
      reviews: 312,
      category: 'Video & Animation',
      image: 'https://readdy.ai/api/search-image?query=professional%20video%20editing%20workspace%20with%20timeline%2C%20color%20correction%20tools%2C%20motion%20graphics%2C%20cinema%20quality%20footage%2C%20modern%20editing%20suite%20setup&width=400&height=300&seq=video-edit&orientation=landscape',
      badges: ['Top Rated', 'Fast Delivery']
    }
  ];

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Featured Products
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover top-rated services from our most trusted sellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`group ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl overflow-hidden border ${isDarkMode ? 'border-gray-700 hover:border-cyan-500' : 'border-gray-200 hover:border-cyan-400'} transition-all duration-300 cursor-pointer hover:scale-105 ${isDarkMode ? 'shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'shadow-lg hover:shadow-2xl'}`}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-medium rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="absolute top-3 right-3">
                  <button className={`w-8 h-8 ${isDarkMode ? 'bg-gray-900/80 hover:bg-gray-900 text-gray-300 hover:text-red-400' : 'bg-white/80 hover:bg-white text-gray-600 hover:text-red-500'} backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer`}>
                    <i className="ri-heart-line text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className={`text-xs ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} font-medium mb-2`}>
                  {product.category}
                </div>
                
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} mb-2 line-clamp-2 transition-colors`}>
                  {product.title}
                </h3>

                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  by {product.seller}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.rating}
                    </span>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${product.price}
                    </span>
                  </div>
                  <button className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap hover:scale-105`}>
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className={`inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-105 ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'}`}
          >
            <span>Browse All Products</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}