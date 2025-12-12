"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  Lock, 
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Users,
  TrendingUp,
  Award
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginMethod === "email" ? email : undefined,
          phone: loginMethod === "phone" ? phone : undefined,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresOTP) {
          setShowOtpInput(true);
        } else {
          // Login successful, redirect to dashboard
          window.location.href = "/dashboard";
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginMethod === "email" ? email : undefined,
          phone: loginMethod === "phone" ? phone : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP sent:", data.demoOtp);
        alert(`OTP sent! Demo OTP: ${data.demoOtp}`);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("An error occurred while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginMethod === "email" ? email : undefined,
          phone: loginMethod === "phone" ? phone : undefined,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verified, logging in...");
        // In real app, this would authenticate the user
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("An error occurred during OTP verification");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₹100</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              INR100.com
            </span>
          </div>
          <p className="text-gray-600">Welcome back! Login to your account</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Phone</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={setRememberMe}
                      />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Login with Email
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Send OTP
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* OTP Input */}
            {showOtpInput && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Enter OTP</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    We've sent a 6-digit code to {loginMethod === "email" ? email : phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-blue-600">
                    <Clock className="h-3 w-3 inline mr-1" />
                    OTP expires in 5 minutes
                  </p>
                </div>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-orange-100 text-orange-800">
                  <Users className="h-3 w-3 mr-1" />
                  Demo Credentials
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-mono">demo@inr100.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Password:</span>
                  <span className="font-mono">demo123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-mono">+91 98765 43210</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">OTP:</span>
                  <span className="font-mono">123456</span>
                </div>
              </div>
            </div>

            {/* Demo Login Button */}
            <div className="text-center">
              <Button
                variant="outline"
                className="w-full mb-3 border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => {
                  // Auto-fill demo credentials and simulate login
                  setEmail('demo@inr100.com');
                  setPassword('demo123');
                  setLoginMethod('email');
                  // Simulate successful login
                  alert('Demo login successful! Redirecting to dashboard...');
                  // In a real app, this would navigate to dashboard
                  window.location.href = '/dashboard';
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                Try Demo Account
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Bank-Level Security</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Instant Access</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Verified Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}