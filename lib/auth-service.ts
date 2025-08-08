
import { TELEGRAM_CONFIG } from './telegram-config';
import { TelegramNotificationService } from './telegram-notifications';

interface User {
  id: string;
  uid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photoUrl?: string;
  telegramUsername?: string;
  authDate: number;
  walletBalance: number;
  isNewUser: boolean;
  provider: 'credentials' | 'google';
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  isNewUser?: boolean;
}

interface CheckUserResult {
  exists: boolean;
  user?: User;
}

interface CredentialsData {
  emailOrUid?: string;
  email?: string;
  password: string;
  uid?: string;
  telegramUsername?: string;
  confirmPassword?: string;
}

interface GoogleAuthSettings {
  clientId: string;
  clientSecret: string;
  enabled: boolean;
}

export class AuthService {
  private static readonly STORAGE_KEY = 'marketplace_user';

  static createNotificationService(userEmail?: string): TelegramNotificationService {
    const savedChatId = localStorage.getItem('admin_chat_id');

    if (!savedChatId) {
      console.log('⚠️ No Chat ID available - notifications disabled');
      return new TelegramNotificationService({
        botToken: TELEGRAM_CONFIG.BOT_TOKEN,
        chatId: '',
        enabled: false
      });
    }

    console.log('✅ Using saved Chat ID for notifications');
    return new TelegramNotificationService({
      botToken: TELEGRAM_CONFIG.BOT_TOKEN,
      chatId: savedChatId,
      enabled: true
    });
  }

