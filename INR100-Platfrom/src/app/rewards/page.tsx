"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Target, 
  Gift, 
  TrendingUp, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  Lock,
  Zap,
  Award,
  Medal,
  Crown,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Flame
} from "lucide-react";

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    level: 5,
    xp: 2500,
    nextLevelXp: 3000,
    streak: 7,
    rank: 1250,
    totalBadges: 8,
    completedMissions: 12,
    points: 1500,
    referrals: 3
  };

  // Mock badges data
  const badges = [
    {
      id: "1",
      name: "First Investment",
      description: "Make your first investment",
      icon: Target,
      category: "investment",
      rarity: "common",
      isUnlocked: true,
      unlockedAt: "2024-01-01",
      xpReward: 50
    },
    {
      id: "2",
      name: "Week Streak",
      description: "Invest for 7 consecutive days",
      icon: Flame,
      category: "streak",
      rarity: "rare",
      isUnlocked: true,
      unlockedAt: "2024-01-08",
      xpReward: 100
    },
    {
      id: "3",
      name: "Portfolio Diversifier",
      description: "Invest in 5 different asset classes",
      icon: BarChart3,
      category: "portfolio",
      rarity: "epic",
      isUnlocked: false,
      progress: 3,
      target: 5,
      xpReward: 200
    },
    {
      id: "4",
      name: "Learning Enthusiast",
      description: "Complete 10 learning courses",
      icon: Star,
      category: "learning",
      rarity: "rare",
      isUnlocked: false,
      progress: 4,
      target: 10,
      xpReward: 150
    },
    {
      id: "5",
      name: "Social Butterfly",
      description: "Follow 10 expert investors",
      icon: Users,
      category: "social",
      rarity: "uncommon",
      isUnlocked: true,
      unlockedAt: "2024-01-15",
      xpReward: 75
    },
    {
      id: "6",
      name: "SIP Master",
      description: "Maintain SIP for 12 months",
      icon: TrendingUp,
      category: "investment",
      rarity: "legendary",
      isUnlocked: false,
      progress: 3,
      target: 12,
      xpReward: 500
    }
  ];

  // Mock missions data
  const missions = [
    {
      id: "1",
      title: "Daily Investor",
      description: "Make an investment today",
      type: "daily",
      targetValue: 1,
      progress: 1,
      xpReward: 25,
      pointsReward: 10,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "completed",
      icon: Target
    },
    {
      id: "2",
      title: "Learning Sprint",
      description: "Complete 3 learning lessons",
      type: "weekly",
      targetValue: 3,
      progress: 1,
      xpReward: 75,
      pointsReward: 30,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
      icon: Star
    },
    {
      id: "3",
      title: "Portfolio Builder",
      description: "Add ₹5000 to your portfolio",
      type: "weekly",
      targetValue: 5000,
      progress: 2000,
      xpReward: 100,
      pointsReward: 50,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
      icon: TrendingUp
    },
    {
      id: "4",
      title: "Social Connector",
      description: "Follow 5 expert investors",
      type: "monthly",
      targetValue: 5,
      progress: 2,
      xpReward: 150,
      pointsReward: 75,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "active",
      icon: Users
    },
    {
      id: "5",
      title: "Referral Champion",
      description: "Refer 5 friends to INR100",
      type: "monthly",
      targetValue: 5,
      progress: 3,
      xpReward: 200,
      pointsReward: 100,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "active",
      icon: Gift
    }
  ];

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: "Priya Sharma", xp: 15420, level: 12, change: "up" },
    { rank: 2, name: "Amit Patel", xp: 14850, level: 11, change: "up" },
    { rank: 3, name: "Sneha Reddy", xp: 13980, level: 11, change: "down" },
    { rank: 4, name: "Rahul Kumar", xp: 12500, level: 10, change: "up" },
    { rank: 5, name: "Neha Singh", xp: 11890, level: 10, change: "same" },
    { rank: 1250, name: "You", xp: userData.xp, level: userData.level, change: "up", isCurrentUser: true }
  ];

  // Mock rewards data
  const rewards = [
    {
      id: "1",
      name: "₹100 Investment Bonus",
      description: "Get ₹100 bonus for your next investment",
      cost: 500,
      category: "investment",
      icon: Gift,
      isAvailable: true
    },
    {
      id: "2",
      name: "Premium Course Access",
      description: "Unlock 1 premium learning course",
      cost: 1000,
      category: "learning",
      icon: Star,
      isAvailable: true
    },
    {
      id: "3",
      name: "Exclusive Webinar",
      description: "Attend exclusive market analysis webinar",
      cost: 750,
      category: "exclusive",
      icon: Sparkles,
      isAvailable: false
    },
    {
      id: "4",
      name: "Trading Fee Waiver",
      description: "Get 50% off on trading fees for 1 month",
      cost: 1500,
      category: "trading",
      icon: TrendingUp,
      isAvailable: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800 border-gray-300";
      case "uncommon": return "bg-green-100 text-green-800 border-green-300";
      case "rare": return "bg-blue-100 text-blue-800 border-blue-300";
      case "epic": return "bg-purple-100 text-purple-800 border-purple-300";
      case "legendary": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return "Less than 1h";
  };

  return (
    <DashboardLayout user={{
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      avatar: "/placeholder-avatar.jpg",
      level: userData.level,
      xp: userData.xp,
      nextLevelXp: userData.nextLevelXp,
      walletBalance: 15000,
      notifications: 3
    }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <span>Rewards & Gamification</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Level {userData.level}
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">
              Earn XP, collect badges, complete missions, and climb the leaderboard
            </p>
          </div>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{userData.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{userData.xp}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{userData.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">#{userData.rank}</div>
              <div className="text-sm text-gray-600">Rank</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.totalBadges}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{userData.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Progress to Level {userData.level + 1}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {userData.level}</span>
                <span>{userData.xp}/{userData.nextLevelXp} XP</span>
              </div>
              <Progress 
                value={(userData.xp / userData.nextLevelXp) * 100} 
                className="h-3"
              />
              <div className="text-sm text-gray-600">
                {userData.nextLevelXp - userData.xp} XP needed for next level
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Missions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Active Missions</span>
                  </CardTitle>
                  <CardDescription>
                    Complete missions to earn XP and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {missions.filter(m => m.status === "active").slice(0, 3).map((mission) => (
                      <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                              <mission.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium">{mission.title}</h4>
                              <p className="text-sm text-gray-600">{mission.description}</p>
                            </div>
                          </div>
                          <Badge className={getMissionStatusColor(mission.status)}>
                            {mission.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{mission.progress}/{mission.targetValue}</span>
                          </div>
                          <Progress 
                            value={(mission.progress / mission.targetValue) * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{mission.xpReward} XP</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Gift className="h-3 w-3 text-green-500" />
                              <span>{mission.pointsReward} pts</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-orange-600">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeRemaining(mission.expiresAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                  <CardDescription>
                    Your latest unlocked badges and accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {badges.filter(b => b.isUnlocked).slice(0, 3).map((badge) => (
                      <div key={badge.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className={`p-2 rounded-lg ${getRarityColor(badge.rarity)}`}>
                          <badge.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            +{badge.xpReward} XP
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rewards Store */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <span>Rewards Store</span>
                </CardTitle>
                <CardDescription>
                  Redeem your points for exciting rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className="border border-gray-200">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <reward.icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-medium mb-1">{reward.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                        <div className="space-y-2">
                          <div className="text-lg font-bold text-purple-600">
                            {reward.cost} pts
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full"
                            disabled={!reward.isAvailable || userData.points < reward.cost}
                          >
                            {reward.isAvailable ? "Redeem" : "Unavailable"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <Card key={badge.id} className={`border-0 shadow-lg transition-all hover:shadow-xl ${
                  badge.isUnlocked ? '' : 'opacity-60'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      badge.isUnlocked ? getRarityColor(badge.rarity) : 'bg-gray-100 text-gray-400'
                    }`}>
                      <badge.icon className="h-10 w-10" />
                    </div>
                    <h3 className="font-medium mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                    
                    {badge.isUnlocked ? (
                      <div className="space-y-2">
                        <Badge className={getRarityColor(badge.rarity)}>
                          {badge.rarity}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          Unlocked on {new Date(badge.unlockedAt).toLocaleDateString()}
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          +{badge.xpReward} XP
                        </Badge>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-gray-500">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                        {badge.progress !== undefined && (
                          <div className="text-xs text-gray-500">
                            Progress: {badge.progress}/{badge.target}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {missions.map((mission) => (
                <Card key={mission.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          mission.status === "completed" ? "bg-green-100 text-green-600" :
                          mission.status === "active" ? "bg-blue-100 text-blue-600" :
                          "bg-red-100 text-red-600"
                        }`}>
                          <mission.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{mission.title}</h3>
                          <p className="text-sm text-gray-600">{mission.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getMissionStatusColor(mission.status)}>
                          {mission.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Progress</div>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(mission.progress / mission.targetValue) * 100} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm font-medium">
                            {mission.progress}/{mission.targetValue}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Rewards</div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 text-sm">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{mission.xpReward} XP</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Gift className="h-4 w-4 text-green-500" />
                            <span>{mission.pointsReward} pts</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Time Remaining</div>
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{formatTimeRemaining(mission.expiresAt)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <span>Global Leaderboard</span>
                </CardTitle>
                <CardDescription>
                  See where you rank among other investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <div className={`font-medium ${user.isCurrentUser ? 'text-blue-600' : ''}`}>
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-600">Level {user.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{user.xp.toLocaleString()} XP</div>
                          <div className="text-sm text-gray-600">
                            {user.change === "up" && <ArrowUpRight className="h-3 w-3 inline text-green-600" />}
                            {user.change === "down" && <ArrowDownRight className="h-3 w-3 inline text-red-600" />}
                          </div>
                        </div>
                        {user.isCurrentUser && (
                          <Badge className="bg-blue-100 text-blue-800">You</Badge>
                        )}
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