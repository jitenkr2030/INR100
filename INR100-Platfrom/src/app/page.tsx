"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/main-layout";
import { ArrowRight, TrendingUp, Shield, Users, Award, Smartphone, BarChart3, Target, Gift, Star } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              🚀 India's Micro-Investing Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Invest Smart. Start at ₹100.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Your wealth journey begins with just ₹100. Invest in stocks, mutual funds, gold, and global assets with AI-powered insights and social investing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4"
                onClick={() => router.push('/register')}
              >
                Start Investing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
                onClick={() => router.push('/invest')}
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10L+</div>
                <div className="text-gray-600">Happy Investors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">₹100</div>
                <div className="text-gray-600">Minimum Investment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-gray-600">Investment Options</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose INR100.com?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of micro-investing with our comprehensive platform designed for every Indian.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/invest')}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Micro-Fractional Investing</CardTitle>
                  <CardDescription>
                    Invest in fractions of stocks, mutual funds, and ETFs starting from just ₹100. No minimum barriers.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/ai')}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Get personalized recommendations, portfolio health scores, and predictive insights from our AI engine.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/community')}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Social Investing</CardTitle>
                  <CardDescription>
                    Follow expert investors, copy portfolios, and share insights with our vibrant community.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/rewards')}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Gamified Experience</CardTitle>
                  <CardDescription>
                    Earn badges, complete missions, and climb leaderboards while building your investment portfolio.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/security')}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Bank-Level Security</CardTitle>
                  <CardDescription>
                    256-bit encryption, biometric login, and complete regulatory compliance for your peace of mind.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => {
                  alert('Mobile app coming soon!');
                }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Seamless Mobile Experience</CardTitle>
                  <CardDescription>
                    Invest anytime, anywhere with our intuitive mobile app designed for the modern investor.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start your investment journey in just 3 simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">Sign Up & KYC</h3>
                <p className="text-gray-600">
                  Complete your registration with mobile OTP and e-KYC using PAN & Aadhaar. Get verified in minutes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">Add Money</h3>
                <p className="text-gray-600">
                  Load your wallet using UPI, net banking, or cards. Start with as little as ₹100.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">Start Investing</h3>
                <p className="text-gray-600">
                  Choose from 500+ assets, get AI recommendations, and begin your wealth creation journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Assets Section */}
        <section id="assets" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Invest in What You Believe In</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Diversify your portfolio across multiple asset classes
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/invest?category=stocks')}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">📈</div>
                  <CardTitle>Stocks</CardTitle>
                  <CardDescription>
                    Invest in top Indian companies with fractional shares starting from ₹100
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/invest?category=mutual-funds')}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">🏦</div>
                  <CardTitle>Mutual Funds</CardTitle>
                  <CardDescription>
                    Access professionally managed funds with SIPs starting at ₹100
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/invest?category=gold')}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">🥇</div>
                  <CardTitle>Gold</CardTitle>
                  <CardDescription>
                    Invest in digital gold and gold ETFs for portfolio stability
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card 
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push('/invest?category=global')}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">🌍</div>
                  <CardTitle>Global Assets</CardTitle>
                  <CardDescription>
                    Invest in US stocks and international markets with fractional investing
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Security is Our Priority</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bank-grade security measures to protect your investments and data
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">256-bit Encryption</h3>
                  <p className="text-gray-600">Military-grade encryption for all your transactions and data</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Target className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Biometric Login</h3>
                  <p className="text-gray-600">Secure access with fingerprint and face recognition</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Star className="h-8 w-8 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">SEBI Registered</h3>
                  <p className="text-gray-600">Fully compliant with Indian financial regulations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of Indians who are building wealth with INR100.com. Start with just ₹100 today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-4"
                onClick={() => router.push('/register')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600"
                onClick={() => {
                  // For demo purposes, we can show an alert or redirect to a download page
                  alert('Mobile app download coming soon!');
                }}
              >
                Download App
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}