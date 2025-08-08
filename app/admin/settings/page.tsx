
'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

function AdminSettings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const newIsDarkMode = savedTheme === 'dark';
    setIsDarkMode(newIsDarkMode);
  }, []);

  const tabs = [
    { id: 'appearance', label: 'Appearance & Theme', icon: 'ri-palette-line' },
    { id: 'authentication', label: 'Authentication', icon: 'ri-shield-user-line' },
    { id: 'admin-actions', label: 'Admin Actions', icon: 'ri-tools-line' },
    { id: 'user-activity', label: 'User Management', icon: 'ri-user-settings-line' },
    { id: 'pages', label: 'Page Management', icon: 'ri-pages-line' },
    { id: 'features', label: 'Feature Toggles', icon: 'ri-toggle-line' },
    { id: 'messaging', label: 'Messaging', icon: 'ri-message-line' },
    { id: 'analytics', label: 'Analytics & Logs', icon: 'ri-bar-chart-line' },
    { id: 'developer', label: 'Developer Tools', icon: 'ri-code-line' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1
            className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold transition-all duration-300 ${
              isDarkMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''
            }`}
          >
            Site Settings
          </h1>
          <p
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300 mt-1`}
          >
            Complete control over your marketplace customization and features
          </p>
        </div>

        {/* Mobile Tab Dropdown */}
        <div className="lg:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className={`w-full border rounded-lg px-3 py-3 pr-8 transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Tab Navigation */}
        <div
          className={`hidden lg:block ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm`}
        >
          <nav className="flex flex-wrap p-1" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap rounded-lg m-0.5 ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-amber-500 text-white shadow-md'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} w-4 h-4 flex items-center justify-center`}></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          {activeTab === 'appearance' && <AppearanceSettings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          {activeTab === 'authentication' && <AuthenticationSettings isDarkMode={isDarkMode} />}
          {activeTab === 'admin-actions' && <AdminActions isDarkMode={isDarkMode} />}
          {activeTab === 'user-activity' && <UserManagement isDarkMode={isDarkMode} />}
          {activeTab === 'pages' && <PageManagement isDarkMode={isDarkMode} />}
          {activeTab === 'features' && <FeatureToggles isDarkMode={isDarkMode} />}
          {activeTab === 'messaging' && <MessagingSettings isDarkMode={isDarkMode} />}
          {activeTab === 'analytics' && <AnalyticsLogs isDarkMode={isDarkMode} />}
          {activeTab === 'developer' && <DeveloperTools isDarkMode={isDarkMode} />}
        </div>
      </div>
    </AdminLayout>
  );
}

