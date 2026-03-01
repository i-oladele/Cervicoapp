import { useEffect } from "react";
import { useUser } from "./UserContext";

// Use the browser's built-in PushSubscription type
type BrowserPushSubscription = PushSubscription & {
  unsubscribe(): Promise<boolean>;
  getKey(key: 'p256dh' | 'auth'): ArrayBuffer | null;
};

interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class PushNotificationManager {
  private static instance: PushNotificationManager;
  private swRegistration: ServiceWorkerRegistration | null = null;
  private subscription: BrowserPushSubscription | null = null;

  private constructor() {}

  static getInstance(): PushNotificationManager {
    if (!PushNotificationManager.instance) {
      PushNotificationManager.instance = new PushNotificationManager();
    }
    return PushNotificationManager.instance;
  }

  // Initialize service worker and push subscription
  async initialize(): Promise<boolean> {
    try {
      // Register service worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered');

      // Check existing subscription
      this.subscription = await this.swRegistration.pushManager.getSubscription();
      
      if (!this.subscription) {
        // Request permission and subscribe
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          await this.subscribeToPush();
        } else {
          console.log('Push notification permission denied');
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Push notification initialization failed:', error);
      return false;
    }
  }

  // Subscribe to push notifications
  private async subscribeToPush(): Promise<void> {
    if (!this.swRegistration) return;

    try {
      // In production, you'd get these from your push service (Firebase, OneSignal, etc.)
      const applicationServerKey = this.urlBase64ToUint8Array(
        'BHQZEGALEQuASAzX6HMfnO7nvZAs545ePgt1mh2tGYpSptvdH7WTYYTiLXUpH9svd4NrECGx30JiTkss75t5EZU'
      );

      this.subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      }) as BrowserPushSubscription;

      console.log('User subscribed to push notifications');
      
      // Send subscription to backend
      await this.sendSubscriptionToBackend();
    } catch (error) {
      console.error('Push subscription failed:', error);
    }
  }

  // Send subscription to backend
  private async sendSubscriptionToBackend(): Promise<void> {
    if (!this.subscription) return;

    try {
      const subscriptionData: PushSubscriptionData = {
        endpoint: this.subscription.endpoint,
        keys: {
          p256dh: this.subscription.getKey('p256dh') 
            ? btoa(String.fromCharCode(...new Uint8Array(this.subscription.getKey('p256dh')!)))
            : '',
          auth: this.subscription.getKey('auth')
            ? btoa(String.fromCharCode(...new Uint8Array(this.subscription.getKey('auth')!)))
            : ''
        }
      };

      // Send to your backend
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        console.log('Push subscription sent to backend');
      } else {
        console.error('Failed to send subscription to backend');
      }
    } catch (error) {
      console.error('Failed to send subscription to backend:', error);
    }
  }

  // Check if push notifications are supported
  static isSupported(): boolean {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  // Check permission status
  static async getPermissionStatus(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  // Request permission
  static async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    return await Notification.requestPermission();
  }

  // Unsubscribe from push notifications
  async unsubscribe(): Promise<void> {
    if (this.subscription) {
      try {
        await this.subscription.unsubscribe();
        console.log('Unsubscribed from push notifications');
      } catch (error) {
        console.error('Failed to unsubscribe:', error);
      }
      this.subscription = null;
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Get current subscription
  getSubscription(): BrowserPushSubscription | null {
    return this.subscription;
  }
}

// Hook for using push notifications
export function usePushNotifications() {
  const { user } = useUser();

  useEffect(() => {
    if (user && PushNotificationManager.isSupported()) {
      PushNotificationManager.getInstance().initialize();
    }
  }, [user]);

  const requestPermission = async (): Promise<boolean> => {
    if (!PushNotificationManager.isSupported()) return false;
    
    const permission = await PushNotificationManager.requestPermission();
    return permission === 'granted';
  };

  const unsubscribe = async (): Promise<void> => {
    await PushNotificationManager.getInstance().unsubscribe();
  };

  return {
    isSupported: PushNotificationManager.isSupported(),
    requestPermission,
    unsubscribe,
    getPermissionStatus: PushNotificationManager.getPermissionStatus,
  };
}
