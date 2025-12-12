"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";
import { useMarketData, useStockPrice } from "@/hooks/useMarketData";

interface LivePriceTickerProps {
  symbols?: string[];
  autoScroll?: boolean;
  showVolume?: boolean;
  compact?: boolean;
}

export function LivePriceTicker({ 
  symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC'],
  autoScroll = true,
  showVolume = false,
  compact = false
}: LivePriceTickerProps) {
  const { data, loading, error, isLive, refetch } = useMarketData({ 
    symbols, 
    autoRefresh: true, 
    refreshInterval: 15000 
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const stocks = data?.stocks || [];

  // Auto-scroll through stocks
  useEffect(() => {
    if (!autoScroll || stocks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % stocks.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [autoScroll, stocks.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    return {
      amount: Math.abs(change).toFixed(2),
      percent: Math.abs(changePercent).toFixed(2),
      isPositive,
      color: isPositive ? 'text-green-600' : 'text-red-600',
      icon: isPositive ? ArrowUpRight : ArrowDownLeft
    };
  };

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) {
      return `${(volume / 10000000).toFixed(1)}Cr`;
    } else if (volume >= 100000) {
      return `${(volume / 100000).toFixed(1)}L`;
    } else {
      return volume.toLocaleString();
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm text-gray-600">Loading live prices...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-b border-red-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-600">Connection error - Last updated data shown</span>
          <button 
            onClick={refetch}
            className="text-sm text-red-700 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-yellow-600" />
          <span className="text-sm text-yellow-700">No market data available</span>
        </div>
      </div>
    );
  }

  const currentStock = stocks[currentIndex];
  if (!currentStock) return null;

  const changeData = formatChange(currentStock.change, currentStock.changePercent);
  const ChangeIcon = changeData.icon;

  return (
    <div className={`bg-white border-b ${compact ? 'py-1' : 'py-2'}`}>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isLive ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <Badge variant={isLive ? "default" : "destructive"} className="text-xs">
              {isLive ? 'LIVE' : 'OFFLINE'}
            </Badge>
          </div>

          {/* Stock Info */}
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${compact ? 'text-sm' : 'text-base'}`}>
                  {currentStock.symbol}
                </span>
                <span className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>
                  {formatPrice(currentStock.price)}
                </span>
              </div>
              <div className={`flex items-center gap-2 ${changeData.color} ${compact ? 'text-xs' : 'text-sm'}`}>
                <ChangeIcon className="w-3 h-3" />
                <span>
                  {changeData.isPositive ? '+' : '-'}{changeData.amount} ({changeData.percent}%)
                </span>
                {showVolume && (
                  <span className="text-gray-500 ml-2">
                    Vol: {formatVolume(currentStock.volume)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {stocks.length > 1 && (
            <div className="flex items-center gap-1">
              {stocks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          
          <button
            onClick={refetch}
            className="p-1 hover:bg-gray-100 rounded"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface StockPriceCardProps {
  symbol: string;
  showChart?: boolean;
  showActions?: boolean;
  className?: string;
}

export function StockPriceCard({ 
  symbol, 
  showChart = false, 
  showActions = true,
  className = ""
}: StockPriceCardProps) {
  const { price, change, changePercent, loading, error, refetch } = useStockPrice(symbol);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    return {
      isPositive,
      color: isPositive ? 'text-green-600' : 'text-red-600',
      bgColor: isPositive ? 'bg-green-50' : 'bg-red-50',
      icon: isPositive ? TrendingUp : TrendingDown
    };
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error || !price) {
    return (
      <div className={`bg-white rounded-lg border p-4 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">Unable to load price</p>
          <button 
            onClick={refetch}
            className="text-xs text-blue-600 hover:underline mt-1"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const changeData = formatChange(change, changePercent);
  const ChangeIcon = changeData.icon;

  return (
    <div className={`bg-white rounded-lg border hover:shadow-md transition-shadow ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{symbol}</h3>
          <ChangeIcon className={`w-5 h-5 ${changeData.color}`} />
        </div>
        
        <div className="mb-3">
          <p className="text-2xl font-bold">{formatPrice(price)}</p>
          <div className={`flex items-center gap-1 ${changeData.color}`}>
            <ChangeIcon className="w-4 h-4" />
            <span className="font-medium">
              {changeData.isPositive ? '+' : ''}{change.toFixed(2)} ({changeData.isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {showChart && (
          <div className="h-16 bg-gray-50 rounded mb-3 flex items-center justify-center">
            <span className="text-xs text-gray-500">Chart placeholder</span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2">
            <button className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors">
              Buy
            </button>
            <button className="flex-1 bg-red-600 text-white text-sm py-2 px-3 rounded hover:bg-red-700 transition-colors">
              Sell
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface MarketStatusProps {
  className?: string;
}

export function MarketStatus({ className = "" }: MarketStatusProps) {
  const { indices, loading } = useMarketIndices();
  const [marketStatus, setMarketStatus] = useState<'open' | 'closed' | 'pre-market' | 'after-market'>('closed');

  useEffect(() => {
    // Determine market status based on current time
    const now = new Date();
    const istTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);

    const hour = parseInt(istTime.split(':')[0]);
    const minute = parseInt(istTime.split(':')[1]);

    // NSE trading hours: 9:15 AM to 3:30 PM IST
    if (hour >= 9 && hour < 15 || (hour === 15 && minute <= 30)) {
      setMarketStatus('open');
    } else if (hour >= 8 && hour < 9) {
      setMarketStatus('pre-market');
    } else if (hour >= 15 && hour < 16) {
      setMarketStatus('after-market');
    } else {
      setMarketStatus('closed');
    }
  }, []);

  const getStatusConfig = () => {
    switch (marketStatus) {
      case 'open':
        return {
          label: 'Market Open',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'pre-market':
        return {
          label: 'Pre-Market',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'after-market':
        return {
          label: 'After Market',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      default:
        return {
          label: 'Market Closed',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor} ${className}`}>
      <div className={`w-2 h-2 rounded-full ${marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
      {!loading && indices.length > 0 && (
        <span className="text-xs text-gray-500">
          • {indices.length} indices
        </span>
      )}
    </div>
  );
}