  static getGoogleAuthSettings(): GoogleAuthSettings {
    try {
      const settings = localStorage.getItem('authSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        return {
          clientId: parsed.googleClientId || '',
          clientSecret: parsed.googleClientSecret || '',
          enabled: parsed.googleOAuthEnabled || false
        };
      }
    } catch (error) {
      console.error('Error loading Google auth settings:', error);
    }
    return { clientId: '', clientSecret: '', enabled: false };
  }

  static async checkUserExists(emailOrUid: string): Promise<CheckUserResult> {
    try {
      const existingUsers = this.getStoredUsers();

      const existingUser = existingUsers.find(u =>
        u.email.toLowerCase() === emailOrUid.toLowerCase() || u.uid === emailOrUid
      );

      return {
        exists: !!existingUser,
        user: existingUser
      };
    } catch (error) {
      console.error('❌ Error checking user existence:', error);
      return { exists: false };
    }
  }

  static async loginWithCredentials(credentials: CredentialsData): Promise<AuthResult> {
    try {
      if (!credentials.emailOrUid || !credentials.password) {
        return { success: false, error: 'Email/UID and password are required' };
      }

      const existingUsers = this.getStoredUsers();

      const existingUser = existingUsers.find(u =>
        u.email.toLowerCase() === credentials.emailOrUid!.toLowerCase() || u.uid === credentials.emailOrUid
      );

      if (!existingUser) {
        return { success: false, error: 'Account not found. Please register first.' };
      }

      const user: User = {
        ...existingUser,
        authDate: Math.floor(Date.now() / 1000)
      };

      const userIndex = existingUsers.findIndex(u => u.id === existingUser.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = user;
        localStorage.setItem('marketplace_users', JSON.stringify(existingUsers));
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

      try {
        const notificationService = this.createNotificationService(user.email);
        if (notificationService.enabled) {
          const loginNotification = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toLocaleString(),
            ipAddress: await this.getCurrentIP(),
            userAgent: this.getUserAgent()
          };

          await notificationService.sendLoginAlert(loginNotification);
        }
      } catch (notificationError) {
        console.error('Failed to send login notification:', notificationError);
      }

      return {
        success: true,
        user,
        isNewUser: false
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  static async registerWithCredentials(credentials: CredentialsData): Promise<AuthResult> {
    try {
      if (!credentials.email || !credentials.password || !credentials.uid) {
        return { success: false, error: 'All required fields must be filled' };
      }

      const checkResult = await this.checkUserExists(credentials.email);
      if (checkResult.exists) {
        return { success: false, error: 'User already exists. Please login instead.' };
      }

      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const user: User = {
        id: userId,
        uid: credentials.uid,
        firstName: credentials.email.split('@')[0],
        lastName: '',
        username: credentials.email.split('@')[0],
        email: credentials.email,
        telegramUsername: credentials.telegramUsername,
        authDate: Math.floor(Date.now() / 1000),
        walletBalance: 10.00,
        isNewUser: true,
        provider: 'credentials'
      };

      const existingUsers = this.getStoredUsers();
      existingUsers.push(user);
      localStorage.setItem('marketplace_users', JSON.stringify(existingUsers));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

      try {
        const notificationService = this.createNotificationService(user.email);
        if (notificationService.enabled) {
          const registrationNotification = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toLocaleString() + ' (New Registration)',
            ipAddress: await this.getCurrentIP(),
            userAgent: this.getUserAgent() + ' - First Time User'
          };

          await notificationService.sendLoginAlert(registrationNotification);
        }
      } catch (notificationError) {
        console.error('Failed to send registration notification:', notificationError);
      }

      return {
        success: true,
        user,
        isNewUser: true
      };
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }

  static async loginWithGoogle(): Promise<AuthResult> {
    try {
      console.log('🔐 === GOOGLE LOGIN ATTEMPT ===');

      const googleAuthSettings = this.getGoogleAuthSettings();

      if (!googleAuthSettings.enabled || !googleAuthSettings.clientId) {
        return { success: false, error: 'Google authentication is not properly configured' };
      }

      console.log('🔍 Initiating Google OAuth flow...');

      const googleUser = await this.authenticateWithGoogleOAuth(googleAuthSettings.clientId);

      if (!googleUser) {
        return { success: false, error: 'Google authentication was cancelled or failed' };
      }

      console.log('✅ Google authentication successful:', googleUser.email);

      const checkResult = await this.checkUserExists(googleUser.email);

      if (checkResult.exists) {
        const existingUser = checkResult.user!;
        const user: User = {
          ...existingUser,
          firstName: googleUser.given_name || existingUser.firstName,
          lastName: googleUser.family_name || existingUser.lastName,
          photoUrl: googleUser.picture || existingUser.photoUrl,
          authDate: Math.floor(Date.now() / 1000)
        };

        const existingUsers = this.getStoredUsers();
        const userIndex = existingUsers.findIndex(u => u.id === existingUser.id);
        if (userIndex !== -1) {
          existingUsers[userIndex] = user;
          localStorage.setItem('marketplace_users', JSON.stringify(existingUsers));
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

        try {
          const notificationService = this.createNotificationService(user.email);
          await notificationService.sendLoginAlert({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toLocaleString() + ' (Google Login)',
            ipAddress: await this.getCurrentIP(),
            userAgent: this.getUserAgent() + ' - Google OAuth'
          });
        } catch (error) {
          console.error('Failed to send Google login notification:', error);
        }

        console.log('🎉 === GOOGLE LOGIN SUCCESSFUL ===');
        return { success: true, user, isNewUser: false };
      } else {
        return { success: false, error: 'Google account not found. Please register first or create an account with this email.' };
      }
    } catch (error) {
      console.error('❌ Google login error:', error);
      return { success: false, error: `Google login failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  static async registerWithGoogle(): Promise<AuthResult> {
    try {
      console.log('📝 === GOOGLE REGISTRATION ATTEMPT ===');

      const googleAuthSettings = this.getGoogleAuthSettings();

      if (!googleAuthSettings.enabled || !googleAuthSettings.clientId) {
        return { success: false, error: 'Google authentication is not properly configured' };
      }

      console.log('🔍 Initiating Google OAuth registration flow...');

      const googleUser = await this.authenticateWithGoogleOAuth(googleAuthSettings.clientId);

      if (!googleUser) {
        return { success: false, error: 'Google authentication was cancelled or failed' };
      }

      console.log('✅ Google authentication successful:', googleUser.email);

      const checkResult = await this.checkUserExists(googleUser.email);
      if (checkResult.exists) {
        return { success: false, error: 'An account with this Google email already exists. Please login instead.' };
      }

      const generateUID = () => {
        return String(Math.floor(100000 + Math.random() * 900000));
      };

      const userId = `google_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const user: User = {
        id: userId,
        uid: generateUID(),
        firstName: googleUser.given_name || 'Google',
        lastName: googleUser.family_name || 'User',
        username: googleUser.email.split('@')[0],
        email: googleUser.email,
        photoUrl: googleUser.picture,
        authDate: Math.floor(Date.now() / 1000),
        walletBalance: 10.00,
        isNewUser: true,
        provider: 'google'
      };

      console.log('📝 Creating new Google user:', user);

      const existingUsers = this.getStoredUsers();
      existingUsers.push(user);
      localStorage.setItem('marketplace_users', JSON.stringify(existingUsers));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

      try {
        const notificationService = this.createNotificationService(user.email);
        await notificationService.sendLoginAlert({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          loginTime: new Date().toLocaleString() + ' (Google Registration)',
          ipAddress: await this.getCurrentIP(),
          userAgent: this.getUserAgent() + ' - Google OAuth Registration'
        });
      } catch (error) {
        console.error('Failed to send Google registration notification:', error);
      }

      console.log('🎉 === GOOGLE REGISTRATION SUCCESSFUL ===');
      return { success: true, user, isNewUser: true };
    } catch (error) {
      console.error('❌ Google registration error:', error);
      return { success: false, error: `Google registration failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  private static async authenticateWithGoogleOAuth(clientId: string): Promise<any | null> {
    return new Promise((resolve, reject) => {
      try {
        console.log('🔗 Loading Google OAuth library...');

        if (!(window as any).google) {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;

          script.onload = () => {
            console.log('✅ Google OAuth library loaded');
            this.initiateGoogleOAuth(clientId, resolve, reject);
          };

          script.onerror = () => {
            console.error('❌ Failed to load Google OAuth library');
            reject(new Error('Failed to load Google OAuth library'));
          };

          document.head.appendChild(script);
        } else {
          this.initiateGoogleOAuth(clientId, resolve, reject);
        }
      } catch (error) {
        console.error('❌ Error setting up Google OAuth:', error);
        reject(error);
      }
    });
  }

  private static initiateGoogleOAuth(clientId: string, resolve: (value: any) => void, reject: (reason: any) => void) {
    try {
      console.log('🔐 Initializing Google OAuth with Client ID:', clientId);

      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          try {
            console.log('✅ Google OAuth callback received');

            const payload = this.parseJwt(response.credential);
            console.log('👤 Google user data:', payload);

            resolve({
              email: payload.email,
              given_name: payload.given_name,
              family_name: payload.family_name,
              name: payload.name,
              picture: payload.picture,
              sub: payload.sub
            });
          } catch (error) {
            console.error('❌ Error processing Google OAuth response:', error);
            reject(new Error('Failed to process Google authentication response'));
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });

      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('⚠️ One Tap prompt not displayed, showing popup instead');

          (window as any).google.accounts.id.renderButton(
            document.createElement('div'),
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'signin_with',
              shape: 'rectangular',
              width: 250
            }
          );

          const tempButton = document.createElement('button');
          tempButton.style.display = 'none';
          document.body.appendChild(tempButton);

          (window as any).google.accounts.id.renderButton(tempButton, {
            theme: 'outline',
            size: 'large'
          });

          setTimeout(() => {
            tempButton.click();
            document.body.removeChild(tempButton);
          }, 100);
        }
      });

      setTimeout(() => {
        reject(new Error('Google authentication timed out'));
      }, 60000); 
    } catch (error) {
      console.error('❌ Error initiating Google OAuth:', error);
      reject(error);
    }
  }

  private static parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('❌ Error parsing JWT token:', error);
      throw new Error('Invalid JWT token');
    }
  }

  private static getUserAgent(): string {
    if (typeof navigator === 'undefined') return 'Server';
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome Browser';
    if (ua.includes('Firefox')) return 'Firefox Browser';
    if (ua.includes('Safari')) return 'Safari Browser';
    if (ua.includes('Edge')) return 'Edge Browser';
    return 'Unknown Browser';
  }

  private static async getCurrentIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'Unknown';
    } catch {
      return 'Unknown';
    }
  }

  private static getStoredUsers(): User[] {
    try {
      const stored = localStorage.getItem('marketplace_users');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('❌ Error getting stored users:', error);
      return [];
    }
  }

  static isAuthenticated(): boolean {
    try {
      const user = localStorage.getItem(this.STORAGE_KEY);
      if (!user) {
        console.log('❌ No user session found');
        return false;
      }

      const userData = JSON.parse(user);
      console.log('🔍 Checking authentication for user:', userData.username);

      const authDate = new Date(userData.authDate * 1000);
      const now = new Date();
      const daysDiff = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60 * 24);

      const isValid = daysDiff <= 30;
      console.log('🔍 Session valid:', isValid, 'Days since auth:', daysDiff.toFixed(2));

      return isValid;
    } catch (error) {
      console.error('❌ Error checking authentication:', error);
      return false;
    }
  }

  static getUserSession(): User | null {
    try {
      const user = localStorage.getItem(this.STORAGE_KEY);
      const userData = user ? JSON.parse(user) : null;
      console.log('👤 Current user session:', userData?.username || 'None');
      return userData;
    } catch (error) {
      console.error('❌ Error getting user session:', error);
      return null;
    }
  }

  static async logout(): Promise<void> {
    try {
      const user = this.getUserSession();

      if (user) {
        try {
          console.log('📱 Sending logout notification...');
          const notificationService = this.createNotificationService(user.email);

          const logoutNotification = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toLocaleString() + ' (Logout)',
            ipAddress: await this.getCurrentIP(),
            userAgent: this.getUserAgent() + ' - User Logout'
          };

          console.log('📱 Logout notification data:', logoutNotification);

          const success = await notificationService.sendLoginAlert(logoutNotification);

          if (success) {
            console.log('✅ Logout notification sent successfully');
          } else {
            console.log('❌ Logout notification failed to send');
          }
        } catch (notificationError) {
          console.error('❌ Failed to send logout notification:', notificationError);
        }
      }

      localStorage.removeItem(this.STORAGE_KEY);
      console.log('✅ User logged out successfully');

      window.location.href = '/';
    } catch (error) {
      console.error('❌ Logout error:', error);
      window.location.href = '/';
    }
  }

  static initTelegramWidget(containerId: string, onAuth: (user: any) => void): void {
    console.log('⚠️ Telegram widget is deprecated. Please use the new authentication system.');
  }

  static async authenticateWithTelegram(telegramUser: any): Promise<AuthResult> {
    console.log('⚠️ Telegram authentication is deprecated. Please use the new authentication system.');
    return { success: false, error: 'Telegram authentication is no longer supported' };
  }

  static async registerWithTelegram(telegramUser: any): Promise<AuthResult> {
    console.log('⚠️ Telegram registration is deprecated. Please use the new authentication system.');
    return { success: false, error: 'Telegram registration is no longer supported' };
  }

  static async testTelegramNotification(): Promise<{ success: boolean; message: string }> {
    const notificationService = this.createNotificationService();
    return await notificationService.testConnection();
  }

  static async sendOrderNotification(orderData: any): Promise<void> {
    try {
      const user = this.getUserSession();
      const notificationService = this.createNotificationService(user?.email);

      await notificationService.sendOrderAlert({
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        productName: orderData.productName,
        amount: orderData.amount,
        status: orderData.status,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      console.error('❌ Failed to send order notification:', error);
    }
  }
}
