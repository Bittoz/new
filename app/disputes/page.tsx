'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Dispute {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  disputedBy: 'buyer' | 'seller';
  otherParty: string;
  reason: string;
  description: string;
  status: 'pending' | 'under_review' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
  evidence: string[];
}

export default function DisputesPage() {
  const [activeTab, setActiveTab] = useState<'my_disputes' | 'create_dispute'>('my_disputes');
  const [statusFilter, setStatusFilter] = useState('all');

  const [disputes] = useState<Dispute[]>([
    {
      id: 'DSP-001',
      orderId: 'ORD-002',
      productName: 'Custom Logo Design Service',
      productImage: 'https://readdy.ai/api/search-image?query=Professional%20logo%20design%20service%20showcase%20with%20creative%20brand%20identity%20examples%20and%20modern%20graphic%20design%20elements%20on%20clean%20background&width=80&height=80&seq=dispute-1&orientation=squarish',
      disputedBy: 'buyer',
      otherParty: 'Design Studio Pro',
      reason: 'Product not as described',
      description: 'The delivered logo does not match the specifications discussed. Quality is below expectations.',
      status: 'under_review',
      createdAt: '2024-01-16T14:30:00Z',
      evidence: ['screenshot1.jpg', 'original_request.pdf']
    },
    {
      id: 'DSP-002',
      orderId: 'ORD-003',
      productName: 'React Components Library',
      productImage: 'https://readdy.ai/api/search-image?query=React%20JavaScript%20components%20code%20library%20interface%20with%20modern%20development%20tools%20and%20programming%20elements%20on%20clean%20background&width=80&height=80&seq=dispute-2&orientation=squarish',
      disputedBy: 'seller',
      otherParty: 'John Smith',
      reason: 'Buyer requesting refund without valid reason',
      description: 'Buyer is requesting a full refund after receiving and using the product for 2 weeks.',
      status: 'resolved',
      createdAt: '2024-01-10T09:15:00Z',
      resolvedAt: '2024-01-14T16:20:00Z',
      resolution: 'Dispute resolved in favor of seller. No refund issued as product was delivered as described.',
      evidence: ['delivery_confirmation.pdf', 'product_screenshots.zip']
    }
  ]);

  const [newDispute, setNewDispute] = useState({
    orderId: '',
    reason: '',
    description: '',
    evidence: [] as File[]
  });

  const disputeReasons = [
    'Product not as described',
    'Product not delivered',
    'Defective or damaged product',
    'Seller not responding',
    'Buyer requesting invalid refund',
    'Payment not received',
    'Other'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewDispute(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...files]
    }));
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting dispute:', newDispute);
    // In real app, submit dispute to backend
    alert('Dispute submitted successfully! Our team will review it within 24 hours.');
    setNewDispute({ orderId: '', reason: '', description: '', evidence: [] });
  };

  const filteredDisputes = disputes.filter(dispute => 
    statusFilter === 'all' || dispute.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dispute Resolution</h1>
          <p className="text-gray-600">Resolve issues with your orders through our mediation system</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mb-6 bg-white rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab('my_disputes')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'my_disputes'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Disputes
          </button>
          <button
            onClick={() => setActiveTab('create_dispute')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'create_dispute'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Create Dispute
          </button>
        </div>

        {activeTab === 'my_disputes' ? (
          <div className="space-y-6">
            {/* Status Filter */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Disputes List */}
            {filteredDisputes.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No disputes found</h3>
                <p className="text-gray-600 mb-6">You don't have any disputes with the selected status.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDisputes.map((dispute) => (
                  <div key={dispute.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={dispute.productImage}
                        alt={dispute.productName}
                        className="w-16 h-16 object-cover object-top rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{dispute.productName}</h3>
                            <p className="text-sm text-gray-600">
                              Order {dispute.orderId} • Dispute with {dispute.otherParty}
                            </p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(dispute.status)}`}>
                            {dispute.status.replace('_', ' ').charAt(0).toUpperCase() + dispute.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Reason</div>
                            <div className="font-medium text-gray-900">{dispute.reason}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Created</div>
                            <div className="font-medium text-gray-900">
                              {new Date(dispute.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm text-gray-500 mb-1">Description</div>
                          <p className="text-gray-900">{dispute.description}</p>
                        </div>

                        {dispute.evidence.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 mb-2">Evidence ({dispute.evidence.length} files)</div>
                            <div className="flex flex-wrap gap-2">
                              {dispute.evidence.map((file, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  <i className="ri-attachment-line mr-1"></i>
                                  {file}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {dispute.resolution && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <div className="text-sm font-medium text-green-800 mb-1">Resolution</div>
                            <p className="text-sm text-green-700">{dispute.resolution}</p>
                            <div className="text-xs text-green-600 mt-1">
                              Resolved on {new Date(dispute.resolvedAt!).toLocaleDateString()}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-3">
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 cursor-pointer">
                            <i className="ri-message-line"></i>
                            <span>View Details</span>
                          </button>
                          {dispute.status === 'under_review' && (
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 cursor-pointer">
                              <i className="ri-upload-line"></i>
                              <span>Add Evidence</span>
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
        ) : (
          /* Create Dispute Form */
          <div className="bg-white rounded-xl p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Create New Dispute</h2>
              <p className="text-gray-600">
                Our mediation team will review your case and work to resolve the issue fairly.
              </p>
            </div>

            <form onSubmit={handleSubmitDispute} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-900 mb-2">
                  Order ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={newDispute.orderId}
                  onChange={(e) => setNewDispute(prev => ({ ...prev, orderId: e.target.value }))}
                  placeholder="Enter the order ID (e.g., ORD-001)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-900 mb-2">
                  Dispute Reason <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  value={newDispute.reason}
                  onChange={(e) => setNewDispute(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                  required
                >
                  <option value="">Select a reason</option>
                  {disputeReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-line absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={newDispute.description}
                  onChange={(e) => setNewDispute(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  maxLength={1000}
                  placeholder="Provide detailed information about the issue, including timeline and specific problems..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  required
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {newDispute.description.length}/1000
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Evidence (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="ri-file-upload-line text-red-600 text-xl"></i>
                  </div>
                  <input
                    type="file"
                    id="evidence"
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt,.zip"
                    className="hidden"
                  />
                  <label htmlFor="evidence" className="cursor-pointer">
                    <span className="text-red-600 font-medium hover:text-red-700">Upload evidence files</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Images, PDFs, documents, or ZIP files (max 10MB each)
                  </p>
                  {newDispute.evidence.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {newDispute.evidence.map((file, index) => (
                        <span key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">
                          <i className="ri-attachment-line mr-1"></i>
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <i className="ri-information-line text-amber-600 mt-0.5"></i>
                  <div className="text-sm text-amber-700">
                    <div className="font-medium mb-1">Dispute Process:</div>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Our team will review your dispute within 24 hours</li>
                      <li>Both parties will be contacted for their side of the story</li>
                      <li>Resolution typically takes 3-5 business days</li>
                      <li>Funds remain in escrow until resolution</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('my_disputes')}
                  className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Submit Dispute
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}