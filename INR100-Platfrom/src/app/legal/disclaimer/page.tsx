"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown,
  Info,
  Scale,
  DollarSign,
  BarChart3,
  Globe,
  Phone,
  Mail,
  Building
} from "lucide-react";

export default function DisclaimerPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
              Important Disclaimers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Disclaimer
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Important legal disclaimers and risk warnings for INR100 platform users
            </p>
          </div>
        </section>

        {/* Critical Warning */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-red-500 bg-red-50 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <AlertTriangle className="h-6 w-6 mr-3" />
                    CRITICAL RISK WARNING
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-red-800">
                  <p className="text-lg font-semibold mb-3">
                    TRADING AND INVESTMENT IN FINANCIAL INSTRUMENTS INVOLVES SUBSTANTIAL RISK AND MAY NOT BE SUITABLE FOR ALL INVESTORS.
                  </p>
                  <p className="mb-3">
                    Please read and understand these risks before using our platform. You should carefully consider whether trading is suitable for you in light of your circumstances, knowledge, and financial resources.
                  </p>
                  <p className="text-sm">
                    <strong>You may lose some or all of your invested capital.</strong> Past performance is not indicative of future results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <a href="#investment-risks" className="block text-blue-600 hover:underline">1. Investment Risks</a>
                      <a href="#no-advice" className="block text-blue-600 hover:underline">2. No Investment Advice</a>
                      <a href="#accuracy" className="block text-blue-600 hover:underline">3. Information Accuracy</a>
                      <a href="#platform" className="block text-blue-600 hover:underline">4. Platform Limitations</a>
                      <a href="#regulatory" className="block text-blue-600 hover:underline">5. Regulatory Compliance</a>
                      <a href="#third-party" className="block text-blue-600 hover:underline">6. Third-Party Services</a>
                    </div>
                    <div className="space-y-2">
                      <a href="#liability" className="block text-blue-600 hover:underline">7. Limitation of Liability</a>
                      <a href="#technology" className="block text-blue-600 hover:underline">8. Technology Risks</a>
                      <a href="#market" className="block text-blue-600 hover:underline">9. Market Disruptions</a>
                      <a href="#jurisdiction" className="block text-blue-600 hover:underline">10. Jurisdiction Limitations</a>
                      <a href="#contact" className="block text-blue-600 hover:underline">11. Contact Information</a>
                      <a href="#updates" className="block text-blue-600 hover:underline">12. Policy Updates</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Investment Risks */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              <Card className="border-0 shadow-lg" id="investment-risks">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
                    1. Investment Risks
                  </CardTitle>
                  <CardDescription>Understanding the risks associated with investing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="font-semibold text-red-800">High Risk Warning</span>
                    </div>
                    <p className="text-red-800 text-sm">
                      All investments carry risk. You could lose some or all of your invested capital. 
                      Never invest money you cannot afford to lose.
                    </p>
                  </div>
                  
                  <h4 className="font-semibold">Types of Investment Risks:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Market Risk:</strong> Investment values fluctuate based on market conditions, economic factors, and global events</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Liquidity Risk:</strong> Difficulty in selling investments quickly without significant price impact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Credit Risk:</strong> Risk of issuer defaulting on payment obligations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Currency Risk:</strong> Fluctuations in exchange rates affecting international investments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span><strong>Concentration Risk:</strong> Risk from having too much invested in one asset or sector</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* No Investment Advice */}
              <Card className="border-0 shadow-lg" id="no-advice">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scale className="h-5 w-5 mr-2 text-blue-600" />
                    2. No Investment Advice
                  </CardTitle>
                  <CardDescription>Our platform does not provide personalized investment advice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-semibold">
                      IMPORTANT: INR100 is an investment platform, not a registered investment advisor.
                    </p>
                  </div>
                  
                  <h4 className="font-semibold">What We Provide:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• General information about investment products</li>
                    <li>• Educational content and resources</li>
                    <li>• Research tools and market data</li>
                    <li>• AI-powered insights and analytics (for informational purposes only)</li>
                    <li>• Platform for executing investment transactions</li>
                  </ul>
                  
                  <h4 className="font-semibold">What We Do NOT Provide:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Personalized investment recommendations</li>
                    <li>• Financial planning advice</li>
                    <li>• Tax advice or guidance</li>
                    <li>• Legal or regulatory advice</li>
                    <li>• Guarantees on investment performance</li>
                  </ul>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      <strong>Your Responsibility:</strong> All investment decisions are yours alone. 
                      Please consult with qualified financial advisors before making investment decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Information Accuracy */}
              <Card className="border-0 shadow-lg" id="accuracy">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />
                    3. Information Accuracy
                  </CardTitle>
                  <CardDescription>Limitations on data accuracy and timeliness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    While we strive to provide accurate and up-to-date information, we cannot guarantee 
                    the completeness, accuracy, or timeliness of all content on our platform.
                  </p>
                  
                  <h4 className="font-semibold">Data Sources and Limitations:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Market data may be delayed by 15 minutes or more</li>
                    <li>• Third-party data providers may have their own accuracy limitations</li>
                    <li>• AI-generated insights are based on historical data and algorithms</li>
                    <li>• Educational content is for general information only</li>
                    <li>• News and analysis reflect the time of publication</li>
                  </ul>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">
                      <strong>Your Due Diligence:</strong> Always verify information from multiple sources 
                      and conduct your own research before making investment decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Limitations */}
              <Card className="border-0 shadow-lg" id="platform">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-purple-600" />
                    4. Platform Limitations
                  </CardTitle>
                  <CardDescription>Technical and operational limitations of our service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Service Availability:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Platform may be unavailable during maintenance windows</li>
                    <li>• High market volatility may cause system slowdowns</li>
                    <li>• Third-party service dependencies may affect functionality</li>
                    <li>• Network issues may impact order execution</li>
                  </ul>
                  
                  <h4 className="font-semibold">Functionality Limitations:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Order execution depends on market liquidity</li>
                    <li>• Price quotes are indicative and may differ at execution</li>
                    <li>• AI features have inherent algorithmic limitations</li>
                    <li>• Mobile app features may differ from web platform</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Regulatory Compliance */}
              <Card className="border-0 shadow-lg" id="regulatory">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    5. Regulatory Compliance
                  </CardTitle>
                  <CardDescription>SEBI regulations and compliance requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-semibold">
                      INR100 Technologies Pvt. Ltd. is registered with SEBI as an Investment Advisor.
                    </p>
                  </div>
                  
                  <h4 className="font-semibold">Regulatory Status:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Registered Investment Advisor (RIA) with SEBI</li>
                    <li>• Member of relevant stock exchanges through brokers</li>
                    <li>• Compliant with KYC and AML requirements</li>
                    <li>• Subject to regular regulatory audits and inspections</li>
                  </ul>
                  
                  <h4 className="font-semibold">Your Compliance Responsibilities:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Complete accurate KYC documentation</li>
                    <li>• Maintain updated personal and financial information</li>
                    <li>• Comply with applicable tax laws and reporting requirements</li>
                    <li>• Understand and follow platform rules and regulations</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Third-Party Services */}
              <Card className="border-0 shadow-lg" id="third-party">
                <CardHeader>
                  <CardTitle>6. Third-Party Services</CardTitle>
                  <CardDescription>Disclaimers regarding external service providers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our platform integrates with various third-party services. We are not responsible 
                    for the content, policies, or practices of these external providers.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Broker Partners:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Order execution through licensed brokers</li>
                        <li>• Broker fees and charges may apply</li>
                        <li>• Broker terms and conditions apply</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Data Providers:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Market data from licensed providers</li>
                        <li>• News and analysis from third parties</li>
                        <li>• Research reports may have copyright restrictions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card className="border-0 shadow-lg" id="liability">
                <CardHeader>
                  <CardTitle>7. Limitation of Liability</CardTitle>
                  <CardDescription>Our liability limitations and your protections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      In no event shall INR100 be liable for any indirect, incidental, special, consequential, 
                      or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                      or other intangible losses.
                    </p>
                  </div>
                  
                  <h4 className="font-semibold">Specific Limitations:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Losses from market fluctuations</li>
                    <li>• Technical failures or system outages</li>
                    <li>• Third-party service disruptions</li>
                    <li>• Inaccurate or delayed information</li>
                    <li>• Unauthorized access or security breaches</li>
                    <li>• Regulatory changes affecting investments</li>
                  </ul>
                  
                  <h4 className="font-semibold">Maximum Liability:</h4>
                  <p className="text-gray-600">
                    Our total liability shall not exceed the fees paid by you for our services 
                    in the 12 months preceding the claim.
                  </p>
                </CardContent>
              </Card>

              {/* Technology Risks */}
              <Card className="border-0 shadow-lg" id="technology">
                <CardHeader>
                  <CardTitle>8. Technology Risks</CardTitle>
                  <CardDescription>Risks associated with digital platforms and technology</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Technology-Related Risks:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• System outages and maintenance downtime</li>
                    <li>• Cybersecurity threats and data breaches</li>
                    <li>• Software bugs and technical errors</li>
                    <li>• Network connectivity issues</li>
                    <li>• Mobile app compatibility problems</li>
                    <li>• API failures or third-party service disruptions</li>
                  </ul>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                      <strong>Your Protection:</strong> We implement industry-standard security measures, 
                      but recommend you also take steps to protect your account and personal information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Market Disruptions */}
              <Card className="border-0 shadow-lg" id="market">
                <CardHeader>
                  <CardTitle>9. Market Disruptions</CardTitle>
                  <CardDescription>Extraordinary market events and their impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    During periods of extreme market volatility, trading may be suspended, 
                    delayed, or modified by exchanges and regulatory authorities.
                  </p>
                  
                  <h4 className="font-semibold">Market Disruption Events:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Circuit limit breaches on exchanges</li>
                    <li>• Trading halts due to technical issues</li>
                    <li>• Regulatory actions affecting markets</li>
                    <li>• Natural disasters or political events</li>
                    <li>• Flash crashes or unusual trading patterns</li>
                  </ul>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800">
                      During market disruptions, normal order processing may be delayed or modified. 
                      We will communicate important updates through our platform and official channels.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Jurisdiction Limitations */}
              <Card className="border-0 shadow-lg" id="jurisdiction">
                <CardHeader>
                  <CardTitle>10. Jurisdiction Limitations</CardTitle>
                  <CardDescription>Geographic and legal jurisdiction limitations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Geographic Restrictions:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Services currently available to Indian residents only</li>
                    <li>• Non-residents may have limited or no access</li>
                    <li>• Local laws may restrict certain investment products</li>
                    <li>• Tax implications vary by jurisdiction</li>
                  </ul>
                  
                  <h4 className="font-semibold">Legal Jurisdiction:</h4>
                  <p className="text-gray-600">
                    These disclaimers and all disputes shall be governed by the laws of India, 
                    with exclusive jurisdiction in the courts of Bangalore, Karnataka.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg" id="contact">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-600" />
                    11. Contact Information
                  </CardTitle>
                  <CardDescription>How to reach us with questions or concerns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    If you have any questions about these disclaimers or our investment platform, 
                    please contact us through the following channels:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Customer Support</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-600" />
                          <span>+91 80 4567 8900</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-600" />
                          <span>support@inr100.com</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-600" />
                          <span>Available 24/7</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Compliance Department</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-600" />
                          <span>compliance@inr100.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-600" />
                          <span>+91 80 4567 8901</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Policy Updates */}
              <Card className="border-0 shadow-lg" id="updates">
                <CardHeader>
                  <CardTitle>12. Policy Updates</CardTitle>
                  <CardDescription>How we update and notify about policy changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We may update these disclaimers from time to time to reflect changes in our services, 
                    regulatory requirements, or applicable laws.
                  </p>
                  
                  <h4 className="font-semibold">Update Process:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Material changes will be communicated via email</li>
                    <li>• Updated policy will be posted on our website</li>
                    <li>• Continued use constitutes acceptance of updates</li>
                    <li>• Effective date will be clearly stated</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Acknowledgment */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Acknowledgment</CardTitle>
                </CardHeader>
                <CardContent className="text-green-800">
                  <p className="mb-4">
                    By using INR100 platform, you acknowledge that you have read, understood, and agree to be bound by these disclaimers.
                  </p>
                  <p className="text-sm">
                    These disclaimers supplement our Terms of Service and Privacy Policy. 
                    In case of conflict, these disclaimers take precedence for investment-related matters.
                  </p>
                </CardContent>
              </Card>

              {/* Last Updated */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-center text-blue-800">
                    <strong>Last Updated:</strong> December 12, 2025<br />
                    <span className="text-sm">Please check back regularly for the latest disclaimers and risk warnings.</span>
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