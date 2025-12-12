"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Briefcase,
  TrendingUp,
  Award,
  Users,
  Zap
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    panNumber: "",
    aadhaarNumber: "",
    occupation: "",
    annualIncome: "",
    riskProfile: "",
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    }
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    // Show OTP for verification
    setShowOtpInput(true);
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
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
          email: formData.email,
          phone: formData.phone,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verified, proceeding to KYC...");
        // In real app, this would verify OTP and proceed
        window.location.href = "/kyc";
      } else {
        alert(data.error || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("An error occurred during OTP verification");
    }
  };

  const handleCompleteRegistration = async () => {
    try {
      // Submit KYC information
      const response = await fetch('/api/auth/kyc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "temp-user-id", // In real app, get this from authentication
          panNumber: formData.panNumber,
          aadhaarNumber: formData.aadhaarNumber,
          dateOfBirth: formData.dateOfBirth,
          occupation: formData.occupation,
          annualIncome: formData.annualIncome,
          riskProfile: formData.riskProfile?.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration completed:", formData);
        // In real app, this would create the user account
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "KYC submission failed");
      }
    } catch (error) {
      console.error("Registration completion error:", error);
      alert("An error occurred during registration completion");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
          <p className="text-gray-600">Create your account and start your investment journey</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
              ))}
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div
                  className={`h-full transition-all duration-300 ${
                    step >= 2 ? "bg-gradient-to-r from-green-600 to-blue-600 w-full" : "w-0"
                  }`}
                ></div>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div
                  className={`h-full transition-all duration-300 ${
                    step >= 3 ? "bg-gradient-to-r from-green-600 to-blue-600 w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {step === 1 && "Create Account"}
              {step === 2 && "Complete Your Profile"}
              {step === 3 && "Verify Your Details"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Join millions of Indians investing with just ₹100"}
              {step === 2 && "Help us personalize your investment experience"}
              {step === 3 && "Verify your identity to secure your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <form onSubmit={handleSubmitStep1} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked as boolean)}
                    />
                    <Label htmlFor="agreeToPrivacy" className="text-sm">
                      I agree to the{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Continue to Profile
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitStep2} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange("occupation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self Employed</SelectItem>
                        <SelectItem value="business">Business Owner</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      type="text"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                    <Input
                      id="aadhaarNumber"
                      type="text"
                      placeholder="1234 5678 9012"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleInputChange("aadhaarNumber", e.target.value.replace(/\D/g, ""))}
                      maxLength={12}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange("annualIncome", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select annual income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-5l">Below ₹5 Lakhs</SelectItem>
                      <SelectItem value="5l-10l">₹5 - ₹10 Lakhs</SelectItem>
                      <SelectItem value="10l-25l">₹10 - ₹25 Lakhs</SelectItem>
                      <SelectItem value="25l-50l">₹25 - ₹50 Lakhs</SelectItem>
                      <SelectItem value="above-50l">Above ₹50 Lakhs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskProfile">Risk Profile</Label>
                  <Select value={formData.riskProfile} onValueChange={(value) => handleInputChange("riskProfile", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your risk appetite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative - Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate - Medium Risk</SelectItem>
                      <SelectItem value="aggressive">Aggressive - High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Continue to Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Verify Your Identity</h3>
                  <p className="text-sm text-gray-600">
                    We've sent a verification code to your phone number
                  </p>
                </div>

                {!showOtpInput ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Phone Number</span>
                        <span className="text-blue-600">{formData.phone}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Email</span>
                        <span className="text-blue-600">{formData.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">PAN Number</span>
                        <span className="text-blue-600">{formData.panNumber}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      onClick={() => {
                        setShowOtpInput(true);
                        handleSendOtp();
                      }}
                    >
                      Send Verification Code
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
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
                        Resend Code
                      </Button>
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={handleVerifyOtp}
                        disabled={otp.length !== 6}
                      >
                        Verify Code
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-600">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Code expires in 10 minutes
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={handleCompleteRegistration}
                    disabled={otp.length !== 6}
                  >
                    Complete Registration
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-orange-100 text-orange-800">
                  <Users className="h-3 w-3 mr-1" />
                  Demo Information
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">OTP:</span>
                  <span className="font-mono">123456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sample PAN:</span>
                  <span className="font-mono">ABCDE1234F</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Start from ₹100</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Earn Rewards</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">AI Powered</p>
          </div>
        </div>
      </div>
    </div>
  );
}