
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderCard from './components/OrderCard';
import ChatModal from './components/ChatModal';

interface Order {
  id: string;
  productName: string;
  productImage: string;
  seller: string;
  buyer?: string;
  type: 'downloadable' | 'non_downloadable';
  status: 'pending_seller_response' | 'accepted' | 'in_progress' | 'delivered' | 'completed' | 'cancelled' | 'disputed';
  quantity: number;
  totalPrice: number;
  createdAt: string;
  warrantyEndsAt?: string;
  downloadLink?: string;
  orderType: 'purchase' | 'sale';
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'purchases' | 'sales'>('purchases');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [orderToAccept, setOrderToAccept] = useState<Order | null>(null);
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

  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      productName: 'Complete UI/UX Design System',
      productImage: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20UI%20UX%20design%20system%20interface%20components%20mockup%20with%20clean%20typography%20and%20organized%20layout%20elements%20on%20professional%20background&width=100&height=100&seq=order-1&orientation=squarish',
      seller: 'Sarah Johnson',
      type: 'downloadable',
      status: 'completed',
      quantity: 1,
      totalPrice: 49.99,
      createdAt: '2024-01-15T10:30:00Z',
      warrantyEndsAt: '2024-01-18T10:30:00Z',
      downloadLink: 'https://example.com/download/ui-system',
      orderType: 'purchase'
    },
    {
      id: 'ORD-002',
      productName: 'Custom Logo Design Service',
      productImage: 'https://readdy.ai/api/search-image?query=Professional%20logo%20design%20service%20showcase%20with%20creative%20brand%20identity%20examples%20and%20modern%20graphic%20design%20elements%20on%20clean%20background&width=100&height=100&seq=order-2&orientation=squarish',
      seller: 'Design Studio Pro',
      type: 'non_downloadable',
      status: 'in_progress',
      quantity: 1,
      totalPrice: 199.99,
      createdAt: '2024-01-14T15:20:00Z',
      orderType: 'purchase'
    },
    {
      id: 'ORD-003',
      productName: 'React Components Library',
      productImage: 'https://readdy.ai/api/search-image?query=React%20JavaScript%20components%20code%20library%20interface%20with%20modern%20development%20tools%20and%20programming%20elements%20on%20clean%20background&width=100&height=100&seq=order-3&orientation=squarish',
      buyer: 'John Smith',
      seller: 'You',
      type: 'downloadable',
      status: 'pending_seller_response',
      quantity: 2,
      totalPrice: 158.00,
      createdAt: '2024-01-13T09:15:00Z',
      orderType: 'sale'
    }
  ]);

  const getStatusColor = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'completed':
        return `${baseClasses} ${isDarkMode ? 'bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-green-100 text-green-800'}`;
      case 'in_progress':
      case 'accepted':
        return `${baseClasses} ${isDarkMode ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-blue-100 text-blue-800'}`;
      case 'pending_seller_response':
        return `${baseClasses} ${isDarkMode ? 'bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-amber-100 text-amber-800'}`;
      case 'cancelled':
        return `${baseClasses} ${isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-800'}`;
      case 'disputed':
        return `${baseClasses} ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-800'}`;
      default:
        return `${baseClasses} ${isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_seller_response':
        return 'Pending Response';
      case 'in_progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'purchases' && order.orderType !== 'purchase') return false;
    if (activeTab === 'sales' && order.orderType !== 'sale') return false;
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    return true;
  });

  const handleAcceptOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrderToAccept(order);
      setShowAcceptModal(true);
    }
  };

  const confirmAcceptOrder = (deliveryDays: number, notes: string) => {
    if (!orderToAccept) return;

    // Update order status
    const updatedOrders = orders.map(order => 
      order.id === orderToAccept.id 
        ? { 
            ...order, 
            status: 'accepted' as const,
            // Set delivery deadline
            expectedDeliveryDate: new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000).toISOString()
          }
        : order
    );
    
    setOrders(updatedOrders);
    setShowAcceptModal(false);
    setOrderToAccept(null);
  };

  const handleRejectOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' as const }
        : order
    );
    setOrders(updatedOrders);
  };

  const handleChatOpen = (order: Order) => {
    setSelectedOrder(order);
    setShowChat(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} ${isDarkMode ? 'dark' : ''}`}>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>My Orders</h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Manage your purchases and sales</p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex items-center space-x-1 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-1 w-fit ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.1)] border border-gray-700' : 'shadow-sm'}`}>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === 'purchases'
                ? `bg-gradient-to-r from-cyan-500 to-purple-600 text-white ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'shadow-md'}`
                : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            My Purchases
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === 'sales'
                ? `bg-gradient-to-r from-cyan-500 to-purple-600 text-white ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'shadow-md'}`
                : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            My Sales
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filter by status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2 pr-8 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'hover:shadow-md'}`}
            >
              <option value="all">All Status</option>
              <option value="pending_seller_response">Pending Response</option>
              <option value="accepted">Accepted</option>
              <option value="in_progress">In Progress</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="disputed">Disputed</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 text-center ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-sm'} ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.1)]' : ''}`}>
              <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`ri-shopping-bag-line ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} text-2xl`}></i>
              </div>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                No {activeTab} found
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                {activeTab === 'purchases' 
                  ? "You haven't made any purchases yet." 
                  : "You haven't made any sales yet."
                }
              </p>
              <Link
                href={activeTab === 'purchases' ? '/products' : '/sell'}
                className={`bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105`}
              >
                {activeTab === 'purchases' ? 'Browse Products' : 'Create Listing'}
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
                onChatOpen={handleChatOpen}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                isDarkMode={isDarkMode}
              />
            ))
          )}
        </div>
      </div>

      {/* Accept Order Modal */}
      {showAcceptModal && orderToAccept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md ${isDarkMode ? 'border border-gray-700' : ''}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                <i className={`ri-check-circle-line ${isDarkMode ? 'text-green-400' : 'text-green-600'} text-xl`}></i>
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Accept Order</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order #{orderToAccept.id}</p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4 mb-6`}>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={orderToAccept.productImage}
                  alt={orderToAccept.productName}
                  className="w-12 h-12 object-cover object-top rounded-lg"
                />
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{orderToAccept.productName}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Customer: {orderToAccept.buyer}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Quantity:</span>
                  <span className={`ml-2 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{orderToAccept.quantity}</span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total:</span>
                  <span className={`ml-2 font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>${orderToAccept.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const deliveryDays = parseInt(formData.get('deliveryDays') as string);
                const notes = formData.get('notes') as string;
                confirmAcceptOrder(deliveryDays, notes);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                    Delivery Timeline
                  </label>
                  <select
                    name="deliveryDays"
                    className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg pr-8 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200`}
                    required
                  >
                    <option value="">Select delivery time</option>
                    <option value="1">1 day</option>
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">1 week</option>
                    <option value="14">2 weeks</option>
                    <option value="30">1 month</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Any special instructions or requirements..."
                    maxLength={500}
                  ></textarea>
                </div>
              </div>

              <div className={`${isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50'} rounded-lg p-4 mt-6 mb-6`}>
                <div className="flex items-start space-x-3">
                  <i className={`ri-information-line ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-0.5`}></i>
                  <div className="text-sm">
                    <h4 className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'} mb-1`}>Important:</h4>
                    <ul className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'} space-y-1 text-xs`}>
                      <li>• Payment will be held in escrow until delivery</li>
                      <li>• You'll receive payment after the warranty period ends</li>
                      <li>• Late delivery may result in order cancellation</li>
                      <li>• Customer can request refund during warranty period</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAcceptModal(false);
                    setOrderToAccept(null);
                  }}
                  className={`flex-1 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'} border py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105`}
                >
                  Accept Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && selectedOrder && (
        <ChatModal
          order={selectedOrder}
          onClose={() => {
            setShowChat(false);
            setSelectedOrder(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}

      <Footer />
    </div>
  );
}
