"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Camera,
  Save,
  Award,
  TrendingUp,
  Wallet,
  Shield,
  Bell,
  Globe,
  CreditCard
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    address: "123, MG Road, Mumbai, Maharashtra 400001",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    occupation: "Software Engineer",
    annualIncome: "8-12 Lakhs",
    investmentExperience: "Intermediate",
    riskProfile: "Moderate"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  const userStats = {
    totalInvested: 25000,
    portfolioValue: 28000,
    totalReturns: 3000,
    returnsPercentage: 12,
    level: 5,
    xpPoints: 2500,
    badges: 8,
    streak: 7
  };

  const kycStatus = {
    status: "Verified",
    completedSteps: 4,
    totalSteps: 4,
    lastUpdated: "2024-11-15"
  };

  const recentActivity = [
    { id: 1, action: "Invested ₹500 in RELIANCE", time: "2 hours ago", type: "investment" },
    { id: 2, action: "Completed KYC verification", time: "1 day ago", type: "kyc" },
    { id: 3, action: "Earned 'First Investment' badge", time: "3 days ago", type: "achievement" },
    { id: 4, action: "Updated profile information", time: "1 week ago", type: "profile" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/96/96" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      RK
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600">{profileData.email}</p>
                <Badge variant="secondary" className="mt-2">
                  Level {userStats.level} Investor
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Portfolio Value</span>
                  <span className="font-semibold">₹{userStats.portfolioValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Returns</span>
                  <span className="font-semibold text-green-600">+₹{userStats.totalReturns.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Learning Streak</span>
                  <span className="font-semibold">{userStats.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">XP Points</span>
                  <span className="font-semibold">{userStats.xpPoints.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KYC Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Badge variant={kycStatus.status === "Verified" ? "default" : "secondary"}>
                  {kycStatus.status}
                </Badge>
                <span className="text-sm text-gray-600">
                  {kycStatus.completedSteps}/{kycStatus.totalSteps}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(kycStatus.completedSteps / kycStatus.totalSteps) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Last updated: {kycStatus.lastUpdated}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="financial">Financial Profile</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Your basic information and contact details
                      </CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={profileData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Profile */}
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Profile</CardTitle>
                  <CardDescription>
                    Your investment preferences and financial background
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={profileData.occupation}
                        onChange={(e) => handleInputChange("occupation", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="annualIncome">Annual Income</Label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={profileData.annualIncome}
                        onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                      >
                        <option value="Below 3 Lakhs">Below 3 Lakhs</option>
                        <option value="3-5 Lakhs">3-5 Lakhs</option>
                        <option value="5-8 Lakhs">5-8 Lakhs</option>
                        <option value="8-12 Lakhs">8-12 Lakhs</option>
                        <option value="12-20 Lakhs">12-20 Lakhs</option>
                        <option value="Above 20 Lakhs">Above 20 Lakhs</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="investmentExperience">Investment Experience</Label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={profileData.investmentExperience}
                        onChange={(e) => handleInputChange("investmentExperience", e.target.value)}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="riskProfile">Risk Profile</Label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={profileData.riskProfile}
                        onChange={(e) => handleInputChange("riskProfile", e.target.value)}
                      >
                        <option value="Conservative">Conservative</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Aggressive">Aggressive</option>
                        <option value="Very Aggressive">Very Aggressive</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Activity */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest account activities and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'investment' ? 'bg-green-500' :
                          activity.type === 'kyc' ? 'bg-blue-500' :
                          activity.type === 'achievement' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>
                    Customize your account settings and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">
                        Receive updates about your investments and account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-gray-600">
                        Get important notifications via SMS
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-gray-600">
                        Receive promotional offers and educational content
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-gray-600">
                        Make your profile visible to other investors
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}