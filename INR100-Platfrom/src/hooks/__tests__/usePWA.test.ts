import { renderHook, act } from '@testing-library/react';
import { usePWA } from '@/hooks/usePWA';

// Mock global objects
Object.defineProperty(window.navigator, 'onLine', {
  writable: true,
  value: true,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('usePWA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset online status
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
    });
    
    // Mock service worker
    global.navigator.serviceWorker = {
      register: jest.fn(() => Promise.resolve({
        active: { postMessage: jest.fn() },
        installing: null,
        waiting: null,
        addEventListener: jest.fn(),
      })),
      ready: Promise.resolve({
        active: { postMessage: jest.fn() },
        installing: null,
        waiting: null,
      }),
      getRegistration: jest.fn(() => Promise.resolve(null)),
    } as any;

    // Mock Notification
    global.Notification = {
      permission: 'default',
      requestPermission: jest.fn(() => Promise.resolve('granted')),
    } as any;

    // Mock caches
    global.caches = {
      keys: jest.fn(() => Promise.resolve(['cache1', 'cache2'])),
      open: jest.fn(() => Promise.resolve({
        keys: jest.fn(() => Promise.resolve([])),
        match: jest.fn(() => Promise.resolve(null)),
        put: jest.fn(),
        delete: jest.fn(),
      })),
      delete: jest.fn(() => Promise.resolve(true)),
    } as any;

    // Mock fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => usePWA());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.isInstallable).toBe(false);
    expect(result.current.isInstalled).toBe(false);
    expect(result.current.serviceWorkerRegistered).toBe(false);
    expect(result.current.pushNotificationsEnabled).toBe(false);
    expect(result.current.updateAvailable).toBe(false);
    expect(result.current.isPWAReady).toBe(false);
    expect(result.current.installAppStatus).toBe('idle');
    expect(result.current.cacheSize).toBe(null);
    expect(result.current.lastUpdateCheck).toBe(null);
  });

  it('registers service worker on mount', async () => {
    const { result } = renderHook(() => usePWA());

    await act(async () => {
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(global.navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js', {
      scope: '/',
    });
    expect(result.current.serviceWorkerRegistered).toBe(true);
  });

  it('detects online status changes', () => {
    const { result } = renderHook(() => usePWA());

    expect(result.current.isOnline).toBe(true);

    // Simulate going offline
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        writable: true,
        value: false,
      });
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOnline).toBe(false);

    // Simulate coming back online
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        writable: true,
        value: true,
      });
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(true);
  });

  it('detects PWA installation', () => {
    // Mock PWA environment
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(display-mode: standalone)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => usePWA());

    expect(result.current.isInstalled).toBe(true);
  });

  it('handles app installation', async () => {
    const deferredPrompt = {
      prompt: jest.fn(() => Promise.resolve({ outcome: 'accepted' })),
    };

    const { result } = renderHook(() => usePWA());

    // Simulate install prompt
    act(() => {
      window.dispatchEvent(new Event('beforeinstallprompt'));
      // Manually trigger the event with deferredPrompt
      Object.defineProperty(window, 'deferredPrompt', {
        writable: true,
        value: deferredPrompt,
      });
    });

    expect(result.current.isInstallable).toBe(true);

    // Install the app
    await act(async () => {
      await result.current.installApp();
    });

    expect(deferredPrompt.prompt).toHaveBeenCalled();
    expect(result.current.installAppStatus).toBe('installing');
  });

  it('handles notification permission request', async () => {
    const { result } = renderHook(() => usePWA());

    const permission = await act(async () => {
      return await result.current.requestNotificationPermission();
    });

    expect(permission).toBe('granted');
    expect(global.Notification.requestPermission).toHaveBeenCalled();
  });

  it('calculates cache size', async () => {
    const mockCache = {
      keys: jest.fn(() => Promise.resolve([{ url: 'test' }])),
      match: jest.fn(() => Promise.resolve({
        blob: () => Promise.resolve(new Blob(['test'], { type: 'text/plain' })),
      })),
    };

    global.caches.open = jest.fn(() => Promise.resolve(mockCache));

    const { result } = renderHook(() => usePWA());

    await act(async () => {
      // Wait for cache size calculation
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.cacheSize).toBeGreaterThan(0);
  });

  it('updates app when update is available', async () => {
    const mockRegistration = {
      waiting: {
        postMessage: jest.fn(),
      },
    };

    global.navigator.serviceWorker.ready = Promise.resolve(mockRegistration);

    const { result } = renderHook(() => usePWA());

    await act(async () => {
      result.current.updateApp();
    });

    expect(mockRegistration.waiting.postMessage).toHaveBeenCalledWith({
      type: 'SKIP_WAITING',
    });
  });

  it('clears cache', async () => {
    const { result } = renderHook(() => usePWA());

    await act(async () => {
      await result.current.clearCache();
    });

    expect(global.caches.delete).toHaveBeenCalled();
  });

  it('handles push subscription', async () => {
    const mockSubscription = {
      endpoint: 'test-endpoint',
      toJSON: () => ({ endpoint: 'test-endpoint' }),
    };

    const mockRegistration = {
      pushManager: {
        subscribe: jest.fn(() => Promise.resolve(mockSubscription)),
        getSubscription: () => Promise.resolve(null),
      },
    };

    global.navigator.serviceWorker.ready = Promise.resolve(mockRegistration);
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

    const { result } = renderHook(() => usePWA());

    const subscription = await act(async () => {
      return await result.current.subscribeToPush();
    });

    expect(subscription).toEqual(mockSubscription);
    expect(mockRegistration.pushManager.subscribe).toHaveBeenCalledWith({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });
  });

  it('handles push unsubscription', async () => {
    const mockSubscription = {
      unsubscribe: jest.fn(() => Promise.resolve(true)),
    };

    const mockRegistration = {
      pushManager: {
        getSubscription: () => Promise.resolve(mockSubscription),
      },
    };

    global.navigator.serviceWorker.ready = Promise.resolve(mockRegistration);
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

    const { result } = renderHook(() => usePWA());

    const success = await act(async () => {
      return await result.current.unsubscribeFromPush();
    });

    expect(success).toBe(true);
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('checks for updates periodically', async () => {
    const mockRegistration = {
      update: jest.fn(() => Promise.resolve()),
    };

    global.navigator.serviceWorker.ready = Promise.resolve(mockRegistration);

    const { result } = renderHook(() => usePWA());

    await act(async () => {
      // Wait for initial update check
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(mockRegistration.update).toHaveBeenCalled();
    expect(result.current.lastUpdateCheck).toBeInstanceOf(Date);
  });

  it('handles installation events', async () => {
    const { result } = renderHook(() => usePWA());

    // Simulate app installed event
    act(() => {
      window.dispatchEvent(new Event('appinstalled'));
    });

    expect(result.current.isInstalled).toBe(true);
    expect(result.current.isInstallable).toBe(false);
  });
});