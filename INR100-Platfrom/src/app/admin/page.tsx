"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Search,
  Filter,
  Eye,
  Ban,
  MoreHorizontal,
  BarChart3,
  Activity,
  Settings,
  FileText,
  Database,
  UserCheck,
  UserX,
  Clock,
  Zap,
  Globe,
  CreditCard,
  FileCheck,
  AlertCircle
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock admin dashboard data
  const adminStats = {
    totalUsers: 125000,
    activeUsers: 85000,
    newUsersToday: 1250,
    totalInvestments: 2500000000, // 2.5B INR
    dailyVolume: 125000000, // 125M INR
    pendingKYC: 450,
    flaggedTransactions: 23,
    systemHealth: 98.5,
    uptime: "99.9%"
  };

  // Mock users data
  const users = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
      kycStatus: "verified",
      riskProfile: "moderate",
      level: 5,
      totalInvested: 125000,
      joinDate: "2024-01-01",
      lastLogin: "2024-01-15",
      status: "active",
      flagged: false
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya.singh@email.com",
      phone: "+91 98765 43211",
      kycStatus: "pending",
      riskProfile: "conservative",
      level: 3,
      totalInvested: 25000,
      joinDate: "2024-01-10",
      lastLogin: "2024-01-14",
      status: "active",
      flagged: false
    },
    {
      id: "3",
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 98765 43212",
      kycStatus: "rejected",
      riskProfile: "aggressive",
      level: 7,
      totalInvested: 500000,
      joinDate: "2023-12-01",
      lastLogin: "2024-01-13",
      status: "suspended",
      flagged: true
    }
  ];

  // Mock transactions
  const transactions = [
    {
      id: "1",
      userId: "1",
      userName: "Rahul Sharma",
      type: "deposit",
      amount: 5000,
      status: "completed",
      method: "UPI",
      timestamp: "2024-01-15 10:30",
      flagged: false
    },
    {
      id: "2",
      userId: "2",
      userName: "Priya Singh",
      type: "withdrawal",
      amount: 2000,
      status: "pending",
      method: "Bank Transfer",
      timestamp: "2024-01-15 09:15",
      flagged: false
    },
    {
      id: "3",
      userId: "3",
      userName: "Amit Kumar",
      type: "investment",
      amount: 50000,
      status: "completed",
      method: "Wallet",
      timestamp: "2024-01-14 16:45",
      flagged: true
    }
  ];

  // Mock system alerts
  const systemAlerts = [
    {
      id: "1",
      type: "security",
      severity: "high",
      title: "Unusual Login Activity",
      description: "Multiple failed login attempts detected from IP 192.168.1.100",
      timestamp: "2024-01-15 11:30",
      isRead: false
    },
    {
      id: "2",
      type: "compliance",
      severity: "medium",
      title: "KYC Documents Pending",
      description: "450 users have pending KYC verification",
      timestamp: "2024-01-15 10:00",
      isRead: false
    },
    {
      id: "3",
      type: "system",
      severity: "low",
      title: "Scheduled Maintenance",
      description: "System maintenance scheduled for 2024-01-20 02:00 AM",
      timestamp: "2024-01-15 09:00",
      isRead: true
    }
  ];

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold">Admin Panel</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                Administrator Access
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-medium">Admin User</div>
                <div className="text-sm text-gray-600">admin@inr100.com</div>
              </div>
              <Avatar>
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adminStats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{adminStats.newUsersToday} today
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Volume</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{(adminStats.dailyVolume / 10000000).toFixed(1)}Cr
                  </p>
                  <p className="text-xs text-gray-600">Investments today</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending KYC</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adminStats.pendingKYC}
                  </p>
                  <p className="text-xs text-yellow-600">Requires attention</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <FileCheck className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Health</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adminStats.systemHealth}%
                  </p>
                  <p className="text-xs text-green-600">All systems operational</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent System Alerts */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Recent Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                        <div className={`p-2 rounded-lg ${getAlertSeverityColor(alert.severity)}`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{alert.title}</h4>
                            {!alert.isRead && (
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                          <div className="text-xs text-gray-500">{alert.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Metrics */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>System Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Server Uptime</span>
                      <span className="font-medium">{adminStats.uptime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Connections</span>
                      <span className="font-medium">12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="font-medium text-green-600">45ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Database Size</span>
                      <span className="font-medium">2.4 GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>User Management</span>
                    </CardTitle>
                    <CardDescription>Manage and monitor all platform users</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/avatars/${user.id}.jpg`} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.name}</span>
                            {user.flagged && (
                              <Badge className="bg-red-100 text-red-800">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Flagged
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          <div className="text-xs text-gray-500">
                            Joined: {user.joinDate} • Last login: {user.lastLogin}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">₹{user.totalInvested.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">Level {user.level}</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Badge className={getKYCStatusColor(user.kycStatus)}>
                            {user.kycStatus}
                          </Badge>
                          <Badge className={getUserStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {user.status === "active" ? (
                            <Button variant="outline" size="sm">
                              <Ban className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Transaction Monitoring */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Transaction Monitoring</span>
                </CardTitle>
                <CardDescription>Monitor all financial transactions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === "deposit" ? "bg-green-100 text-green-600" :
                          transaction.type === "withdrawal" ? "bg-red-100 text-red-600" :
                          "bg-blue-100 text-blue-600"
                        }`}>
                          {transaction.type === "deposit" && <TrendingUp className="h-4 w-4" />}
                          {transaction.type === "withdrawal" && <AlertTriangle className="h-4 w-4" />}
                          {transaction.type === "investment" && <BarChart3 className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{transaction.type}</div>
                          <div className="text-sm text-gray-600">{transaction.userName}</div>
                          <div className="text-xs text-gray-500">{transaction.timestamp}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`font-medium ${
                            transaction.type === "deposit" ? "text-green-600" :
                            transaction.type === "withdrawal" ? "text-red-600" :
                            "text-blue-600"
                          }`}>
                            {transaction.type === "deposit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">{transaction.method}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {transaction.flagged && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                          <Badge className={
                            transaction.status === "completed" ? "bg-green-100 text-green-800" :
                            transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {transaction.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* KYC Verification Queue */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileCheck className="h-5 w-5" />
                    <span>KYC Verification Queue</span>
                  </CardTitle>
                  <CardDescription>
                    {adminStats.pendingKYC} users awaiting verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.filter(u => u.kycStatus === "pending").map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/avatars/${user.id}.jpg`} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                            <Ban className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Reports */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Compliance Reports</span>
                  </CardTitle>
                  <CardDescription>Generate and view compliance reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      User Activity Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Transaction Summary Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck className="h-4 w-4 mr-2" />
                      KYC Verification Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Risk Assessment Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            {/* System Alerts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>System Alerts & Notifications</span>
                </CardTitle>
                <CardDescription>Monitor and manage system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`p-3 rounded-lg ${getAlertSeverityColor(alert.severity)}`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{alert.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getAlertSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            {!alert.isRead && (
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="text-xs text-gray-500">{alert.timestamp}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">Resolve</Button>
                        <Button variant="outline" size="sm">Dismiss</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}