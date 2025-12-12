"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Mail, 
  Eye, 
  EyeOff, 
  Key, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  UserX
} from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const loginHistory = [
    { id: 1, device: "Chrome on Windows", location: "Mumbai, India", time: "2024-12-12 14:30", status: "Current" },
    { id: 2, device: "Safari on iPhone", location: "Mumbai, India", time: "2024-12-12 10:15", status: "Active" },
    { id: 3, device: "Chrome on Android", location: "Pune, India", time: "2024-12-11 16:45", status: "Logged out" },
    { id: 4, device: "Firefox on MacOS", location: "Delhi, India", time: "2024-12-10 09:20", status: "Logged out" }
  ];

  const activeSessions = [
    { id: 1, device: "Chrome on Windows", location: "Mumbai, India", lastActive: "Now", status: "Current Session" },
    { id: 2, device: "Safari on iPhone", location: "Mumbai, India", lastActive: "2 hours ago", status: "Active" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Security Settings</h1>
        <p className="text-gray-600">
          Manage your account security, passwords, and login preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Security Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Security Overview
            </CardTitle>
            <CardDescription>
              Your account security status and recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Account Secured</p>
                  <p className="text-sm text-green-600">2FA Enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Last Login</p>
                  <p className="text-sm text-blue-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <Globe className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">Active Sessions</p>
                  <p className="text-sm text-purple-600">2 devices</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Two-Factor Authentication (2FA)
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Authentication</p>
                <p className="text-sm text-gray-600">
                  Receive codes via SMS to your registered phone number
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
                <Switch 
                  checked={twoFactorEnabled} 
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </div>
            
            {twoFactorEnabled && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800 font-medium">2FA is active</p>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your phone number +91 98765 43210 is verified
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Login Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Login Notifications</CardTitle>
            <CardDescription>
              Manage how you receive security alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Get notified when someone logs into your account
                </p>
              </div>
              <Switch 
                checked={loginNotifications} 
                onCheckedChange={setLoginNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-gray-600">
                  Receive SMS alerts for suspicious login attempts
                </p>
              </div>
              <Switch 
                checked={smsAlerts} 
                onCheckedChange={setSmsAlerts}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Active Sessions
            </CardTitle>
            <CardDescription>
              Manage devices that are currently logged into your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-600">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={session.status === "Current Session" ? "default" : "secondary"}>
                      {session.status}
                    </Badge>
                    {session.status !== "Current Session" && (
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Login History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Login History
            </CardTitle>
            <CardDescription>
              Review your account access history for security monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loginHistory.map((login) => (
                <div key={login.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{login.device}</p>
                    <p className="text-sm text-gray-600">
                      {login.location} • {login.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      login.status === "Current" ? "default" : 
                      login.status === "Active" ? "secondary" : "outline"
                    }>
                      {login.status}
                    </Badge>
                    {login.status === "Logged out" && (
                      <Button variant="ghost" size="sm">
                        <UserX className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Security Actions
            </CardTitle>
            <CardDescription>
              Important security actions for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Deactivate Account</p>
                <p className="text-sm text-red-600">
                  Temporarily disable your account access
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Deactivate
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Delete Account</p>
                <p className="text-sm text-red-600">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}