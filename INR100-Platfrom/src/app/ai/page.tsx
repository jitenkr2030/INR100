"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AIChat } from "@/components/ai/ai-chat";
import { AIInsights } from "@/components/ai/ai-insights";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Sparkles, 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Lightbulb,
  Zap,
  Users,
  Award
} from "lucide-react";

export default function AIPage() {
  const [selectedTab, setSelectedTab] = useState("chat");

  // Mock user data and portfolio context
  const mockUserContext = {
    portfolio: {
      totalValue: 125000,
      totalInvested: 100000,
      returns: 25000,
      returnsPercentage: 25,
      assetAllocation: [
        { name: "Stocks", percentage: 40 },
        { name: "Mutual Funds", percentage: 30 },
        { name: "Gold", percentage: 20 },
        { name: "Global", percentage: 10 }
      ]
    },
    riskProfile: "moderate",
    investmentGoals: ["Wealth Creation", "Retirement Planning", "Child Education"],
    riskTolerance: "medium"
  };

  const aiFeatures = [
    {
      icon: Brain,
      title: "Portfolio Analysis",
      description: "Get comprehensive analysis of your investment portfolio with AI-powered insights",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Target,
      title: "Investment Recommendations",
      description: "Personalized investment suggestions based on your goals and risk profile",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Real-time market analysis and trends to inform your investment decisions",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify and mitigate potential risks in your investment strategy",
      color: "bg-red-100 text-red-600"
    }
  ];

  const aiStats = [
    { label: "Insights Generated", value: "1,247", icon: BarChart3 },
    { label: "Users Helped", value: "50K+", icon: Users },
    { label: "Accuracy Rate", value: "94%", icon: Award },
    { label: "Response Time", value: "< 2s", icon: Zap }
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
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <span>AI Financial Assistant</span>
              <Badge className="bg-blue-100 text-blue-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">
              Get personalized investment advice, portfolio analysis, and market insights powered by advanced AI
            </p>
          </div>
        </div>

        {/* AI Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {aiStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow">
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main AI Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Chat */}
          <div className="lg:col-span-2">
            <AIChat 
              userId="user-123"
              context={mockUserContext}
            />
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-1">
            <AIInsights 
              userId="user-123"
              portfolioData={mockUserContext.portfolio}
              userPreferences={mockUserContext}
            />
          </div>
        </div>

        {/* Additional AI Tools */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Advanced AI Tools</span>
            </CardTitle>
            <CardDescription>
              Explore more AI-powered features to enhance your investment journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="portfolio" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="portfolio">Portfolio AI</TabsTrigger>
                <TabsTrigger value="market">Market AI</TabsTrigger>
                <TabsTrigger value="goals">Goal Planner</TabsTrigger>
                <TabsTrigger value="education">Learn AI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Portfolio Health Check</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Get a comprehensive health score for your portfolio with actionable recommendations
                      </p>
                      <Button size="sm" className="w-full">
                        Analyze Portfolio
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Rebalancing Assistant</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        AI-powered portfolio rebalancing to maintain optimal asset allocation
                      </p>
                      <Button size="sm" className="w-full">
                        Rebalance Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="market" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Market Sentiment Analysis</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Real-time analysis of market sentiment and trends across sectors
                      </p>
                      <Button size="sm" className="w-full">
                        Analyze Sentiment
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Sector Opportunities</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Discover emerging opportunities in different market sectors
                      </p>
                      <Button size="sm" className="w-full">
                        Find Opportunities
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Goal Planning</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Create personalized investment plans for your financial goals
                      </p>
                      <Button size="sm" className="w-full">
                        Plan Goals
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Retirement Calculator</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Calculate how much you need to save for a comfortable retirement
                      </p>
                      <Button size="sm" className="w-full">
                        Calculate
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">AI Tutor</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Learn about investing with personalized AI-powered lessons
                      </p>
                      <Button size="sm" className="w-full">
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Financial Glossary</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Get instant explanations for financial terms and concepts
                      </p>
                      <Button size="sm" className="w-full">
                        Explore Glossary
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}