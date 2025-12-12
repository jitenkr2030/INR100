"use client";

import { useState, useEffect, useCallback } from "react";

interface MarketDataOptions {
  symbols?: string[];
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableWebSocket?: boolean;
}

interface UseMarketDataReturn {
  data: any;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isLive: boolean;
}

export function useMarketData(options: MarketDataOptions = {}): UseMarketDataReturn {
  const {
    symbols = [],
    autoRefresh = true,
    refreshInterval = 30000, // 30 seconds
    enableWebSocket = false
  } = options;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      let url = "/api/market-data";
      if (symbols.length > 0) {
        url += `?type=stocks&symbols=${symbols.join(",")}`;
      }

      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setIsLive(true);
      } else {
        setError("Failed to fetch market data");
      }
    } catch (err) {
      setError("Network error while fetching market data");
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, autoRefresh, refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    isLive
  };
}

export function useStockPrice(symbol: string, autoRefresh: boolean = true) {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number>(0);
  const [changePercent, setChangePercent] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`/api/market-data?type=stocks&symbols=${symbol}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        const stock = result.data[0];
        setPrice(stock.price);
        setChange(stock.change);
        setChangePercent(stock.changePercent);
      } else {
        setError("Stock not found");
      }
    } catch (err) {
      setError("Failed to fetch price");
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchPrice();
    
    if (autoRefresh) {
      const interval = setInterval(fetchPrice, 15000); // 15 seconds for individual stock
      return () => clearInterval(interval);
    }
  }, [fetchPrice, autoRefresh]);

  return {
    price,
    change,
    changePercent,
    loading,
    error,
    refetch: fetchPrice
  };
}

export function useMarketIndices() {
  const [indices, setIndices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndices = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch("/api/market-data?type=indices");
      const result = await response.json();
      
      if (result.success) {
        setIndices(result.data);
      } else {
        setError("Failed to fetch indices");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 30000);
    return () => clearInterval(interval);
  }, [fetchIndices]);

  return {
    indices,
    loading,
    error,
    refetch: fetchIndices
  };
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [watchlistData, setWatchlistData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("inr100_watchlist");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist from localStorage");
      }
    }
  }, []);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("inr100_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((symbol: string) => {
    setWatchlist(prev => {
      if (!prev.includes(symbol)) {
        return [...prev, symbol];
      }
      return prev;
    });
  }, []);

  const removeFromWatchlist = useCallback((symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
  }, []);

  const toggleWatchlist = useCallback((symbol: string) => {
    setWatchlist(prev => {
      if (prev.includes(symbol)) {
        return prev.filter(s => s !== symbol);
      } else {
        return [...prev, symbol];
      }
    });
  }, []);

  // Fetch watchlist data when watchlist changes
  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (watchlist.length === 0) {
        setWatchlistData([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/market-data?type=stocks&symbols=${watchlist.join(",")}`);
        const result = await response.json();
        
        if (result.success) {
          setWatchlistData(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch watchlist data");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, [watchlist]);

  return {
    watchlist,
    watchlistData,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist
  };
}

export function usePriceAlerts() {
  const [alerts, setAlerts] = useState<{[key: string]: number}>({});

  // Load alerts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("inr100_price_alerts");
    if (saved) {
      try {
        setAlerts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse price alerts from localStorage");
      }
    }
  }, []);

  // Save alerts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("inr100_price_alerts", JSON.stringify(alerts));
  }, [alerts]);

  const setAlert = useCallback((symbol: string, targetPrice: number) => {
    setAlerts(prev => ({ ...prev, [symbol]: targetPrice }));
  }, []);

  const removeAlert = useCallback((symbol: string) => {
    setAlerts(prev => {
      const newAlerts = { ...prev };
      delete newAlerts[symbol];
      return newAlerts;
    });
  }, []);

  const getActiveAlerts = useCallback(() => {
    return Object.entries(alerts).map(([symbol, price]) => ({ symbol, price }));
  }, [alerts]);

  return {
    alerts,
    setAlert,
    removeAlert,
    getActiveAlerts
  };
}

export function useMarketDataWebSocket(symbols: string[] = []) {
  const [data, setData] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would use WebSocket connection
    // For now, we'll simulate WebSocket with polling
    if (symbols.length === 0) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/market-data?type=stocks&symbols=${symbols.join(",")}`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
          setConnected(true);
          setError(null);
        }
      } catch (err) {
        setError("WebSocket connection failed");
        setConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 5 second updates
    
    return () => clearInterval(interval);
  }, [symbols]);

  return {
    data,
    connected,
    error
  };
}