
'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  seller: string;
  price: number;
  type: 'downloadable' | 'non_downloadable';
  warrantyHours: number;
  image: string;
}

interface PurchaseModalProps {
  product: Product;
  quantity: number;
  onClose: () => void;
}

export default function PurchaseModal({ product, quantity, onClose }: PurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState('confirm'); // confirm, processing, success, insufficient

  // Mock user wallet balance
  const [walletBalance] = useState(2847.50);
  const totalPrice = product.price * quantity;
  const hasInsufficientFunds = walletBalance < totalPrice;

  const handleConfirmPurchase = async () => {
    if (hasInsufficientFunds) {
      setPurchaseStep('insufficient');
      return;
    }

    setIsProcessing(true);
    setPurchaseStep('processing');

    // Simulate purchase processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate freezing wallet funds (escrow)
      console.log(`Freezing $${totalPrice.toFixed(2)} from wallet balance`);
      
      // Create order based on product type
      const orderData = {
        id: `ORD-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        seller: product.seller,
        quantity,
        totalPrice,
        type: product.type,
        status: product.type === 'downloadable' ? 'completed' : 'pending_seller_response',
        createdAt: new Date().toISOString(),
        warrantyHours: product.warrantyHours
      };

      // Send Telegram notification to both buyer and seller
      await sendTelegramNotifications(orderData);
      
      setPurchaseStep('success');
    } catch (error) {
      console.error('Purchase failed:', error);
      setPurchaseStep('confirm');
      setIsProcessing(false);
    }
  };

  const sendTelegramNotifications = async (orderData: any) => {
    // Mock Telegram API calls
    if (orderData.type === 'downloadable') {
      // Send download link to buyer via Telegram
      console.log('Sending download link to buyer via Telegram');
    } else {
      // Notify seller about new order
      console.log('Notifying seller about new order via Telegram');
    }
  };

  const renderConfirmStep = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Confirm Purchase</h3>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Product Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-16 h-16 object-cover object-top rounded-lg"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{product.name}</h4>
            <p className="text-sm text-gray-600">by {product.seller}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm font-medium">${product.price} × {quantity}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                product.type === 'downloadable' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {product.type === 'downloadable' ? 'Instant Download' : 'Custom Service'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Processing Fee:</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="ri-wallet-line text-amber-600"></i>
            </div>
            <div>
              <div className="font-medium text-gray-900">Wallet Balance</div>
              <div className="text-sm text-gray-600">Funds will be frozen until delivery</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${hasInsufficientFunds ? 'text-red-600' : 'text-green-600'}`}>
              ${walletBalance.toFixed(2)}
            </div>
            {hasInsufficientFunds && (
              <div className="text-xs text-red-600">Insufficient funds</div>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className={`${product.type === 'downloadable' ? 'ri-download-line' : 'ri-message-line'} text-blue-600`}></i>
          </div>
          <div>
            <div className="font-medium text-gray-900 mb-1">
              {product.type === 'downloadable' ? 'Instant Download' : 'Custom Delivery'}
            </div>
            <div className="text-sm text-gray-600">
              {product.type === 'downloadable' 
                ? 'You will receive download links immediately after payment and via Telegram.'
                : 'The seller will be notified and can accept/reject your order. You can chat with the seller via Telegram.'
              }
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <strong>Warranty:</strong> {product.warrantyHours} hours after delivery
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button 
          onClick={onClose}
          className="flex-1 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Cancel
        </button>
        <button 
          onClick={handleConfirmPurchase}
          disabled={hasInsufficientFunds || isProcessing}
          className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
        >
          {hasInsufficientFunds ? 'Insufficient Funds' : 'Confirm Purchase'}
        </button>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment...</h3>
      <p className="text-gray-600 mb-4">
        Freezing ${totalPrice.toFixed(2)} from your wallet balance
      </p>
      <div className="bg-amber-50 rounded-lg p-4 text-left">
        <div className="text-sm text-amber-800">
          <i className="ri-information-line mr-2"></i>
          Your funds are being held in escrow and will be released to the seller after successful delivery.
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="ri-check-line text-green-600 text-2xl"></i>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Purchase Successful!</h3>
      
      {product.type === 'downloadable' ? (
        <div className="space-y-4">
          <p className="text-gray-600">
            Your download links are ready and have been sent to your Telegram.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <i className="ri-download-cloud-line text-blue-600 text-xl"></i>
              <div className="text-left">
                <div className="font-medium text-gray-900">Download Links</div>
                <div className="text-sm text-gray-600">Available for {product.warrantyHours} hours</div>
              </div>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Download Now
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">
            The seller has been notified about your order and will respond soon.
          </p>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm text-orange-800 mb-3">
              <i className="ri-time-line mr-2"></i>
              Waiting for seller response...
            </div>
            <button 
              onClick={() => window.open('https://t.me/bittoz_bot', '_blank')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
            >
              <i className="ri-telegram-line"></i>
              <span>Chat on Telegram</span>
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button 
          onClick={onClose}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
        >
          Close
        </button>
      </div>
    </div>
  );

  const renderInsufficientStep = () => (
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="ri-wallet-line text-red-600 text-2xl"></i>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Insufficient Wallet Balance</h3>
      <p className="text-gray-600 mb-6">
        You need ${totalPrice.toFixed(2)} but only have ${walletBalance.toFixed(2)} in your wallet.
      </p>
      
      <div className="space-y-3">
        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
          Add Funds to Wallet
        </button>
        <button 
          onClick={onClose}
          className="w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Cancel Purchase
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {purchaseStep === 'confirm' && renderConfirmStep()}
        {purchaseStep === 'processing' && renderProcessingStep()}
        {purchaseStep === 'success' && renderSuccessStep()}
        {purchaseStep === 'insufficient' && renderInsufficientStep()}
      </div>
    </div>
  );
}
