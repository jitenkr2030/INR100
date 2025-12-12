"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Home, 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  BookOpen, 
  Users, 
  Award, 
  Gift, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Target,
  Trophy
} from "lucide-react";

interface SidebarProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    level?: number;
    xp?: number;
    nextLevelXp?: number;
    walletBalance?: number;
  };
  className?: string;
}

export function Sidebar({ user, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Invest", href: "/invest", icon: TrendingUp },
    { name: "Portfolio", href: "/portfolio", icon: BarChart3 },
    { name: "Wallet", href: "/wallet", icon: Wallet },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Community", href: "/community", icon: Users },
    { name: "Rewards", href: "/rewards", icon: Gift },
  ];

  const bottomNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">₹100</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                INR100
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Profile */}
        {user && !isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Level {user.level}</span>
                <span className="text-xs text-gray-600">
                  {user.xp}/{user.nextLevelXp} XP
                </span>
              </div>
              <Progress 
                value={(user.xp! / user.nextLevelXp!) * 100} 
                className="h-2"
              />
            </div>

            {/* Wallet Balance */}
            <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Wallet Balance</span>
                <Badge variant="secondary" className="text-xs">
                  INR
                </Badge>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                ₹{user.walletBalance?.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                "text-gray-600 hover:text-green-600 hover:bg-green-50",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className={cn(
                "flex-shrink-0",
                isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
              )} />
              {!isCollapsed && item.name}
            </a>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && user && (
          <div className="px-4 py-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <Target className="h-3 w-3 mr-1" />
                Missions
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Trophy className="h-3 w-3 mr-1" />
                Leaderboard
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="px-2 py-4 border-t border-gray-200">
          {bottomNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                "text-gray-600 hover:text-green-600 hover:bg-green-50",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className={cn(
                "flex-shrink-0",
                isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
              )} />
              {!isCollapsed && item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}