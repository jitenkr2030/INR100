"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  Scale,
  AlertTriangle,
  CheckCircle,
  X
} from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Legal Documents
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Last updated: December 12, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Important Notice */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Important Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-orange-800">
                  <p>
                    Please read these Terms of Service carefully before using INR100 platform. 
                    By accessing or using our service, you agree to be bound by these terms.
                  </p>
                </CardContent>
              </Card>

              {/* Table of Contents */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <a href="#acceptance" className="block text-blue-600 hover:underline">1. Acceptance of Terms</a>
                      <a href="#description" className="block text-blue-600 hover:underline">2. Description of Service</a>
                      <a href="#eligibility" className="block text-blue-600 hover:underline">3. Eligibility & Registration</a>
                      <a href="#account" className="block text-blue-600 hover:underline">4. Account Responsibilities</a>
                      <a href="#services" className="block text-blue-600 hover:underline">5. Investment Services</a>
                      <a href="#fees" className="block text-blue-600 hover:underline">6. Fees and Charges</a>
                    </div>
                    <div className="space-y-2">
                      <a href="#risks" className="block text-blue-600 hover:underline">7. Investment Risks</a>
                      <a href="#privacy" className="block text-blue-600 hover:underline">8. Privacy & Data</a>
                      <a href="#liability" className="block text-blue-600 hover:underline">9. Limitation of Liability</a>
                      <a href="#termination" className="block text-blue-600 hover:underline">10. Termination</a>
                      <a href="#governing" className="block text-blue-600 hover:underline">11. Governing Law</a>
                      <a href="#contact" className="block text-blue-600 hover:underline">12. Contact Information</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 1: Acceptance of Terms */}
              <Card className="border-0 shadow-lg" id="acceptance">
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                  <CardDescription>By accessing and using INR100, you accept and agree to be bound by these terms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Welcome to INR100 (the "Platform"). These Terms of Service ("Terms") govern your use of our website, 
                    mobile application, and related services (collectively, the "Service") operated by INR100 Technologies Pvt. Ltd. 
                    ("us", "we", or "our").
                  </p>
                  <p>
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of 
                    these terms, then you may not access the Service.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </CardContent>
              </Card>

              {/* Section 2: Description of Service */}
              <Card className="border-0 shadow-lg" id="description">
                <CardHeader>
                  <CardTitle>2. Description of Service</CardTitle>
                  <CardDescription>Understanding what INR100 offers and how it works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    INR100 is a micro-investing platform that allows users to start investing with as little as ₹100. 
                    Our platform provides:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Fractional investing in stocks, mutual funds, and other assets</li>
                    <li>AI-powered investment insights and recommendations</li>
                    <li>Educational content and learning resources</li>
                    <li>Portfolio management and tracking tools</li>
                    <li>Social investing features</li>
                    <li>Gamified investment experience</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 3: Eligibility */}
              <Card className="border-0 shadow-lg" id="eligibility">
                <CardHeader>
                  <CardTitle>3. Eligibility & Registration</CardTitle>
                  <CardDescription>Who can use our platform and how to register</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Age Requirement</h4>
                    <p>You must be at least 18 years old to use our platform.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Residency</h4>
                    <p>Our services are currently available to Indian residents only.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">KYC Requirements</h4>
                    <p>All users must complete KYC verification as per regulatory requirements.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Valid Information</h4>
                    <p>You must provide accurate and complete information during registration.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Account Responsibilities */}
              <Card className="border-0 shadow-lg" id="account">
                <CardHeader>
                  <CardTitle>4. Account Responsibilities</CardTitle>
                  <CardDescription>Your duties as an account holder</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Account Security</h4>
                    <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Accurate Information</h4>
                    <p>Keep your personal and financial information updated and accurate.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prohibited Activities</h4>
                    <p>You may not use the platform for illegal activities or violate any applicable laws.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Communication</h4>
                    <p>Maintain active communication channels for important notifications and updates.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Investment Services */}
              <Card className="border-0 shadow-lg" id="services">
                <CardHeader>
                  <CardTitle>5. Investment Services</CardTitle>
                  <CardDescription>How our investment services work</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Investment Products</h4>
                    <p>We offer access to various investment products including stocks, mutual funds, ETFs, and digital gold.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Order Execution</h4>
                    <p>All orders are executed based on market conditions and may be subject to delays.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">AI Recommendations</h4>
                    <p>Our AI-powered recommendations are for informational purposes only and should not be considered as financial advice.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Research and Analysis</h4>
                    <p>We provide research tools and analysis, but investment decisions are solely yours.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 6: Fees and Charges */}
              <Card className="border-0 shadow-lg" id="fees">
                <CardHeader>
                  <CardTitle>6. Fees and Charges</CardTitle>
                  <CardDescription>Understanding our fee structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Transaction Fees</h4>
                    <p>We charge nominal fees for buy/sell transactions as per our fee schedule.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Subscription Plans</h4>
                    <p>Premium features may require subscription to paid plans.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fee Changes</h4>
                    <p>We reserve the right to modify our fee structure with 30 days' notice.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Third-party Charges</h4>
                    <p>External charges like brokerage fees from exchanges may apply.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 7: Investment Risks */}
              <Card className="border-0 shadow-lg" id="risks">
                <CardHeader>
                  <CardTitle>7. Investment Risks</CardTitle>
                  <CardDescription>Understanding investment risks and disclaimers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="font-semibold text-red-800">Risk Warning</span>
                    </div>
                    <p className="text-red-800 text-sm">
                      All investments carry risk. Past performance does not guarantee future results. 
                      You may lose some or all of your invested capital.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Market Risk</h4>
                    <p>Investment values can fluctuate due to market conditions and economic factors.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Liquidity Risk</h4>
                    <p>Some investments may be difficult to sell quickly without significant price impact.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technology Risk</h4>
                    <p>System outages or technical issues may affect trading and access to your account.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 8: Privacy & Data */}
              <Card className="border-0 shadow-lg" id="privacy">
                <CardHeader>
                  <CardTitle>8. Privacy & Data Protection</CardTitle>
                  <CardDescription>How we handle your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                    to understand our practices.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Data Collection</h4>
                    <p>We collect information necessary to provide our services and comply with regulatory requirements.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Security</h4>
                    <p>We implement industry-standard security measures to protect your data.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Usage</h4>
                    <p>We use your data to provide services, improve our platform, and comply with legal obligations.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 9: Limitation of Liability */}
              <Card className="border-0 shadow-lg" id="liability">
                <CardHeader>
                  <CardTitle>9. Limitation of Liability</CardTitle>
                  <CardDescription>Understanding our liability limitations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      In no event shall INR100 Technologies Pvt. Ltd. be liable for any indirect, incidental, 
                      special, consequential, or punitive damages, including without limitation, loss of profits, 
                      data, use, goodwill, or other intangible losses, resulting from your use of the service.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service Availability</h4>
                    <p>We strive for high availability but cannot guarantee uninterrupted service.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Investment Advice</h4>
                    <p>Our platform provides information and tools, not personalized investment advice.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 10: Termination */}
              <Card className="border-0 shadow-lg" id="termination">
                <CardHeader>
                  <CardTitle>10. Termination</CardTitle>
                  <CardDescription>How accounts can be terminated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Your Right to Terminate</h4>
                    <p>You may close your account at any time by contacting customer support.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Our Right to Terminate</h4>
                    <p>We may suspend or terminate your account if you violate these terms or applicable laws.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Effect of Termination</h4>
                    <p>Upon termination, your access to the platform will cease, but these terms will continue to apply.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 11: Governing Law */}
              <Card className="border-0 shadow-lg" id="governing">
                <CardHeader>
                  <CardTitle>11. Governing Law</CardTitle>
                  <CardDescription>Legal jurisdiction and dispute resolution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Jurisdiction</h4>
                    <p>These terms shall be interpreted and governed by the laws of India.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                    <p>Any disputes will be subject to the exclusive jurisdiction of courts in Bangalore, India.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                    <p>Our operations are subject to SEBI regulations and other applicable laws.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 12: Contact Information */}
              <Card className="border-0 shadow-lg" id="contact">
                <CardHeader>
                  <CardTitle>12. Contact Information</CardTitle>
                  <CardDescription>How to reach us with questions or concerns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Legal Department</h4>
                    <p>Email: legal@inr100.com</p>
                    <p>Phone: +91 80 4567 8900</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Registered Office</h4>
                    <p>
                      INR100 Technologies Pvt. Ltd.<br />
                      #123, Technology Hub<br />
                      Electronic City, Bangalore - 560100<br />
                      Karnataka, India
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Last Updated */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <p className="text-center text-green-800">
                    <strong>Last Updated:</strong> December 12, 2025<br />
                    <span className="text-sm">These terms may be updated periodically. Continued use constitutes acceptance of updated terms.</span>
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