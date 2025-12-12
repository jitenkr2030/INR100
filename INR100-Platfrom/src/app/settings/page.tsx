"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  Smartphone,
  Globe,
  Moon,
  Sun,
  Eye,
  Lock,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [vibrationAlerts, setVibrationAlerts] = useState(true);

  // Investment Alerts
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [portfolioAlerts, setPortfolioAlerts] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(false);
  const [earningAlerts, setEarningAlerts] = useState(true);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState("private");
  const [analyticsSharing, setAnalyticsSharing] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  // App Preferences
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">
          Customize your INR100 experience and manage your preferences
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="app">App Settings</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">
                      Get critical alerts via SMS
                    </p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">
                      Real-time notifications on your device
                    </p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sound Alerts</p>
                    <p className="text-sm text-gray-600">
                      Play sounds for notifications
                    </p>
                  </div>
                  <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Vibration Alerts</p>
                    <p className="text-sm text-gray-600">
                      Vibrate for mobile notifications
                    </p>
                  </div>
                  <Switch checked={vibrationAlerts} onCheckedChange={setVibrationAlerts} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Alerts</CardTitle>
                <CardDescription>
                  Customize investment-related notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-gray-600">
                      Notify when stocks reach target prices
                    </p>
                  </div>
                  <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Portfolio Alerts</p>
                    <p className="text-sm text-gray-600">
                      Portfolio value changes and milestones
                    </p>
                  </div>
                  <Switch checked={portfolioAlerts} onCheckedChange={setPortfolioAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">News Alerts</p>
                    <p className="text-sm text-gray-600">
                      Important market news and updates
                    </p>
                  </div>
                  <Switch checked={newsAlerts} onCheckedChange={setNewsAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Earnings Alerts</p>
                    <p className="text-sm text-gray-600">
                      Quarterly earnings and dividend announcements
                    </p>
                  </div>
                  <Switch checked={earningAlerts} onCheckedChange={setEarningAlerts} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your data and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Profile Visibility</Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={profileVisibility === "public"}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                      />
                      <span>Public - Anyone can see my profile</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="friends"
                        checked={profileVisibility === "friends"}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                      />
                      <span>Friends Only - Only connections can see my profile</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={profileVisibility === "private"}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                      />
                      <span>Private - Only I can see my profile</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Sharing</p>
                    <p className="text-sm text-gray-600">
                      Help improve INR100 by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch checked={analyticsSharing} onCheckedChange={setAnalyticsSharing} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-gray-600">
                      Receive promotional offers and educational content
                    </p>
                  </div>
                  <Switch checked={marketingOptIn} onCheckedChange={setMarketingOptIn} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Download, export, or delete your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Portfolio History
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of the app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-600">
                      Use dark theme for better viewing in low light
                    </p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-sm text-gray-600">
                      Show more content with smaller spacing
                    </p>
                  </div>
                  <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Theme</CardTitle>
                <CardDescription>
                  Choose your preferred accent color
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3">
                  {["blue", "green", "purple", "orange", "red"].map((color) => (
                    <button
                      key={color}
                      className={`w-full h-12 rounded-lg border-2 ${
                        color === "blue" ? "bg-blue-500 border-blue-500" :
                        color === "green" ? "bg-green-500 border-green-500" :
                        color === "purple" ? "bg-purple-500 border-purple-500" :
                        color === "orange" ? "bg-orange-500 border-orange-500" :
                        "bg-red-500 border-red-500"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* App Settings */}
        <TabsContent value="app">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>
                  Configure region-specific preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select 
                    id="currency"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="Asia/Kolkata">India Standard Time</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="Europe/London">GMT</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>App Information</CardTitle>
                <CardDescription>
                  Version information and app details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>App Version</span>
                  <Badge variant="outline">1.0.0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated</span>
                  <span className="text-gray-600">December 12, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Build Number</span>
                  <span className="text-gray-600">2024.12.1</span>
                </div>
                <Button variant="outline" className="w-full">
                  Check for Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Management
                </CardTitle>
                <CardDescription>
                  Manage your account security and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Verification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Methods
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <p className="font-medium text-red-800 mb-2">Deactivate Account</p>
                  <p className="text-sm text-red-600 mb-3">
                    Temporarily disable your account. You can reactivate it later.
                  </p>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                    Deactivate Account
                  </Button>
                </div>

                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <p className="font-medium text-red-800 mb-2">Delete Account</p>
                  <p className="text-sm text-red-600 mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}