"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  CreditCard,
  FileText,
  Camera,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function KYCVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      occupation: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    },
    financialInfo: {
      annualIncome: "",
      investmentExperience: "",
      riskProfile: "MODERATE"
    },
    documents: {
      panCard: null,
      aadhaarFront: null,
      aadhaarBack: null,
      selfie: null
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (section: string, field: string, value: string) => {
    setKycData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setKycData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return kycData.personalInfo.firstName && 
               kycData.personalInfo.lastName && 
               kycData.personalInfo.dateOfBirth;
      case 2:
        return kycData.financialInfo.annualIncome && 
               kycData.financialInfo.investmentExperience;
      case 3:
        return kycData.documents.panCard;
      case 4:
        return kycData.documents.aadhaarFront && 
               kycData.documents.aadhaarBack;
      case 5:
        return kycData.documents.selfie;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setUploadProgress(0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={kycData.personalInfo.firstName}
                  onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={kycData.personalInfo.lastName}
                  onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={kycData.personalInfo.dateOfBirth}
                onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <select 
                id="occupation"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={kycData.personalInfo.occupation}
                onChange={(e) => handleInputChange("personalInfo", "occupation", e.target.value)}
              >
                <option value="">Select occupation</option>
                <option value="salaried">Salaried</option>
                <option value="business">Business</option>
                <option value="professional">Professional</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={kycData.personalInfo.address}
                onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                placeholder="Enter your complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={kycData.personalInfo.city}
                  onChange={(e) => handleInputChange("personalInfo", "city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={kycData.personalInfo.state}
                  onChange={(e) => handleInputChange("personalInfo", "state", e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={kycData.personalInfo.pincode}
                  onChange={(e) => handleInputChange("personalInfo", "pincode", e.target.value)}
                  placeholder="Pincode"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CreditCard className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financial Information</h3>
              <p className="text-gray-600">Help us understand your investment profile</p>
            </div>

            <div>
              <Label htmlFor="annualIncome">Annual Income</Label>
              <select 
                id="annualIncome"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={kycData.financialInfo.annualIncome}
                onChange={(e) => handleInputChange("financialInfo", "annualIncome", e.target.value)}
              >
                <option value="">Select income range</option>
                <option value="below_3">Below ₹3 Lakhs</option>
                <option value="3_to_5">₹3 - ₹5 Lakhs</option>
                <option value="5_to_8">₹5 - ₹8 Lakhs</option>
                <option value="8_to_12">₹8 - ₹12 Lakhs</option>
                <option value="12_to_20">₹12 - ₹20 Lakhs</option>
                <option value="above_20">Above ₹20 Lakhs</option>
              </select>
            </div>

            <div>
              <Label htmlFor="investmentExperience">Investment Experience</Label>
              <select 
                id="investmentExperience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={kycData.financialInfo.investmentExperience}
                onChange={(e) => handleInputChange("financialInfo", "investmentExperience", e.target.value)}
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
                <option value="expert">Expert (Professional)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="riskProfile">Risk Profile</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                {[
                  { value: "CONSERVATIVE", label: "Conservative", desc: "Low risk, steady returns" },
                  { value: "MODERATE", label: "Moderate", desc: "Balanced risk and returns" },
                  { value: "AGGRESSIVE", label: "Aggressive", desc: "High risk, high returns" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="riskProfile"
                      value={option.value}
                      checked={kycData.financialInfo.riskProfile === option.value}
                      onChange={(e) => handleInputChange("financialInfo", "riskProfile", e.target.value)}
                      className="text-blue-600"
                    />
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">PAN Card Verification</h3>
              <p className="text-gray-600">Upload your PAN card for identity verification</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Upload PAN Card</p>
              <p className="text-gray-600 mb-4">
                Upload a clear, high-resolution image of your PAN card
              </p>
              
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files && handleFileUpload("panCard", e.target.files[0])}
                className="hidden"
                id="pan-upload"
              />
              <label htmlFor="pan-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              
              {kycData.documents.panCard && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                  <span className="text-green-800">{kycData.documents.panCard.name}</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">PAN Card Requirements</p>
                  <ul className="space-y-1">
                    <li>• Clear, unblurred image of the entire PAN card</li>
                    <li>• All text should be clearly readable</li>
                    <li>• Good lighting with no shadows</li>
                    <li>• Supported formats: JPG, PNG, PDF (max 5MB)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CreditCard className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aadhaar Card Verification</h3>
              <p className="text-gray-600">Upload both sides of your Aadhaar card</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front Side */}
              <div>
                <Label className="text-base font-medium">Front Side</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-2">Aadhaar Front Side</p>
                  
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files && handleFileUpload("aadhaarFront", e.target.files[0])}
                    className="hidden"
                    id="aadhaar-front-upload"
                  />
                  <label htmlFor="aadhaar-front-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>Upload</span>
                    </Button>
                  </label>
                  
                  {kycData.documents.aadhaarFront && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600 inline mr-1" />
                      <span className="text-green-800 text-sm">{kycData.documents.aadhaarFront.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Back Side */}
              <div>
                <Label className="text-base font-medium">Back Side</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-2">Aadhaar Back Side</p>
                  
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files && handleFileUpload("aadhaarBack", e.target.files[0])}
                    className="hidden"
                    id="aadhaar-back-upload"
                  />
                  <label htmlFor="aadhaar-back-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>Upload</span>
                    </Button>
                  </label>
                  
                  {kycData.documents.aadhaarBack && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600 inline mr-1" />
                      <span className="text-green-800 text-sm">{kycData.documents.aadhaarBack.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <p className="font-medium mb-1">Aadhaar Card Requirements</p>
                  <ul className="space-y-1">
                    <li>• Upload clear images of both front and back sides</li>
                    <li>• Ensure QR code on back side is visible</li>
                    <li>• All text should be clearly readable</li>
                    <li>• Hide/Blur the first 8 digits of Aadhaar number for privacy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Camera className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Selfie Verification</h3>
              <p className="text-gray-600">Take a selfie holding your ID for verification</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Take Selfie</p>
              <p className="text-gray-600 mb-4">
                Take a clear selfie holding your PAN card or Aadhaar card
              </p>
              
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => e.target.files && handleFileUpload("selfie", e.target.files[0])}
                className="hidden"
                id="selfie-upload"
              />
              <label htmlFor="selfie-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Take Photo</span>
                </Button>
              </label>
              
              {kycData.documents.selfie && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                  <span className="text-green-800">{kycData.documents.selfie.name}</span>
                </div>
              )}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">Selfie Requirements</p>
                  <ul className="space-y-1">
                    <li>• Hold your PAN card or Aadhaar card in your hand</li>
                    <li>• Ensure your face and ID are clearly visible</li>
                    <li>• Good lighting with no glare</li>
                    <li>• Face the camera directly</li>
                  </ul>
                </div>
              </div>
            </div>

            {isSubmitting && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Submitting Your KYC...</p>
                  <p className="text-gray-600 mb-4">Please wait while we process your documents</p>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-gray-500 mt-2">{uploadProgress}% complete</p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">KYC Verification</h1>
          </div>
          <p className="text-gray-600">
            Complete your verification to start investing with INR100
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Main Card */}
        <Card>
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!validateStep(currentStep) || isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit KYC
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need help with KYC?</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </Button>
            <Button variant="ghost" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}