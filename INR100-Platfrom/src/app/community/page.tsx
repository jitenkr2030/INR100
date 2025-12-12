"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Share2, 
  Heart, 
  Plus,
  Search,
  Filter,
  Star,
  Target,
  Trophy,
  Calendar,
  BarChart3,
  Copy,
  UserPlus,
  UserCheck,
  ThumbsUp,
  MessageCircle,
  Share,
  MoreHorizontal,
  Eye,
  Award,
  Zap
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock expert investors
  const expertInvestors = [
    {
      id: "1",
      name: "Dr. Ananya Sharma",
      username: "@ananya_sharma",
      avatar: "/avatars/expert1.jpg",
      bio: "CFP | 15+ years experience | Specialized in equity research",
      followers: 15420,
      following: 892,
      portfolioValue: 2500000,
      returns: 28.5,
      isFollowing: true,
      expertise: ["Equity Research", "Financial Planning", "Risk Management"],
      verified: true
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      username: "@rajesh_invests",
      avatar: "/avatars/expert2.jpg",
      bio: "Technical Analysis Expert | Options Trader | Market Mentor",
      followers: 12350,
      following: 567,
      portfolioValue: 1800000,
      returns: 32.1,
      isFollowing: false,
      expertise: ["Technical Analysis", "Options Trading", "Market Psychology"],
      verified: true
    },
    {
      id: "3",
      name: "Priya Singh",
      username: "@priya_finance",
      avatar: "/avatars/expert3.jpg",
      bio: "Mutual Fund Specialist | SIP Expert | Financial Educator",
      followers: 9870,
      following: 423,
      portfolioValue: 1200000,
      returns: 18.7,
      isFollowing: true,
      expertise: ["Mutual Funds", "SIP Planning", "Tax Planning"],
      verified: false
    }
  ];

  // Mock community posts
  const communityPosts = [
    {
      id: "1",
      author: {
        name: "Dr. Ananya Sharma",
        username: "@ananya_sharma",
        avatar: "/avatars/expert1.jpg",
        verified: true
      },
      content: "Market analysis: IT sector showing strong momentum. Q3 results have been better than expected. Recommended to accumulate quality IT stocks for long-term gains. #ITStocks #MarketAnalysis",
      type: "analysis",
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "2 hours ago",
      isLiked: false,
      tags: ["ITStocks", "MarketAnalysis"]
    },
    {
      id: "2",
      author: {
        name: "Rahul Kumar",
        username: "@rahul_investor",
        avatar: "/avatars/user1.jpg",
        verified: false
      },
      content: "Just completed my first year of SIP investments! Started with ₹5000/month and now seeing consistent returns. Thank you INR100 for making investing so accessible! 🎉 #SIPSuccess #InvestmentJourney",
      type: "achievement",
      likes: 156,
      comments: 23,
      shares: 8,
      timestamp: "4 hours ago",
      isLiked: true,
      tags: ["SIPSuccess", "InvestmentJourney"]
    },
    {
      id: "3",
      author: {
        name: "Priya Singh",
        username: "@priya_finance",
        avatar: "/avatars/expert3.jpg",
        verified: false
      },
      content: "New video alert: Understanding Debt Funds - A complete guide for conservative investors. Link in bio! Learn how to balance your portfolio with fixed income instruments. #DebtFunds #FinancialEducation",
      type: "educational",
      likes: 89,
      comments: 15,
      shares: 5,
      timestamp: "6 hours ago",
      isLiked: false,
      tags: ["DebtFunds", "FinancialEducation"]
    }
  ];

  // Mock trending portfolios
  const trendingPortfolios = [
    {
      id: "1",
      name: "Tech Growth Portfolio",
      creator: "Dr. Ananya Sharma",
      returns: 28.5,
      riskLevel: "High",
      followers: 3420,
      description: "Focused on high-growth technology companies",
      assets: ["Reliance", "TCS", "Infosys", "HCL Tech"],
      isCopied: false
    },
    {
      id: "2",
      name: "Balanced SIP Portfolio",
      creator: "Priya Singh",
      returns: 18.7,
      riskLevel: "Medium",
      followers: 2890,
      description: "Balanced mix of equity and debt funds",
      assets: ["Axis Bluechip", "SBI Small Cap", "ICICI Prudential Debt"],
      isCopied: true
    },
    {
      id: "3",
      name: "Aggressive Growth Portfolio",
      creator: "Rajesh Kumar",
      returns: 32.1,
      riskLevel: "Very High",
      followers: 2150,
      description: "High-risk high-return strategy",
      assets: ["Small Cap Funds", "Mid Cap Stocks", "Sectoral Funds"],
      isCopied: false
    }
  ];

  // Mock community challenges
  const communityChallenges = [
    {
      id: "1",
      title: "₹100 to ₹1000 Challenge",
      description: "Turn ₹100 into ₹1000 through smart investing in 30 days",
      participants: 15420,
      daysLeft: 15,
      prizePool: "₹50,000",
      difficulty: "Medium",
      icon: Target
    },
    {
      id: "2",
      title: "SIP Marathon",
      description: "Maintain active SIP for 90 consecutive days",
      participants: 8900,
      daysLeft: 45,
      prizePool: "₹25,000",
      difficulty: "Easy",
      icon: TrendingUp
    },
    {
      id: "3",
      title: "Portfolio Diversification Master",
      description: "Build a portfolio with 10+ different asset classes",
      participants: 5670,
      daysLeft: 30,
      prizePool: "₹75,000",
      difficulty: "Hard",
      icon: Award
    }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Very High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
              <Users className="h-8 w-8 text-blue-600" />
              <span>Investing Community</span>
              <Badge className="bg-blue-100 text-blue-800">
                <Zap className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">
              Connect with fellow investors, follow experts, and share insights
            </p>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Active Investors</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Expert Investors</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">2.5K+</div>
              <div className="text-sm text-gray-600">Daily Posts</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">15K+</div>
              <div className="text-sm text-gray-600">Copied Portfolios</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="experts">Expert Investors</TabsTrigger>
            <TabsTrigger value="portfolios">Trending Portfolios</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Create Post */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share your investment insights, ask questions, or post achievements..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analysis
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trophy className="h-4 w-4 mr-2" />
                          Achievement
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="h-4 w-4 mr-2" />
                          Question
                        </Button>
                      </div>
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{post.author.name}</span>
                              <span className="text-gray-600">@{post.author.username}</span>
                              {post.author.verified && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{post.timestamp}</div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-gray-900 mb-3">{post.content}</p>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-600">
                              <ThumbsUp className={`h-4 w-4 mr-1 ${post.isLiked ? 'text-blue-600' : ''}`} />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600">
                              <Share className="h-4 w-4 mr-1" />
                              {post.shares}
                            </Button>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {post.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertInvestors.map((expert) => (
                <Card key={expert.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={expert.avatar} />
                        <AvatarFallback>
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <h3 className="font-medium">{expert.name}</h3>
                          {expert.verified && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">@{expert.username}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-600">Followers</div>
                        <div className="font-medium">{expert.followers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Returns</div>
                        <div className="font-medium text-green-600">+{expert.returns}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-600">Expertise:</div>
                      <div className="flex flex-wrap gap-1">
                        {expert.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={expert.isFollowing ? "outline" : "default"}
                    >
                      {expert.isFollowing ? (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Follow
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPortfolios.map((portfolio) => (
                <Card key={portfolio.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">{portfolio.name}</h3>
                      <Badge className={getRiskColor(portfolio.riskLevel)}>
                        {portfolio.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      by {portfolio.creator}
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Returns</span>
                        <span className="font-medium text-green-600">+{portfolio.returns}%</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Followers</span>
                        <span className="font-medium">{portfolio.followers.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{portfolio.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-600">Top Assets:</div>
                      <div className="flex flex-wrap gap-1">
                        {portfolio.assets.map((asset, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {asset}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1" variant={portfolio.isCopied ? "outline" : "default"}>
                        {portfolio.isCopied ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Portfolio
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                        <challenge.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-600">Participants</div>
                        <div className="font-medium">{challenge.participants.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Days Left</div>
                        <div className="font-medium text-orange-600">{challenge.daysLeft}</div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="text-sm font-medium text-yellow-800 mb-1">Prize Pool</div>
                      <div className="text-lg font-bold text-yellow-900">{challenge.prizePool}</div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}