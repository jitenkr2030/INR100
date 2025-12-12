"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  BarChart3,
  Star,
  Plus,
  Bell,
  BellOff
} from "lucide-react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  marketCap: number;
  pe: number;
  updatedAt: string;
}

interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  updatedAt: string;
}

interface MarketData {
  stocks: StockData[];
  indices: IndexData[];
  mutualFunds: any[];
  gold: any;
  global: any[];
  gainers: StockData[];
  updatedAt: string;
}

export default function MarketOverviewPage() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS', 'HDFCBANK']);
  const [alerts, setAlerts] = useState<{[key: string]: number}>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market-data');
      const data = await response.json();
      if (data.success) {
        setMarketData(data.data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

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
      bgColor: isPositive ? 'bg-green-50' : 'bg-red-50'
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

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const setPriceAlert = (symbol: string, targetPrice: number) => {
    setAlerts(prev => ({ ...prev, [symbol]: targetPrice }));
  };

  const filteredStocks = marketData?.stocks?.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading market data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Market Overview</h1>
          <p className="text-gray-600">
            Real-time market data and insights • Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <Button onClick={fetchMarketData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Badge variant="secondary">
            Live Data
          </Badge>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {marketData?.indices?.map((index) => {
          const changeData = formatChange(index.change, index.changePercent);
          return (
            <Card key={index.symbol} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{index.symbol}</h3>
                  {changeData.isPositive ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{index.name}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {index.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                    <div className={`flex items-center text-sm ${changeData.color}`}>
                      {changeData.isPositive ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 mr-1" />
                      )}
                      {changeData.amount} ({changeData.percent}%)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Market Watch
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search stocks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                Track your favorite stocks and get real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(searchTerm ? filteredStocks : marketData?.stocks)?.map((stock) => {
                  const changeData = formatChange(stock.change, stock.changePercent);
                  const isInWatchlist = watchlist.includes(stock.symbol);
                  const hasAlert = alerts[stock.symbol];
                  
                  return (
                    <div key={stock.symbol} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{stock.symbol}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleWatchlist(stock.symbol)}
                              className="p-1 h-auto"
                            >
                              <Star className={`w-4 h-4 ${isInWatchlist ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {formatPrice(stock.price)}
                          </p>
                          <div className={`flex items-center text-sm ${changeData.color}`}>
                            {changeData.isPositive ? (
                              <ArrowUpRight className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDownLeft className="w-3 h-3 mr-1" />
                            )}
                            {changeData.amount} ({changeData.percent}%)
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setPriceAlert(stock.symbol, stock.price)}
                            className="p-1 h-auto"
                          >
                            {hasAlert ? (
                              <Bell className="w-4 h-4 text-blue-600" />
                            ) : (
                              <BellOff className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Gainers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData?.gainers?.slice(0, 5).map((stock) => {
                  const changeData = formatChange(stock.change, stock.changePercent);
                  return (
                    <div key={stock.symbol} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{stock.symbol}</p>
                        <p className="text-xs text-gray-600">{formatPrice(stock.price)}</p>
                      </div>
                      <div className={`text-sm font-medium ${changeData.color}`}>
                        +{changeData.percent}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Gold Price */}
          {marketData?.gold && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                  Gold Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {formatPrice(marketData.gold.price)}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">per gram</p>
                  <div className={`flex items-center justify-center text-sm ${formatChange(marketData.gold.change, marketData.gold.changePercent).color}`}>
                    {formatChange(marketData.gold.change, marketData.gold.changePercent).isPositive ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 mr-1" />
                    )}
                    {formatChange(marketData.gold.change, marketData.gold.changePercent).amount} ({formatChange(marketData.gold.change, marketData.gold.changePercent).percent}%)
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Global Indices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Global Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData?.global?.slice(0, 4).map((index) => {
                  const changeData = formatChange(index.change, index.changePercent);
                  return (
                    <div key={index.symbol} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{index.symbol}</p>
                        <p className="text-xs text-gray-600">{index.value.toFixed(0)}</p>
                      </div>
                      <div className={`text-sm font-medium ${changeData.color}`}>
                        {changeData.isPositive ? '+' : ''}{changeData.percent}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Market Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Market Summary</CardTitle>
          <CardDescription>
            Today's market performance across different sectors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Advancing</h4>
              <p className="text-2xl font-bold text-green-600">1,847</p>
              <p className="text-sm text-green-600">stocks</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Declining</h4>
              <p className="text-2xl font-bold text-red-600">1,203</p>
              <p className="text-sm text-red-600">stocks</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Unchanged</h4>
              <p className="text-2xl font-bold text-gray-600">450</p>
              <p className="text-sm text-gray-600">stocks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}