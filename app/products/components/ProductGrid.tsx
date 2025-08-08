
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ProductGridProps {
  category: string;
  sortBy: string;
  priceRange: number[];
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  isDarkMode: boolean;
}

export default function ProductGrid({ category, sortBy, priceRange, viewMode, onViewModeChange, isDarkMode }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const productsPerPage = 9;

  // 完整的产品数据集，模拟更多产品
  const allProducts = [
    {
      id: 1,
      name: 'Complete UI/UX Design System',
      seller: 'Sarah Johnson',
      category: 'templates',
      price: 49.99,
      originalPrice: 89.99,
      rating: 4.9,
      reviews: 156,
      sales: 1240,
      image: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20UI%20UX%20design%20system%20interface%20components%20mockup%20with%20clean%20typography%20and%20organized%20layout%20elements%20on%20professional%20background&width=300&height=200&seq=product-1&orientation=landscape',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Digital Marketing E-Book Bundle',
      seller: 'Mike Chen',
      category: 'ebooks',
      price: 29.99,
      rating: 4.8,
      reviews: 243,
      sales: 890,
      image: 'https://readdy.ai/api/search-image?query=Professional%20digital%20marketing%20ebook%20collection%20covers%20with%20modern%20business%20graphics%20and%20clean%20typography%20on%20neutral%20background&width=300&height=200&seq=product-2&orientation=landscape',
      badge: 'Hot'
    },
    {
      id: 3,
      name: 'Premium Photo Editor Software',
      seller: 'Emma Davis',
      category: 'software',
      price: 89.99,
      rating: 4.7,
      reviews: 89,
      sales: 320,
      image: 'https://readdy.ai/api/search-image?query=Advanced%20photo%20editing%20software%20interface%20screenshot%20showing%20professional%20tools%20and%20workspace%20with%20clean%20modern%20design&width=300&height=200&seq=product-3&orientation=landscape'
    },
    {
      id: 4,
      name: 'Icon Pack Collection - 500+ Icons',
      seller: 'David Wilson',
      category: 'graphics',
      price: 19.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviews: 312,
      sales: 2100,
      image: 'https://readdy.ai/api/search-image?query=Large%20collection%20of%20minimalist%20line%20icons%20arranged%20in%20organized%20grid%20showing%20various%20categories%20and%20symbols%20on%20clean%20white%20background&width=300&height=200&seq=product-4&orientation=landscape',
      badge: 'Sale'
    },
    {
      id: 5,
      name: 'Business Plan Template Set',
      seller: 'Lisa Brown',
      category: 'templates',
      price: 39.99,
      rating: 4.6,
      reviews: 178,
      sales: 560,
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20plan%20document%20templates%20with%20clean%20layout%20and%20structured%20sections%20showing%20charts%20and%20text%20areas&width=300&height=200&seq=product-5&orientation=landscape'
    },
    {
      id: 6,
      name: 'WordPress Theme Collection',
      seller: 'Tech Studios',
      category: 'templates',
      price: 79.99,
      rating: 4.8,
      reviews: 201,
      sales: 750,
      image: 'https://readdy.ai/api/search-image?query=Modern%20WordPress%20website%20themes%20showcase%20displaying%20multiple%20responsive%20designs%20with%20clean%20layouts%20and%20professional%20styling&width=300&height=200&seq=product-6&orientation=landscape'
    },
    {
      id: 7,
      name: 'Stock Photography Bundle',
      seller: 'Visual Art Co.',
      category: 'graphics',
      price: 59.99,
      rating: 4.9,
      reviews: 445,
      sales: 1680,
      image: 'https://readdy.ai/api/search-image?query=High%20quality%20stock%20photography%20collection%20showing%20various%20business%20and%20lifestyle%20images%20in%20professional%20grid%20layout&width=300&height=200&seq=product-7&orientation=landscape',
      badge: 'Popular'
    },
    {
      id: 8,
      name: 'Mobile App Development Course',
      seller: 'Code Academy',
      category: 'courses',
      price: 149.99,
      originalPrice: 299.99,
      rating: 4.7,
      reviews: 523,
      sales: 980,
      image: 'https://readdy.ai/api/search-image?query=Mobile%20app%20development%20course%20interface%20showing%20coding%20lessons%20and%20smartphone%20mockups%20with%20programming%20concepts&width=300&height=200&seq=product-8&orientation=landscape',
      badge: '50% Off'
    },
    {
      id: 9,
      name: 'Podcast Intro Music Pack',
      seller: 'Audio Masters',
      category: 'music',
      price: 24.99,
      rating: 4.8,
      reviews: 167,
      sales: 420,
      image: 'https://readdy.ai/api/search-image?query=Professional%20podcast%20intro%20music%20waveforms%20and%20audio%20equipment%20setup%20with%20modern%20studio%20background%20and%20sound%20visualization&width=300&height=200&seq=product-9&orientation=landscape'
    },
    // 第二页产品
    {
      id: 10,
      name: 'Advanced JavaScript Course',
      seller: 'Code Masters',
      category: 'courses',
      price: 129.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 298,
      sales: 756,
      image: 'https://readdy.ai/api/search-image?query=JavaScript%20programming%20course%20interface%20with%20code%20editor%20and%20learning%20materials%20on%20modern%20educational%20platform%20background&width=300&height=200&seq=product-10&orientation=landscape',
      badge: 'New'
    },
    {
      id: 11,
      name: 'Social Media Graphics Pack',
      seller: 'Creative Studio',
      category: 'graphics',
      price: 34.99,
      rating: 4.7,
      reviews: 189,
      sales: 432,
      image: 'https://readdy.ai/api/search-image?query=Social%20media%20graphics%20template%20collection%20showing%20Instagram%20posts%20and%20stories%20with%20modern%20trendy%20design%20elements&width=300&height=200&seq=product-11&orientation=landscape'
    },
    {
      id: 12,
      name: 'Email Marketing Templates',
      seller: 'Marketing Pro',
      category: 'templates',
      price: 45.99,
      rating: 4.6,
      reviews: 134,
      sales: 298,
      image: 'https://readdy.ai/api/search-image?query=Professional%20email%20marketing%20newsletter%20templates%20with%20clean%20layout%20and%20responsive%20design%20elements&width=300&height=200&seq=product-12&orientation=landscape'
    },
    {
      id: 13,
      name: 'Cryptocurrency Trading Bot',
      seller: 'FinTech Solutions',
      category: 'software',
      price: 299.99,
      originalPrice: 499.99,
      rating: 4.9,
      reviews: 567,
      sales: 1234,
      image: 'https://readdy.ai/api/search-image?query=Cryptocurrency%20trading%20bot%20interface%20showing%20charts%20and%20automated%20trading%20dashboard%20with%20professional%20financial%20design&width=300&height=200&seq=product-13&orientation=landscape',
      badge: 'Premium'
    },
    {
      id: 14,
      name: 'Logo Design Masterclass',
      seller: 'Design Academy',
      category: 'courses',
      price: 89.99,
      rating: 4.8,
      reviews: 445,
      sales: 789,
      image: 'https://readdy.ai/api/search-image?query=Logo%20design%20course%20materials%20with%20creative%20branding%20examples%20and%20design%20process%20visualization%20on%20educational%20platform&width=300&height=200&seq=product-14&orientation=landscape'
    },
    {
      id: 15,
      name: 'Video Editing Sound Effects',
      seller: 'Audio Lab',
      category: 'music',
      price: 39.99,
      rating: 4.7,
      reviews: 223,
      sales: 567,
      image: 'https://readdy.ai/api/search-image?query=Video%20editing%20sound%20effects%20library%20with%20waveforms%20and%20audio%20visualization%20on%20professional%20studio%20background&width=300&height=200&seq=product-15&orientation=landscape'
    },
    // 第三页产品
    {
      id: 16,
      name: 'React Components Library',
      seller: 'Component Hub',
      category: 'software',
      price: 99.99,
      rating: 4.9,
      reviews: 189,
      sales: 445,
      image: 'https://readdy.ai/api/search-image?query=React%20components%20library%20showcase%20with%20modern%20UI%20elements%20and%20code%20examples%20on%20developer%20workspace%20background&width=300&height=200&seq=product-16&orientation=landscape',
      badge: 'Developer Choice'
    },
    {
      id: 17,
      name: 'Fitness Tracking App Template',
      seller: 'Health Tech',
      category: 'templates',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 156,
      sales: 234,
      image: 'https://readdy.ai/api/search-image?query=Fitness%20tracking%20mobile%20app%20interface%20template%20with%20workout%20charts%20and%20health%20metrics%20on%20modern%20smartphone%20mockup&width=300&height=200&seq=product-17&orientation=landscape'
    },
    {
      id: 18,
      name: 'Digital Art Brushes Collection',
      seller: 'Digital Artists',
      category: 'graphics',
      price: 29.99,
      rating: 4.8,
      reviews: 334,
      sales: 678,
      image: 'https://readdy.ai/api/search-image?query=Digital%20art%20brushes%20collection%20showing%20various%20artistic%20brush%20strokes%20and%20textures%20for%20digital%20painting%20software&width=300&height=200&seq=product-18&orientation=landscape'
    }
  ];

  const getBadgeColor = (badge: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    switch (badge) {
      case 'Best Seller':
        return `${baseClasses} bg-green-500 text-white`;
      case 'Hot':
        return `${baseClasses} bg-red-500 text-white`;
      case 'Sale':
        return `${baseClasses} bg-amber-500 text-white`;
      case 'Popular':
        return `${baseClasses} bg-blue-500 text-white`;
      case '50% Off':
        return `${baseClasses} bg-purple-500 text-white`;
      case 'New':
        return `${baseClasses} bg-cyan-500 text-white`;
      case 'Premium':
        return `${baseClasses} bg-rose-500 text-white`;
      case 'Developer Choice':
        return `${baseClasses} bg-indigo-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const filteredProducts = allProducts.filter(product => {
    if (category !== 'all' && product.category !== category) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  // 根据页数显示产品
  const displayedProducts = filteredProducts.slice(0, currentPage * productsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleLoadMore = () => {
    if (currentPage >= totalPages) {
      setHasMoreProducts(false);
      return;
    }

    setIsLoading(true);
    
    // 模拟加载延迟
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
      
      // 检查是否还有更多产品
      if (currentPage + 1 >= totalPages) {
        setHasMoreProducts(false);
      }
      
      // 平滑滚动到新加载的产品
      setTimeout(() => {
        const newProductsStartIndex = (currentPage - 1) * productsPerPage;
        const firstNewProduct = document.querySelector(`[data-product-index="${newProductsStartIndex}"]`);
        if (firstNewProduct) {
          firstNewProduct.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }, 800);
  };

  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className={textSecondary}>
            Showing <span className="font-medium">{displayedProducts.length}</span> of <span className="font-medium">{filteredProducts.length}</span> results
            {category !== 'all' && (
              <span> in <span className="font-medium capitalize">{category}</span></span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors cursor-pointer ${
              viewMode === 'grid' 
                ? `border-amber-500 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-600'}` 
                : `${border} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${textSecondary}`
            }`}
          >
            <i className="ri-layout-grid-line"></i>
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button 
            onClick={() => onViewModeChange('list')}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors cursor-pointer ${
              viewMode === 'list' 
                ? `border-amber-500 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-600'}` 
                : `${border} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${textSecondary}`
            }`}
          >
            <i className="ri-list-unordered"></i>
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Product Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product, index) => (
            <div 
              key={product.id} 
              data-product-index={index}
              className={`${cardBg} rounded-xl ${border} border overflow-hidden hover:shadow-lg transition-all duration-200 group ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' : ''}`}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-200"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                )}
                <button className={`absolute top-3 right-3 w-8 h-8 ${isDarkMode ? 'bg-gray-800/90 hover:bg-gray-800' : 'bg-white/90 hover:bg-white'} rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 cursor-pointer`}>
                  <i className={`ri-heart-line ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`}></i>
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${textSecondary}`}>by {product.seller}</span>
                  <div className="flex items-center space-x-1">
                    <i className="ri-star-fill text-amber-400 text-sm"></i>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className={`text-sm ${textSecondary}`}>({product.reviews})</span>
                  </div>
                </div>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors`}>
                  <Link href={`/products/${product.id}`} className="cursor-pointer">
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xl font-bold ${textPrimary}`}>${product.price}</span>
                    {product.originalPrice && (
                      <span className={`text-sm ${textSecondary} line-through`}>${product.originalPrice}</span>
                    )}
                  </div>
                  <span className={`text-sm ${textSecondary}`}>{product.sales} sales</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                    Buy Now
                  </button>
                  <button className={`w-10 h-10 ${border} border rounded-lg flex items-center justify-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                    <i className={`ri-shopping-cart-line ${textSecondary}`}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedProducts.map((product, index) => (
            <div 
              key={product.id} 
              data-product-index={index}
              className={`${cardBg} rounded-xl ${border} border p-6 hover:shadow-lg transition-all duration-200 group ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' : ''}`}
            >
              <div className="flex items-start space-x-6">
                <div className="relative flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-32 h-24 object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                  {product.badge && (
                    <span className={`absolute -top-2 -left-2 ${getBadgeColor(product.badge)}`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className={`text-lg font-semibold ${textPrimary} group-hover:text-amber-600 transition-colors`}>
                          <Link href={`/products/${product.id}`} className="cursor-pointer">
                            {product.name}
                          </Link>
                        </h3>
                        <div className="flex items-center space-x-1">
                          <i className="ri-star-fill text-amber-400 text-sm"></i>
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className={`text-sm ${textSecondary}`}>({product.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 mb-3">
                        <span className={`text-sm ${textSecondary}`}>by {product.seller}</span>
                        <span className={`text-sm ${textSecondary}`}>{product.sales} sales</span>
                        <span className={`text-sm ${textSecondary} capitalize`}>{product.category}</span>
                      </div>
                      <p className={`${textSecondary} text-sm mb-4 line-clamp-2`}>
                        High-quality digital product with professional design and comprehensive features. Perfect for enhancing your projects and workflow.
                      </p>
                    </div>
                    <div className="text-right ml-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`text-xl font-bold ${textPrimary}`}>${product.price}</span>
                        {product.originalPrice && (
                          <span className={`text-sm ${textSecondary} line-through`}>${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className={`w-10 h-10 ${border} border rounded-lg flex items-center justify-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                          <i className={`ri-heart-line ${textSecondary} hover:text-red-500`}></i>
                        </button>
                        <button className={`w-10 h-10 ${border} border rounded-lg flex items-center justify-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                          <i className={`ri-shopping-cart-line ${textSecondary}`}></i>
                        </button>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      <div className="text-center mt-12">
        {hasMoreProducts ? (
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`px-8 py-3 ${border} border rounded-lg ${isDarkMode ? 'hover:bg-gray-700 disabled:bg-gray-800' : 'hover:bg-gray-50 disabled:bg-gray-100'} transition-colors cursor-pointer whitespace-nowrap disabled:cursor-not-allowed flex items-center space-x-2 mx-auto ${textPrimary}`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-500 border-t-transparent"></div>
                <span>Loading More Products...</span>
              </>
            ) : (
              <>
                <i className="ri-add-line"></i>
                <span>Load More Products ({filteredProducts.length - displayedProducts.length} remaining)</span>
              </>
            )}
          </button>
        ) : (
          <div className={`px-8 py-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg ${textSecondary} flex items-center justify-center space-x-2`}>
            <i className="ri-check-double-line text-green-500"></i>
            <span>All products loaded! You've seen all {filteredProducts.length} products in this category.</span>
          </div>
        )}
      </div>
    </div>
  );
}
