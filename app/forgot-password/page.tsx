'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate password reset email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Password reset instructions have been sent to your email address.');
      
      // Redirect to login after showing success message
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
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
          <div className={`${cardBg} rounded-2xl ${isDarkMode ? 'shadow-2xl border border-gray-700' : 'shadow-lg'} p-8 ${isDarkMode ? 'shadow-[0_0_30px_rgba(34,197,94,0.1)]' : ''}`}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'shadow-lg'}`}>
                <i className="ri-lock-unlock-line text-white text-2xl"></i>
              </div>
              <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Reset Password</h2>
              <p className={textSecondary}>Enter your email address and we'll send you instructions to reset your password</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="ri-error-warning-line text-red-500 dark:text-red-400"></i>
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
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

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      error && !success
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : isDarkMode 
                        ? 'border-gray-600 focus:border-green-500/50 focus:ring-green-500/20'
                        : 'border-gray-300 focus:border-green-500/50 focus:ring-green-500/20'
                    }`}
                    placeholder="Enter your email address"
                    disabled={isLoading || !!success}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className={`ri-mail-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                disabled={isLoading || !!success}
                className={`w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${
                  !isLoading && !success ? 'hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02]' : ''
                } ${isDarkMode ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'shadow-lg'}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Sending Instructions...</span>
                  </>
                ) : success ? (
                  <>
                    <i className="ri-check-line"></i>
                    <span>Instructions Sent</span>
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line"></i>
                    <span>Send Reset Instructions</span>
                  </>
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
              <div className="text-center">
                <Link 
                  href="/login" 
                  className={`text-sm ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'} transition-colors cursor-pointer flex items-center justify-center space-x-2`}
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className={`mt-6 ${isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'} rounded-lg p-4 ${isDarkMode ? 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}`}>
            <div className="flex items-start space-x-3">
              <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <i className={`ri-shield-check-line ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}></i>
              </div>
              <div>
                <h4 className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-800'} mb-1`}>Security Notice</h4>
                <p className={`text-xs ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                  If you don't receive the email within a few minutes, please check your spam folder or try again.
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