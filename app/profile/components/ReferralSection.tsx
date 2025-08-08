
'use client';

import { useState } from 'react';

export default function ReferralSection() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://marketplace.com/ref/johndoe123';
  const referralCode = 'JOHNDOE123';

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareOptions = [
    {
      name: 'Telegram',
      icon: 'ri-telegram-line',
      color: 'text-blue-400',
      url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20this%20amazing%20digital%20marketplace!`
    },
    {
      name: 'WhatsApp',
      icon: 'ri-whatsapp-line',
      color: 'text-green-400',
      url: `https://wa.me/?text=${encodeURIComponent(`Join this amazing digital marketplace! ${referralLink}`)}`
    },
    {
      name: 'Twitter',
      icon: 'ri-twitter-x-line',
      color: 'text-gray-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this digital marketplace! ${referralLink}`)}`
    },
    {
      name: 'Facebook',
      icon: 'ri-facebook-line',
      color: 'text-blue-500',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <i className="ri-money-dollar-circle-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Referral Program</h2>
            <p className="text-gray-400 text-sm">Earn rewards by inviting friends</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-group-line w-6 h-6 flex items-center justify-center text-green-400"></i>
            </div>
            <div className="text-2xl font-bold text-white mb-1">47</div>
            <div className="text-sm text-gray-400">Total Referrals</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-user-add-line w-6 h-6 flex items-center justify-center text-blue-400"></i>
            </div>
            <div className="text-2xl font-bold text-white mb-1">12</div>
            <div className="text-sm text-gray-400">Active This Month</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-coins-line w-6 h-6 flex items-center justify-center text-purple-400"></i>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$1,248</div>
            <div className="text-sm text-gray-400">Total Earnings</div>
          </div>
        </div>

        {/* Commission Rate */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <i className="ri-percent-line w-5 h-5 flex items-center justify-center text-green-400"></i>
            <div>
              <h4 className="text-sm font-medium text-green-400">Your Commission Rate</h4>
              <p className="text-lg font-bold text-white">15% <span className="text-sm font-normal text-gray-400">per successful referral</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Links */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Referral Links</h3>
        
        {/* Referral Link */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Referral Link</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm"
              />
              <button
                onClick={() => copyToClipboard(referralLink, 'link')}
                className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex items-center space-x-2 whitespace-nowrap"
              >
                <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} w-4 h-4 flex items-center justify-center`}></i>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Referral Code</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(referralCode, 'code')}
                className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center space-x-2 whitespace-nowrap"
              >
                <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} w-4 h-4 flex items-center justify-center`}></i>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Share via</h4>
          <div className="flex flex-wrap gap-3">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <i className={`${option.icon} w-4 h-4 flex items-center justify-center ${option.color}`}></i>
                <span className="text-white text-sm">{option.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Referrals</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Alice Johnson', joined: '2 days ago', status: 'Active', earnings: '$45.00' },
            { name: 'Mike Chen', joined: '5 days ago', status: 'Active', earnings: '$32.50' },
            { name: 'Sarah Wilson', joined: '1 week ago', status: 'Pending', earnings: '$0.00' },
            { name: 'David Brown', joined: '2 weeks ago', status: 'Active', earnings: '$67.80' },
            { name: 'Emma Davis', joined: '3 weeks ago', status: 'Active', earnings: '$23.20' }
          ].map((referral, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{referral.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{referral.name}</div>
                  <div className="text-xs text-gray-400">Joined {referral.joined}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  referral.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {referral.status}
                </span>
                <span className="text-sm font-medium text-white">{referral.earnings}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <i className="ri-information-line w-5 h-5 flex items-center justify-center text-blue-400 mt-0.5"></i>
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2">How It Works</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Share your referral link or code with friends</li>
                <li>• They sign up and make their first purchase</li>
                <li>• You earn 15% commission on their transaction fees</li>
                <li>• Payments are processed monthly to your wallet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
