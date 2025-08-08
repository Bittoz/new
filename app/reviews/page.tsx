'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Review {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  reviewerName: string;
  reviewerType: 'buyer' | 'seller';
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  createdAt: string;
  verified: boolean;
  helpful: number;
  response?: {
    text: string;
    createdAt: string;
    responderName: string;
  };
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'given' | 'pending'>('received');
  const [ratingFilter, setRatingFilter] = useState('all');

  const [reviews] = useState<Review[]>([
    {
      id: 'REV-001',
      orderId: 'ORD-001',
      productId: 'PRD-001',
      productName: 'Complete UI/UX Design System',
      productImage: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20UI%20UX%20design%20system%20interface%20components%20mockup%20with%20clean%20typography%20and%20organized%20layout%20elements&width=80&height=80&seq=review-1&orientation=squarish',
      reviewerName: 'John Smith',
      reviewerType: 'buyer',
      rating: 5,
      title: 'Excellent quality and fast delivery!',
      comment: 'This design system exceeded my expectations. The components are well-organized and the documentation is clear. Highly recommend for any design project.',
      images: [
        'https://readdy.ai/api/search-image?query=UI%20design%20system%20implementation%20screenshot%20showing%20components%20in%20use%20with%20professional%20layout&width=200&height=150&seq=review-img-1&orientation=landscape'
      ],
      createdAt: '2024-01-16T10:30:00Z',
      verified: true,
      helpful: 8,
      response: {
        text: 'Thank you so much for the wonderful review! I\'m glad the design system worked well for your project.',
        createdAt: '2024-01-16T14:20:00Z',
        responderName: 'Sarah Johnson'
      }
    },
    {
      id: 'REV-002',
      orderId: 'ORD-004',
      productId: 'PRD-002',
      productName: 'Digital Marketing E-Book Bundle',
      productImage: 'https://readdy.ai/api/search-image?query=Professional%20digital%20marketing%20ebook%20cover%20design%20with%20modern%20typography%20and%20business%20graphics%20on%20clean%20background&width=80&height=80&seq=review-2&orientation=squarish',
      reviewerName: 'Emma Davis',
      reviewerType: 'buyer',
      rating: 4,
      title: 'Great content, minor formatting issues',
      comment: 'The content is very informative and well-researched. However, there were some formatting issues in Chapter 3. Overall, still a good purchase.',
      createdAt: '2024-01-15T16:45:00Z',
      verified: true,
      helpful: 3
    },
    {
      id: 'REV-003',
      orderId: 'ORD-005',
      productId: 'PRD-003',
      productName: 'Custom Logo Design',
      productImage: 'https://readdy.ai/api/search-image?query=Professional%20logo%20design%20service%20showcase%20with%20creative%20brand%20identity%20examples&width=80&height=80&seq=review-3&orientation=squarish',
      reviewerName: 'Mike Chen',
      reviewerType: 'buyer',
      rating: 2,
      title: 'Not what I expected',
      comment: 'The final design didn\'t match the brief. Communication was slow and revisions took too long. Would not recommend.',
      createdAt: '2024-01-14T09:20:00Z',
      verified: true,
      helpful: 12
    }
  ]);

  const [pendingReviews] = useState([
    {
      orderId: 'ORD-006',
      productName: 'React Components Library',
      productImage: 'https://readdy.ai/api/search-image?query=React%20JavaScript%20components%20code%20library%20interface%20with%20modern%20development%20tools&width=80&height=80&seq=pending-1&orientation=squarish',
      completedAt: '2024-01-18T12:00:00Z',
      daysLeft: 7
    },
    {
      orderId: 'ORD-007',
      productName: 'SEO Analytics Dashboard',
      productImage: 'https://readdy.ai/api/search-image?query=Modern%20SEO%20analytics%20dashboard%20interface%20with%20colorful%20charts%20and%20data%20visualization&width=80&height=80&seq=pending-2&orientation=squarish',
      completedAt: '2024-01-17T15:30:00Z',
      daysLeft: 8
    }
  ]);

  const [newReview, setNewReview] = useState({
    orderId: '',
    rating: 0,
    title: '',
    comment: '',
    images: [] as File[]
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
            disabled={!interactive}
          >
            <i className={`ri-star-${star <= rating ? 'fill' : 'line'} ${
              star <= rating ? 'text-amber-400' : 'text-gray-300'
            } text-lg`}></i>
          </button>
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (ratingFilter !== 'all' && review.rating.toString() !== ratingFilter) return false;
    return true;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewReview(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    console.log('Submitting review:', newReview);
    alert('Review submitted successfully!');
    setNewReview({ orderId: '', rating: 0, title: '', comment: '', images: [] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">Manage reviews and build your reputation</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mb-6 bg-white rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'received'
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Reviews Received
          </button>
          <button
            onClick={() => setActiveTab('given')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'given'
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Reviews Given
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending Reviews
          </button>
        </div>

        {activeTab === 'pending' ? (
          /* Pending Reviews */
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <i className="ri-information-line text-blue-600"></i>
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Review Window:</span> You have 14 days after order completion to leave a review.
                </div>
              </div>
            </div>

            {pendingReviews.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reviews</h3>
                <p className="text-gray-600">All your recent orders have been reviewed.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((pending, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={pending.productImage}
                        alt={pending.productName}
                        className="w-16 h-16 object-cover object-top rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{pending.productName}</h3>
                        <p className="text-sm text-gray-600 mb-2">Order {pending.orderId}</p>
                        <p className="text-xs text-amber-600">
                          <i className="ri-time-line mr-1"></i>
                          {pending.daysLeft} days left to review
                        </p>
                      </div>
                      <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                        Write Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Review Form */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h2>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label htmlFor="review-order" className="block text-sm font-medium text-gray-900 mb-2">
                    Order ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="review-order"
                    value={newReview.orderId}
                    onChange={(e) => setNewReview(prev => ({ ...prev, orderId: e.target.value }))}
                    placeholder="Enter order ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview(prev => ({ ...prev, rating }))
                    )}
                    <span className="text-sm text-gray-600">
                      {newReview.rating === 0 ? 'Click to rate' : `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="review-title" className="block text-sm font-medium text-gray-900 mb-2">
                    Review Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="review-title"
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Summarize your experience"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="review-comment" className="block text-sm font-medium text-gray-900 mb-2">
                    Review Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="review-comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    rows={5}
                    maxLength={1000}
                    placeholder="Share your detailed experience..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    required
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {newReview.comment.length}/1000
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <i className="ri-camera-line text-amber-600 text-xl"></i>
                    </div>
                    <input
                      type="file"
                      id="review-images"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="review-images" className="cursor-pointer">
                      <span className="text-amber-600 font-medium hover:text-amber-700">Upload photos</span>
                      <span className="text-gray-500"> to support your review</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB each</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Reviews List */
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            {/* Reviews */}
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-600">No reviews match your selected criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-16 h-16 object-cover object-top rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{review.productName}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-600">by {review.reviewerName}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                  <i className="ri-shield-check-line mr-1"></i>
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              {renderStars(review.rating)}
                              <span className={`text-sm font-medium ${getRatingColor(review.rating)}`}>
                                {review.rating}.0
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 mb-3">{review.comment}</p>

                        {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 object-cover object-top rounded-lg cursor-pointer hover:opacity-80"
                              />
                            ))}
                          </div>
                        )}

                        {review.response && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <i className="ri-reply-line text-gray-600"></i>
                              <span className="text-sm font-medium text-gray-900">
                                Response from {review.response.responderName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(review.response.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{review.response.text}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1 cursor-pointer">
                              <i className="ri-thumb-up-line"></i>
                              <span>Helpful ({review.helpful})</span>
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1 cursor-pointer">
                              <i className="ri-flag-line"></i>
                              <span>Report</span>
                            </button>
                          </div>
                          {activeTab === 'received' && !review.response && (
                            <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1 cursor-pointer">
                              <i className="ri-reply-line"></i>
                              <span>Respond</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}