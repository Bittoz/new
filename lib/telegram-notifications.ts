
interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

interface DepositNotification {
  invoiceId: string;
  customerName: string;
  usdAmount: number;
  cryptoAmount: number;
  coin: string;
  network: string;
  status: 'pending' | 'submitted' | 'confirmed' | 'expired' | 'failed';
  transactionHash?: string;
  timestamp: string;
}

interface LoginNotification {
  username: string;
  firstName: string;
  lastName: string;
  loginTime: string;
  ipAddress: string;
  userAgent: string;
}

interface OrderNotification {
  orderId: string;
  customerName: string;
  productName: string;
  amount: number;
  status: 'new' | 'completed' | 'refund';
  timestamp: string;
}

export class TelegramNotificationService {
  private config: TelegramConfig;

  constructor(config: TelegramConfig) {
    this.config = config;
    console.log('TelegramNotificationService initialized with config:', {
      botToken: config.botToken ? 'Set' : 'Missing',
      chatId: config.chatId,
      enabled: config.enabled
    });
  }

  // Send login notification
  async sendLoginAlert(notification: LoginNotification): Promise<boolean> {
    console.log('Sending login alert:', notification);
    
    if (!this.config.enabled || !this.config.botToken || !this.config.chatId) {
      console.log('Telegram notifications disabled or not configured');
      return false;
    }

    const message = this.formatLoginMessage(notification);
    return await this.sendMessage(message);
  }

  // Send new order notification
  async sendOrderAlert(notification: OrderNotification): Promise<boolean> {
    console.log('Sending order alert:', notification);
    
    if (!this.config.enabled || !this.config.botToken || !this.config.chatId) {
      console.log('Telegram notifications disabled or not configured');
      return false;
    }

    const message = this.formatOrderMessage(notification);
    return await this.sendMessage(message);
  }

  async sendDepositAlert(notification: DepositNotification): Promise<boolean> {
    if (!this.config.enabled || !this.config.botToken || !this.config.chatId) {
      console.log('Telegram notifications disabled or not configured');
      return false;
    }

    const message = this.formatDepositMessage(notification);
    return await this.sendMessage(message);
  }

  async sendConfirmationAlert(notification: DepositNotification): Promise<boolean> {
    if (!this.config.enabled) return false;

    const message = this.formatConfirmationMessage(notification);
    return await this.sendMessage(message);
  }

  async sendFailureAlert(notification: DepositNotification, reason: string): Promise<boolean> {
    if (!this.config.enabled) return false;

    const message = this.formatFailureMessage(notification, reason);
    return await this.sendMessage(message);
  }

  private formatLoginMessage(notification: LoginNotification): string {
    const isRegistration = notification.loginTime.includes('Registration');
    const isLogout = notification.loginTime.includes('Logout');
    
    if (isRegistration) {
      return `
🎉 <b>New User Registered!</b>

✅ New member joined MarketPlace

👤 <b>User Details:</b>
• Name: ${notification.firstName} ${notification.lastName}
• Username: @${notification.username}

💰 <b>Welcome Bonus:</b> $10.00 credited to wallet

🌐 <b>Registration Details:</b>
• Time: ${notification.loginTime.replace(' (New Registration)', '')}
• IP: ${notification.ipAddress}
• Device: ${notification.userAgent.replace(' - First Time User', '')}

🎯 Welcome to MarketPlace!
      `.trim();
    }
    
    if (isLogout) {
      return `
🚪 <b>User Logged Out</b>

👋 User session ended

👤 <b>User Details:</b>
• Name: ${notification.firstName} ${notification.lastName}
• Username: @${notification.username}

🕐 <b>Logout Details:</b>
• Time: ${notification.loginTime.replace(' (Logout)', '')}
• IP: ${notification.ipAddress}
• Device: ${notification.userAgent.replace(' - User Logout', '')}

👋 User has left the platform
      `.trim();
    }

    return `
🔐 <b>User Login Alert</b>

✅ User successfully logged in to MarketPlace

👤 <b>User Details:</b>
• Name: ${notification.firstName} ${notification.lastName}
• Username: @${notification.username}

🌐 <b>Login Details:</b>
• Time: ${notification.loginTime}
• IP: ${notification.ipAddress}
• Device: ${notification.userAgent}

🎯 User is now active on the platform
    `.trim();
  }

  private formatOrderMessage(notification: OrderNotification): string {
    const statusEmoji = notification.status === 'new' ? '🛒' : 
                       notification.status === 'completed' ? '✅' : '🔄';

    return `
${statusEmoji} <b>Order ${notification.status === 'new' ? 'Received' : notification.status === 'completed' ? 'Completed' : 'Updated'}</b>

💰 <b>Order Details:</b>
• Order ID: <code>${notification.orderId}</code>
• Customer: ${notification.customerName}
• Product: ${notification.productName}
• Amount: $${notification.amount.toFixed(2)}

📅 <b>Time:</b> ${notification.timestamp}

${notification.status === 'new' ? '🎉 New sale on your marketplace!' : 
  notification.status === 'completed' ? '✨ Payment processed successfully!' : 
  '🔄 Order status updated'}
    `.trim();
  }

