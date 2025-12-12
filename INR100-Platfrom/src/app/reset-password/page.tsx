"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Mail
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: OTP, 2: New Password

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setStep(2);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    
    // Redirect to login with success message
    router.push("/login?reset=success");
  };

  const isPasswordValid = password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[!@#$%^&*]/.test(password);

  const passwordsMatch = password === confirmPassword && password.length > 0;

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Set New Password</CardTitle>
            <CardDescription>
              Create a strong password to secure your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* New Password */}
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center gap-2 text-sm ${
                    password.length >= 8 ? "text-green-600" : "text-gray-500"
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    /[A-Z]/.test(password) ? "text-green-600" : "text-gray-500"
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    One uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    /[0-9]/.test(password) ? "text-green-600" : "text-gray-500"
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    One number
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    /[!@#$%^&*]/.test(password) ? "text-green-600" : "text-gray-500"
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    One special character
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pr-10"
                    required
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
                
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    Passwords don't match
                  </div>
                )}
              </div>

              {/* Security Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Security Reminder</p>
                    <p>
                      Your new password will be used to access your INR100 account. Make sure it's unique and secure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !isPasswordValid || !passwordsMatch}
              >
                {loading ? (
                  <>
                    <Lock className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </>
                )}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>
            Enter the 6-digit code we sent to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* OTP Input */}
            <div>
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-sm text-gray-600 mt-1 text-center">
                Code sent to +91 98765 43210
              </p>
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <Button variant="link" className="text-sm" disabled>
                Resend code in 30 seconds
              </Button>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify Code
                </>
              )}
            </Button>

            {/* Back to Login */}
            <div className="text-center">
              <Link href="/login">
                <Button variant="ghost" className="text-sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}