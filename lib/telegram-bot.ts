
import { TELEGRAM_CONFIG, BOT_COMMANDS, QUICK_REPLIES } from './telegram-config';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: {
    id: number;
    type: string;
  };
  date: number;
  text?: string;
}

export class TelegramBot {
  private token: string;
  private apiUrl: string;

  constructor() {
    this.token = TELEGRAM_CONFIG.BOT_TOKEN;
    this.apiUrl = TELEGRAM_CONFIG.API_URL;
  }

  async sendMessage(chatId: number, text: string, replyMarkup?: any) {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup
    };

    try {
      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  }

  getWelcomeKeyboard() {
    return {
      keyboard: [
        [QUICK_REPLIES.BROWSE_PRODUCTS, QUICK_REPLIES.MY_ORDERS],
        [QUICK_REPLIES.WALLET, QUICK_REPLIES.HELP]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    };
  }

  getBrowseKeyboard() {
    return {
      inline_keyboard: [
        [
          { text: QUICK_REPLIES.PREV, callback_data: 'browse_prev' },
          { text: QUICK_REPLIES.NEXT, callback_data: 'browse_next' }
        ]
      ]
    };
  }

  getProductKeyboard(productId: string, price: number) {
    return {
      inline_keyboard: [
        [
          { 
            text: `${QUICK_REPLIES.BUY_NOW} $${price}`, 
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products/${productId}?ref=telegram` 
          }
        ]
      ]
    };
  }

  async handleStartCommand(chatId: number, userName?: string) {
    const welcomeText = `
🎉 <b>Welcome to MarketPlace${userName ? `, ${userName}` : ''}!</b>

Your digital marketplace for buying and selling amazing products instantly.

<b>Quick Menu:</b>
🛍️ Browse Products - Discover digital items
📦 My Orders - Track your purchases
💰 Wallet - Manage your balance
❓ Help - Get AI support

What would you like to do?`;

    return this.sendMessage(chatId, welcomeText, this.getWelcomeKeyboard());
  }

  async handleBrowseCommand(chatId: number, page: number = 0) {
    const products = await this.getFeaturedProducts(page);
    
    if (products.length === 0) {
      return this.sendMessage(chatId, '🔍 No products found. Try browsing our website for the latest items!');
    }

    const productList = products.map((product, index) => 
      `${index + 1}. <b>${product.name}</b>
💰 $${product.price}
⭐ ${product.rating}/5 (${product.reviews} reviews)
👤 By ${product.seller}`
    ).join('\n\n');

    const text = `🛍️ <b>Featured Products (Page ${page + 1})</b>\n\n${productList}\n\nTap "Buy Now" on any product to purchase!`;

    return this.sendMessage(chatId, text, this.getBrowseKeyboard());
  }

  async handleOrdersCommand(chatId: number, userId: string) {
    const orders = await this.getUserOrders(userId);
    
    if (orders.length === 0) {
      const text = `📦 <b>Your Orders</b>\n\nYou haven't made any orders yet.\n\n🛍️ Start browsing products to make your first purchase!`;
      return this.sendMessage(chatId, text);
    }

    const orderList = orders.map(order => 
      `📋 Order #${order.id}
📅 ${new Date(order.date).toLocaleDateString()}
💰 $${order.total}
📊 Status: ${order.status}
🏷️ ${order.items.length} item(s)`
    ).join('\n\n');

    const text = `📦 <b>Your Recent Orders</b>\n\n${orderList}`;
    return this.sendMessage(chatId, text);
  }

  async handleBalanceCommand(chatId: number, userId: string) {
    const balance = await this.getUserBalance(userId);
    
    const text = `💰 <b>Your Wallet</b>

💳 Available Balance: <b>$${balance.available.toFixed(2)}</b>
🔒 Pending: $${balance.pending.toFixed(2)}
📈 Total Earned: $${balance.totalEarned.toFixed(2)}

<b>Quick Actions:</b>
💰 /deposit - Add funds to your wallet
💸 /withdraw - Withdraw your earnings`;

    const keyboard = {
      inline_keyboard: [
        [
          { text: '💰 Deposit', callback_data: 'wallet_deposit' },
          { text: '💸 Withdraw', callback_data: 'wallet_withdraw' }
        ]
      ]
    };

    return this.sendMessage(chatId, text, keyboard);
  }

  async handleDepositCommand(chatId: number) {
    const text = `💰 <b>Deposit Funds</b>

To add funds to your wallet:

1️⃣ Visit our website: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard
2️⃣ Click "Add Funds" in your wallet section
3️⃣ Choose your preferred payment method
4️⃣ Complete the secure payment process

💳 <b>Supported Methods:</b>
• Credit/Debit Cards
• PayPal
• Cryptocurrency
• Bank Transfer

🔒 All transactions are secured with SSL encryption.`;

    return this.sendMessage(chatId, text);
  }

  async handleWithdrawCommand(chatId: number, userId: string) {
    const balance = await this.getUserBalance(userId);
    
    const text = `💸 <b>Withdraw Funds</b>

Available for withdrawal: <b>$${balance.available.toFixed(2)}</b>

To withdraw your earnings:
1️⃣ Visit: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard
2️⃣ Click "Withdraw Funds"
3️⃣ Enter amount and payment details
4️⃣ Confirm withdrawal

⏱️ <b>Processing Time:</b> 1-3 business days
💰 <b>Minimum:</b> $10.00`;

    return this.sendMessage(chatId, text);
  }

  async handleHelpCommand(chatId: number) {
    const text = `❓ <b>Help & Support</b>

🤖 <b>Available Commands:</b>
/start - Main menu
/browse - Browse products
/orders - View your orders
/balance - Check wallet balance
/deposit - Add funds
/withdraw - Withdraw earnings
/help - This help message

🌐 <b>Website:</b> ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}

💬 <b>Need more help?</b>
I'm an AI assistant ready to help with:
• Product recommendations
• Order troubleshooting
• Payment questions
• Account issues

Just type your question and I'll assist you!`;

    return this.sendMessage(chatId, text);
  }

  private async getFeaturedProducts(page: number = 0) {
    return [
      {
        id: '1',
        name: 'Professional UI Kit',
        price: 49,
        rating: 4.8,
        reviews: 124,
        seller: 'DesignStudio'
      },
      {
        id: '2',
        name: 'React Components Library',
        price: 79,
        rating: 4.9,
        reviews: 89,
        seller: 'CodeCraft'
      },
      {
        id: '3',
        name: 'Digital Marketing Course',
        price: 129,
        rating: 4.7,
        reviews: 256,
        seller: 'MarketingPro'
      },
      {
        id: '4',
        name: 'Icon Pack Bundle',
        price: 25,
        rating: 4.6,
        reviews: 178,
        seller: 'IconMaster'
      },
      {
        id: '5',
        name: 'Website Template',
        price: 35,
        rating: 4.8,
        reviews: 92,
        seller: 'WebDesigner'
      }
    ].slice(page * 5, (page + 1) * 5);
  }

  private async getUserOrders(userId: string) {
    return [
      {
        id: 'ORD001',
        date: '2024-01-15',
        total: 149,
        status: 'Completed',
        items: ['Professional UI Kit', 'React Components']
      },
      {
        id: 'ORD002',
        date: '2024-01-10',
        total: 79,
        status: 'Delivered',
        items: ['Digital Marketing Course']
      }
    ];
  }

  private async getUserBalance(userId: string) {
    return {
      available: 2847.50,
      pending: 150.00,
      totalEarned: 5420.75
    };
  }
}
