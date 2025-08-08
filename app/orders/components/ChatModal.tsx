
'use client';

import { useState, useEffect, useRef } from 'react';

interface Order {
  id: string;
  productName: string;
  seller: string;
  buyer?: string;
  orderType: 'purchase' | 'sale';
}

interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller' | 'system';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  blocked?: boolean;
}

interface ChatModalProps {
  order: Order;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ChatModal({ order, onClose, isDarkMode }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock initial messages
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: 'sys1',
        sender: 'system',
        content: `Chat started for order ${order.id}. All messages are monitored for security. Contact information sharing is blocked.`,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'system'
      },
      {
        id: 'msg1',
        sender: order.orderType === 'purchase' ? 'seller' : 'buyer',
        content: 'Hi! I\'m ready to start working on your project. Do you have any specific requirements?',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        type: 'text'
      },
      {
        id: 'msg2',
        sender: order.orderType === 'purchase' ? 'buyer' : 'seller',
        content: 'Yes, I need the design to match our brand colors. I can share the color palette.',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        type: 'text'
      },
      {
        id: 'msg3',
        sender: order.orderType === 'purchase' ? 'seller' : 'buyer',
        content: 'Perfect! Please share the details and I\'ll get started right away.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'text'
      }
    ];
    setMessages(initialMessages);
  }, [order]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const blockContactInfo = (text: string): { content: string; blocked: boolean } => {
    // Regex patterns for contact information
    const patterns = [
      /\b[\w._%+-]+@[\w.-]+\.[A-Z]{2,}\b/gi, // Email
      /\b\+?[\d\s\-().]{8,}\b/g, // Phone
      /@[\w.]+/g, // Username/handle (except @mentions in normal context)
      /\b(?:my email is|contact me at|call me|my number|whatsapp|telegram|skype)\b/gi // Contact phrases
    ];

    let blocked = false;
    let content = text;

    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        blocked = true;
        content = content.replace(pattern, '[BLOCKED]');
      }
    });

    return { content, blocked };
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const { content, blocked } = blockContactInfo(newMessage);
    
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: order.orderType === 'purchase' ? 'buyer' : 'seller',
      content,
      timestamp: new Date().toISOString(),
      type: 'text',
      blocked
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    if (blocked) {
      // Add system warning
      setTimeout(() => {
        const warningMessage: ChatMessage = {
          id: `sys-${Date.now()}`,
          sender: 'system',
          content: 'Contact information was automatically blocked. Please use this chat for all communications.',
          timestamp: new Date().toISOString(),
          type: 'system'
        };
        setMessages(prev => [...prev, warningMessage]);
      }, 500);
    }

    // Simulate other party typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'Got it, thanks for the information!',
        'I\'ll work on that and get back to you soon.',
        'Let me review this and update you.',
        'Perfect! I understand what you need.',
        'I\'ll get started on this right away.'
      ];
      
      const responseMessage: ChatMessage = {
        id: `msg-response-${Date.now()}`,
        sender: order.orderType === 'purchase' ? 'seller' : 'buyer',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSenderName = (sender: 'buyer' | 'seller' | 'system') => {
    if (sender === 'system') return 'System';
    if (order.orderType === 'purchase') {
      return sender === 'buyer' ? 'You' : order.seller;
    } else {
      return sender === 'seller' ? 'You' : (order.buyer || 'Buyer');
    }
  };

  const openTelegramChat = () => {
    // In real implementation, this would open a specific Telegram chat
    window.open('https://t.me/bittoz_bot', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl max-w-2xl w-full h-[600px] flex flex-col ${isDarkMode ? 'border' : ''}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <i className="ri-telegram-line text-white"></i>
            </div>
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.productName}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Chat with {order.orderType === 'purchase' ? order.seller : (order.buyer || 'buyer')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={openTelegramChat}
              className={`${isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'} p-2 cursor-pointer transition-all duration-200`}
              title="Open in Telegram"
            >
              <i className="ri-external-link-line"></i>
            </button>
            <button
              onClick={onClose}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} p-2 cursor-pointer transition-all duration-200`}
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'system' ? (
                <div className="text-center">
                  <div className={`${isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700'} text-xs px-3 py-2 rounded-full inline-block`}>
                    <i className="ri-information-line mr-1"></i>
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className={`flex ${
                  getSenderName(message.sender) === 'You' ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    getSenderName(message.sender) === 'You'
                      ? `bg-gradient-to-r from-amber-500 to-orange-600 text-white ${isDarkMode ? 'shadow-[0_0_10px_rgba(245,158,11,0.3)]' : ''}`
                      : `${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'}`
                  } ${message.blocked ? 'border-2 border-red-200' : ''}`}>
                    <div className="text-sm font-medium mb-1">
                      {getSenderName(message.sender)}
                    </div>
                    <div>{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      getSenderName(message.sender) === 'You' 
                        ? 'text-amber-100' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                      {message.blocked && (
                        <span className="ml-2 text-red-500">
                          <i className="ri-shield-line"></i>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className={`${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'} px-4 py-2 rounded-lg`}>
                <div className="text-sm font-medium mb-1">
                  {order.orderType === 'purchase' ? order.seller : (order.buyer || 'Buyer')}
                </div>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                  <div className={`w-2 h-2 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`w-2 h-2 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t p-4`}>
          <div className={`${isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700'} text-xs p-2 rounded mb-3`}>
            <i className="ri-shield-check-line mr-1"></i>
            Messages are monitored for security. Contact info sharing is automatically blocked.
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className={`w-full px-4 py-3 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-200'} border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200`}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-lg transition-all duration-300 cursor-pointer ${isDarkMode ? 'shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-105 disabled:transform-none disabled:shadow-none`}
            >
              <i className="ri-send-plane-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
