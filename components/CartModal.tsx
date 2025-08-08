
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  seller: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  maxQuantity: number;
  image: string;
  type: 'downloadable' | 'non_downloadable';
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onProceedToCheckout 
}: CartModalProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onProceedToCheckout();
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <i className="ri-shopping-cart-line text-amber-500"></i>
              <span>Shopping Cart ({cartItems.length})</span>
            </h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer rounded-lg hover:bg-gray-100"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-shopping-cart-line text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">You haven't added any items to your cart yet</p>
              <button 
                onClick={onClose}
                className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover object-top rounded-lg"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600">by {item.seller}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.type === 'downloadable' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.type === 'downloadable' ? 'Digital Product' : 'Physical Product'}
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-amber-600">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <i className="ri-subtract-line text-sm"></i>
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, Math.min(item.maxQuantity, item.quantity + 1))}
                        disabled={item.quantity >= item.maxQuantity}
                        className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <i className="ri-add-line text-sm"></i>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Code Section */}
              <div className="bg-blue-50 rounded-xl p-4 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-coupon-line text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 mb-1">Have a coupon?</h4>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-300">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-secure-payment-line"></i>
                    <span>Secure Checkout</span>
                  </>
                )}
              </button>
              
              <div className="flex space-x-3">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Continue Shopping
                </button>
                <Link 
                  href="/products"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap text-center"
                  onClick={onClose}
                >
                  Browse More
                </Link>
              </div>
            </div>

            {/* Security Icons */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-1">
                  <i className="ri-shield-check-line"></i>
                  <span className="text-xs">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-lock-line"></i>
                  <span className="text-xs">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-verified-badge-line"></i>
                  <span className="text-xs">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
