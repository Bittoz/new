
'use client';

import { useState } from 'react';

export default function Preferences() {
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    notifications: {
      email: true,
      telegram: true,
      desktop: false,
      orders: true,
      marketing: false,
      security: true
    },
    privacy: {
      profileVisible: true,
      showOnlineStatus: false,
      allowMessages: true
    }
  });

  const handleThemeChange = (theme: string) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const handleLanguageChange = (language: string) => {
    setPreferences(prev => ({ ...prev, language }));
  };

  const handleNotificationToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  const handlePrivacyToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key as keyof typeof prev.privacy]
      }
    }));
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <i className="ri-palette-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Theme Preferences</h2>
            <p className="text-gray-400 text-sm">Customize your visual experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.theme === 'dark'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded mb-3 flex items-center justify-center">
              <i className="ri-moon-line w-6 h-6 flex items-center justify-center text-purple-400"></i>
            </div>
            <div className="text-sm font-medium text-white">Dark Theme</div>
            <div className="text-xs text-gray-400">Easy on the eyes</div>
          </button>

          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.theme === 'light'
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-3 flex items-center justify-center">
              <i className="ri-sun-line w-6 h-6 flex items-center justify-center text-yellow-500"></i>
            </div>
            <div className="text-sm font-medium text-white">Light Theme</div>
            <div className="text-xs text-gray-400">Bright and clean</div>
          </button>

          <button
            onClick={() => handleThemeChange('auto')}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.theme === 'auto'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-br from-gray-800 via-gray-300 to-gray-900 rounded mb-3 flex items-center justify-center">
              <i className="ri-contrast-2-line w-6 h-6 flex items-center justify-center text-blue-400"></i>
            </div>
            <div className="text-sm font-medium text-white">Auto</div>
            <div className="text-xs text-gray-400">Follow system</div>
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <i className="ri-global-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Language Settings</h3>
            <p className="text-gray-400 text-sm">Choose your preferred language</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-3 rounded-lg border transition-all text-left ${
                preferences.language === lang.code
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{lang.flag}</span>
                <div>
                  <div className="text-sm font-medium text-white">{lang.name}</div>
                  <div className="text-xs text-gray-400 uppercase">{lang.code}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <i className="ri-notification-3-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            <p className="text-gray-400 text-sm">Manage how you receive notifications</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notification Channels */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">Notification Channels</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'email', label: 'Email', icon: 'ri-mail-line', desc: 'Receive notifications via email' },
                { key: 'telegram', label: 'Telegram', icon: 'ri-telegram-line', desc: 'Get instant Telegram messages' },
                { key: 'desktop', label: 'Desktop', icon: 'ri-computer-line', desc: 'Browser push notifications' }
              ].map((channel) => (
                <div key={channel.key} className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <i className={`${channel.icon} w-4 h-4 flex items-center justify-center text-cyan-400`}></i>
                      <span className="text-sm font-medium text-white">{channel.label}</span>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(channel.key)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        preferences.notifications[channel.key as keyof typeof preferences.notifications]
                          ? 'bg-green-500'
                          : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          preferences.notifications[channel.key as keyof typeof preferences.notifications]
                            ? 'translate-x-5'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">{channel.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">Notification Types</h4>
            <div className="space-y-3">
              {[
                { key: 'orders', label: 'Order Updates', desc: 'New orders, payments, disputes' },
                { key: 'security', label: 'Security Alerts', desc: 'Login attempts, password changes' },
                { key: 'marketing', label: 'Marketing', desc: 'Promotions, new features, newsletters' }
              ].map((type) => (
                <div key={type.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white">{type.label}</div>
                    <div className="text-xs text-gray-400">{type.desc}</div>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(type.key)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      preferences.notifications[type.key as keyof typeof preferences.notifications]
                        ? 'bg-green-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        preferences.notifications[type.key as keyof typeof preferences.notifications]
                          ? 'translate-x-5'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
            <i className="ri-shield-user-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
            <p className="text-gray-400 text-sm">Control your profile visibility and privacy</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: 'profileVisible', label: 'Public Profile', desc: 'Make your profile visible to other users' },
            { key: 'showOnlineStatus', label: 'Online Status', desc: 'Show when you are online' },
            { key: 'allowMessages', label: 'Direct Messages', desc: 'Allow other users to message you' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-white">{setting.label}</div>
                <div className="text-xs text-gray-400">{setting.desc}</div>
              </div>
              <button
                onClick={() => handlePrivacyToggle(setting.key)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  preferences.privacy[setting.key as keyof typeof preferences.privacy]
                    ? 'bg-green-500'
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    preferences.privacy[setting.key as keyof typeof preferences.privacy]
                      ? 'translate-x-5'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Data & Privacy Info */}
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <i className="ri-information-line w-5 h-5 flex items-center justify-center text-red-400 mt-0.5"></i>
            <div>
              <h4 className="text-sm font-medium text-red-400 mb-1">Data & Privacy</h4>
              <p className="text-sm text-gray-300 mb-2">
                We respect your privacy and are committed to protecting your personal data.
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="text-xs text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </button>
                <button className="text-xs text-blue-400 hover:text-blue-300 underline">
                  Data Export
                </button>
                <button className="text-xs text-red-400 hover:text-red-300 underline">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
