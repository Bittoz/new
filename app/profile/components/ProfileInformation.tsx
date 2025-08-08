
'use client';

import { useState } from 'react';

export default function ProfileInformation() {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    telegramUsername: '@johndoe_tg',
    bio: 'Experienced digital product seller with 5+ years in the marketplace.',
    location: 'New York, USA',
    website: 'https://johndoe.com'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
          <i className="ri-user-line w-5 h-5 flex items-center justify-center text-white"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          <p className="text-gray-400 text-sm">Update your personal details and information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.fullName
                ? 'border-red-500/50 focus:ring-red-500/20'
                : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Username *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-8 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.username
                  ? 'border-red-500/50 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
              }`}
              placeholder="username"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-400">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-500/50 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
              }`}
              placeholder="Enter your email"
            />
            <i className="ri-check-line absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-green-400"></i>
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.phone
                ? 'border-red-500/50 focus:ring-red-500/20'
                : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Telegram */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Telegram Username
          </label>
          <div className="relative">
            <input
              type="text"
              name="telegramUsername"
              value={formData.telegramUsername}
              className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              placeholder="Not connected"
              disabled
              readOnly
            />
            <i className="ri-telegram-line absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-blue-400"></i>
          </div>
          <p className="mt-1 text-sm text-gray-500">Telegram integration is managed automatically</p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="City, Country"
          />
        </div>

        {/* Website */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="https://yourwebsite.com"
          />
        </div>

        {/* Bio */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
            placeholder="Tell us about yourself..."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">Brief description for your profile</p>
            <span className="text-sm text-gray-400">{formData.bio.length}/500</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <i className="ri-lightbulb-line w-5 h-5 flex items-center justify-center text-cyan-400 mt-0.5"></i>
          <div>
            <h4 className="text-sm font-medium text-cyan-400 mb-1">Profile Tips</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use a professional profile picture to build trust</li>
              <li>• Keep your username short and memorable</li>
              <li>• Add a compelling bio to attract more customers</li>
              <li>• Verify your email and connect Telegram for better communication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