function AppearanceSettings({ isDarkMode, setIsDarkMode }) {
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');
  const [primaryColor, setPrimaryColor] = useState('#f59e0b');
  const [logoUrl, setLogoUrl] = useState('');
  const [favicon, setFavicon] = useState('');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('16');
  const [layoutPadding, setLayoutPadding] = useState('24');
  const [containerWidth, setContainerWidth] = useState('1200');
  const [isSaving, setIsSaving] = useState(false);
  const [customColors, setCustomColors] = useState({
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#d1d5db',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  });

  const colorOptions = [
    { name: 'Amber', value: '#f59e0b', gradient: 'from-amber-400 to-orange-500' },
    { name: 'Blue', value: '#3b82f6', gradient: 'from-blue-400 to-indigo-500' },
    { name: 'Purple', value: '#8b5cf6', gradient: 'from-purple-400 to-pink-500' },
    { name: 'Green', value: '#10b981', gradient: 'from-green-400 to-emerald-500' },
    { name: 'Red', value: '#ef4444', gradient: 'from-red-400 to-pink-500' },
    { name: 'Teal', value: '#14b8a6', gradient: 'from-teal-400 to-cyan-500' },
    { name: 'Rose', value: '#f43f5e', gradient: 'from-rose-400 to-pink-500' },
    { name: 'Indigo', value: '#6366f1', gradient: 'from-indigo-400 to-purple-500' }
  ];

  const fontOptions = [
    'Inter',
    'Poppins',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro'
  ];

  const handleSaveSettings = async () => {
    setIsSaving(true);
    const settings = {
      theme,
      primaryColor,
      logoUrl,
      favicon,
      fontFamily,
      fontSize,
      layoutPadding,
      containerWidth,
      customColors
    };

    try {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      setIsDarkMode(theme === 'dark');
      localStorage.setItem('theme', theme);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setTheme('dark');
      setPrimaryColor('#f59e0b');
      setLogoUrl('');
      setFavicon('');
      setFontFamily('Inter');
      setFontSize('16');
      setLayoutPadding('24');
      setContainerWidth('1200');
      setCustomColors({
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        textSecondary: '#d1d5db',
        accent: '#f59e0b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      });
      localStorage.removeItem('siteSettings');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      alert('Settings reset to default!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme & Color Settings */}
      <div
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-4 lg:p-6 border transition-all duration-300 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Theme & Color Settings
        </h3>

        {/* Theme Selector */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Theme Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                theme === 'light'
                  ? 'border-amber-500 bg-amber-50'
                  : isDarkMode
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-md border-2 border-gray-200 flex items-center justify-center">
                  <i className="ri-sun-line text-amber-500"></i>
                </div>
                <div>
                  <div
                    className={`font-medium transition-colors duration-300 ${
                      theme === 'light' ? 'text-amber-700' : isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    Light Mode
                  </div>
                  <div
                    className={`text-xs transition-colors duration-300 ${
                      theme === 'light' ? 'text-amber-600' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Clean and bright interface
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-cyan-500 bg-gray-800'
                  : isDarkMode
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-900 rounded-md border-2 border-gray-700 flex items-center justify-center">
                  <i className="ri-moon-line text-cyan-400"></i>
                </div>
                <div>
                  <div
                    className={`font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-cyan-300' : isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    Dark Mode
                  </div>
                  <div
                    className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-cyan-400' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Modern dark interface
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Color Selector */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Primary Color
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setPrimaryColor(color.value)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${color.gradient} transition-all duration-300 cursor-pointer relative group ${
                  primaryColor === color.value
                    ? 'ring-4 ring-offset-2 ring-offset-transparent scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ ringColor: primaryColor === color.value ? color.value : 'transparent' }}
              >
                {primaryColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="ri-check-line text-white text-lg font-bold drop-shadow-md"></i>
                  </div>
                )}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                      isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {color.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Typography Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {fontOptions.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Base Font Size
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="14">Small (14px)</option>
              <option value="16">Medium (16px)</option>
              <option value="18">Large (18px)</option>
              <option value="20">Extra Large (20px)</option>
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Layout Padding
            </label>
            <select
              value={layoutPadding}
              onChange={(e) => setLayoutPadding(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="16">Compact (16px)</option>
              <option value="24">Normal (24px)</option>
              <option value="32">Spacious (32px)</option>
              <option value="40">Extra Spacious (40px)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Branding Settings */}
      <div
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-4 lg:p-6 border transition-all duration-300 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Branding Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Logo URL
            </label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="https://your-domain.com/logo.png"
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Favicon URL
            </label>
            <input
              type="url"
              value={favicon}
              onChange={(e) => setFavicon(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="https://your-domain.com/favicon.ico"
            />
          </div>
        </div>
      </div>

      {/* Save/Reset Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              <span>Save Settings</span>
            </>
          )}
        </button>
        <button
          onClick={handleResetSettings}
          disabled={isSaving}
          className={`w-full sm:w-auto border px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            isDarkMode ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Reset to Default
        </button>
        <div
          className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center sm:text-left`}
        >
          <i className="ri-information-line mr-1"></i>
          Changes will apply immediately after saving
        </div>
      </div>
    </div>
  );
}

function AdminActions({ isDarkMode }) {
  const [activeActionTab, setActiveActionTab] = useState('system');
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const systemActions = [
    { id: 'clear-cache', name: 'Clear System Cache', description: 'Clears all cached data to improve performance', icon: 'ri-delete-bin-line', danger: false },
    { id: 'rebuild-index', name: 'Rebuild Search Index', description: 'Rebuilds the search index for better results', icon: 'ri-search-line', danger: false },
    { id: 'optimize-db', name: 'Optimize Database', description: 'Optimizes database tables for better performance', icon: 'ri-database-line', danger: false },
    { id: 'backup-system', name: 'Create System Backup', description: 'Creates a full system backup', icon: 'ri-download-line', danger: false },
    { id: 'maintenance-mode', name: 'Toggle Maintenance Mode', description: 'Enables/disables maintenance mode', icon: 'ri-tools-line', danger: true },
    { id: 'reset-stats', name: 'Reset Statistics', description: 'Resets all statistical data', icon: 'ri-restart-line', danger: true }
  ];

  const userActions = [
    { id: 'bulk-email', name: 'Send Bulk Email', description: 'Send notifications to all users', icon: 'ri-mail-send-line', danger: false },
    { id: 'export-users', name: 'Export User Data', description: 'Export user data to CSV', icon: 'ri-file-export-line', danger: false },
    { id: 'cleanup-inactive', name: 'Cleanup Inactive Users', description: 'Remove users inactive for 6+ months', icon: 'ri-user-unfollow-line', danger: false },
    { id: 'verify-bulk', name: 'Bulk Verify Users', description: 'Verify multiple user accounts', icon: 'ri-verified-badge-line', danger: false }
  ];

  const securityActions = [
    { id: 'security-scan', name: 'Run Security Scan', description: 'Scan for security vulnerabilities', icon: 'ri-shield-check-line', danger: false },
    { id: 'update-ssl', name: 'Update SSL Certificate', description: 'Renew SSL certificates', icon: 'ri-lock-line', danger: false },
    { id: 'audit-logs', name: 'Generate Audit Report', description: 'Generate security audit logs', icon: 'ri-file-shield-line', danger: false },
    { id: 'ip-management', name: 'Manage IP Blocks', description: 'View and manage blocked IP addresses', icon: 'ri-forbid-line', danger: false }
  ];

  const executeAction = async (actionId: string) => {
    setIsExecuting(true);
    setShowConfirmModal(null);

    // Simulate action execution
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsExecuting(false);
    alert(`Action "${actionId}" completed successfully!`);
  };

  const renderActionCard = (action) => (
    <div
      key={action.id}
      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${
        isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
      } ${action.danger ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'}`}
      onClick={() => setShowConfirmModal(action.id)}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            action.danger ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}
        >
          <i className={action.icon}></i>
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}
          >
            {action.name}
            {action.danger && <span className="ml-2 text-xs text-red-500 font-normal">(Dangerous)</span>}
          </h4>
          <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {action.description}
          </p>
        </div>
        <i
          className={`ri-arrow-right-line transition-colors duration-300 flex-shrink-0 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        ></i>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Mobile Action Tab Dropdown */}
      <div className="sm:hidden">
        <select
          value={activeActionTab}
          onChange={(e) => setActiveActionTab(e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="system">System Operations</option>
          <option value="users">User Management</option>
          <option value="security">Security Management</option>
        </select>
      </div>

      {/* Desktop Action Tabs */}
      <div
        className={`hidden sm:flex space-x-1 p-1 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        {[
          { id: 'system', name: 'System Operations', icon: 'ri-settings-line' },
          { id: 'users', name: 'User Management', icon: 'ri-user-settings-line' },
          { id: 'security', name: 'Security Management', icon: 'ri-shield-line' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveActionTab(tab.id)}
            className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeActionTab === tab.id
                ? isDarkMode
                  ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-amber-500 text-white shadow-md'
                : isDarkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <i className={tab.icon}></i>
            <span className="hidden sm:inline">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* System Status Overview */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
        }`}
      >
        <div className="text-center">
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          >
            98.5%
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            System Uptime
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            2.1GB
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Cache Size
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}
          >
            847
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Active Users
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}
          >
            156MB
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Log Size
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeActionTab === 'system' && systemActions.map(renderActionCard)}
        {activeActionTab === 'users' && userActions.map(renderActionCard)}
        {activeActionTab === 'security' && securityActions.map(renderActionCard)}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <i className="ri-alert-line text-amber-600 text-xl"></i>
              </div>
              <div>
                <h3
                  className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  Confirm Action
                </h3>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p
              className={`mb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Are you sure you want to execute this action? This may affect system performance or user experience.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isDarkMode ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => executeAction(showConfirmModal)}
                disabled={isExecuting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {isExecuting ? 'Executing...' : 'Execute'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Executing Overlay */}
      {isExecuting && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-8 text-center`}>
            <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p
              className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Executing action...
            </p>
            <p
              className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Please wait while we process your request
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function UserManagement({ isDarkMode }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [impersonateMode, setImpersonateMode] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      walletBalance: '$1,245.67',
      status: 'Active',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-15 14:30',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      totalOrders: 45,
      totalSpent: '$3,245.67',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20portrait%20headshot%20with%20friendly%20smile%20clean%20background%20modern%20business%20style&width=60&height=60&seq=user-mgmt-1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 987-6543',
      walletBalance: '$678.90',
      status: 'Active',
      joinDate: '2024-01-20',
      lastLogin: '2024-03-14 09:15',
      ipAddress: '192.168.1.101',
      device: 'Safari on MacOS',
      totalOrders: 23,
      totalSpent: '$1,678.90',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20man%20portrait%20headshot%20with%20confident%20expression%20clean%20background%20corporate%20style&width=60&height=60&seq=user-mgmt-2&orientation=squarish'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3
          className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          User Management
        </h3>
        <div className="flex items-center space-x-2">
          <span
            className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Impersonate Mode:
          </span>
          <button
            onClick={() => setImpersonateMode(!impersonateMode)}
            className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
              impersonateMode ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                impersonateMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            ></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
              isDarkMode ? 'bg-gray-900 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => {
              setSelectedUser(user);
              setShowUserModal(true);
            }}
          >
            <div className="flex items-start space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover object-top flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`font-medium transition-colors duration-300 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {user.name}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <p
                  className={`text-sm transition-colors duration-300 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {user.email}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <span
                      className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
                    >
                      Orders
                    </span>
                    <p
                      className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      {user.totalOrders}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
                    >
                      Balance
                    </span>
                    <p
                      className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      {user.walletBalance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3
                  className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  User Details
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              {/* User Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0"
                />
                <div className="flex-1">
                  <h4
                    className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {selectedUser.name}
                  </h4>
                  <p
                    className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {selectedUser.email}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedUser.status}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      Joined {selectedUser.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                  <div
                    className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {selectedUser.totalOrders}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    Total Orders
                  </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                  <div
                    className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {selectedUser.totalSpent}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    Total Spent
                  </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                  <div
                    className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {selectedUser.walletBalance}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    Wallet Balance
                  </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                  <div className="text-lg font-bold text-green-500">4.8/5</div>
                  <div
                    className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    Rating
                  </div>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5
                    className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    Contact Information
                  </h5>
                  <div
                    className={`space-y-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                      <span className="break-all">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                      <span className="break-all">{selectedUser.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5
                    className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    Session Information
                  </h5>
                  <div
                    className={`space-y-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                      <span className="break-all">Last login: {selectedUser.lastLogin}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-computer-line w-4 h-4 flex items-center justify-center"></i>
                      <span className="break-all">{selectedUser.device}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center"></i>
                      <span>{selectedUser.ipAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                  Send Message
                </button>
                <button className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                  View Orders
                </button>
                {impersonateMode && (
                  <button className="w-full sm:flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                    Impersonate User
                  </button>
                )}
                <button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                  Suspend
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PageManagement({ isDarkMode }) {
  const [pages, setPages] = useState([
    { id: 1, title: 'Home Page', slug: 'home', status: 'Published', lastModified: '2024-03-15' },
    { id: 2, title: 'About Us', slug: 'about', status: 'Published', lastModified: '2024-03-14' },
    { id: 3, title: 'Contact', slug: 'contact', status: 'Draft', lastModified: '2024-03-13' }
  ]);
  const [showPageModal, setShowPageModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageStatus, setNewPageStatus] = useState('Published');
  const [flashMessages, setFlashMessages] = useState([
    { id: 1, message: 'Welcome to our marketplace!', type: 'info', scope: 'global', expiry: '2024-04-01' }
  ]);

  const handleCreatePage = () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) {
      alert('Please fill in both title and slug');
      return;
    }

    const newPage = {
      id: Date.now(),
      title: newPageTitle,
      slug: newPageSlug,
      status: newPageStatus,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setPages([...pages, newPage]);
    setNewPageTitle('');
    setNewPageSlug('');
    setNewPageStatus('Published');
    setShowPageModal(false);
    alert('Page created successfully!');
  };

  const handleEditPage = (page) => {
    setEditingPage(page);
    setNewPageTitle(page.title);
    setNewPageSlug(page.slug);
    setNewPageStatus(page.status);
    setShowPageModal(true);
  };

  const handleUpdatePage = () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) {
      alert('Please fill in both title and slug');
      return;
    }

    setPages(
      pages.map((page) =>
        page.id === editingPage.id
          ? {
              ...page,
              title: newPageTitle,
              slug: newPageSlug,
              status: newPageStatus,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : page
      )
    );

    setNewPageTitle('');
    setNewPageSlug('');
    setNewPageStatus('Published');
    setEditingPage(null);
    setShowPageModal(false);
    alert('Page updated successfully!');
  };

  const handleDeletePage = (pageId) => {
    if (confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      setPages(pages.filter((page) => page.id !== pageId));
      alert('Page deleted successfully!');
    }
  };

  const togglePageStatus = (pageId) => {
    setPages(
      pages.map((page) =>
        page.id === pageId
          ? { ...page, status: page.status === 'Published' ? 'Draft' : 'Published', lastModified: new Date().toISOString().split('T')[0] }
          : page
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3
          className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Page Management
        </h3>
        <button
          onClick={() => {
            setEditingPage(null);
            setNewPageTitle('');
            setNewPageSlug('');
            setNewPageStatus('Published');
            setShowPageModal(true);
          }}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
        >
          Create Page
        </button>
      </div>

      {/* Pages List */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border`}
      >
        <div className="p-4 lg:p-6 space-y-4">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg transition-all duration-300 gap-4 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex-1">
                <h4
                  className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {page.title}
                </h4>
                <p
                  className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} break-all`}
                >
                  /{page.slug} • Last modified: {page.lastModified}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                    page.status === 'Published' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                  onClick={() => togglePageStatus(page.id)}
                  title="Click to toggle status"
                >
                  {page.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditPage(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                    }`}
                    title="Edit page"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-600 hover:bg-gray-200'
                    }`}
                    title="Delete page"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flash Messages */}
      <div>
        <h4
          className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Flash Messages
        </h4>
        <div
          className={`${isDarkMode ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'} p-4 rounded-lg`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="ri-information-line text-blue-500 flex-shrink-0"></i>
              <span
                className={`transition-colors duration-300 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'} break-words`}
              >
                Welcome to our marketplace!
              </span>
            </div>
            <button className="text-blue-500 hover:text-blue-600 cursor-pointer flex-shrink-0 ml-2">
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit Page Modal */}
      {showPageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl w-full max-w-lg`}>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {editingPage ? 'Edit Page' : 'Create New Page'}
                </h3>
                <button
                  onClick={() => {
                    setShowPageModal(false);
                    setEditingPage(null);
                    setNewPageTitle('');
                    setNewPageSlug('');
                    setNewPageStatus('Published');
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter page title"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Page Slug
                  </label>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="page-url-slug"
                  />
                  <p
                    className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    URL slug will be automatically formatted
                  </p>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Page Status
                  </label>
                  <select
                    value={newPageStatus}
                    onChange={(e) => setNewPageStatus(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <div
                  className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3`}
                >
                  <h5
                    className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Preview URL
                  </h5>
                  <div
                    className={`text-sm font-mono transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} break-all`}
                  >
                    {window.location.origin}/{newPageSlug || 'page-slug'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowPageModal(false);
                    setEditingPage(null);
                    setNewPageTitle('');
                    setNewPageSlug('');
                    setNewPageStatus('Published');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isDarkMode ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={editingPage ? handleUpdatePage : handleCreatePage}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureToggles({ isDarkMode }) {
  const [features, setFeatures] = useState({
    telegramLogin: true,
    emailLogin: true,
    walletCheckout: true,
    referralSystem: true,
    warrantySystem: true
  });
  const [referralCommission, setReferralCommission] = useState('5');
  const [warrantyPeriod, setWarrantyPeriod] = useState('30');
  const [isSaving, setIsSaving] = useState(false);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleSaveFeatures = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('featureToggles', JSON.stringify({ features, referralCommission, warrantyPeriod }));
      alert('Feature settings saved successfully!');
    } catch (error) {
      alert('Error saving feature settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const featureList = [
    { key: 'telegramLogin', name: 'Telegram Login', description: 'Allow users to login with Telegram', icon: 'ri-telegram-line' },
    { key: 'emailLogin', name: 'Email Login', description: 'Traditional email/password login', icon: 'ri-mail-line' },
    { key: 'walletCheckout', name: 'Crypto Wallet Checkout', description: 'Accept cryptocurrency payments', icon: 'ri-wallet-line' },
    { key: 'referralSystem', name: 'Referral System', description: 'Users can refer others for commissions', icon: 'ri-share-line' },
    { key: 'warrantySystem', name: 'Warranty System', description: 'Product warranty and support system', icon: 'ri-shield-check-line' }
  ];

  return (
    <div className="space-y-6">
      <h3
        className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        Feature Toggles
      </h3>

      <div className="space-y-4">
        {featureList.map((feature) => (
          <div
            key={feature.key}
            className={`flex items-center justify-between p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  features[feature.key] ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <i className={feature.icon}></i>
              </div>
              <div className="min-w-0 flex-1">
                <h4
                  className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {feature.name}
                </h4>
                <p
                  className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {feature.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleFeature(feature.key)}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ml-4 ${
                features[feature.key] ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  features[feature.key] ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>

      {/* Feature Configuration */}
      {features.referralSystem && (
        <div
          className={`${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-4 lg:p-6 rounded-lg`}
        >
          <h5
            className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Referral System Configuration
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Commission Rate (%)
              </label>
              <input
                type="number"
                value={referralCommission}
                onChange={(e) => setReferralCommission(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
                }`}
                min="0"
                max="50"
              />
            </div>
          </div>
        </div>
      )}

      {features.warrantySystem && (
        <div
          className={`${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-4 lg:p-6 rounded-lg`}
        >
          <h5
            className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Warranty System Configuration
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Default Warranty Period (Days)
              </label>
              <input
                type="number"
                value={warrantyPeriod}
                onChange={(e) => setWarrantyPeriod(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
                }`}
                min="0"
                max="365"
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-start">
        <button
          onClick={handleSaveFeatures}
          disabled={isSaving}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              <span>Save Feature Settings</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function MessagingSettings({ isDarkMode }) {
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [telegramTemplate, setTelegramTemplate] = useState('Hello {name}, your order #{order_id} has been confirmed!');
  const [emailTemplate, setEmailTemplate] = useState('Welcome to our marketplace!');
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    email: { newOrder: true, orderComplete: true, newMessage: false },
    telegram: { newOrder: true, orderComplete: false, newMessage: true },
    dashboard: { newOrder: true, orderComplete: true, newMessage: true }
  });

  const handleSaveMessaging = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('messagingSettings', JSON.stringify({ bannerMessage, showBanner, telegramTemplate, emailTemplate, notifications }));
      alert('Messaging settings saved successfully!');
    } catch (error) {
      alert('Error saving messaging settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3
        className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        Messaging & Notifications
      </h3>

      {/* Site Banner */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
      >
        <h4
          className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Site Banner Message
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Show Banner
            </span>
            <button
              onClick={() => setShowBanner(!showBanner)}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${showBanner ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${showBanner ? 'translate-x-6' : 'translate-x-0.5'}`}
              ></div>
            </button>
          </div>
          <textarea
            value={bannerMessage}
            onChange={(e) => setBannerMessage(e.target.value)}
            rows={3}
            className={`w-full border rounded-lg px-3 py-2 resize-none transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Enter banner message..."
            maxLength={500}
          />
          <div
            className={`text-xs text-right transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            {bannerMessage.length}/500
          </div>
        </div>
      </div>

      {/* Message Templates */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
      >
        <h4
          className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Message Templates
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Telegram Template
            </label>
            <textarea
              value={telegramTemplate}
              onChange={(e) => setTelegramTemplate(e.target.value)}
              rows={4}
              className={`w-full border rounded-lg px-3 py-2 resize-none transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter Telegram message template..."
              maxLength={500}
            />
            <div
              className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Use {`{name}`}, {`{order_id}`} as placeholders
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email Template
            </label>
            <textarea
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              rows={4}
              className={`w-full border rounded-lg px-3 py-2 resize-none transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter email template..."
              maxLength={500}
            />
            <div
              className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              HTML tags supported
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
      >
        <h4
          className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Notification Preferences
        </h4>
        <div className="space-y-6">
          {Object.entries(notifications).map(([channel, settings]) => (
            <div key={channel}>
              <h5
                className={`font-medium mb-3 capitalize transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {channel} Notifications
              </h5>
              <div className="space-y-3">
                {Object.entries(settings).map(([event, enabled]) => (
                  <div key={event} className="flex items-center justify-between">
                    <span
                      className={`text-sm capitalize transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {event.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          [channel]: { ...prev[channel], [event]: !enabled }
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                        enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <button
          onClick={handleSaveMessaging}
          disabled={isSaving}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              <span>Save Messaging Settings</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function AnalyticsLogs({ isDarkMode }) {
  const [activeLogTab, setActiveLogTab] = useState('page-views');
  const [onlineUsers] = useState([
    { name: 'Sarah Johnson', page: '/products', action: 'Browsing products', time: '2 min ago' },
    { name: 'Mike Chen', page: '/dashboard', action: 'Checking orders', time: '5 min ago' },
    { name: 'Emma Davis', page: '/sell', action: 'Creating product', time: '8 min ago' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3
          className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Analytics & Logs
        </h3>
        <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
          Export Logs
        </button>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-4 rounded-lg`}
        >
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          >
            24
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Online Users
          </div>
        </div>
        <div
          className={`${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-4 rounded-lg`}
        >
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            1.2K
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Page Views Today
          </div>
        </div>
        <div
          className={`${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-4 rounded-lg`}
        >
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}
          >
            45
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            New Orders
          </div>
        </div>
        <div
          className={`${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-4 rounded-lg`}
        >
          <div
            className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}
          >
            8
          </div>
          <div
            className={`text-xs lg:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            New Users
          </div>
        </div>
      </div>

      {/* Online Users */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
      >
        <h4
          className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Currently Online Users
        </h4>
        <div className="space-y-3">
          {onlineUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={`font-medium transition-colors duration-300 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {user.name}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-300 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {user.page} • {user.action}
                  </div>
                </div>
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex-shrink-0 ml-2`}
              >
                {user.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeveloperTools({ isDarkMode }) {
  const [customHTML, setCustomHTML] = useState('');
  const [customCSS, setCustomCSS] = useState('');
  const [customJS, setCustomJS] = useState('');
  const [selectedPage, setSelectedPage] = useState('global');
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDeveloperSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('developerSettings', JSON.stringify({ customHTML, customCSS, customJS, selectedPage }));
      alert('Developer settings saved successfully!');
    } catch (error) {
      alert('Error saving developer settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all custom code? This action cannot be undone.')) {
      setCustomHTML('');
      setCustomCSS('');
      setCustomJS('');
      setSelectedPage('global');
      alert('All custom code has been reset!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <h3
          className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Developer Tools
        </h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className={`border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
            } flex-1 sm:flex-initial`}
          >
            <option value="global">Global</option>
            <option value="home">Home Page</option>
            <option value="products">Products Page</option>
            <option value="dashboard">Dashboard</option>
          </select>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Custom HTML */}
        <div
          className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
        >
          <h4
            className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Custom HTML
          </h4>
          <textarea
            value={customHTML}
            onChange={(e) => setCustomHTML(e.target.value)}
            rows={8}
            className={`w-full border rounded-lg px-3 py-2 font-mono text-sm resize-none transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="<div>Custom HTML content...</div>"
          />
        </div>

        {/* Custom CSS */}
        <div
          className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
        >
          <h4
            className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Custom CSS
          </h4>
          <textarea
            value={customCSS}
            onChange={(e) => setCustomCSS(e.target.value)}
            rows={8}
            className={`w-full border rounded-lg px-3 py-2 font-mono text-sm resize-none transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder=".custom-class { color: red; }"
          />
        </div>

        {/* Custom JavaScript */}
        <div
          className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
        >
          <h4
            className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Custom JavaScript
          </h4>
          <textarea
            value={customJS}
            onChange={(e) => setCustomJS(e.target.value)}
            rows={8}
            className={`w-full border rounded-lg px-3 py-2 font-mono text-sm resize-none transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="console.log('Custom JavaScript');"
          />
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div
          className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-4 lg:p-6 rounded-xl border`}
        >
          <h4
            className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Live Preview
          </h4>
          <div
            className={`border rounded-lg p-4 min-h-[200px] ${
              isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div
              className={`text-center text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Preview will appear here when custom code is applied
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          onClick={handleSaveDeveloperSettings}
          disabled={isSaving}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              <span>Apply Changes</span>
            </>
          )}
        </button>
        <button
          className={`border px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Save as Template
        </button>
        <button
          onClick={handleResetAll}
          className={`border px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Reset All
        </button>
      </div>

      {/* Warning Notice */}
      <div
        className={`${isDarkMode ? 'bg-yellow-900/20 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'} p-4 rounded-lg`}
      >
        <div className="flex items-start space-x-3">
          <i className="ri-alert-line text-yellow-500 mt-0.5 flex-shrink-0"></i>
          <div className="min-w-0">
            <h5
              className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}
            >
              Developer Warning
            </h5>
            <p
              className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}
            >
              Custom code can affect site performance and security. Test changes thoroughly before applying to production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthenticationSettings({ isDarkMode }) {
  const [googleOAuthEnabled, setGoogleOAuthEnabled] = useState(false);
  const [credentialsAuthEnabled, setCredentialsAuthEnabled] = useState(true);
  const [googleClientId, setGoogleClientId] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionResult(null);

    try {
      // Simulate Google OAuth connection test
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!googleClientId.trim() || !googleClientSecret.trim()) {
        setConnectionResult({ success: false, message: 'Please provide both Client ID and Client Secret' });
      } else {
        setConnectionResult({ success: true, message: 'Google OAuth connection successful!' });
      }
    } catch (error) {
      setConnectionResult({ success: false, message: 'Connection test failed. Please check your credentials.' });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);

    try {
      const settings = {
        googleOAuthEnabled,
        credentialsAuthEnabled,
        googleClientId,
        googleClientSecret
      };

      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem('authSettings', JSON.stringify(settings));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Authentication settings saved successfully!');
    } catch (error) {
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3
        className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        Authentication Settings
      </h3>

      {/* Authentication Methods */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}
      >
        <h4
          className={`font-medium mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Enabled Authentication Methods
        </h4>

        <div className="space-y-4">
          {/* Email/Password Authentication */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-mail-line text-blue-600 dark:text-blue-400"></i>
              </div>
              <div>
                <h5
                  className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  Email & Password
                </h5>
                <p
                  className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Traditional email and password authentication
                </p>
              </div>
            </div>
            <button
              onClick={() => setCredentialsAuthEnabled(!credentialsAuthEnabled)}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                credentialsAuthEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  credentialsAuthEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Google OAuth */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div>
                <h5
                  className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  Google Sign-In
                </h5>
                <p
                  className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  OAuth 2.0 authentication with Google
                </p>
              </div>
            </div>
            <button
              onClick={() => setGoogleOAuthEnabled(!googleOAuthEnabled)}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                googleOAuthEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  googleOAuthEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Google OAuth Configuration */}
      {googleOAuthEnabled && (
        <div
          className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}
        >
          <h4
            className={`font-medium mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            OAuth Credentials
          </h4>

          <div className="space-y-6">
            {/* Client ID */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Google Client ID
              </label>
              <input
                type="text"
                value={googleClientId}
                onChange={(e) => setGoogleClientId(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Enter your Google OAuth Client ID"
              />
              <p
                className={`text-xs mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                Get this from Google Cloud Console OAuth 2.0 credentials
              </p>
            </div>

            {/* Client Secret */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Google Client Secret
              </label>
              <div className="relative">
                <input
                  type={showClientSecret ? 'text' : 'password'}
                  value={googleClientSecret}
                  onChange={(e) => setGoogleClientSecret(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 pr-12 transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter your Google OAuth Client Secret"
                />
                <button
                  type="button"
                  onClick={() => setShowClientSecret(!showClientSecret)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className={showClientSecret ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
              <p
                className={`text-xs mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                Keep this secret safe and never expose it publicly
              </p>
            </div>

            {/* Test Connection */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleTestConnection}
                disabled={isTestingConnection}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                {isTestingConnection ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-wifi-line"></i>
                    <span>Test Connection</span>
                  </>
                )}
              </button>

              {connectionResult && (
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    connectionResult.success ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <i className={connectionResult.success ? 'ri-check-line' : 'ri-error-warning-line'}></i>
                  <span>{connectionResult.message}</span>
                </div>
              )}
            </div>

            {/* Setup Instructions */}
            <div
              className={`${isDarkMode ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'} p-4 rounded-lg`}
            >
              <h5
                className={`font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}
              >
                Setup Instructions
              </h5>
              <ol
                className={`text-sm space-y-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-700'
                }`}
              >
                <li>1. Go to Google Cloud Console</li>
                <li>2. Create a new project or select existing</li>
                <li>3. Enable Google+ API</li>
                <li>4. Create OAuth 2.0 credentials</li>
                <li>
                  5. Add authorized redirect URI: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{window.location.origin}/auth/google/callback</code>
                </li>
                <li>6. Copy Client ID and Secret here</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Session Settings */}
      <div
        className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}
      >
        <h4
          className={`font-medium mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Session & Security Settings
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Session Duration (days)
            </label>
            <select
              className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
              defaultValue="30"
            >
              <option value="1">1 day</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Password Minimum Length
            </label>
            <select
              className={`w-full border rounded-lg px-3 py-2 pr-8 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-900'
              }`}
              defaultValue="8"
            >
              <option value="6">6 characters</option>
              <option value="8">8 characters</option>
              <option value="12">12 characters</option>
              <option value="16">16 characters</option>
            </select>
          </div>
        </div>

        {/* Security Options */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5
                className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                Require Email Verification
              </h5>
              <p
                className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                New users must verify their email before accessing the platform
              </p>
            </div>
            <button
              className="w-12 h-6 rounded-full bg-green-500 cursor-pointer"
            >
              <div className="w-5 h-5 bg-white rounded-full translate-x-6"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5
                className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                Enable Two-Factor Authentication
              </h5>
              <p
                className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Add an extra layer of security for user accounts
              </p>
            </div>
            <button
              className="w-12 h-6 rounded-full bg-gray-300 cursor-pointer"
            >
              <div className="w-5 h-5 bg-white rounded-full translate-x-0.5"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-start">
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              <span>Save Authentication Settings</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Make sure to export the main component as default
export default AdminSettings;
