import { TelegramBot } from './telegram-bot';
import { AuthService } from './auth-service';

export interface WebhookUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      type: string;
    };
    date: number;
    text?: string;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
    data: string;
    message?: any;
  };
}

export class TelegramWebhookHandler {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot();
  }

  async handleUpdate(update: WebhookUpdate): Promise<void> {
    try {
      if (update.message) {
        await this.handleMessage(update.message);
      } else if (update.callback_query) {
        await this.handleCallbackQuery(update.callback_query);
      }
    } catch (error) {
      console.error('Webhook handler error:', error);
    }
  }

  private async handleMessage(message: any): Promise<void> {
    const chatId = message.chat.id;
    const text = message.text || '';
    const userId = message.from.id.toString();
    const userName = message.from.first_name;

    // Handle commands
    if (text.startsWith('/start')) {
      const param = text.split(' ')[1];
      
      if (param === 'login' || param === 'register') {
        await this.handleAuthCommand(chatId, param, message.from);
      } else {
        await this.bot.handleStartCommand(chatId, userName);
      }
    } else if (text === '/browse' || text === '🛍️ Browse Products') {
      await this.bot.handleBrowseCommand(chatId);
    } else if (text === '/orders' || text === '📦 My Orders') {
      await this.bot.handleOrdersCommand(chatId, userId);
    } else if (text === '/balance' || text === '💰 Wallet') {
      await this.bot.handleBalanceCommand(chatId, userId);
    } else if (text === '/deposit') {
      await this.bot.handleDepositCommand(chatId);
    } else if (text === '/withdraw') {
      await this.bot.handleWithdrawCommand(chatId, userId);
    } else if (text === '/help' || text === '❓ Help') {
      await this.bot.handleHelpCommand(chatId);
    } else {
      // Handle general chat - could integrate AI assistant
      await this.handleGeneralChat(chatId, text, userId);
    }
  }

  private async handleCallbackQuery(callbackQuery: any): Promise<void> {
    const chatId = callbackQuery.from.id;
    const data = callbackQuery.data;
    const userId = callbackQuery.from.id.toString();

    // Answer callback query to remove loading state
    await this.answerCallbackQuery(callbackQuery.id);

    // Handle different callback actions
    if (data.startsWith('browse_')) {
      const action = data.split('_')[1];
      if (action === 'next' || action === 'prev') {
        const page = action === 'next' ? 1 : 0; // Simplified pagination
        await this.bot.handleBrowseCommand(chatId, page);
      }
    } else if (data.startsWith('wallet_')) {
      const action = data.split('_')[1];
      if (action === 'deposit') {
        await this.bot.handleDepositCommand(chatId);
      } else if (action === 'withdraw') {
        await this.bot.handleWithdrawCommand(chatId, userId);
      }
    }
  }

  private async handleAuthCommand(chatId: number, action: string, user: any): Promise<void> {
    const authUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${action}`;
    
    const authKeyboard = {
      inline_keyboard: [
        [{ 
          text: `🌐 Complete ${action.charAt(0).toUpperCase() + action.slice(1)} on Website`, 
          url: authUrl 
        }]
      ]
    };

    const message = action === 'login' 
      ? `🔐 <b>Login to Your Account</b>

Welcome back, ${user.first_name}!

To complete your login:
1️⃣ Click the button below to open our website
2️⃣ You'll be automatically logged in
3️⃣ Start buying and selling amazing products!

🔒 Secure authentication via Telegram`
      : `🎉 <b>Create Your Account</b>

Welcome, ${user.first_name}!

Join thousands of users buying and selling digital products:

✨ <b>Welcome Benefits:</b>
• $10 bonus in your wallet
• Access to premium products
• Secure Telegram authentication
• Instant notifications

1️⃣ Click the button below
2️⃣ Complete quick setup
3️⃣ Start exploring the marketplace!`;

    await this.bot.sendMessage(chatId, message, authKeyboard);
  }

  private async handleGeneralChat(chatId: number, text: string, userId: string): Promise<void> {
    // Simple AI-like responses
    const lowerText = text.toLowerCase();

    if (lowerText.includes('help') || lowerText.includes('support')) {
      await this.bot.handleHelpCommand(chatId);
    } else if (lowerText.includes('product') || lowerText.includes('buy')) {
      await this.bot.handleBrowseCommand(chatId);
    } else if (lowerText.includes('order') || lowerText.includes('purchase')) {
      await this.bot.handleOrdersCommand(chatId, userId);
    } else if (lowerText.includes('money') || lowerText.includes('wallet') || lowerText.includes('balance')) {
      await this.bot.handleBalanceCommand(chatId, userId);
    } else {
      // Generic helpful response
      const response = `👋 Hi there! I'm here to help you with our marketplace.

🤖 <b>I can help you with:</b>
• Browse and find products
• Check your orders and wallet
• Get support and answers

💬 Try asking me about:
• "Show me products"
• "Check my orders"
• "What's my balance?"
• "How do I buy something?"

Or use our quick menu buttons below!`;

      await this.bot.sendMessage(chatId, response, this.bot.getWelcomeKeyboard());
    }
  }

  private async answerCallbackQuery(callbackQueryId: string, text?: string): Promise<void> {
    try {
      const url = `https://api.telegram.org/bot7817546965:AAHmgPXE7nayTriJEnSveiVBfxOkrO542mw/answerCallbackQuery`;
      
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callback_query_id: callbackQueryId,
          text: text || '',
          show_alert: false
        }),
      });
    } catch (error) {
      console.error('Error answering callback query:', error);
    }
  }

  async setWebhook(webhookUrl: string): Promise<{ success: boolean; error?: string }> {
    try {
      const url = `https://api.telegram.org/bot7817546965:AAHmgPXE7nayTriJEnSveiVBfxOkrO542mw/setWebhook`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message', 'callback_query'],
          drop_pending_updates: true
        }),
      });

      const result = await response.json();
      
      return {
        success: result.ok,
        error: result.ok ? undefined : result.description
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async deleteWebhook(): Promise<{ success: boolean; error?: string }> {
    try {
      const url = `https://api.telegram.org/bot7817546965:AAHmgPXE7nayTriJEnSveiVBfxOkrO542mw/deleteWebhook`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drop_pending_updates: true
        }),
      });

      const result = await response.json();
      
      return {
        success: result.ok,
        error: result.ok ? undefined : result.description
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}