  private formatDepositMessage(notification: DepositNotification): string {
    const statusEmoji = this.getStatusEmoji(notification.status);
    const coinEmoji = this.getCoinEmoji(notification.coin);

    return `
🔔 <b>New Deposit Alert</b>

${statusEmoji} <b>Status:</b> ${notification.status.toUpperCase()}
👤 <b>Customer:</b> ${notification.customerName}
🆔 <b>Invoice ID:</b> <code>${notification.invoiceId}</code>

💰 <b>Amount Details:</b>
• USD Value: $${notification.usdAmount.toFixed(2)}
• Crypto Amount: ${notification.cryptoAmount} ${notification.coin}
• Network: ${notification.network}

${coinEmoji} <b>Cryptocurrency:</b> ${notification.coin}
📅 <b>Time:</b> ${new Date(notification.timestamp).toLocaleString()}

${notification.transactionHash ? `🔗 <b>Transaction:</b> <code>${notification.transactionHash}</code>` : ''}

<i>Automatic blockchain verification in progress...</i>
    `.trim();
  }

  private formatConfirmationMessage(notification: DepositNotification): string {
    const coinEmoji = this.getCoinEmoji(notification.coin);

    return `
✅ <b>Deposit Confirmed!</b>

🎉 Payment successfully verified and credited!

👤 <b>Customer:</b> ${notification.customerName}
🆔 <b>Invoice ID:</b> <code>${notification.invoiceId}</code>

💰 <b>Confirmed Amount:</b>
• $${notification.usdAmount.toFixed(2)} USD
• ${notification.cryptoAmount} ${notification.coin}

${coinEmoji} <b>Network:</b> ${notification.network}
🔗 <b>TX Hash:</b> <code>${notification.transactionHash}</code>
📅 <b>Confirmed:</b> ${new Date(notification.timestamp).toLocaleString()}

✨ <b>Wallet Balance Updated</b>
📧 Receipt sent to customer
    `.trim();
  }

  private formatFailureMessage(notification: DepositNotification, reason: string): string {
    return `
❌ <b>Deposit Failed</b>

⚠️ <b>Issue detected with payment verification</b>

👤 <b>Customer:</b> ${notification.customerName}
🆔 <b>Invoice ID:</b> <code>${notification.invoiceId}</code>

💰 <b>Amount:</b> $${notification.usdAmount.toFixed(2)} (${notification.cryptoAmount} ${notification.coin})
🔗 <b>TX Hash:</b> <code>${notification.transactionHash || 'Not provided'}</code>

🚨 <b>Failure Reason:</b> ${reason}
📅 <b>Time:</b> ${new Date(notification.timestamp).toLocaleString()}

<b>Action Required:</b> Manual review needed
    `.trim();
  }

  private getStatusEmoji(status: string): string {
    const emojis = {
      'pending': '🕒',
      'submitted': '📤',
      'confirmed': '✅',
      'expired': '⏰',
      'failed': '❌'
    };
    return emojis[status as keyof typeof emojis] || '❓';
  }

  private getCoinEmoji(coin: string): string {
    const emojis = {
      'BTC': '₿',
      'ETH': 'Ξ',
      'USDT': '₮',
      'BNB': '🔸',
      'USDC': '💵'
    };
    return emojis[coin as keyof typeof emojis] || '💰';
  }

  private async sendMessage(message: string): Promise<boolean> {
    try {
      console.log('Sending Telegram message to chat ID:', this.config.chatId);
      console.log('Message:', message);
      
      const url = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        }),
      });

      const result = await response.json();
      console.log('Telegram API response:', result);
      
      if (!result.ok) {
        console.error('Telegram API error:', result);
        return false;
      }

      console.log('Telegram message sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('Testing Telegram connection...');
      
      const testMessage = `
🧪 <b>Test Message</b>

✅ Telegram bot connection working!
📅 ${new Date().toLocaleString()}

Your marketplace notifications are configured correctly.
🏪 MarketPlace Bot is ready!
      `.trim();

      const success = await this.sendMessage(testMessage);
      
      return {
        success,
        message: success 
          ? 'Test message sent successfully! Check your Telegram.' 
          : 'Failed to send test message. Please check your bot token and chat ID.'
      };
    } catch (error) {
      console.error('Connection test error:', error);
      return {
        success: false,
        message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async sendDailyReport(deposits: DepositNotification[]): Promise<boolean> {
    if (!this.config.enabled || deposits.length === 0) return false;

    const today = new Date().toLocaleDateString();
    const totalUSD = deposits.reduce((sum, deposit) => sum + deposit.usdAmount, 0);
    const confirmedDeposits = deposits.filter(d => d.status === 'confirmed');
    const confirmedUSD = confirmedDeposits.reduce((sum, deposit) => sum + deposit.usdAmount, 0);

    const coinBreakdown = deposits.reduce((acc, deposit) => {
      acc[deposit.coin] = (acc[deposit.coin] || 0) + deposit.cryptoAmount;
      return acc;
    }, {} as Record<string, number>);

    const breakdownText = Object.entries(coinBreakdown)
      .map(([coin, amount]) => `• ${amount.toFixed(8)} ${coin}`)
      .join('\n');

    const message = `
📊 <b>Daily Report - ${today}</b>

📈 <b>Summary:</b>
• Total Deposits: ${deposits.length}
• Confirmed: ${confirmedDeposits.length}
• Total Value: $${totalUSD.toFixed(2)}
• Confirmed Value: $${confirmedUSD.toFixed(2)}

💰 <b>Cryptocurrency Breakdown:</b>
${breakdownText}

📋 <b>Status Breakdown:</b>
• Confirmed: ${deposits.filter(d => d.status === 'confirmed').length}
• Pending: ${deposits.filter(d => d.status === 'pending').length}
• Failed: ${deposits.filter(d => d.status === 'failed').length}
• Expired: ${deposits.filter(d => d.status === 'expired').length}

Generated: ${new Date().toLocaleString()}
    `.trim();

    return await this.sendMessage(message);
  }
}
