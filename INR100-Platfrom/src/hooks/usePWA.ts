'use client';

import { useState, useEffect, useCallback } from 'react';

interface PWAState {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  serviceWorkerRegistered: boolean;
  pushNotificationsEnabled: boolean;
  updateAvailable: boolean;
  deferredPrompt: any;
}

interface PWAActions {
  installApp: () => Promise<void>;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  subscribeToPush: () => Promise<PushSubscription | null>;
  unsubscribeFromPush: () => Promise<boolean>;
  updateApp: () => void;
  clearCache: () => Promise<void>;
}

interface UsePWAReturn extends PWAState, PWAActions {
  isPWAReady: boolean;
  installAppStatus: 'idle' | 'prompting' | 'installing' | 'success' | 'error';
  cacheSize: number | null;
  lastUpdateCheck: Date | null;
}

export const usePWA = (): UsePWAReturn => {
  const [state, setState] = useState<PWAState>({
    isOnline: navigator.onLine,
    isInstallable: false,
    isInstalled: false,
    serviceWorkerRegistered: false,
    pushNotificationsEnabled: false,
    updateAvailable: false,
    deferredPrompt: null
  });

  const [installAppStatus, setInstallAppStatus] = useState<'idle' | 'prompting' | 'installing' | 'success' | 'error'>('idle');
  const [cacheSize, setCacheSize] = useState<number | null>(null);
  const [lastUpdateCheck, setLastUpdateCheck] = useState<Date | null>(null);

  // Check if app is running as PWA
  const checkIfPWA = useCallback(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    
    return isStandalone;
  }, []);

  // Install app
  const installApp = useCallback(async () => {
    if (!state.deferredPrompt) return;

    setInstallAppStatus('installing');

    try {
      const result = await state.deferredPrompt.prompt();
      console.log('Install prompt result:', result);
      
      if (result.outcome === 'accepted') {
        setInstallAppStatus('success');
        setState(prev => ({ 
          ...prev, 
          isInstallable: false,
          deferredPrompt: null
        }));
      } else {
        setInstallAppStatus('error');
      }
    } catch (error) {
      console.error('Install failed:', error);
      setInstallAppStatus('error');
    }
  }, [state.deferredPrompt]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      setState(prev => ({ ...prev, pushNotificationsEnabled: true }));
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    setState(prev => ({ 
      ...prev, 
      pushNotificationsEnabled: permission === 'granted' 
    }));

    return permission;
  }, []);

  // Subscribe to push notifications
  const subscribeToPush = useCallback(async (): Promise<PushSubscription | null> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      });

      // Send subscription to server
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }, []);

  // Unsubscribe from push notifications
  const unsubscribeFromPush = useCallback(async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        
        // Notify server
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription)
        });
      }

      return true;
    } catch (error) {
      console.error('Push unsubscribe failed:', error);
      return false;
    }
  }, []);

  // Update app
  const updateApp = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(async (): Promise<void> => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration.active) {
          registration.active.postMessage({ type: 'CLEAR_CACHE' });
        }

        // Also clear browser caches
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        console.log('Cache cleared successfully');
      } catch (error) {
        console.error('Failed to clear cache:', error);
      }
    }
  }, []);

  // Calculate cache size
  const calculateCacheSize = useCallback(async (): Promise<number> => {
    if (!('caches' in window)) return 0;

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return totalSize;
    } catch (error) {
      console.error('Failed to calculate cache size:', error);
      return 0;
    }
  }, []);

  // Update cache size periodically
  useEffect(() => {
    const updateCacheSize = async () => {
      const size = await calculateCacheSize();
      setCacheSize(size);
    };

    updateCacheSize();
    const interval = setInterval(updateCacheSize, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [calculateCacheSize]);

  // Initialize PWA state
  useEffect(() => {
    // Check if PWA
    setState(prev => ({ ...prev, isInstalled: checkIfPWA() }));

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setState(prev => ({ 
        ...prev, 
        isInstallable: true,
        deferredPrompt: e
      }));
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setState(prev => ({ 
        ...prev, 
        isInstallable: false,
        isInstalled: true,
        deferredPrompt: null
      }));
    };

    // Register service worker
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
          setState(prev => ({ ...prev, serviceWorkerRegistered: true }));

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setState(prev => ({ ...prev, updateAvailable: true }));
                }
              });
            }
          });

        } catch (error) {
          console.error('Service worker registration failed:', error);
        }
      }
    };

    // Listen for online/offline events
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    // Check notification permission
    const checkNotificationPermission = () => {
      if ('Notification' in window) {
        setState(prev => ({ 
          ...prev, 
          pushNotificationsEnabled: Notification.permission === 'granted' 
        }));
      }
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize
    registerServiceWorker();
    checkNotificationPermission();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkIfPWA]);

  // Check for updates periodically
  useEffect(() => {
    const checkForUpdates = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.update();
          setLastUpdateCheck(new Date());
        } catch (error) {
          console.error('Update check failed:', error);
        }
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 300000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return {
    // State
    ...state,
    isPWAReady: state.serviceWorkerRegistered && state.isInstalled,
    installAppStatus,
    cacheSize,
    lastUpdateCheck,

    // Actions
    installApp,
    requestNotificationPermission,
    subscribeToPush,
    unsubscribeFromPush,
    updateApp,
    clearCache
  };
};

export default usePWA;