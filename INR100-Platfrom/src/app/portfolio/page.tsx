"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LivePriceTicker, MarketStatus } from "@/components/market/LivePriceTicker";
import { useMarketData } from "@/hooks/useMarketData";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Target, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  BarChart3,
  Activity,
  Star,
  Share2,
  Download,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";

interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  type: string;
  quantity: number;
  avgBuyPrice: number;
  totalInvested: number;
  livePrice?: number;
  totalValue?: number;
  returns?: number;
  returnsPercent?: number;
  change24h?: number;
}

interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  totalInvested: number;
  totalReturns: number;
  returnsPercent: number;
  holdings: PortfolioHolding[];
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Get live market data for portfolio holdings
  const symbols = portfolio?.holdings.map(h => h.symbol) || [];
  const { data: marketData, loading: marketLoading, error: marketError, refetch } = useMarketData({
    symbols,
    autoRefresh: true,
    refreshInterval: 30000
  });

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    // Update portfolio with live market data
    if (portfolio && marketData?.stocks) {
      const updatedHoldings = portfolio.holdings.map(holding => {
        const liveData = marketData.stocks.find((stock: any) => stock.symbol === holding.symbol);
        if (liveData) {
          const currentPrice = liveData.price;
          const totalValue = holding.quantity * currentPrice;
          const returns = totalValue - holding.totalInvested;
          const returnsPercent = (returns / holding.totalInvested) * 100;
          const change24h = liveData.changePercent;

          return {
            ...holding,
            livePrice: currentPrice,
            totalValue,
            returns,
            returnsPercent,
            change24h
          };
        }
        return holding;
      });

      const totalValue = updatedHoldings.reduce((sum, h) => sum + (h.totalValue || 0), 0);
      const totalInvested = updatedHoldings.reduce((sum, h) => sum + h.totalInvested, 0);
      const totalReturns = totalValue - totalInvested;
      const returnsPercent = (totalReturns / totalInvested) * 100;

      setPortfolio(prev => prev ? {
        ...prev,
        holdings: updatedHoldings,
        totalValue,
        totalReturns,
        returnsPercent
      } : null);

      setLastUpdated(new Date());
    }
  }, [marketData, portfolio]);

  const fetchPortfolioData = async () => {
    try {
      // Mock data for demonstration
      const mockPortfolio: Portfolio = {
        id: "1",
        name: "My Investment Portfolio",
        totalValue: 125000,
        totalInvested: 100000,
        totalReturns: 25000,
        returnsPercent: 25,
        holdings: [
          {
            id: "1",
            symbol: "RELIANCE",
            name: "Reliance Industries",
            type: "Stock",
            quantity: 50,
            avgBuyPrice: 2400,
            totalInvested: 120000,
            change24h: 1.2
          },
          {
            id: "2",
            symbol: "HDFCBANK",
            name: "HDFC Bank",
            type: "Stock",
            quantity: 100,
            avgBuyPrice: 1500,
            totalInvested: 150000,
            change24h: 0.8
          },
          {
            id: "3",
            symbol: "AXISBLUECHIP",
            name: "Axis Bluechip Fund",
            type: "Mutual Fund",
            quantity: 500,
            avgBuyPrice: 60,
            totalInvested: 30000,
            change24h: 2.1
          }
        ]
      };
      
      setPortfolio(mockPortfolio);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const getAssetTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock':
        return 'bg-blue-100 text-blue-800';
      case 'mutual fund':
        return 'bg-green-100 text-green-800';
      case 'etf':
        return 'bg-purple-100 text-purple-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your portfolio...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!portfolio) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Portfolio Found</h2>
          <p className="text-gray-600 mb-6">Start your investment journey by creating your first portfolio.</p>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Portfolio
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const isProfit = portfolio.totalReturns >= 0;

  return (
    <DashboardLayout>
      {/* Live Price Ticker */}
      <LivePriceTicker symbols={symbols} autoScroll={false} showVolume={false} />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{portfolio.name}</h1>
            <div className="flex items-center gap-4">
              <MarketStatus />
              <span className="text-sm text-gray-600">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              {marketError && (
                <div className="flex items-center gap-1 text-red-600">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-xs">Data delay</span>
                </div>
              )}
              {marketData && (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="text-xs">Live</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={refetch} disabled={marketLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${marketLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolio.totalInvested)}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Returns</p>
                <p className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(portfolio.totalReturns)}
                </p>
                <p className={`text-sm ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(portfolio.returnsPercent)}
                </p>
              </div>
              {isProfit ? (
                <TrendingUp className="w-8 h-8 text-green-600" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Holdings</p>
                <p className="text-2xl font-bold">{portfolio.holdings.length}</p>
                <p className="text-sm text-gray-600">Assets</p>
              </div>
              <PieChart className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Details Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Performance Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Your portfolio value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>Performance Chart</p>
                    <p className="text-sm">(Chart library integration needed)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Bought 10 shares of RELIANCE</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                    <span className="text-sm font-medium">₹25,000</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">SIP Investment - Axis Bluechip</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                    <span className="text-sm font-medium">₹5,000</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Dividend received from HDFCBANK</p>
                      <p className="text-xs text-gray-600">3 days ago</p>
                    </div>
                    <span className="text-sm font-medium">₹450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="holdings">
          <Card>
            <CardHeader>
              <CardTitle>Holdings Details</CardTitle>
              <CardDescription>Detailed breakdown of your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolio.holdings.map((holding) => {
                  const currentPrice = holding.livePrice || holding.avgBuyPrice;
                  const totalValue = holding.quantity * currentPrice;
                  const returns = totalValue - holding.totalInvested;
                  const returnsPercent = (returns / holding.totalInvested) * 100;
                  const isHoldingProfit = returns >= 0;

                  return (
                    <div key={holding.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-sm">{holding.symbol.substring(0, 2)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{holding.symbol}</h4>
                          <p className="text-sm text-gray-600">{holding.name}</p>
                          <Badge className={`text-xs ${getAssetTypeColor(holding.type)}`}>
                            {holding.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(totalValue)}</p>
                        <p className="text-sm text-gray-600">
                          {holding.quantity} @ {formatCurrency(currentPrice)}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-semibold ${isHoldingProfit ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(returns)}
                        </p>
                        <p className={`text-sm ${isHoldingProfit ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(returnsPercent)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Buy
                        </Button>
                        <Button size="sm" variant="outline">
                          Sell
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Return</span>
                  <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(portfolio.totalReturns)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Percentage</span>
                  <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(portfolio.returnsPercent)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Performer</span>
                  <span className="font-semibold">
                    {portfolio.holdings.reduce((best, current) => {
                      const currentReturn = ((current.totalValue || 0) - current.totalInvested) / current.totalInvested * 100;
                      const bestReturn = ((best.totalValue || 0) - best.totalInvested) / best.totalInvested * 100;
                      return currentReturn > bestReturn ? current : best;
                    }).symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Worst Performer</span>
                  <span className="font-semibold">
                    {portfolio.holdings.reduce((worst, current) => {
                      const currentReturn = ((current.totalValue || 0) - current.totalInvested) / current.totalInvested * 100;
                      const worstReturn = ((worst.totalValue || 0) - worst.totalInvested) / worst.totalInvested * 100;
                      return currentReturn < worstReturn ? current : worst;
                    }).symbol}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Portfolio risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Risk Level</span>
                    <span className="font-semibold">Moderate</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Diversification</span>
                    <span className="font-semibold">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Volatility</span>
                    <span className="font-semibold">Medium</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution by asset type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Stock', 'Mutual Fund', 'ETF', 'Gold'].map((type) => {
                    const typeHoldings = portfolio.holdings.filter(h => h.type.toLowerCase() === type.toLowerCase());
                    const typeValue = typeHoldings.reduce((sum, h) => sum + (h.totalValue || 0), 0);
                    const percentage = (typeValue / portfolio.totalValue) * 100;
                    
                    return (
                      <div key={type}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{type}</span>
                          <span className="text-sm text-gray-600">{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Distribution by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Banking</span>
                      <span className="text-sm text-gray-600">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Oil & Gas</span>
                      <span className="text-sm text-gray-600">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Mutual Funds</span>
                      <span className="text-sm text-gray-600">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}