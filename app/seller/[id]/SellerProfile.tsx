'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SellerContactModal from './components/SellerContactModal';

interface SellerBadge {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  type: 'admin_assigned' | 'purchased';
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
  category: string;
}

interface Review {
  id: string;
  buyerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  orderId: string;
  productName: string;
  verified: boolean;
}

interface SellerData {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  joinDate: string;
  totalProductsSold: number;
  averageDeliveryHours: number;
  rating: number;
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  responseRate: number;
  badges: SellerBadge[];
  products: Product[];
  reviews: Review[];
  isOnline: boolean;
  lastSeenHours: number;
}

interface SellerProfileProps {
  sellerId: string;
}

export default function SellerProfile({ sellerId }: SellerProfileProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'reviews'>('products');
  const [showContactModal, setShowContactModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock seller data - in real app, fetch based on sellerId
  const sellerData: Record<string, SellerData> = {
    'sarah-johnson': {
      id: 'sarah-johnson',
      username: 'sarah_johnson_designer',
      displayName: 'Sarah Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20designer%20portrait%20with%20friendly%20smile%20wearing%20modern%20business%20casual%20attire%20in%20bright%20studio%20lighting%20with%20clean%20background&width=200&height=200&seq=seller-avatar-1&orientation=squarish',
      joinDate: '2023-03-15',
      totalProductsSold: 1240,
      averageDeliveryHours: 18,
      rating: 4.9,
      totalReviews: 156,
      positiveReviews: 148,
      negativeReviews: 8,
      responseRate: 98,
      isOnline: true,
      lastSeenHours: 0,
      badges: [
        {
          id: 'top-seller',
          name: 'Top Seller',
          description: 'Achieved over 1000 successful sales',
          color: 'bg-yellow-500',
          icon: 'ri-trophy-line',
          type: 'admin_assigned'
        },
        {
          id: 'fast-delivery',
          name: 'Fast Delivery',
          description: 'Average delivery time under 24 hours',
          color: 'bg-green-500',
          icon: 'ri-flashlight-line',
          type: 'admin_assigned'
        },
        {
          id: 'verified-seller',
          name: 'Verified Seller',
          description: 'Identity and business verified',
          color: 'bg-blue-500',
          icon: 'ri-shield-check-line',
          type: 'admin_assigned'
        }
      ],
      products: [
        {
          id: '1',
          name: 'Complete UI/UX Design System',
          price: 49.99,
          image: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20UI%20UX%20design%20system%20interface%20components%20mockup%20with%20clean%20typography%20and%20organized%20layout%20elements%20on%20professional%20background&width=300&height=200&seq=seller-product-1&orientation=landscape',
          rating: 4.9,
          sales: 234,
          category: 'Design'
        },
        {
          id: '2',
          name: 'Mobile App UI Templates',
          price: 79.99,
          image: 'https://readdy.ai/api/search-image?query=Mobile%20application%20user%20interface%20templates%20showcase%20with%20modern%20app%20screens%20and%20clean%20design%20elements%20on%20professional%20background&width=300&height=200&seq=seller-product-2&orientation=landscape',
          rating: 4.8,
          sales: 189,
          category: 'Design'
        },
        {
          id: '3',
          name: 'Brand Identity Package',
          price: 129.99,
          image: 'https://readdy.ai/api/search-image?query=Professional%20brand%20identity%20package%20with%20logo%20designs%20business%20cards%20and%20branding%20materials%20on%20clean%20background&width=300&height=200&seq=seller-product-3&orientation=landscape',
          rating: 4.9,
          sales: 156,
          category: 'Branding'
        }
      ],
      reviews: [
        {
          id: 'rev1',
          buyerName: 'John Smith',
          rating: 5,
          title: 'Exceptional quality and fast delivery!',
          comment: 'Sarah delivered exactly what I needed for my startup. The design system is comprehensive and well-documented. Communication was excellent throughout the process.',
          date: '2024-01-18',
          orderId: 'ORD-001',
          productName: 'Complete UI/UX Design System',
          verified: true
        },
        {
          id: 'rev2',
          buyerName: 'Emma Davis',
          rating: 5,
          title: 'Amazing work, highly recommended!',
          comment: 'The mobile app templates saved me weeks of work. Clean code, beautiful design, and perfect documentation. Sarah is very professional.',
          date: '2024-01-15',
          orderId: 'ORD-002',
          productName: 'Mobile App UI Templates',
          verified: true
        },
        {
          id: 'rev3',
          buyerName: 'Mike Chen',
          rating: 4,
          title: 'Great design, minor revisions needed',
          comment: 'Overall excellent work. Had to request a few minor changes but Sarah was very responsive and made the adjustments quickly.',
          date: '2024-01-12',
          orderId: 'ORD-003',
          productName: 'Brand Identity Package',
          verified: true
        },
        {
          id: 'rev4',
          buyerName: 'Lisa Wang',
          rating: 2,
          title: 'Not what I expected',
          comment: 'The design didn\'t match my requirements despite providing detailed brief. Had to request multiple revisions. Communication could be better.',
          date: '2024-01-08',
          orderId: 'ORD-004',
          productName: 'Complete UI/UX Design System',
          verified: true
        }
      ]
    }
  };

  const seller = sellerData[sellerId] || sellerData['sarah-johnson'];
  const positivePercentage = Math.round((seller.positiveReviews / seller.totalReviews) * 100);

  const getBadgeIcon = (iconClass: string) => {
    return <i className={`${iconClass} text-white`}></i>;
  };

  const getStatusColor = () => {
    if (seller.isOnline) return 'bg-green-500';
    if (seller.lastSeenHours <= 24) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getStatusText = () => {
    if (seller.isOnline) return 'Online now';
    if (seller.lastSeenHours <= 1) return 'Last seen 1 hour ago';
    if (seller.lastSeenHours <= 24) return `Last seen ${seller.lastSeenHours} hours ago`;
    return `Last seen ${Math.floor(seller.lastSeenHours / 24)} days ago`;
  };

  const renderStars = (rating: number, size = 'text-base') => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`ri-star-${star <= rating ? 'fill' : 'line'} ${
              star <= rating ? 'text-amber-400' : 'text-gray-300'
            } ${size}`}
          ></i>
        ))}
      </div>
    );
  };

  const filteredReviews = seller.reviews.filter(review => {
    if (reviewFilter === 'positive') return review.rating >= 4;
    if (reviewFilter === 'negative') return review.rating <= 2;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seller Header */}
        <div className="bg-white rounded-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Avatar and Basic Info */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <div className="relative">
                <img
                  src={seller.avatar}
                  alt={seller.displayName}
                  className="w-32 h-32 rounded-full object-cover object-top"
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 ${getStatusColor()} border-4 border-white rounded-full`}></div>
              </div>
            </div>

            {/* Seller Details */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{seller.displayName}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <span className="flex items-center space-x-1">
                      <i className="ri-calendar-line"></i>
                      <span>Joined {new Date(seller.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                      <span>{getStatusText()}</span>
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {seller.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}
                        title={badge.description}
                      >
                        {getBadgeIcon(badge.icon)}
                        <span>{badge.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      {renderStars(Math.floor(seller.rating), 'text-lg')}
                      <span className="text-xl font-bold text-gray-900">{seller.rating}</span>
                      <span className="text-gray-600">({seller.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-telegram-line"></i>
                  <span>Contact Seller</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{seller.totalProductsSold.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{seller.products.length}</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{seller.averageDeliveryHours}h</div>
              <div className="text-sm text-gray-600">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{positivePercentage}%</div>
              <div className="text-sm text-gray-600">Positive Feedback</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{seller.responseRate}%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mb-6 bg-white rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Products ({seller.products.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Reviews ({seller.totalReviews})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'products' ? (
          /* Products Tab */
          <div>
            {seller.products.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-store-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
                <p className="text-gray-600">This seller hasn't listed any products yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seller.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover object-top"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-amber-500 text-white px-2 py-1 text-xs font-medium rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(Math.floor(product.rating), 'text-sm')}
                          <span className="text-sm text-gray-600">({product.sales})</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{product.sales} sales</span>
                        <div className="flex items-center space-x-1">
                          <i className="ri-flashlight-line text-green-500"></i>
                          <span>Fast delivery</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Reviews Tab */
          <div className="space-y-6">
            {/* Feedback Summary */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback Summary</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{seller.positiveReviews}</div>
                  <div className="text-sm text-gray-600">Positive</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{seller.negativeReviews}</div>
                  <div className="text-sm text-gray-600">Negative</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{seller.totalReviews}</div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{positivePercentage}%</div>
                  <div className="text-sm text-gray-600">Positive Rate</div>
                </div>
              </div>
            </div>

            {/* Review Filters */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Filter:</span>
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="all">All Reviews</option>
                    <option value="positive">Positive (4-5 stars)</option>
                    <option value="negative">Negative (1-2 stars)</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            {sortedReviews.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-600">No reviews match your selected filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{review.buyerName.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{review.buyerName}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center space-x-1">
                                <i className="ri-shield-check-line"></i>
                                <span>Verified</span>
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{review.productName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          {renderStars(review.rating, 'text-sm')}
                          <span className="text-sm font-medium text-gray-900">{review.rating}/5</span>
                        </div>
                        <div className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Order #{review.orderId}</span>
                      <div className="flex items-center space-x-4">
                        <button className="hover:text-gray-700 flex items-center space-x-1 cursor-pointer">
                          <i className="ri-thumb-up-line"></i>
                          <span>Helpful</span>
                        </button>
                        <button className="hover:text-gray-700 flex items-center space-x-1 cursor-pointer">
                          <i className="ri-flag-line"></i>
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <SellerContactModal
          seller={seller}
          onClose={() => setShowContactModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}