
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileHeader from './components/ProfileHeader';
import ProfileInformation from './components/ProfileInformation';
import AccountSecurity from './components/AccountSecurity';
import ReferralSection from './components/ReferralSection';
import Preferences from './components/Preferences';
import SecurityLogs from './components/SecurityLogs';
import { AuthService } from '@/lib/auth-service';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlert({ type: 'success', message: 'Profile updated successfully!' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update profile. Please try again.' });
      setTimeout(() => setAlert(null), 3000);
    }
    setIsLoading(false);
  };

  const handleLogoutAllSessions = async () => {
    if (!confirm('Are you sure you want to logout from all sessions? This will sign you out from all devices and you will need to login again.')) {
      return;
    }

    setIsLoggingOut(true);
    try {
      // Show immediate feedback
      setAlert({ type: 'success', message: 'Logging out from all sessions...' });
      
      // Wait a moment to show the message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Perform logout
      await AuthService.logout();
      
      // The AuthService.logout() will handle the redirect to homepage
    } catch (error) {
      console.error('Logout error:', error);
      setAlert({ type: 'error', message: 'Failed to logout. Please try again.' });
      setTimeout(() => setAlert(null), 3000);
      setIsLoggingOut(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: 'ri-user-line' },
    { id: 'security', label: 'Security', icon: 'ri-shield-line' },
    { id: 'referral', label: 'Referral', icon: 'ri-money-dollar-circle-line' },
    { id: 'preferences', label: 'Preferences', icon: 'ri-settings-3-line' },
    { id: 'logs', label: 'Activity', icon: 'ri-history-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Alert */}
          {alert && (
            <div className={`mb-6 p-4 rounded-lg border ${
              alert.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <div className="flex items-center space-x-2">
                <i className={`${alert.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} text-lg`}></i>
                <span>{alert.message}</span>
              </div>
            </div>
          )}

          {/* Profile Header */}
          <ProfileHeader />

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-800">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    <i className={`${tab.icon} w-4 h-4 flex items-center justify-center`}></i>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid gap-6">
            {activeTab === 'profile' && <ProfileInformation />}
            {activeTab === 'security' && <AccountSecurity />}
            {activeTab === 'referral' && <ReferralSection />}
            {activeTab === 'preferences' && <Preferences />}
            {activeTab === 'logs' && <SecurityLogs />}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-save-line w-4 h-4 flex items-center justify-center"></i>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              
              <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 flex items-center space-x-2 whitespace-nowrap">
                <i className="ri-refresh-line w-4 h-4 flex items-center justify-center"></i>
                <span>Reset Fields</span>
              </button>
            </div>

            <button 
              onClick={handleLogoutAllSessions}
              disabled={isLoggingOut}
              className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg font-medium hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
            >
              {isLoggingOut ? (
                <>
                  <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                  <span>Logging Out...</span>
                </>
              ) : (
                <>
                  <i className="ri-logout-circle-line w-4 h-4 flex items-center justify-center"></i>
                  <span>Logout All Sessions</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
