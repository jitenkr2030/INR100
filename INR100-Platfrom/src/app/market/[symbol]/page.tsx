"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft,
  DollarSign,
  Volume2,
  BarChart3,
  Calendar,
  Star,
  Bell,
  BellOff,
  Share2,
  Download,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

interface StockDetails {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: number;
  pe: number;
  pb: number;
  eps: number;
  dividend: number;
  updatedAt: string;
  description: string;
  sector: string;
  industry: string;
}

interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default function StockDetailsPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const [stockData, setStockData] = useState<StockDetails | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS']);
  const [hasAlert, setHasAlert] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [chartPeriod, setChartPeriod] = useState("1M");

  useEffect(() => {
    fetchStockDetails();
    fetchHistoricalData();
  }, [symbol]);

  const fetchStockDetails = async () => {
    try {
      const response = await fetch(`/api/market-data?type=stocks&symbols=${symbol}`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        const stock = data.data[0];
        // Enhance with additional data
        setStockData({
          ...stock,
          pb: Math.round((Math.random() * 5 + 1) * 100) / 100,
          eps: Math.round((Math.random() * 100 + 20) * 100) / 100,
          dividend: Math.round((Math.random() * 50 + 5) * 100) / 100,
          description: `${stock.name} is a leading company in the Indian stock market. It operates in the ${stock.sector || 'diversified'} sector and has been a consistent performer.`,
          sector: stock.sector || "Technology",
          industry: stock.industry || "Software Services"
        });
      }
    } catch (error) {
      console.error('Failed to fetch stock details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    // Mock historical data - in production, fetch from API
    const mockData: HistoricalData[] = [];
    const basePrice = 2500;
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const price = basePrice + (Math.random() - 0.5) * 200;
      mockData.push({
        date: date.toISOString().split('T')[0],
        open: price - 10,
        high: price + 20,
        low: price - 15,
        close: price,
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    setHistoricalData(mockData);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    } else {
      return num.toLocaleString();
    }
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

  const toggleWatchlist = () => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const toggleAlert = () => {
    setHasAlert(!hasAlert);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading stock details...</span>
        </div>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stock Not Found</h1>
          <p className="text-gray-600 mb-6">The stock "{symbol}" could not be found.</p>
          <Link href="/market">
            <Button>Back to Market</Button>
          </Link>
        </div>
      </div>
    );
  }

  const changeData = formatChange(stockData.change, stockData.changePercent);
  const isInWatchlist = watchlist.includes(symbol);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{stockData.symbol}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleWatchlist}
              className="p-1 h-auto"
            >
              <Star className={`w-5 h-5 ${isInWatchlist ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAlert}
              className="p-1 h-auto"
            >
              {hasAlert ? (
                <Bell className="w-5 h-5 text-blue-600" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400" />
              )}
            </Button>
          </div>
          <h2 className="text-xl text-gray-600 mb-2">{stockData.name}</h2>
          <div className="flex items-center gap-4">
            <Badge variant="outline">{stockData.sector}</Badge>
            <Badge variant="outline">{stockData.industry}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            Buy {stockData.symbol}
          </Button>
        </div>
      </div>

      {/* Price Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-4xl font-bold mb-2">
                    {formatPrice(stockData.price)}
                  </p>
                  <div className={`flex items-center text-lg ${changeData.color}`}>
                    {changeData.isPositive ? (
                      <ArrowUpRight className="w-5 h-5 mr-1" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 mr-1" />
                    )}
                    {changeData.amount} ({changeData.percent}%)
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Last updated: {new Date(stockData.updatedAt).toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Mini Chart Placeholder */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Chart</p>
                  <p className="text-sm">(Chart library integration needed)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Controls */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Period:</span>
                  {['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'].map((period) => (
                    <Button
                      key={period}
                      variant={chartPeriod === period ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setChartPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Info Sidebar */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Day Range</span>
                <span className="font-medium">
                  {formatPrice(stockData.dayLow)} - {formatPrice(stockData.dayHigh)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W Range</span>
                <span className="font-medium">
                  {formatPrice(stockData.fiftyTwoWeekLow)} - {formatPrice(stockData.fiftyTwoWeekHigh)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume</span>
                <span className="font-medium">{formatLargeNumber(stockData.volume)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-medium">₹{formatLargeNumber(stockData.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">P/E Ratio</span>
                <span className="font-medium">{stockData.pe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">P/B Ratio</span>
                <span className="font-medium">{stockData.pb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">EPS</span>
                <span className="font-medium">{formatPrice(stockData.eps)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dividend</span>
                <span className="font-medium">{formatPrice(stockData.dividend)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Price Alert */}
          <Card>
            <CardHeader>
              <CardTitle>Price Alert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Target Price</label>
                <Input
                  type="number"
                  placeholder="Enter target price"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
              </div>
              <Button className="w-full" disabled={!targetPrice}>
                Set Alert
              </Button>
              {hasAlert && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue- set for {stock800">
                    AlertData.symbol} at ₹{targetPrice || 'N/A'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                Buy {stockData.symbol}
              </Button>
              <Button variant="outline" className="w-full">
                Sell {stockData.symbol}
              </Button>
              <Button variant="outline" className="w-full">
                Add to Portfolio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {stockData.description}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector</span>
                    <span className="font-medium">{stockData.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium">{stockData.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap</span>
                    <span className="font-medium">₹{formatLargeNumber(stockData.marketCap)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Ratios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">P/E Ratio</p>
                    <p className="text-lg font-semibold">{stockData.pe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">P/B Ratio</p>
                    <p className="text-lg font-semibold">{stockData.pb}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">EPS</p>
                    <p className="text-lg font-semibold">{formatPrice(stockData.eps)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dividend Yield</p>
                    <p className="text-lg font-semibold">2.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle>Financial Highlights</CardTitle>
              <CardDescription>Quarterly and annual financial data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Revenue</h4>
                  <p className="text-2xl font-bold text-blue-600">₹1.2T</p>
                  <p className="text-sm text-blue-600">+15% YoY</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Net Profit</h4>
                  <p className="text-2xl font-bold text-green-600">₹150B</p>
                  <p className="text-sm text-green-600">+12% YoY</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">ROE</h4>
                  <p className="text-2xl font-bold text-purple-600">18.5%</p>
                  <p className="text-sm text-purple-600">Industry Avg: 15%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Latest News</CardTitle>
              <CardDescription>Recent news and updates about {stockData.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-1">
                      {stockData.symbol} announces quarterly results
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      The company reported strong quarterly performance with revenue growth...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>2 hours ago</span>
                      <span>•</span>
                      <span>Economic Times</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Analyst Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Buy</span>
                    <span className="text-green-600 font-semibold">8 Analysts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Hold</span>
                    <span className="text-yellow-600 font-semibold">4 Analysts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Sell</span>
                    <span className="text-red-600 font-semibold">1 Analyst</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">₹2,750</p>
                  <p className="text-gray-600 mb-4">Average Price Target</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Highest Target</span>
                      <span className="font-semibold">₹3,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Target</span>
                      <span className="font-semibold">₹2,500</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}