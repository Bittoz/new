
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface CryptoRate {
  coin: string;
  usdPrice: number;
  symbol: string;
}

interface Invoice {
  id: string;
  usdAmount: number;
  cryptoAmount: number;
  coin: string;
  network: string;
  walletAddress: string;
  handlingFee: number;
  totalAmount: number;
  expiresAt: number;
  status: 'pending' | 'submitted' | 'confirmed' | 'expired';
  transactionHash?: string;
}

export default function DepositPage() {
  const [step, setStep] = useState(1);
  const [usdAmount, setUsdAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

    return () => observer.disconnect();
  }, []);

  const [cryptoRates] = useState<CryptoRate[]>([
    { coin: 'USDT', usdPrice: 1.00, symbol: 'USDT' },
    { coin: 'BTC', usdPrice: 43250.00, symbol: 'BTC' },
    { coin: 'ETH', usdPrice: 2580.00, symbol: 'ETH' }
  ]);

  const cryptoOptions = [
    { coin: 'USDT', networks: ['TRC20', 'ERC20', 'BEP20'], minDeposit: 10, fee: 2.5, feeType: 'percentage' },
    { coin: 'BTC', networks: ['Bitcoin'], minDeposit: 20, fee: 1.5, feeType: 'fixed' },
    { coin: 'ETH', networks: ['ERC20'], minDeposit: 15, fee: 3.0, feeType: 'percentage' }
  ];

  const walletAddresses = {
    'USDT-TRC20': 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    'USDT-ERC20': '0x742d35Cc6638C0532925a3b8d4c8CaE8b5A1FCF0',
    'BTC-Bitcoin': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    'ETH-ERC20': '0x742d35Cc6638C0532925a3b8d4c8CaE8b5A1FCF0'
  };

  const themeClass = isDarkMode ? 'dark' : '';
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const border = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  useEffect(() => {
    if (invoice && invoice.status === 'pending') {
      const timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, invoice.expiresAt - now);
        setTimeLeft(remaining);

        if (remaining === 0) {
          setInvoice(prev => prev ? { ...prev, status: 'expired' } : null);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [invoice]);

  const calculateCryptoAmount = () => {
    const amount = parseFloat(usdAmount);
    if (!amount) return { cryptoAmount: 0, fee: 0, total: 0 };

    const selectedOption = cryptoOptions.find(opt => opt.coin === selectedCoin);
    const rate = cryptoRates.find(rate => rate.coin === selectedCoin);

    if (!selectedOption || !rate) return { cryptoAmount: 0, fee: 0, total: 0 };

    let fee = 0;
    if (selectedOption.feeType === 'percentage') {
      fee = amount * (selectedOption.fee / 100);
    } else {
      fee = selectedOption.fee;
    }

    const totalUSD = amount + fee;
    const cryptoAmount = totalUSD / rate.usdPrice;

    return {
      cryptoAmount: parseFloat(cryptoAmount.toFixed(8)),
      fee,
      total: totalUSD
    };
  };

  const handleCreateInvoice = () => {
    const amount = parseFloat(usdAmount);
    const { cryptoAmount, fee, total } = calculateCryptoAmount();

    const newInvoice: Invoice = {
      id: `INV-${Date.now()}`,
      usdAmount: amount,
      cryptoAmount,
      coin: selectedCoin,
      network: selectedNetwork,
      walletAddress: walletAddresses[`${selectedCoin}-${selectedNetwork}` as keyof typeof walletAddresses] || '',
      handlingFee: fee,
      totalAmount: total,
      expiresAt: Date.now() + (30 * 60 * 1000),
      status: 'pending'
    };

    setInvoice(newInvoice);
    setStep(2);
  };

  const handleSubmitTransaction = async () => {
    if (!transactionHash.trim() || !invoice) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setInvoice(prev => prev ? { 
        ...prev, 
        status: 'submitted',
        transactionHash: transactionHash.trim()
      } : null);

      setStep(3);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const generateQRCode = (address: string, amount: string, coin: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${coin}:${address}?amount=${amount}`;
  };

  return (
    <div className={`${bgClass} ${themeClass}`}>
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Deposit Funds</h1>
          <p className={textSecondary}>Add cryptocurrency to your wallet with automatic USD conversion</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { num: 1, title: 'Enter Amount', icon: 'ri-money-dollar-circle-line' },
              { num: 2, title: 'Make Payment', icon: 'ri-qr-code-line' },
              { num: 3, title: 'Confirmation', icon: 'ri-check-circle-line' }
            ].map((stepItem, index) => (
              <div key={stepItem.num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= stepItem.num 
                    ? `bg-gradient-to-r from-cyan-500 to-purple-600 text-white ${isDarkMode ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'shadow-lg'}`
                    : `${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`
                }`}>
                  <i className={`${stepItem.icon} text-lg`}></i>
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    step >= stepItem.num 
                      ? (isDarkMode ? 'text-cyan-400' : 'text-cyan-600')
                      : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
                  }`}>
                    Step {stepItem.num}
                  </div>
                  <div className={`text-sm ${
                    step >= stepItem.num ? textPrimary : textSecondary
                  }`}>
                    {stepItem.title}
                  </div>
                </div>
                {index < 2 && (
                  <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
                    step > stepItem.num 
                      ? (isDarkMode ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-gradient-to-r from-cyan-400 to-purple-500')
                      : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Enter Amount */}
        {step === 1 && (
          <div className={`${cardBg} rounded-xl p-8 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'shadow-sm border border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${textPrimary} mb-6`}>Enter Deposit Amount</h2>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                  Deposit Amount (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className={textSecondary}>$</span>
                  </div>
                  <input
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} border rounded-lg text-lg font-medium focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200`}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Cryptocurrency
                  </label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => {
                      setSelectedCoin(e.target.value);
                      const option = cryptoOptions.find(opt => opt.coin === e.target.value);
                      if (option) {
                        setSelectedNetwork(option.networks[0]);
                      }
                    }}
                    className={`w-full px-4 py-3 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} border rounded-lg pr-8 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200`}
                  >
                    {cryptoOptions.map(option => (
                      <option key={option.coin} value={option.coin}>
                        {option.coin}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Network
                  </label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className={`w-full px-4 py-3 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} border rounded-lg pr-8 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200`}
                  >
                    {cryptoOptions.find(opt => opt.coin === selectedCoin)?.networks.map(network => (
                      <option key={network} value={network}>
                        {network}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {usdAmount && parseFloat(usdAmount) > 0 && (
                <div className={`${isDarkMode ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50'} rounded-lg p-4 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.1)]' : ''}`}>
                  <h3 className={`font-medium ${isDarkMode ? 'text-cyan-300' : 'text-cyan-900'} mb-3`}>Transaction Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-cyan-200' : 'text-cyan-800'}>Deposit Amount:</span>
                      <span className={`${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'} font-medium`}>${usdAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-cyan-200' : 'text-cyan-800'}>Handling Fee:</span>
                      <span className={`${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'} font-medium`}>${calculateCryptoAmount().fee.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between border-t ${isDarkMode ? 'border-cyan-500/30' : 'border-cyan-200'} pt-2`}>
                      <span className={`${isDarkMode ? 'text-cyan-200' : 'text-cyan-800'} font-medium`}>Total (USD):</span>
                      <span className={`${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'} font-bold`}>${calculateCryptoAmount().total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-cyan-200' : 'text-cyan-800'} font-medium`}>You will send:</span>
                      <span className={`${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'} font-bold`}>
                        {calculateCryptoAmount().cryptoAmount} {selectedCoin}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleCreateInvoice}
                disabled={!usdAmount || parseFloat(usdAmount) < (cryptoOptions.find(opt => opt.coin === selectedCoin)?.minDeposit || 0)}
                className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none`}
              >
                Create Payment Invoice
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Make Payment */}
        {step === 2 && invoice && (
          <div className={`${cardBg} rounded-xl p-8 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'shadow-sm border border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${textPrimary}`}>Make Payment</h2>
              <div className={`text-lg font-bold ${timeLeft > 300000 ? (isDarkMode ? 'text-green-400' : 'text-green-600') : timeLeft > 0 ? (isDarkMode ? 'text-amber-400' : 'text-amber-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
                {invoice.status === 'expired' ? 'EXPIRED' : formatTime(timeLeft)}
              </div>
            </div>

            {invoice.status === 'expired' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-close-circle-line text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoice Expired</h3>
                <p className="text-gray-600 mb-4">This payment invoice has expired. Please create a new one.</p>
                <button
                  onClick={() => { setStep(1); setInvoice(null); }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  Create New Invoice
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Invoice ID:</div>
                  <div className="font-mono text-lg font-bold text-gray-900">{invoice.id}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Payment Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Send exactly:</span>
                        <span className="font-bold text-gray-900">{invoice.cryptoAmount} {invoice.coin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network:</span>
                        <span className="font-medium text-gray-900">{invoice.network}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">USD Value:</span>
                        <span className="font-medium text-gray-900">${invoice.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">Send to this address:</div>
                      <div className="bg-gray-100 p-3 rounded-lg break-all font-mono text-sm">
                        {invoice.walletAddress}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">QR Code</div>
                    <img 
                      src={generateQRCode(invoice.walletAddress, invoice.cryptoAmount.toString(), invoice.coin)}
                      alt="Payment QR Code"
                      className="mx-auto rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <i className="ri-warning-line text-amber-600 text-lg flex-shrink-0 mt-0.5"></i>
                    <div>
                      <h4 className="font-medium text-amber-900">Important Instructions:</h4>
                      <ul className="text-sm text-amber-800 mt-2 space-y-1">
                        <li>• Send exactly {invoice.cryptoAmount} {invoice.coin} to avoid processing delays</li>
                        <li>• Use {invoice.network} network only</li>
                        <li>• Do not send from exchange accounts</li>
                        <li>• Save your transaction hash for verification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Hash/ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={transactionHash}
                      onChange={(e) => setTransactionHash(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
                      placeholder="Enter your transaction hash after sending"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Copy this from your wallet after sending the payment
                    </p>
                  </div>

                  <button
                    onClick={handleSubmitTransaction}
                    disabled={!transactionHash.trim() || isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Verifying Transaction...</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-check-line"></i>
                        <span>I've Sent the Payment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && invoice && (
          <div className={`${cardBg} rounded-xl p-8 ${isDarkMode ? 'shadow-2xl border border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'shadow-sm border border-gray-200'}`}>
            <div className="text-center">
              <div className={`w-16 h-16 ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}`}>
                <i className={`ri-check-circle-line ${isDarkMode ? 'text-green-400' : 'text-green-600'} text-2xl`}></i>
              </div>
              <h2 className={`text-xl font-semibold ${textPrimary} mb-2`}>Transaction Submitted Successfully</h2>
              <p className={textSecondary} mb-6>
                Your transaction is being verified on the blockchain. You'll be notified once confirmed.
              </p>

              <div className="flex items-center justify-center space-x-4 mt-6">
                <button className={`bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 ${isDarkMode ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]' : 'shadow-lg hover:shadow-xl'} transform hover:scale-[1.02]`}>
                  Download Receipt
                </button>
                <button
                  onClick={() => window.location.href = '/wallet'}
                  className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'} border px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'hover:shadow-md'}`}
                >
                  Go to Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
