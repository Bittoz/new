
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TelegramNotificationService } from '../../lib/telegram-notifications';
import { TelegramWebhookHandler } from '../../lib/webhook-handler';

export default function TestNotificationsPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState('');
  const [webhookStatus, setWebhookStatus] = useState<string>('');

  const telegramService = new TelegramNotificationService({
    botToken: '7817546965:AAHmgPXE7nayTriJEnSveiVBfxOkrO542mw',
    chatId: chatId || '123456789',
    enabled: true
  });

  const webhookHandler = new TelegramWebhookHandler();

  const deleteWebhook = async () => {
    setIsLoading(true);
    setWebhookStatus('Deleting webhook...');

    try {
      const result = await webhookHandler.deleteWebhook();
      if (result.success) {
        setWebhookStatus('✅ Webhook successfully deleted! You can now use getUpdates method to get your Chat ID.');
      } else {
        setWebhookStatus(`❌ Failed to delete webhook: ${result.error}`);
      }
    } catch (error) {
      setWebhookStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getChatId = async () => {
    setIsLoading(true);
    setTestResult('Getting your Chat ID...');

    try {
      await webhookHandler.deleteWebhook();

      const response = await fetch('https://api.telegram.org/bot7817546965:AAHmgPXE7nayTriJEnSveiVBfxOkrO542mw/getUpdates');
      const data = await response.json();

      if (data.ok && data.result.length > 0) {
        const updates = data.result;
        const latestUpdate = updates[updates.length - 1];
        const chatId = latestUpdate.message?.chat?.id || latestUpdate.callback_query?.from?.id;

        if (chatId) {
          setTestResult(`✅ Found your Chat ID: ${chatId}
          
Please copy and save this number, then enter this Chat ID in the input field below to test notifications.

📱 If no Chat ID was found, please:
1. Open Telegram
2. Find your bot @bittoz_bot  
3. Send any message (like /start or "Hello")
4. Then click "Get My Chat ID" button again`);
        } else {
          setTestResult(`⚠️ No Chat ID found. Please make sure you have:
1. Found the bot @bittoz_bot in Telegram
2. Sent at least one message to the bot
3. Then click this button again`);
        }
      } else {
        setTestResult(`⚠️ No message history found. Please:
1. Open Telegram app
2. Search and open @bittoz_bot
3. Send any message (like /start)
4. Return here and get Chat ID again`);
      }
    } catch (error) {
      setTestResult(`❌ Error getting Chat ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    if (!chatId.trim()) {
      setTestResult('❌ Please enter your Chat ID first');
      return;
    }

    setIsLoading(true);
    setTestResult('Testing Telegram connection...');

    try {
      // Save the Chat ID to localStorage for auth system to use
      localStorage.setItem('admin_chat_id', chatId.trim());
      console.log('💾 Automatically saved Chat ID for auth system:', chatId.trim());

      const result = await telegramService.testConnection();

      if (result.success) {
        setTestResult(`✅ Connection successful! 

🎉 AUTOMATICALLY CONFIGURED:
• Test message sent to your Telegram
• Chat ID (${chatId}) saved for authentication system
• Login/registration notifications now enabled

✨ Your system is now fully configured! 
You will automatically receive:
📱 User login alerts
👤 New user registration notifications  
🛒 Order notifications
💰 Deposit confirmations
🚪 User logout alerts

No more manual setup needed - everything works automatically now!

Please check your Telegram app to confirm you received the test message.`);
      } else {
        setTestResult(`❌ Test failed: ${result.message}

Please make sure:
1. You've sent a message to @bittoz_bot first
2. The Chat ID is correct
3. Try getting your Chat ID again if needed`);
      }
    } catch (error) {
      setTestResult(`❌ Test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLoginNotification = async () => {
    if (!chatId.trim()) {
      setTestResult('❌ Please enter your Chat ID first');
      return;
    }

    setIsLoading(true);

    try {
      const success = await telegramService.sendLoginAlert({
        username: 'test_user',
        firstName: 'Test',
        lastName: 'User',
        loginTime: new Date().toLocaleString('en-US'),
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      setTestResult(success 
        ? '✅ Login notification test successful! Please check your Telegram messages'
        : '❌ Failed to send login notification');
    } catch (error) {
      setTestResult(`❌ Error sending login notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testOrderNotification = async () => {
    if (!chatId.trim()) {
      setTestResult('❌ Please enter your Chat ID first');
      return;
    }

    setIsLoading(true);

    try {
      const success = await telegramService.sendOrderAlert({
        orderId: 'TEST001',
        customerName: 'Test Customer',
        productName: 'Professional UI Kit',
        amount: 49.99,
        status: 'new',
        timestamp: new Date().toLocaleString('en-US')
      });

      setTestResult(success 
        ? '✅ Order notification test successful! Please check your Telegram messages'
        : '❌ Failed to send order notification');
    } catch (error) {
      setTestResult(`❌ Error sending order notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Telegram Notification System Test</h1>
          <p className="text-lg text-gray-600">Test your Telegram bot connection and notification functionality</p>
        </div>

        {/* Webhook Management Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔧 Webhook Management</h2>
          <p className="text-gray-600 mb-4">
            If you encounter "webhook conflict" errors, please delete the existing webhook settings first.
          </p>

          <button
            onClick={deleteWebhook}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap mb-4"
          >
            {isLoading ? 'Processing...' : 'Delete Webhook'}
          </button>

          {webhookStatus && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-800 whitespace-pre-wrap">{webhookStatus}</div>
            </div>
          )}
        </div>

        {/* Chat ID Retrieval Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📱 Get Your Chat ID</h2>
          <p className="text-gray-600 mb-4">
            First you need to get your Telegram Chat ID to receive notifications.
          </p>

          <button
            onClick={getChatId}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {isLoading ? 'Getting...' : 'Get My Chat ID'}
          </button>
        </div>

        {/* Chat ID Input Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">💬 Enter Chat ID</h2>
          <p className="text-gray-600 mb-4">
            After getting your Chat ID above, please enter it below to test notification functionality.
          </p>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="Enter your Chat ID (e.g.: 123456789)"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={testConnection}
              disabled={isLoading || !chatId.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {isLoading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </div>

        {/* Notification Testing Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔔 Notification Tests</h2>
          <p className="text-gray-600 mb-6">
            Test whether different types of notification messages can be sent correctly to your Telegram.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={testLoginNotification}
              disabled={isLoading || !chatId.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {isLoading ? 'Sending...' : '🔐 Test Login Notification'}
            </button>

            <button
              onClick={testOrderNotification}
              disabled={isLoading || !chatId.trim()}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {isLoading ? 'Sending...' : '🛒 Test Order Notification'}
            </button>
          </div>
        </div>

        {/* Results Display */}
        {testResult && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Results</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{testResult}</pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mt-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-blue-600"></i>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Usage Instructions</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>1. Delete Webhook:</strong> If you encounter conflict errors, delete existing webhooks first</p>
                <p><strong>2. Get Chat ID:</strong> You must send a message to the bot in Telegram first</p>
                <p><strong>3. Enter Chat ID:</strong> Input the retrieved number into the input field</p>
                <p><strong>4. Test Connection:</strong> Verify that the bot can successfully send messages</p>
                <p><strong>5. Test Notifications:</strong> Test specific notification types</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
