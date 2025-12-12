'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Bell, 
  BellOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Settings,
  X
} from 'lucide-react';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  serviceWorkerRegistered: boolean;
  pushNotificationsEnabled: boolean;
  updateAvailable: boolean;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ 
  onInstall, 
  onDismiss 
}) => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setShowPrompt(false);
      onInstall?.();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onInstall]);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    try {
      const result = await installPrompt.prompt();
      console.log('Install prompt result:', result);
      
      setInstallPrompt(null);
      setShowPrompt(false);
      onInstall?.();
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  if (!showPrompt || !installPrompt) {
    return null;
  }

  return (
    <Alert className="border-blue-200 bg-blue-50 mb-4">
      <Smartphone className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <div className="font-medium text-blue-800">Install INR100 App</div>
          <div className="text-sm text-blue-600">
            Get the full app experience with offline access and notifications
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            onClick={handleInstallClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-1" />
            Install
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => {
              setShowPrompt(false);
              onDismiss?.();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export const PWAStatus: React.FC = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator.onLine,
    serviceWorkerRegistered: false,
    pushNotificationsEnabled: false,
    updateAvailable: false
  });
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if app is running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    
    setPwaState(prev => ({ ...prev, isInstalled: isStandalone }));

    // Register service worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }

    // Listen for online/offline events
    const handleOnline = () => setPwaState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setPwaState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      setSwRegistration(registration);
      setPwaState(prev => ({ ...prev, serviceWorkerRegistered: true }));

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setPwaState(prev => ({ ...prev, updateAvailable: true }));
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated by service worker');
        }
      });

    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      setPwaState(prev => ({ ...prev, pushNotificationsEnabled: true }));
      return;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      setPwaState(prev => ({ 
        ...prev, 
        pushNotificationsEnabled: permission === 'granted' 
      }));
    }
  };

  const updateApp = () => {
    if (swRegistration && swRegistration.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5" />
          <span>PWA Status</span>
        </CardTitle>
        <CardDescription>
          Progressive Web App configuration and status
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Online Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {pwaState.isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm">
              {pwaState.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <Badge variant={pwaState.isOnline ? 'default' : 'destructive'}>
            {pwaState.isOnline ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        {/* Service Worker Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Service Worker</span>
          </div>
          {pwaState.serviceWorkerRegistered ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Loading
            </Badge>
          )}
        </div>

        {/* Installation Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="h-4 w-4 text-gray-500" />
            <span className="text-sm">App Installation</span>
          </div>
          {pwaState.isInstalled ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Installed
            </Badge>
          ) : (
            <Badge variant="outline">
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Installed
            </Badge>
          )}
        </div>

        {/* Notifications Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {pwaState.pushNotificationsEnabled ? (
              <Bell className="h-4 w-4 text-blue-500" />
            ) : (
              <BellOff className="h-4 w-4 text-gray-500" />
            )}
            <span className="text-sm">Push Notifications</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={pwaState.pushNotificationsEnabled ? 'default' : 'secondary'}>
              {pwaState.pushNotificationsEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
            {!pwaState.pushNotificationsEnabled && (
              <Button
                size="sm"
                variant="outline"
                onClick={requestNotificationPermission}
              >
                Enable
              </Button>
            )}
          </div>
        </div>

        {/* Update Available */}
        {pwaState.updateAvailable && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Update Available
                </span>
              </div>
              <Button size="sm" onClick={updateApp}>
                Update
              </Button>
            </div>
          </div>
        )}

        {/* PWA Features Info */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">PWA Features:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Offline functionality</li>
            <li>• App-like experience</li>
            <li>• Push notifications</li>
            <li>• Background sync</li>
            <li>• Install on device</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAStatus;