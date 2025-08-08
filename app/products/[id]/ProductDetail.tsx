
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PurchaseModal from './components/PurchaseModal';
import CartModal from '../../../components/CartModal';

interface Product {
  id: string;
  name: string;
  seller: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  sales: number;
  image: string;
  badge?: string;
  type: 'downloadable' | 'non_downloadable';
  stock: number;
  warrantyHours: number;
  maxQuantity: number;
  description: string;
  features: string[];
  tags: string[];
}

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  // Mock product data - in real app, fetch based on productId
  const products: Record<string, Product> = {
    '1': {
      id: '1',
      name: 'Complete UI/UX Design System',
      seller: 'Sarah Johnson',
      category: 'templates',
      price: 49.99,
      originalPrice: 89.99,
      rating: 4.9,
      reviews: 156,
      sales: 1240,
      image: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20UI%20UX%20design%20system%20interface%20components%20mockup%20with%20clean%20typography%20and%20organized%20layout%20elements%20on%20professional%20background&width=600&height=400&seq=product-detail-1&orientation=landscape',
      badge: 'Best Seller',
      type: 'downloadable',
      stock: 999,
      warrantyHours: 72,
      maxQuantity: 5,
      description: 'A comprehensive UI/UX design system with over 200+ components, templates, and design patterns. Perfect for designers and developers looking to create modern, professional interfaces. Includes Figma files, Sketch files, and comprehensive documentation.',
      features: [
        '200+ High-quality UI components',
        'Complete design system documentation',
        'Figma and Sketch source files',
        'Mobile responsive layouts',
        'Dark and light mode variants',
        'Free lifetime updates',
        '72-hour warranty support'
      ],
      tags: ['ui design', 'design system', 'figma', 'sketch', 'components', 'templates']
    },
    '2': {
      id: '2',
      name: 'Custom Logo Design Service',
      seller: 'Design Studio Pro',
      category: 'services',
      price: 199.99,
      rating: 4.8,
      reviews: 89,
      sales: 340,
      image: 'https://readdy.ai/api/search-image?query=Professional%20logo%20design%20service%20showcase%20with%20creative%20brand%20identity%20examples%20and%20modern%20graphic%20design%20elements%20on%20clean%20background&width=600&height=400&seq=product-detail-2&orientation=landscape',
      type: 'non_downloadable',
      stock: 10,
      warrantyHours: 168,
      maxQuantity: 1,
      description: 'Professional custom logo design service with unlimited revisions. Our expert designers will create a unique logo that perfectly represents your brand identity. Includes multiple concepts, revisions, and final files in various formats.',
      features: [
        'Custom logo design from scratch',
        'Unlimited revisions until satisfied',
        '3-5 initial concept designs',
        'All file formats (PNG, JPG, SVG, AI)',
        'Brand guidelines document',
        'Commercial usage rights',
        '7-day warranty period'
      ],
      tags: ['logo design', 'branding', 'custom design', 'professional', 'unlimited revisions']
    },
    '3': {
      id: '3',
      name: 'Premium Mobile App Template',
      seller: 'AppCraft Studio',
      category: 'templates',
      price: 79.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 203,
      sales: 856,
      image: 'https://readdy.ai/api/search-image?query=Modern%20mobile%20app%20template%20showcase%20with%20sleek%20interface%20design%20multiple%20screens%20and%20professional%20layout%20on%20clean%20background&width=600&height=400&seq=product-detail-3&orientation=landscape',
      badge: 'Hot',
      type: 'downloadable',
      stock: 999,
      warrantyHours: 48,
      maxQuantity: 3,
      description: 'A stunning mobile app template with modern design and smooth animations. Perfect for creating professional mobile applications with React Native. Includes complete source code, documentation, and design assets.',
      features: [
        'React Native source code',
        '50+ pre-built screens',
        'Clean and modern UI design',
        'Smooth animations and transitions',
        'Complete documentation',
        'Design assets included',
        '48-hour warranty support'
      ],
      tags: ['react native', 'mobile app', 'template', 'ui kit', 'animations', 'source code']
    }
  };

  const product = products[productId] || products['1'];

  // Mock user data - check if user already purchased this product
  const [userPurchasedProducts] = useState(['1', '3']); // User has already purchased products 1 and 3
  const hasPurchased = userPurchasedProducts.includes(product.id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.maxQuantity && newQuantity <= product.stock) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    setShowPurchaseModal(true);
  };

  const handleDownloadNow = () => {
    if (hasPurchased && product.type === 'downloadable') {
      setShowDownloadModal(true);
    } else {
      // If not purchased, redirect to purchase
      setShowPurchaseModal(true);
    }
  };

  const handleStartDownload = async (fileType: string) => {
    setIsDownloading(true);

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate download link based on file type
      const downloadFiles = {
        'complete': 'UI_UX_Design_System_Complete.zip',
        'figma': 'Design_System_Figma_Files.fig',
        'sketch': 'Design_System_Sketch_Files.sketch',
        'documentation': 'Design_System_Documentation.pdf'
      };

      const fileName = downloadFiles[fileType] || 'download.zip';

      // Create mock download
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,Mock download content for ${fileName}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      alert(`Successfully downloaded ${fileName}!`);
    } catch (error) {
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-green-500 text-white';
      case 'Hot':
        return 'bg-red-500 text-white';
      case 'Sale':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddToCart = async () => {
    if (addToCartLoading) return;

    setAddToCartLoading(true);

    try {
      // Simulate adding to cart process
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...cartItems];
        const newQuantity = Math.min(
          updatedItems[existingItemIndex].quantity + selectedQuantity,
          product.maxQuantity
        );
        updatedItems[existingItemIndex].quantity = newQuantity;
        setCartItems(updatedItems);
      } else {
        // Add new item to cart
        const newItem = {
          id: product.id,
          name: product.name,
          seller: product.seller,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: selectedQuantity,
          maxQuantity: product.maxQuantity,
          image: product.image,
          type: product.type
        };
        setCartItems(prev => [...prev, newItem]);
      }

      // Show success message
      const message = existingItemIndex >= 0 ? '已更新购物车中的商品数量！' : '商品已成功添加到购物车！';

      // Create temporary success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-in slide-in-from-right';
      notification.innerHTML = `
        <i class="ri-check-line"></i>
        <span>${message}</span>
      `;
      document.body.appendChild(notification);

      // Auto remove notification
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);

      // Show cart modal after brief delay
      setTimeout(() => {
        setShowCartModal(true);
      }, 500);

    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('添加到购物车失败，请重试');
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleUpdateCartQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) } : item
    ));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    setShowCartModal(false);
    // Redirect to checkout page or show purchase modal
    setShowPurchaseModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link href="/products" className="hover:text-amber-600">Products</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900 capitalize">{product.category}</span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover object-top rounded-xl"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-full ${getBadgeColor(product.badge)}`}>
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setIsInWishlist(!isInWishlist)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <i className={isInWishlist ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'}></i>
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{product.seller.charAt(0)}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{product.seller}</div>
                <div className="flex items-center space-x-1">
                  <i className="ri-star-fill text-amber-400 text-sm"></i>
                  <span className="text-sm text-gray-600">4.9 seller rating</span>
                </div>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <i className="ri-star-fill text-amber-400"></i>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{product.sales} sales</span>
              </div>
            </div>

            {/* Purchase Status */}
            {hasPurchased && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-line text-green-600"></i>
                  </div>
                  <div>
                    <div className="font-medium text-green-900">You own this product</div>
                    <div className="text-sm text-green-700">Downloaded on March 15, 2024</div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Type & Stock */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.type === 'downloadable' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                <span className="text-sm font-medium capitalize">{product.type.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-store-line text-gray-500"></i>
                <span className="text-sm">{product.stock} in stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-shield-check-line text-gray-500"></i>
                <span className="text-sm">{product.warrantyHours}h warranty</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Quantity Selection - Only show if not purchased */}
            {!hasPurchased && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Quantity (Max: {product.maxQuantity})
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(selectedQuantity - 1)}
                    disabled={selectedQuantity <= 1}
                    className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <input
                    type="number"
                    value={selectedQuantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={Math.min(product.maxQuantity, product.stock)}
                    className="w-20 h-10 border border-gray-200 rounded-lg text-center font-medium"
                  />
                  <button
                    onClick={() => handleQuantityChange(selectedQuantity + 1)}
                    disabled={selectedQuantity >= product.maxQuantity || selectedQuantity >= product.stock}
                    className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                  <span className="text-sm text-gray-600 ml-4">
                    Total: ${(product.price * selectedQuantity).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {hasPurchased && product.type === 'downloadable' ? (
                <button
                  onClick={handleDownloadNow}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
                >
                  <i className="ri-download-line"></i>
                  <span>Download Now</span>
                </button>
              ) : (
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
                >
                  <i className="ri-flashlight-line"></i>
                  <span>Buy Now - ${(product.price * selectedQuantity).toFixed(2)}</span>
                </button>
              )}

              {!hasPurchased && (
                <button
                  onClick={handleAddToCart}
                  disabled={addToCartLoading}
                  className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 disabled:opacity-70 py-4 px-6 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
                >
                  {addToCartLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-500 border-t-transparent"></div>
                      <span>添加中...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-shopping-cart-line"></i>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              )}

              {/* Cart Summary */}
              {cartItems.length > 0 && !hasPurchased && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-shopping-cart-fill text-amber-600"></i>
                      <span className="text-sm font-medium text-amber-800">
                        购物车中有 {cartItems.reduce((sum, item) => sum + item.quantity, 0)} 件商品
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCartModal(true)}
                      className="text-sm font-medium text-amber-600 hover:text-amber-700 cursor-pointer underline"
                    >
                      查看购物车
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => handleTabChange('description')}
                className={`py-4 px-1 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'description' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Description
              </button>
              <button
                onClick={() => handleTabChange('features')}
                className={`py-4 px-1 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'features' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Features
              </button>
              <button
                onClick={() => handleTabChange('reviews')}
                className={`py-4 px-1 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'reviews' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Reviews ({product.reviews})
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <i className="ri-check-line text-green-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Features & Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="ri-check-double-line text-amber-600 text-lg"></i>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {feature.split(' ').slice(0, 3).join(' ')}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {feature}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i className="ri-download-cloud-line text-amber-600 text-2xl"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instant Download</h4>
                      <p className="text-gray-600 text-sm">Get your files immediately after purchase</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i className="ri-refresh-line text-amber-600 text-2xl"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free Updates</h4>
                      <p className="text-gray-600 text-sm">Lifetime updates and improvements</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i className="ri-customer-service-line text-amber-600 text-2xl"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{product.warrantyHours}h Support</h4>
                      <p className="text-gray-600 text-sm">Professional customer support</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i className="ri-shield-check-line text-amber-600 text-2xl"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Quality Guarantee</h4>
                      <p className="text-gray-600 text-sm">100% satisfaction guaranteed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Product Type:</span>
                      <span className="font-medium text-gray-900 capitalize">{product.type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Stock Available:</span>
                      <span className="font-medium text-gray-900">{product.stock} units</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Max Quantity:</span>
                      <span className="font-medium text-gray-900">{product.maxQuantity} per order</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Warranty Period:</span>
                      <span className="font-medium text-gray-900">{product.warrantyHours} hours</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Average Rating:</span>
                      <span className="font-medium text-gray-900 flex items-center space-x-1">
                        <i className="ri-star-fill text-amber-400"></i>
                        <span>{product.rating}/5</span>
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Total Sales:</span>
                      <span className="font-medium text-gray-900">{product.sales.toLocaleString()} sold</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <i className="ri-star-fill text-amber-400"></i>
                      <span className="font-semibold text-lg">{product.rating}</span>
                    </div>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Rating Breakdown</h4>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600 w-6">{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-400 h-2 rounded-full"
                              style={{
                                width: `${stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%`
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {[/* Add reviews data here */].map((review, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">{review.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{review.name}</div>
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`ri-star-fill text-sm ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}></i>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && (
          <PurchaseModal
            product={product}
            quantity={selectedQuantity}
            onClose={() => setShowPurchaseModal(false)}
          />
        )}

        {/* Download Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Download Files</h3>
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                {/* Product Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover object-top rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">by {product.seller}</p>
                    </div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Available Downloads:</h4>

                  <button
                    onClick={() => handleStartDownload('complete')}
                    disabled={isDownloading}
                    className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-left transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="ri-archive-line text-blue-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Complete Package</div>
                          <div className="text-sm text-gray-600">All files included (ZIP, 45MB)</div>
                        </div>
                      </div>
                      <i className="ri-download-line text-blue-600"></i>
                    </div>
                  </button>

                  <button
                    onClick={() => handleStartDownload('figma')}
                    disabled={isDownloading}
                    className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-left transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <i className="ri-pantone-line text-purple-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Figma Files</div>
                          <div className="text-sm text-gray-600">Design system components (FIG, 12MB)</div>
                        </div>
                      </div>
                      <i className="ri-download-line text-purple-600"></i>
                    </div>
                  </button>

                  <button
                    onClick={() => handleStartDownload('sketch')}
                    disabled={isDownloading}
                    className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-left transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <i className="ri-pencil-ruler-line text-orange-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Sketch Files</div>
                          <div className="text-sm text-gray-600">Legacy Sketch format (SKETCH, 8MB)</div>
                        </div>
                      </div>
                      <i className="ri-download-line text-orange-600"></i>
                    </div>
                  </button>

                  <button
                    onClick={() => handleStartDownload('documentation')}
                    disabled={isDownloading}
                    className="w-full bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-left transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="ri-file-text-line text-green-600"></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Documentation</div>
                          <div className="text-sm text-gray-600">Usage guide and specs (PDF, 3MB)</div>
                        </div>
                      </div>
                      <i className="ri-download-line text-green-600"></i>
                    </div>
                  </button>
                </div>

                {/* Download Status */}
                {isDownloading && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                      <div>
                        <div className="font-medium text-blue-900">Preparing Download...</div>
                        <div className="text-sm text-blue-700">Please wait while we prepare your files</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Download Info */}
                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-information-line text-amber-600"></i>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900 mb-1">Download Information</div>
                      <div className="text-sm text-amber-800 space-y-1">
                        <div>• Downloads expire in {product.warrantyHours} hours from purchase</div>
                        <div>• All files include commercial usage rights</div>
                        <div>• Free updates will be sent via email</div>
                        <div>• Need help? Contact seller for support</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <CartModal
          isOpen={showCartModal}
          onClose={() => setShowCartModal(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToCheckout={handleProceedToCheckout}
        />

        <Footer />
      </div>
    </div>
  );
}
