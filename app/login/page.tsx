'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthService } from '../../lib/auth-service';

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUid: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.emailOrUid.trim()) {
      newErrors.emailOrUid = 'Email or UID is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const result = await AuthService.loginWithCredentials(formData);
      
      if (result.success && result.user) {
        setSuccess('Login successful! Redirecting...');
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setErrors({ general: result.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await AuthService.loginWithGoogle();
      
      if (result.success && result.user) {
        setSuccess('Google login successful! Redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setErrors({ general: result.error || 'Google login failed' });
      }
    } catch (error) {
      setErrors({ general: 'Google login failed' });
    } finally {
      setIsLoading(false);
    }
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
          <div className={`${cardBg} rounded-2xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-lg'} p-8 ${isDarkMode ? 'shadow-[0_0_30px_rgba(6,182,212,0.1)]' : ''}`}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'shadow-lg'}`}>
                <i className="ri-login-box-line text-white text-2xl"></i>
              </div>
              <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Welcome Back</h2>
              <p className={textSecondary}>Enter your credentials to access your account</p>
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email or UID Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Email or UID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="emailOrUid"
                    value={formData.emailOrUid}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.emailOrUid
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20'
                        : 'border-gray-300 focus:border-blue-500/50 focus:ring-blue-500/20'
                    }`}
                    placeholder="Enter email or 6-digit UID"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className={`ri-user-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                  </div>
                </div>
                {errors.emailOrUid && (
                  <p className="mt-1 text-sm text-red-400">{errors.emailOrUid}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20'
                        : 'border-gray-300 focus:border-blue-500/50 focus:ring-blue-500/20'
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
                  >
                    <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${
                  !isLoading ? 'hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02]' : ''
                } ${isDarkMode ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'shadow-lg'}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-login-box-line"></i>
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <Link 
                  href="/forgot-password" 
                  className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors cursor-pointer`}
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 ${cardBg} ${textSecondary}`}>Or login with Google</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
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

            {/* Register Link */}
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
              <div className="text-center">
                <p className={`text-sm ${textSecondary}`}>
                  Don't have an account?{' '}
                  <Link href="/register" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium transition-colors cursor-pointer`}>
                    Register here
                  </Link>
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