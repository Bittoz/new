
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfileHeader() {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Uploading image:', file);
      setShowImageUpload(false);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20business%20person%20smiling%20portrait%20headshot%2C%20confident%20entrepreneur%2C%20modern%20business%20attire%2C%20clean%20background%2C%20high%20quality%20professional%20photo&width=120&height=120&seq=profile1&orientation=squarish"
            alt="Profile"
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover object-top border-2 border-cyan-500/30"
          />
          <button
            onClick={() => setShowImageUpload(true)}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <i className="ri-camera-line w-4 h-4 flex items-center justify-center"></i>
          </button>

          {/* Image Upload Modal */}
          {showImageUpload && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-white mb-4">Update Profile Picture</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white file:cursor-pointer hover:file:bg-cyan-600"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setShowImageUpload(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">John Doe</h1>
              <p className="text-gray-400">@johndoe</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                Verified Seller
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                Premium User
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Wallet Balance */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Wallet Balance</span>
                <i className="ri-wallet-line w-4 h-4 flex items-center justify-center text-cyan-400"></i>
              </div>
              <div className="text-xl font-bold text-white mb-2">$2,847.50</div>
              <Link
                href="/wallet"
                className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center space-x-1"
              >
                <span>View Wallet</span>
                <i className="ri-arrow-right-line w-3 h-3 flex items-center justify-center"></i>
              </Link>
            </div>

            {/* Email Status */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Email</span>
                <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-400"></i>
              </div>
              <div className="text-sm font-medium text-white mb-2">john@example.com</div>
              <span className="text-green-400 text-sm">Verified</span>
            </div>

            {/* Telegram Status */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Telegram</span>
                <i className="ri-telegram-line w-4 h-4 flex items-center justify-center text-blue-400"></i>
              </div>
              <div className="text-sm font-medium text-white mb-2">@johndoe_tg</div>
              <span className="text-blue-400 text-sm">Connected</span>
            </div>

            {/* Member Since */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Member Since</span>
                <i className="ri-calendar-line w-4 h-4 flex items-center justify-center text-purple-400"></i>
              </div>
              <div className="text-sm font-medium text-white mb-2">Jan 2024</div>
              <span className="text-purple-400 text-sm">11 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
