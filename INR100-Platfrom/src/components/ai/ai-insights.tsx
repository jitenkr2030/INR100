"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  RefreshCw,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface AIInsightsProps {
  userId?: string;
  portfolioData?: any;
  userPreferences?: {
    riskProfile?: string;
    investmentGoals?: string[];
    riskTolerance?: string;
  };
}

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'analysis';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  action?: string;
  impact?: string;
  timestamp: Date;
  isRead: boolean;
}

export function AIInsights({ userId, portfolioData, userPreferences }: AIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock insights data - in real app this would come from API
  const mockInsights: Insight[] = [
    {
      id: "1",
      type: "opportunity",
      title: "Market Dip Alert",
      description: "Quality large-cap stocks are trading at 10-15% discount to their intrinsic values. Consider accumulating positions in fundamentally strong companies.",
      confidence: 85,
      priority: "high",
      action: "Review and invest in undervalued large-cap stocks",
      impact: "Potential 15-20% returns over 12-18 months",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false
    },
    {
      id: "2",
      type: "risk",
      title: "Portfolio Concentration Risk",
      description: "Your portfolio has 35% allocation to technology sector, which is above the recommended 25% threshold for diversification.",
      confidence: 92,
      priority: "medium",
      action: "Rebalance portfolio by adding non-tech sectors",
      impact: "Reduces volatility and improves risk-adjusted returns",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isRead: false
    },
    {
      id: "3",
      type: "recommendation",
      title: "SIP Optimization",
      description: "Based on your income pattern and goals, consider increasing your monthly SIP by ₹2,000 to reach your financial goals faster.",
      confidence: 78,
      priority: "medium",
      action: "Increase SIP amount by ₹2,000",
      impact: "Achieve goals 2-3 years earlier",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true
    },
    {
      id: "4",
      type: "analysis",
      title: "Portfolio Health Score: 82/100",
      description: "Your portfolio is performing well with good diversification and returns. Consider adding international exposure for further diversification.",
      confidence: 88,
      priority: "low",
      action: "Add international equity funds (5-10% allocation)",
      impact: "Enhanced diversification and currency hedge",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true
    }
  ];

  useEffect(() => {
    setInsights(mockInsights);
  }, []);

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      // In real app, this would call the AI insights API
      // const response = await fetch('/api/ai/insights', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     type: 'portfolio_analysis',
      //     userId,
      //     portfolioData,
      //     userPreferences
      //   })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new mock insight
      const newInsight: Insight = {
        id: Date.now().toString(),
        type: "opportunity",
        title: "New Market Opportunity Detected",
        description: "AI has identified a potential investment opportunity in emerging sectors based on current market trends and your risk profile.",
        confidence: 83,
        priority: "high",
        action: "Explore emerging sector funds",
        impact: "High growth potential with moderate risk",
        timestamp: new Date(),
        isRead: false
      };
      
      setInsights(prev => [newInsight, ...prev]);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (insightId: string) => {
    setInsights(prev => 
      prev.map(insight => 
        insight.id === insightId ? { ...insight, isRead: true } : insight
      )
    );
  };

  const getFilteredInsights = () => {
    switch (selectedTab) {
      case "unread":
        return insights.filter(insight => !insight.isRead);
      case "opportunities":
        return insights.filter(insight => insight.type === "opportunity");
      case "risks":
        return insights.filter(insight => insight.type === "risk");
      case "recommendations":
        return insights.filter(insight => insight.type === "recommendation");
      default:
        return insights;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Target className="h-5 w-5 text-green-600" />;
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case "recommendation":
        return <Sparkles className="h-5 w-5 text-blue-600" />;
      case "analysis":
        return <BarChart3 className="h-5 w-5 text-purple-600" />;
      default:
        return <Lightbulb className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = insights.filter(insight => !insight.isRead).length;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span>AI Insights</span>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount} new
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Personalized insights powered by AI to help you make better investment decisions
            </CardDescription>
          </div>
          <Button
            onClick={generateInsights}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="space-y-4">
            {getFilteredInsights().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No insights found for the selected filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getFilteredInsights().map((insight) => (
                  <Card 
                    key={insight.id} 
                    className={`border-l-4 transition-all hover:shadow-md ${
                      !insight.isRead ? 'border-l-blue-500 bg-blue-50/30' : 'border-l-gray-300'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="flex-shrink-0 mt-1">
                            {getInsightIcon(insight.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-gray-900">
                                {insight.title}
                              </h3>
                              <Badge className={getPriorityColor(insight.priority)}>
                                {insight.priority}
                              </Badge>
                              {!insight.isRead && (
                                <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {insight.description}
                            </p>
                            
                            {insight.action && (
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="text-sm font-medium text-gray-700 mb-1">
                                  Suggested Action:
                                </div>
                                <div className="text-sm text-gray-600">
                                  {insight.action}
                                </div>
                              </div>
                            )}
                            
                            {insight.impact && (
                              <div className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">Expected Impact:</span> {insight.impact}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <span>Confidence:</span>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={insight.confidence} className="w-16 h-2" />
                                    <span>{insight.confidence}%</span>
                                  </div>
                                </div>
                                <div>{formatTimeAgo(insight.timestamp)}</div>
                              </div>
                              
                              {!insight.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(insight.id)}
                                  className="text-xs"
                                >
                                  Mark as read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}