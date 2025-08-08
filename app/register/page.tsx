'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthService } from '../../lib/auth-service';

export default function Register() {
  const [formData, setFormData] = useState({
    uid: '',
    email: '',
    password: '',
    confirmPassword: '',
    telegramUsername: '@'
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    if (AuthService.isAuthenticated()) {
      router.push('/dashboard');
      return;
    }

    // Generate UID on component mount
    const generateUID = () => {
      return String(Math.floor(100000 + Math.random() * 900000));
    };
    
    setFormData(prev => ({ ...prev, uid: generateUID() }));

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
    
    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(newIsDark);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      observer.disconnect();
    };
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle Telegram username formatting
    if (name === 'telegramUsername') {
      let newValue = value;
      if (!newValue.startsWith('@')) {
        newValue = '@' + newValue.replace('@', '');
      }
      setFormData(prev => ({ ...prev, [name]: newValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (formData.telegramUsername === '@' || formData.telegramUsername.length <= 1) {
      newErrors.telegramUsername = 'Please enter a valid Telegram username';
    } else if (formData.telegramUsername.length < 6) {
      newErrors.telegramUsername = 'Telegram username must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    setSuccess('');
    
    try {
      const result = await AuthService.registerWithCredentials(formData);
      
      if (result.success && result.user) {
        setSuccess('Account created successfully! Welcome bonus added. Redirecting...');
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setErrors({ general: result.error || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await AuthService.registerWithGoogle();
      
      if (result.success && result.user) {
        setSuccess('Google registration successful! Welcome bonus added. Redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setErrors({ general: result.error || 'Google registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'Google registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const themeClass = isDarkMode ? 'dark' : '';
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} ${themeClass}`}>
      <Header />
      
      <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full">
          <div className={`${cardBg} rounded-2xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-lg'} p-8 ${isDarkMode ? 'shadow-[0_0_30px_rgba(147,51,234,0.1)]' : ''}`}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'shadow-[0_0_20px_rgba(147,51,234,0.3)]' : 'shadow-lg'}`}>
                <i className="ri-user-add-line text-white text-2xl"></i>
              </div>
              <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Create Your Account</h2>
              <p className={textSecondary}>Join our marketplace and get $10 welcome bonus</p>
            </div>

            {/* Error Messages */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="ri-error-warning-line text-red-500 dark:text-red-400"></i>
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="ri-check-line text-green-500 dark:text-green-400"></i>
                  <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                </div>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* UID Field (Read-only) */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  User ID (UID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="uid"
                    value={`UID: ${formData.uid}`}
                    className={`w-full px-4 py-3 pr-12 bg-gray-700/30 border rounded-lg cursor-not-allowed ${
                      isDarkMode ? 'text-gray-400 border-gray-600' : 'text-gray-500 border-gray-300'
                    }`}
                    disabled
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className={`ri-lock-line ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}></i>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20'
                        : 'border-gray-300 focus:border-purple-500/50 focus:ring-purple-500/20'
                    }`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className={`ri-mail-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.password ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20'
                        : 'border-gray-300 focus:border-purple-500/50 focus:ring-purple-500/20'
                    }`}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('password')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
                  >
                    <i className={showPasswords.password ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20'
                        : 'border-gray-300 focus:border-purple-500/50 focus:ring-purple-500/20'
                    }`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
                  >
                    <i className={showPasswords.confirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Telegram Username Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Telegram Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="telegramUsername"
                    value={formData.telegramUsername}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.telegramUsername
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20'
                        : 'border-gray-300 focus:border-purple-500/50 focus:ring-purple-500/20'
                    }`}
                    placeholder="@your_username"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className={`ri-telegram-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                  </div>
                </div>
                {errors.telegramUsername && (
                  <p className="mt-1 text-sm text-red-400">{errors.telegramUsername}</p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${
                  !isLoading ? 'hover:from-purple-600 hover:to-pink-700 transform hover:scale-[1.02]' : ''
                } ${isDarkMode ? 'shadow-[0_0_20px_rgba(147,51,234,0.3)]' : 'shadow-lg'}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-user-add-line"></i>
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 ${cardBg} ${textSecondary}`}>Or register with Google</span>
                </div>
              </div>

              {/* Google Register Button */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isLoading}
                className={`w-full py-3 border-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center space-x-3 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/30' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                } ${!isLoading ? 'hover:scale-[1.02]' : ''}`}
              >
                <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Login Link */}
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
              <div className="text-center">
                <p className={`text-sm ${textSecondary}`}>
                  Already have an account?{' '}
                  <Link href="/login" className={`${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} font-medium transition-colors cursor-pointer`}>
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Bonus Info */}
          <div className={`mt-6 ${isDarkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'} rounded-lg p-4 ${isDarkMode ? 'shadow-[0_0_15px_rgba(147,51,234,0.1)]' : ''}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-lg flex items-center justify-center`}>
                <i className={`ri-gift-line ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}></i>
              </div>
              <div>
                <h4 className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-800'} mb-1`}>Welcome Bonus</h4>
                <p className={`text-xs ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                  Get $10 credit in your wallet when you complete registration!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}