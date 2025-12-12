"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cookie, 
  Settings, 
  Shield,
  CheckCircle,
  X,
  Info,
  BarChart3,
  Target,
  Zap
} from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Privacy & Cookies
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Learn how INR100 uses cookies and similar technologies to enhance your experience
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Quick Overview */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <Info className="h-5 w-5 mr-2" />
                    Quick Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-800">
                  <p>
                    INR100 uses cookies to improve your browsing experience, provide personalized content, 
                    analyze site traffic, and deliver relevant advertisements. You can manage your cookie 
                    preferences through your browser settings or our cookie consent manager.
                  </p>
                </CardContent>
              </Card>

              {/* What are Cookies */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cookie className="h-5 w-5 mr-2 text-green-600" />
                    What are Cookies?
                  </CardTitle>
                  <CardDescription>Understanding cookies and how they work</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Cookies are small text files that are stored on your device (computer, smartphone, or tablet) 
                    when you visit a website. They are widely used to make websites work more efficiently and 
                    provide information to the website owners.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Why We Use Cookies</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Remember your preferences</li>
                        <li>• Keep you logged in</li>
                        <li>• Analyze site performance</li>
                        <li>• Provide personalized content</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Types of Data Collected</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Usage patterns</li>
                        <li>• Device information</li>
                        <li>• Browser preferences</li>
                        <li>• Performance metrics</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Types of Cookies */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                  <CardDescription>Different categories of cookies and their purposes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Essential Cookies */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold">Essential Cookies</h3>
                      <Badge className="ml-2 bg-green-100 text-green-800">Always Active</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">
                      These cookies are necessary for the website to function properly. They enable basic 
                      features like page navigation, access to secure areas, and form submissions.
                    </p>
                    <div className="bg-green-50 p-3 rounded">
                      <h4 className="font-medium text-green-800 mb-2">Examples:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Session management and authentication</li>
                        <li>• Security and fraud prevention</li>
                        <li>• Load balancing and performance</li>
                        <li>• Remembering your cookie preferences</li>
                      </ul>
                    </div>
                  </div>

                  {/* Performance Cookies */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center mb-3">
                      <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold">Performance Cookies</h3>
                      <Badge className="ml-2 bg-blue-100 text-blue-800">Optional</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">
                      These cookies collect information about how visitors use our website, such as which 
                      pages are visited most often. This data helps us improve our website's performance.
                    </p>
                    <div className="bg-blue-50 p-3 rounded">
                      <h4 className="font-medium text-blue-800 mb-2">Examples:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Google Analytics tracking</li>
                        <li>• Page load times</li>
                        <li>• Error tracking</li>
                        <li>• User journey analysis</li>
                      </ul>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <div className="flex items-center mb-3">
                      <Settings className="h-5 w-5 text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold">Functional Cookies</h3>
                      <Badge className="ml-2 bg-purple-100 text-purple-800">Optional</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">
                      These cookies enable enhanced functionality and personalization. They may be set by 
                      us or by third-party providers whose services we have added to our pages.
                    </p>
                    <div className="bg-purple-50 p-3 rounded">
                      <h4 className="font-medium text-purple-800 mb-2">Examples:</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Remembering your language preference</li>
                        <li>• Personalizing dashboard layout</li>
                        <li>• Chat support functionality</li>
                        <li>• Video player preferences</li>
                      </ul>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="border-l-4 border-orange-500 pl-6">
                    <div className="flex items-center mb-3">
                      <Target className="h-5 w-5 text-orange-600 mr-2" />
                      <h3 className="text-lg font-semibold">Marketing Cookies</h3>
                      <Badge className="ml-2 bg-orange-100 text-orange-800">Optional</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">
                      These cookies are used to track visitors across websites to display relevant advertisements 
                      and measure the effectiveness of our marketing campaigns.
                    </p>
                    <div className="bg-orange-50 p-3 rounded">
                      <h4 className="font-medium text-orange-800 mb-2">Examples:</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Facebook Pixel tracking</li>
                        <li>• Google Ads conversion tracking</li>
                        <li>• Social media integration</li>
                        <li>• Remarketing campaigns</li>
                      </ul>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Third-Party Services */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Third-Party Services</CardTitle>
                  <CardDescription>External services that may set cookies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We use various third-party services that may set their own cookies. These services help 
                    us analyze usage, provide social media features, and deliver advertisements.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Analytics & Performance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Google Analytics</span>
                          <Badge variant="outline">Performance</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Hotjar</span>
                          <Badge variant="outline">Performance</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>New Relic</span>
                          <Badge variant="outline">Essential</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Marketing & Social</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Google Ads</span>
                          <Badge variant="outline">Marketing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Facebook Pixel</span>
                          <Badge variant="outline">Marketing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>LinkedIn Insight</span>
                          <Badge variant="outline">Marketing</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cookie Duration */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Cookie Duration</CardTitle>
                  <CardDescription>How long cookies remain on your device</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Session Cookies</h4>
                      <p className="text-sm text-green-700">
                        Deleted automatically when you close your browser. Essential for website functionality.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Persistent Cookies</h4>
                      <p className="text-sm text-blue-700">
                        Remain on your device for a specified period (usually 1-24 months) to remember preferences.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Permanent Cookies</h4>
                      <p className="text-sm text-purple-700">
                        Remain indefinitely unless manually deleted. Used for long-term preferences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Managing Cookies */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Managing Your Cookie Preferences</CardTitle>
                  <CardDescription>How to control cookies in your browser</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    You have several options for managing cookies. You can control cookies through your 
                    browser settings or use our cookie consent manager.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Browser Settings</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Accept all cookies</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Block all cookies</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Block third-party cookies</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Delete existing cookies</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Popular Browsers</h4>
                      <div className="space-y-2 text-sm">
                        <div>• <strong>Chrome:</strong> Settings → Privacy and Security → Cookies</div>
                        <div>• <strong>Firefox:</strong> Options → Privacy & Security → Cookies</div>
                        <div>• <strong>Safari:</strong> Preferences → Privacy → Cookies</div>
                        <div>• <strong>Edge:</strong> Settings → Cookies and site permissions</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="font-semibold text-yellow-800">Important Note</span>
                    </div>
                    <p className="text-yellow-800 text-sm">
                      Disabling certain cookies may affect the functionality of our website. Essential cookies 
                      cannot be disabled as they are required for the website to function properly.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Your Rights Regarding Cookies</CardTitle>
                  <CardDescription>Understanding your privacy rights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Under applicable privacy laws, you have the following rights regarding cookies and personal data:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Right to Information</h4>
                          <p className="text-sm text-gray-600">Know what cookies are used and why</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Right to Control</h4>
                          <p className="text-sm text-gray-600">Manage your cookie preferences</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Right to Delete</h4>
                          <p className="text-sm text-gray-600">Request deletion of cookies</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Right to Object</h4>
                          <p className="text-sm text-gray-600">Object to certain cookie usage</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Updates */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Policy Updates</CardTitle>
                  <CardDescription>How we notify you about changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices 
                    or for other operational, legal, or regulatory reasons.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">How We'll Notify You:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Email notification to registered users</li>
                      <li>• Prominent notice on our website</li>
                      <li>• Updated "Last Modified" date</li>
                      <li>• Cookie consent banner for significant changes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Questions About Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="text-green-800">
                  <p className="mb-4">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> privacy@inr100.com</p>
                    <p><strong>Phone:</strong> +91 80 4567 8900</p>
                    <p><strong>Address:</strong> INR100 Technologies Pvt. Ltd., Bangalore, India</p>
                  </div>
                </CardContent>
              </Card>

              {/* Last Updated */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-center text-blue-800">
                    <strong>Last Updated:</strong> December 12, 2025<br />
                    <span className="text-sm">This policy explains our current cookie practices. Please check back regularly for updates.</span>
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}