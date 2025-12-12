"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Clock, 
  DollarSign, 
  BarChart3,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Info,
  Sparkles,
  Award,
  Target
} from "lucide-react";

export default function InvestPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Mock data for different asset types
  const assets = {
    stocks: [
      {
        id: "1",
        name: "Reliance Industries",
        symbol: "RELIANCE",
        price: 2450.75,
        change: 1.25,
        changePercent: 0.05,
        category: "Large Cap",
        minInvestment: 100,
        isPopular: true,
        description: "India's largest private sector company"
      },
      {
        id: "2", 
        name: "TCS",
        symbol: "TCS",
        price: 3650.50,
        change: -25.30,
        changePercent: -0.69,
        category: "Large Cap",
        minInvestment: 100,
        isPopular: true,
        description: "Leading IT services company"
      },
      {
        id: "3",
        name: "HDFC Bank",
        symbol: "HDFCBANK",
        price: 1580.25,
        change: 12.45,
        changePercent: 0.79,
        category: "Banking",
        minInvestment: 100,
        isPopular: false,
        description: "India's largest private sector bank"
      }
    ],
    mutualFunds: [
      {
        id: "4",
        name: "Axis Bluechip Fund",
        symbol: "AXISBLUECHIP",
        price: 45.67,
        change: 0.85,
        changePercent: 1.90,
        category: "Large Cap",
        minInvestment: 100,
        isPopular: true,
        description: "Invests in large cap companies",
        nav: 45.67,
        returns1Y: 18.5
      },
      {
        id: "5",
        name: "SBI Small Cap Fund",
        symbol: "SBISMALLCAP",
        price: 125.89,
        change: 2.45,
        changePercent: 1.98,
        category: "Small Cap",
        minInvestment: 100,
        isPopular: true,
        description: "Focuses on small cap opportunities",
        nav: 125.89,
        returns1Y: 22.3
      },
      {
        id: "6",
        name: "ICICI Prudential Debt Fund",
        symbol: "ICICIDEBT",
        price: 35.67,
        change: 0.15,
        changePercent: 0.42,
        category: "Debt",
        minInvestment: 100,
        isPopular: false,
        description: "Stable debt fund for conservative investors",
        nav: 35.67,
        returns1Y: 8.2
      }
    ],
    gold: [
      {
        id: "7",
        name: "Digital Gold",
        symbol: "GOLD",
        price: 5620.50,
        change: 45.25,
        changePercent: 0.81,
        category: "Commodity",
        minInvestment: 100,
        isPopular: true,
        description: "24K pure digital gold",
        purity: "99.9%",
        storage: "Secure vault"
      },
      {
        id: "8",
        name: "Gold ETF",
        symbol: "GOLDBEES",
        price: 56.18,
        change: 0.45,
        changePercent: 0.81,
        category: "ETF",
        minInvestment: 100,
        isPopular: false,
        description: "Gold backed ETF traded on exchange",
        expenseRatio: 0.5
      }
    ],
    global: [
      {
        id: "9",
        name: "Apple Inc.",
        symbol: "AAPL",
        price: 175.43,
        change: 2.15,
        changePercent: 1.24,
        category: "Technology",
        minInvestment: 100,
        isPopular: true,
        description: "World's largest technology company",
        currency: "USD"
      },
      {
        id: "10",
        name: "Tesla Inc.",
        symbol: "TSLA",
        price: 238.45,
        change: -5.67,
        changePercent: -2.32,
        category: "Electric Vehicles",
        minInvestment: 100,
        isPopular: true,
        description: "Leading electric vehicle manufacturer",
        currency: "USD"
      },
      {
        id: "11",
        name: "Microsoft Corp.",
        symbol: "MSFT",
        price: 378.85,
        change: 4.23,
        changePercent: 1.13,
        category: "Technology",
        minInvestment: 100,
        isPopular: false,
        description: "Cloud and software giant",
        currency: "USD"
      }
    ]
  };

  const categories = [
    { id: "all", name: "All Assets", icon: BarChart3 },
    { id: "stocks", name: "Stocks", icon: TrendingUp },
    { id: "mutualFunds", name: "Mutual Funds", icon: Star },
    { id: "gold", name: "Gold", icon: Award },
    { id: "global", name: "Global", icon: Target }
  ];

  const getAllAssets = () => {
    return Object.values(assets).flat();
  };

  const getFilteredAssets = () => {
    let filteredAssets = getAllAssets();
    
    if (selectedCategory !== "all") {
      filteredAssets = assets[selectedCategory as keyof typeof assets] || [];
    }
    
    if (searchQuery) {
      filteredAssets = filteredAssets.filter(asset =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort assets
    filteredAssets.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        case "price_high":
          return b.price - a.price;
        case "price_low":
          return a.price - b.price;
        case "returns":
          return b.changePercent - a.changePercent;
        default:
          return 0;
      }
    });
    
    return filteredAssets;
  };

  const AssetCard = ({ asset }: { asset: any }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{asset.name}</CardTitle>
            <CardDescription className="text-sm">{asset.symbol} • {asset.category}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {asset.isPopular && (
              <Badge className="bg-orange-100 text-orange-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            <Badge variant="outline">
              ₹{asset.minInvestment}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Price and Change */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {asset.currency === "USD" ? "$" : "₹"}{asset.price.toLocaleString('en-IN')}
              </div>
              <div className={`flex items-center text-sm ${
                asset.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {asset.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {asset.change >= 0 ? '+' : ''}{asset.change} ({asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%)
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>Min Investment</div>
              <div className="font-medium">₹{asset.minInvestment}</div>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-600">{asset.description}</p>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Invest Now
            </Button>
            <Button variant="outline" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout user={{
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      avatar: "/placeholder-avatar.jpg",
      level: 5,
      xp: 2500,
      nextLevelXp: 3000,
      walletBalance: 15000,
      notifications: 3
    }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invest</h1>
            <p className="text-gray-600 mt-1">Discover and invest in 500+ assets starting from ₹100</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Badge className="bg-green-100 text-green-800">
              <DollarSign className="h-3 w-3 mr-1" />
              Start from ₹100
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search stocks, mutual funds, gold, global assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="returns">Best Returns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-6">
            {/* Category Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedCategory === "all" ? "500+" : Object.keys(assets[selectedCategory as keyof typeof assets] || {}).length}
                  </div>
                  <div className="text-sm text-gray-600">Total Assets</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">₹100</div>
                  <div className="text-sm text-gray-600">Min Investment</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Trading</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">0%</div>
                  <div className="text-sm text-gray-600">Commission</div>
                </CardContent>
              </Card>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredAssets().map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>

            {getFilteredAssets().length === 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}