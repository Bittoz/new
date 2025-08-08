'use client';

import { useState } from 'react';

interface SellerData {
  id: string;
  displayName: string;
  avatar: string;
  rating: number;
  responseRate: number;
  averageDeliveryHours: number;
  isOnline: boolean;
}

interface SellerContactModalProps {
  seller: SellerData;
  onClose: () => void;
}

export default function SellerContactModal({ seller, onClose }: SellerContactModalProps) {
  const [message, setMessage] = useState('');
  const [contactReason, setContactReason] = useState('general');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Block contact information in the message
    const blockedPatterns = [
      /\b[\w._%+-]+@[\w.-]+\.[A-Z]{2,}\b/gi, // Email
      /\b\+?[\d\s\-().]{8,}\b/g, // Phone
      /@[\w.]+/g, // Username/handle
      /\b(?:my email is|contact me at|call me|my number|whatsapp|telegram|skype)\b/gi // Contact phrases
    ];

    let cleanMessage = message;
    let hasBlockedContent = false;

    blockedPatterns.forEach(pattern => {
      if (pattern.test(cleanMessage)) {
        hasBlockedContent = true;
        cleanMessage = cleanMessage.replace(pattern, '[BLOCKED]');
      }
    });

    if (hasBlockedContent) {
      alert('Contact information has been automatically blocked. Please use this chat system for all communication.');
      return;
    }

    // Open Telegram bot with pre-filled message
    const botUrl = 'https://t.me/bittoz_bot';
    const encodedMessage = encodeURIComponent(`Contact seller ${seller.displayName}: ${cleanMessage}`);
    
    // In a real implementation, this would:
    // 1. Create a secure chat session
    // 2. Notify the seller via Telegram
    // 3. Set up message relaying through the bot
    
    window.open(`${botUrl}?start=contact_${seller.id}`, '_blank');
    onClose();
  };

  const getQuickMessage = (reason: string) => {
    switch (reason) {
      case 'product_inquiry':
        return 'Hi! I\'m interested in one of your products and have some questions about it.';
      case 'custom_order':
        return 'Hello! I\'d like to discuss a custom order. Could you help me with this?';
      case 'support':
        return 'Hi! I need some support with a recent purchase. Could you assist me?';
      case 'collaboration':
        return 'Hello! I\'m interested in potential collaboration opportunities.';
      default:
        return '';
    }
  };

  const handleReasonChange = (reason: string) => {
    setContactReason(reason);
    setMessage(getQuickMessage(reason));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Contact Seller</h3>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={seller.avatar}
              alt={seller.displayName}
              className="w-16 h-16 rounded-full object-cover object-top"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{seller.displayName}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <i className="ri-star-fill text-amber-400"></i>
                  <span>{seller.rating}</span>
                </div>
                <span>•</span>
                <span>{seller.responseRate}% response rate</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${seller.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span>{seller.isOnline ? 'Online now' : 'Usually responds in a few hours'}</span>
              </div>
            </div>
          </div>

          {/* Contact Reason */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              What would you like to discuss?
            </label>
            <select
              value={contactReason}
              onChange={(e) => handleReasonChange(e.target.value)}
              className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="general">General inquiry</option>
              <option value="product_inquiry">Product question</option>
              <option value="custom_order">Custom order request</option>
              <option value="support">Support needed</option>
              <option value="collaboration">Collaboration opportunity</option>
            </select>
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Your message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {message.length}/500 characters
              </div>
              <div className="text-xs text-amber-600">
                Contact info sharing is blocked for security
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-check-line text-amber-600 text-sm"></i>
              </div>
              <div className="text-sm text-amber-800">
                <div className="font-medium mb-1">Secure Communication</div>
                <ul className="space-y-1 text-xs">
                  <li>• All messages are relayed through our Telegram bot</li>
                  <li>• Contact information is automatically blocked</li>
                  <li>• Communication is monitored for security</li>
                  <li>• Both parties remain anonymous until trust is established</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Expected Response Time */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-blue-600"></i>
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Expected Response Time</div>
                <div className="text-sm text-gray-600">
                  Usually responds within {seller.averageDeliveryHours < 24 ? `${seller.averageDeliveryHours} hours` : '1-2 days'}
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
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
            >
              <i className="ri-telegram-line"></i>
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}