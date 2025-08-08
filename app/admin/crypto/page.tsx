
'use client';

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface WalletAddress {
  id: string;
  coin: string;
  network: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

interface CryptoSettings {
  coin: string;
  network: string;
  minDeposit: number;
  handlingFeeType: 'percentage' | 'fixed';
  handlingFeeValue: number;
  invoiceExpiryMinutes: number;
  isEnabled: boolean;
}

interface APIKeySettings {
  id: string;
  name: string;
  value: string;
  description: string;
  isActive: boolean;
}

export default function CryptoAdminPage() {
  const [activeTab, setActiveTab] = useState('wallets');
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [showAddAPIKey, setShowAddAPIKey] = useState(false);
  const [telegramSettings, setTelegramSettings] = useState({
    botToken: '',
    chatId: '',
    enabled: false
  });

  const [walletAddresses, setWalletAddresses] = useState<WalletAddress[]>([
    {
      id: '1',
      coin: 'USDT',
      network: 'TRC20',
      address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      coin: 'BTC',
      network: 'Bitcoin',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      isActive: true,
      createdAt: '2024-01-15T10:05:00Z'
    }
  ]);

  const [cryptoSettings, setCryptoSettings] = useState<CryptoSettings[]>([
    {
      coin: 'USDT',
      network: 'TRC20',
      minDeposit: 10,
      handlingFeeType: 'percentage',
      handlingFeeValue: 2.5,
      invoiceExpiryMinutes: 30,
      isEnabled: true
    },
    {
      coin: 'BTC',
      network: 'Bitcoin',
      minDeposit: 20,
      handlingFeeType: 'fixed',
      handlingFeeValue: 1.5,
      invoiceExpiryMinutes: 30,
      isEnabled: true
    }
  ]);

  const [apiKeys, setAPIKeys] = useState<APIKeySettings[]>([
    {
      id: '1',
      name: 'Etherscan API Key',
      value: 'YourEtherscanAPIKey',
      description: 'For Ethereum and ERC20 token verification',
      isActive: true
    },
    {
      id: '2',
      name: 'Trongrid API Key',
      value: 'YourTrongridAPIKey',
      description: 'For TRON and TRC20 token verification',
      isActive: true
    },
    {
      id: '3',
      name: 'BSC Scan API Key',
      value: 'YourBSCScanAPIKey',
      description: 'For Binance Smart Chain and BEP20 tokens',
      isActive: true
    },
    {
      id: '4',
      name: 'CoinGecko API Key',
      value: 'YourCoinGeckoAPIKey',
      description: 'For real-time cryptocurrency price data',
      isActive: true
    }
  ]);

  const handleAddWallet = (walletData: any) => {
    const newWallet: WalletAddress = {
      id: Date.now().toString(),
      ...walletData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setWalletAddresses([...walletAddresses, newWallet]);
    setShowAddWallet(false);
  };

  const handleToggleWallet = (id: string) => {
    setWalletAddresses(wallets =>
      wallets.map(wallet =>
        wallet.id === id ? { ...wallet, isActive: !wallet.isActive } : wallet
      )
    );
  };

  const handleSettingsUpdate = (coin: string, field: string, value: any) => {
    setCryptoSettings(settings =>
      settings.map(setting =>
        setting.coin === coin ? { ...setting, [field]: value } : setting
      )
    );
  };

  const handleAddAPIKey = (apiKeyData: any) => {
    const newAPIKey: APIKeySettings = {
      id: Date.now().toString(),
      ...apiKeyData,
      isActive: true
    };
    setAPIKeys([...apiKeys, newAPIKey]);
    setShowAddAPIKey(false);
  };

  const handleToggleAPIKey = (id: string) => {
    setAPIKeys(keys =>
      keys.map(key => (key.id === id ? { ...key, isActive: !key.isActive } : key))
    );
  };

  const handleDeleteAPIKey = (id: string) => {
    setAPIKeys(keys => keys.filter(key => key.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crypto Payment Gateway</h1>
            <p className="text-gray-600">Manage cryptocurrency deposits and settings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'wallets', name: 'Wallet Addresses', icon: 'ri-wallet-line' },
              { id: 'settings', name: 'Crypto Settings', icon: 'ri-settings-line' },
              { id: 'apikeys', name: 'API Keys', icon: 'ri-key-line' },
              { id: 'deposits', name: 'Deposit History', icon: 'ri-history-line' },
              { id: 'telegram', name: 'Telegram Config', icon: 'ri-telegram-line' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Wallet Addresses Tab */}
        {activeTab === 'wallets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Wallet Addresses</h2>
              <button
                onClick={() => setShowAddWallet(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Add New Wallet
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {walletAddresses.map(wallet => (
                <div key={wallet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <i className="ri-money-dollar-circle-line text-amber-600"></i>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{wallet.coin}</div>
                        <div className="text-sm text-gray-600">{wallet.network}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleWallet(wallet.id)}
                        className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                          wallet.isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            wallet.isActive ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Address:</div>
                      <div className="text-sm font-mono bg-gray-50 p-2 rounded break-all">
                        {wallet.address}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Added:</span>
                      <span className="text-gray-900">
                        {new Date(wallet.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Wallet Modal */}
            {showAddWallet && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Wallet Address</h3>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      handleAddWallet({
                        coin: formData.get('coin'),
                        network: formData.get('network'),
                        address: formData.get('address')
                      });
                    }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cryptocurrency</label>
                        <select
                          name="coin"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                          required
                        >
                          <option value="">Select Coin</option>
                          <option value="USDT">USDT (Tether)</option>
                          <option value="BTC">Bitcoin (BTC)</option>
                          <option value="ETH">Ethereum (ETH)</option>
                          <option value="BNB">BNB (Binance Coin)</option>
                          <option value="TRX">TRON (TRX)</option>
                          <option value="SHIB">Shiba Inu (SHIB)</option>
                          <option value="USDC">USD Coin (USDC)</option>
                          <option value="ADA">Cardano (ADA)</option>
                          <option value="DOT">Polkadot (DOT)</option>
                          <option value="MATIC">Polygon (MATIC)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                        <select
                          name="network"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                          required
                        >
                          <option value="">Select Network</option>
                          <option value="TRC20">TRC20 (TRON Network)</option>
                          <option value="ERC20">ERC20 (Ethereum Network)</option>
                          <option value="BEP20">BEP20 (Binance Smart Chain)</option>
                          <option value="Bitcoin">Bitcoin Network</option>
                          <option value="Polygon">Polygon Network</option>
                          <option value="Arbitrum">Arbitrum Network</option>
                          <option value="Optimism">Optimism Network</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                        <input
                          type="text"
                          name="address"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                          placeholder="Enter wallet address"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowAddWallet(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg cursor-pointer whitespace-nowrap"
                      >
                        Add Wallet
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Crypto Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Cryptocurrency Settings</h2>

            <div className="space-y-6">
              {cryptoSettings.map(setting => (
                <div key={setting.coin} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <i className="ri-money-dollar-circle-line text-amber-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{setting.coin}</h3>
                        <p className="text-sm text-gray-600">{setting.network}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Enabled:</span>
                      <button
                        onClick={() => handleSettingsUpdate(setting.coin, 'isEnabled', !setting.isEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                          setting.isEnabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            setting.isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Deposit (USD)
                      </label>
                      <input
                        type="number"
                        value={setting.minDeposit}
                        onChange={e => handleSettingsUpdate(setting.coin, 'minDeposit', parseFloat(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invoice Expiry (Minutes)
                      </label>
                      <input
                        type="number"
                        value={setting.invoiceExpiryMinutes}
                        onChange={e => handleSettingsUpdate(setting.coin, 'invoiceExpiryMinutes', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        min="5"
                        max="120"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Handling Fee Type
                      </label>
                      <select
                        value={setting.handlingFeeType}
                        onChange={e => handleSettingsUpdate(setting.coin, 'handlingFeeType', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (USD)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Handling Fee Value
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={setting.handlingFeeValue}
                          onChange={e => handleSettingsUpdate(setting.coin, 'handlingFeeValue', parseFloat(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                          min="0"
                          step="0.1"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                          {setting.handlingFeeType === 'percentage' ? '%' : '$'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'apikeys' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">API Keys Management</h2>
                <p className="text-sm text-gray-600">Configure blockchain API keys for transaction verification</p>
              </div>
              <button
                onClick={() => setShowAddAPIKey(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Add API Key
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {apiKeys.map(apiKey => (
                <div key={apiKey.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-key-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                        <p className="text-sm text-gray-600">{apiKey.description}</p>
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">API Key:</div>
                          <div className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border max-w-md">
                            {apiKey.value.length > 20 ? `${apiKey.value.substring(0, 20)}...` : apiKey.value}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Active:</span>
                        <button
                          onClick={() => handleToggleAPIKey(apiKey.id)}
                          className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                            apiKey.isActive ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              apiKey.isActive ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          ></div>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteAPIKey(apiKey.id)}
                        className="w-8 h-8 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center cursor-pointer"
                        title="Delete API Key"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add API Key Modal */}
            {showAddAPIKey && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New API Key</h3>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      handleAddAPIKey({
                        name: formData.get('name'),
                        value: formData.get('value'),
                        description: formData.get('description')
                      });
                    }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API Key Name</label>
                        <select
                          name="name"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                          required
                        >
                          <option value="">Select API Service</option>
                          <option value="Etherscan API Key">Etherscan API Key</option>
                          <option value="Trongrid API Key">Trongrid API Key</option>
                          <option value="BSC Scan API Key">BSC Scan API Key</option>
                          <option value="Polygon Scan API Key">Polygon Scan API Key</option>
                          <option value="CoinGecko API Key">CoinGecko API Key</option>
                          <option value="Moralis API Key">Moralis API Key</option>
                          <option value="Alchemy API Key">Alchemy API Key</option>
                          <option value="Infura API Key">Infura API Key</option>
                          <option value="Custom API Key">Custom API Key</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API Key Value</label>
                        <input
                          type="text"
                          name="value"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                          placeholder="Enter your API key"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                          placeholder="Brief description of what this API key is used for..."
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowAddAPIKey(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg cursor-pointer whitespace-nowrap"
                      >
                        Add API Key
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* API Key Instructions */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-information-line text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-3">API Key Setup Instructions</h4>
                  <div className="text-sm text-blue-800 space-y-3">
                    <div>
                      <p className="font-medium">Required API Keys:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>
                          <strong>Etherscan:</strong> For Ethereum and ERC20 tokens - Get from etherscan.io
                        </li>
                        <li>
                          <strong>Trongrid:</strong> For TRON and TRC20 tokens - Get from trongrid.io
                        </li>
                        <li>
                          <strong>BSC Scan:</strong> For Binance Smart Chain - Get from bscscan.com
                        </li>
                        <li>
                          <strong>CoinGecko:</strong> For price data - Get from coingecko.com
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Security Note:</p>
                      <p>API keys are encrypted and stored securely. Never share your API keys publicly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Telegram Config Tab */}
        {activeTab === 'telegram' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Telegram Notification Settings</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Enable Telegram Notifications</h3>
                    <p className="text-sm text-gray-600">Receive alerts for new deposits and confirmations</p>
                  </div>
                  <button
                    onClick={() => setTelegramSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                      telegramSettings.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        telegramSettings.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bot Token
                    </label>
                    <input
                      type="text"
                      value={telegramSettings.botToken}
                      onChange={e => setTelegramSettings(prev => ({ ...prev, botToken: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                      placeholder="1234567890:ABCdefGhIJKlmNoPQRstUVwxyZ"
                    />
                    <p className="text-xs text-gray-500 mt-1">Get from @BotFather on Telegram</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chat ID
                    </label>
                    <input
                      type="text"
                      value={telegramSettings.chatId}
                      onChange={e => setTelegramSettings(prev => ({ ...prev, chatId: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                      placeholder="-1001234567890"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your chat or group ID</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Create a bot via @BotFather on Telegram</li>
                    <li>Get your Chat ID from @userinfobot</li>
                    <li>Add your bot to the chat/group</li>
                    <li>Test the connection using the button below</li>
                  </ol>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                    Test Connection
                  </button>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
