
'use client';

import { useState } from 'react';
import { AuthService } from '../../../lib/auth-service';

export default function AccountSecurity() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePassword = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword()) {
      console.log('Password update submitted');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogoutAllSessions = async () => {
    if (!showLogoutConfirm) {
      setShowLogoutConfirm(true);
      return;
    }

    setIsLoggingOut(true);
    
    try {
      // Show success message before logout
      setTimeout(async () => {
        await AuthService.logout();
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      await AuthService.logout();
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
            <i className="ri-lock-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
            <p className="text-gray-400 text-sm">Update your account password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 pr-12 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.currentPassword
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
                }`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className={`${showPasswords.current ? 'ri-eye-off-line' : 'ri-eye-line'} w-4 h-4 flex items-center justify-center`}></i>
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 pr-12 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.newPassword
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className={`${showPasswords.new ? 'ri-eye-off-line' : 'ri-eye-line'} w-4 h-4 flex items-center justify-center`}></i>
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 pr-12 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-gray-700 focus:border-cyan-500/50 focus:ring-cyan-500/20'
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className={`${showPasswords.confirm ? 'ri-eye-off-line' : 'ri-eye-line'} w-4 h-4 flex items-center justify-center`}></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-700 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center"></i>
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-white"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
              <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                twoFactorEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm mb-2">🔐 Two-factor authentication is enabled</p>
            <p className="text-gray-300 text-sm">Your account is protected with 2FA. Use your authenticator app to generate codes.</p>
          </div>
        )}

        {!twoFactorEnabled && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm mb-2">⚠️ Two-factor authentication is disabled</p>
            <p className="text-gray-300 text-sm">Enable 2FA to secure your account with an additional verification step.</p>
          </div>
        )}
      </div>

      {/* Session Management */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <i className="ri-logout-box-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Session Management</h3>
            <p className="text-gray-400 text-sm">Manage your active sessions and logout</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Current Session</h4>
                <p className="text-gray-400 text-sm">Chrome on Windows • New York, USA</p>
                <p className="text-gray-400 text-sm">Last activity: Just now</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            {!showLogoutConfirm ? (
              <button
                onClick={handleLogoutAllSessions}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer transition-all"
              >
                <i className="ri-logout-box-line w-4 h-4 flex items-center justify-center"></i>
                <span>Logout All Sessions</span>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <i className="ri-alert-line text-red-400"></i>
                    <p className="text-red-400 font-medium">Confirm Logout</p>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    You will be logged out from all devices and sessions. You'll need to login again to access your account.
                  </p>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleLogoutAllSessions}
                      disabled={isLoggingOut}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer transition-all"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Logging Out...</span>
                        </>
                      ) : (
                        <>
                          <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                          <span>Yes, Logout</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={cancelLogout}
                      disabled={isLoggingOut}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg font-medium whitespace-nowrap cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                
                {isLoggingOut && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-400 border-t-transparent"></div>
                      <p className="text-green-400">Successfully logged out! Redirecting to homepage...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Information */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <i className="ri-information-line w-5 h-5 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Account Information</h3>
            <p className="text-gray-400 text-sm">Recent login activity and account details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Last Login</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Date & Time:</span>
                <span className="text-white">Dec 15, 2024, 2:30 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">IP Address:</span>
                <span className="text-white">192.168.1.100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">New York, USA</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Device:</span>
                <span className="text-white">Chrome on Windows</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Account Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Email Verified:</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <i className="ri-check-line w-3 h-3 flex items-center justify-center"></i>
                  <span>Yes</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Phone Verified:</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <i className="ri-check-line w-3 h-3 flex items-center justify-center"></i>
                  <span>Yes</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">KYC Status:</span>
                <span className="text-green-400">Verified</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Account Level:</span>
                <span className="text-blue-400">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
