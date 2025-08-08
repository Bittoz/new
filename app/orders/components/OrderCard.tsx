
'use client';

interface Order {
  id: string;
  productName: string;
  productImage: string;
  seller: string;
  buyer?: string;
  type: 'downloadable' | 'non_downloadable';
  status: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  warrantyEndsAt?: string;
  downloadLink?: string;
  orderType: 'purchase' | 'sale';
}

interface OrderCardProps {
  order: Order;
  onAcceptOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onChatOpen: (order: Order) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  isDarkMode: boolean;
}

export default function OrderCard({ 
  order, 
  onAcceptOrder, 
  onRejectOrder, 
  onChatOpen, 
  getStatusColor, 
  getStatusText,
  isDarkMode
}: OrderCardProps) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWarrantyStatus = () => {
    if (!order.warrantyEndsAt) return null;
    
    const now = new Date();
    const warrantyEnd = new Date(order.warrantyEndsAt);
    const timeLeft = warrantyEnd.getTime() - now.getTime();
    const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)));
    
    if (hoursLeft <= 0) {
      return { text: 'Warranty expired', color: 'text-gray-500' };
    } else if (hoursLeft <= 24) {
      return { text: `${hoursLeft}h warranty left`, color: 'text-amber-600' };
    } else {
      const daysLeft = Math.floor(hoursLeft / 24);
      return { text: `${daysLeft}d warranty left`, color: 'text-green-600' };
    }
  };

  const warrantyStatus = getWarrantyStatus();

  const renderActionButtons = () => {
    if (order.orderType === 'sale' && order.status === 'pending_seller_response') {
      return (
        <div className="flex space-x-3">
          <button
            onClick={() => onRejectOrder(order.id)}
            className={`flex-1 border ${isDarkMode ? 'border-red-500/50 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-600 hover:bg-red-50'} py-2 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'hover:shadow-md'}`}
          >
            Reject
          </button>
          <button
            onClick={() => onAcceptOrder(order.id)}
            className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105`}
          >
            Accept Order
          </button>
        </div>
      );
    }

    if (order.type === 'downloadable' && order.status === 'completed' && order.downloadLink) {
      return (
        <button
          onClick={() => window.open(order.downloadLink, '_blank')}
          className={`w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${isDarkMode ? 'shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105`}
        >
          <i className="ri-download-line"></i>
          <span>Download</span>
        </button>
      );
    }

    if (order.type === 'non_downloadable' && ['accepted', 'in_progress'].includes(order.status)) {
      return (
        <div className="flex space-x-3">
          <button
            onClick={() => onChatOpen(order)}
            className={`flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${isDarkMode ? 'shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105`}
          >
            <i className="ri-telegram-line"></i>
            <span>Chat</span>
          </button>
          {order.orderType === 'purchase' && (
            <button className={`flex-1 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'} py-2 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'hover:shadow-md'}`}>
              Mark Complete
            </button>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 transition-all duration-200 ${isDarkMode ? 'hover:shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'hover:shadow-lg'}`}>
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <img
          src={order.productImage}
          alt={order.productName}
          className="w-20 h-20 object-cover object-top rounded-lg flex-shrink-0"
        />

        {/* Order Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>{order.productName}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {order.orderType === 'purchase' ? `by ${order.seller}` : `to ${order.buyer || 'Unknown'}`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.type === 'downloadable' 
                  ? `${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'}` 
                  : `${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'}`
              }`}>
                {order.type === 'downloadable' ? 'Digital' : 'Service'}
              </span>
            </div>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Order ID</div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.id}</div>
            </div>
            <div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Quantity</div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.quantity}</div>
            </div>
            <div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total</div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${order.totalPrice.toFixed(2)}</div>
            </div>
            <div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Date</div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(order.createdAt)}</div>
            </div>
          </div>

          {/* Warranty Status */}
          {warrantyStatus && (
            <div className="mb-4">
              <div className={`text-sm font-medium ${warrantyStatus.color}`}>
                <i className="ri-shield-check-line mr-1"></i>
                {warrantyStatus.text}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onChatOpen(order)}
              className={`text-sm ${isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'} font-medium flex items-center space-x-1 cursor-pointer transition-all duration-200`}
            >
              <i className="ri-telegram-line"></i>
              <span>Open Chat</span>
            </button>
            <div className="flex space-x-3">
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
