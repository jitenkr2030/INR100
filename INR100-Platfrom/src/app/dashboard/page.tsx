"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sparkles,
  Gift,
  Trophy,
  Star,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data for demonstration
  const portfolioData = {
    totalValue: 125000,
    totalInvested: 100000,
    totalReturns: 25000,
    returnsPercentage: 25,
    dailyChange: 1250,
    dailyChangePercentage: 1.0,
    assetAllocation: [
      { name: "Stocks", value: 50000, percentage: 40, color: "#10B981" },
      { name: "Mutual Funds", value: 37500, percentage: 30, color: "#3B82F6" },
      { name: "Gold", value: 25000, percentage: 20, color: "#F59E0B" },
      { name: "Global", value: 12500, percentage: 10, color: "#8B5CF6" }
    ],
    topPerformers: [
      { name: "Reliance Industries", symbol: "RELIANCE", value: 15000, returns: 15.5 },
      { name: "HDFC Bank", symbol: "HDFCBANK", value: 12000, returns: 12.3 },
      { name: "Axis Bluechip Fund", symbol: "AXISBLUECHIP", value: 10000, returns: 18.7 }
    ],
    recentActivity: [
      { type: "buy", asset: "TCS", amount: 5000, time: "2 hours ago", status: "completed" },
      { type: "sell", asset: "ITC", amount: 3000, time: "1 day ago", status: "completed" },
      { type: "sip", asset: "SBI Small Cap", amount: 2000, time: "2 days ago", status: "completed" }
    ],
    aiInsights: [
      { 
        type: "opportunity", 
        title: "Market Dip Alert", 
        description: "Quality stocks are trading at 10% discount. Consider buying the dip.",
        confidence: 85,
        priority: "high"
      },
      { 
        type: "risk", 
        title: "Portfolio Rebalancing", 
        description: "Your equity allocation is 5% above target. Consider rebalancing.",
        confidence: 92,
        priority: "medium"
      },
      { 
        type: "performance", 
        title: "SIP Performance", 
        description: "Your SIPs are outperforming benchmark by 3.2%.",
        confidence: 78,
        priority: "low"
      }
    ]
  };

  const quickActions = [
    { title: "Add Money", icon: Plus, description: "Load your wallet", color: "bg-green-100 text-green-600" },
    { title: "Invest", icon: TrendingUp, description: "Start investing", color: "bg-blue-100 text-blue-600" },
    { title: "Withdraw", icon: ArrowDownRight, description: "Get your money", color: "bg-red-100 text-red-600" },
    { title: "SIP", icon: Clock, description: "Set up SIP", color: "bg-purple-100 text-purple-600" }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Rahul! Here's your portfolio overview.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Badge className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              Active Investor
            </Badge>
            <Badge variant="outline">
              Level 5
            </Badge>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{portfolioData.totalValue.toLocaleString('en-IN')}</div>
              <div className="flex items-center space-x-1 text-sm">
                {portfolioData.dailyChange >= 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">+₹{portfolioData.dailyChange.toLocaleString('en-IN')} (+{portfolioData.dailyChangePercentage}%)</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">-₹{Math.abs(portfolioData.dailyChange).toLocaleString('en-IN')} ({portfolioData.dailyChangePercentage}%)</span>
                  </>
                )}
                <span className="text-gray-500">today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Invested</CardTitle>
              <PieChart className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{portfolioData.totalInvested.toLocaleString('en-IN')}</div>
              <p className="text-xs text-gray-600">Across 12 investments</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+₹{portfolioData.totalReturns.toLocaleString('en-IN')}</div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+{portfolioData.returnsPercentage}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Wallet Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹15,000</div>
              <Button size="sm" className="mt-2 w-full">
                <Plus className="h-3 w-3 mr-1" />
                Add Money
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Asset Allocation */}
              <Card className="border-0 shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Asset Allocation</span>
                  </CardTitle>
                  <CardDescription>Your portfolio diversification across asset classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.assetAllocation.map((asset) => (
                      <div key={asset.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: asset.color }}
                            />
                            <span className="font-medium">{asset.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{asset.value.toLocaleString('en-IN')}</div>
                            <div className="text-sm text-gray-600">{asset.percentage}%</div>
                          </div>
                        </div>
                        <Progress value={asset.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>Common tasks you can perform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action) => (
                      <Button
                        key={action.title}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50"
                      >
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <action.icon className="h-5 w-5" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm">{action.title}</div>
                          <div className="text-xs text-gray-600">{action.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Top Performers</span>
                </CardTitle>
                <CardDescription>Your best performing investments this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.topPerformers.map((performer, index) => (
                    <div key={performer.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{performer.name}</div>
                          <div className="text-sm text-gray-600">{performer.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{performer.value.toLocaleString('en-IN')}</div>
                        <div className="text-sm text-green-600 flex items-center justify-end">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{performer.returns}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.aiInsights.map((insight, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {insight.type === "opportunity" && <Sparkles className="h-5 w-5 text-green-600" />}
                        {insight.type === "risk" && <AlertTriangle className="h-5 w-5 text-orange-600" />}
                        {insight.type === "performance" && <BarChart3 className="h-5 w-5 text-blue-600" />}
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      <Badge 
                        variant={insight.priority === "high" ? "destructive" : insight.priority === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <CardDescription>{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <span className="font-medium">{insight.confidence}%</span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest investment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          activity.type === "buy" ? "bg-green-100 text-green-600" :
                          activity.type === "sell" ? "bg-red-100 text-red-600" :
                          "bg-blue-100 text-blue-600"
                        }`}>
                          {activity.type === "buy" && <ArrowUpRight className="h-4 w-4" />}
                          {activity.type === "sell" && <ArrowDownRight className="h-4 w-4" />}
                          {activity.type === "sip" && <Clock className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{activity.type} - {activity.asset}</div>
                          <div className="text-sm text-gray-600">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{activity.amount.toLocaleString('en-IN')}</div>
                        <div className="flex items-center justify-end text-sm text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {activity.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}