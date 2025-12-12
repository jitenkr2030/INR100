import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FooterLayout from "@/components/layout/footer-layout";
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Cookie,
  Share2,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  Download
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
              <Button size="lg" variant="outline">
                <FileText className="mr-2 h-5 w-5" />
                Print Policy
              </Button>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Last updated: March 25, 2024</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Table of Contents */}
              <Card className="border-0 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <a href="#information" className="block text-green-600 hover:text-green-700 font-medium">
                        1. Information We Collect
                      </a>
                      <a href="#use" className="block text-green-600 hover:text-green-700 font-medium">
                        2. How We Use Your Information
                      </a>
                      <a href="#sharing" className="block text-green-600 hover:text-green-700 font-medium">
                        3. Information Sharing
                      </a>
                      <a href="#security" className="block text-green-600 hover:text-green-700 font-medium">
                        4. Data Security
                      </a>
                    </div>
                    <div className="space-y-2">
                      <a href="#rights" className="block text-green-600 hover:text-green-700 font-medium">
                        5. Your Privacy Rights
                      </a>
                      <a href="#cookies" className="block text-green-600 hover:text-green-700 font-medium">
                        6. Cookies & Tracking
                      </a>
                      <a href="#children" className="block text-green-600 hover:text-green-700 font-medium">
                        7. Children's Privacy
                      </a>
                      <a href="#contact" className="block text-green-600 hover:text-green-700 font-medium">
                        8. Contact Information
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <section id="information" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <Eye className="h-6 w-6 text-green-600" />
                      <span>1. Information We Collect</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                      <p className="text-gray-600 mb-4">
                        When you use INR100, we may collect personal information that identifies you, including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Full name, email address, and phone number</li>
                        <li>Date of birth and PAN card number</li>
                        <li>Aadhaar number (for KYC verification)</li>
                        <li>Bank account details for transactions</li>
                        <li>Government-issued ID documents</li>
                        <li>Physical and IP address</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Financial Information</h3>
                      <p className="text-gray-600 mb-4">
                        To provide our services, we collect financial information such as:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Bank account numbers and IFSC codes</li>
                        <li>Investment portfolio details</li>
                        <li>Transaction history and amounts</li>
                        <li>Payment method information</li>
                        <li>Credit/debit card details (encrypted)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Usage Information</h3>
                      <p className="text-gray-600 mb-4">
                        We automatically collect information about your use of our services:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Device information and browser details</li>
                        <li>IP address and location data</li>
                        <li>Pages visited and time spent on our platform</li>
                        <li>Investment preferences and behavior</li>
                        <li>App usage patterns and features accessed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* How We Use Your Information */}
              <section id="use" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <Database className="h-6 w-6 text-blue-600" />
                      <span>2. How We Use Your Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Service Provision</h3>
                      <p className="text-gray-600">
                        We use your information to provide, maintain, and improve our services:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Create and manage your investment account</li>
                        <li>Process transactions and investments</li>
                        <li>Provide personalized investment recommendations</li>
                        <li>Generate account statements and reports</li>
                        <li>Communicate important account information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Security and Compliance</h3>
                      <p className="text-gray-600">
                        We use your information to maintain security and comply with legal requirements:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Verify your identity and prevent fraud</li>
                        <li>Comply with KYC and AML regulations</li>
                        <li>Monitor for suspicious activities</li>
                        <li>Generate regulatory reports</li>
                        <li>Conduct security audits</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Communication and Marketing</h3>
                      <p className="text-gray-600">
                        With your consent, we may use your information for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Send service-related notifications</li>
                        <li>Provide customer support</li>
                        <li>Share investment insights and market updates</li>
                        <li>Promote new features and services</li>
                        <li>Conduct surveys and research</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Information Sharing */}
              <section id="sharing" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <Share2 className="h-6 w-6 text-purple-600" />
                      <span>3. Information Sharing</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800">We Do Not Sell Your Personal Information</h4>
                          <p className="text-green-700 text-sm">
                            INR100 never sells your personal data to third parties for marketing purposes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">When We Share Information</h3>
                      <p className="text-gray-600 mb-4">
                        We may share your information only in the following circumstances:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Service Providers:</strong> With trusted partners who help us operate our platform (payment processors, cloud services, etc.)</li>
                        <li><strong>Legal Requirements:</strong> When required by law, regulation, or government request</li>
                        <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                        <li><strong>Protection Rights:</strong> To protect our rights, privacy, safety, or property</li>
                        <li><strong>With Consent:</strong> When you explicitly consent to the sharing</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Third-Party Services</h3>
                      <p className="text-gray-600">
                        Our platform may contain links to third-party services. This privacy policy does not apply to those services. We encourage you to review their privacy policies.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Data Security */}
              <section id="security" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <Lock className="h-6 w-6 text-orange-600" />
                      <span>4. Data Security</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Security Measures</h3>
                      <p className="text-gray-600 mb-4">
                        We implement industry-standard security measures to protect your information:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Encryption:</strong> 256-bit SSL/TLS encryption for data in transit</li>
                        <li><strong>Storage:</strong> Encrypted storage for sensitive data</li>
                        <li><strong>Access Control:</strong> Strict access controls and authentication</li>
                        <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
                        <li><strong>Compliance:</strong> Regular security audits and vulnerability assessments</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Data Retention</h3>
                      <p className="text-gray-600">
                        We retain your information only as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Breach Notification</h3>
                      <p className="text-gray-600">
                        In the event of a data breach that may affect your personal information, we will notify you promptly in accordance with applicable laws and provide guidance on protective steps you can take.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Your Privacy Rights */}
              <section id="rights" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <User className="h-6 w-6 text-indigo-600" />
                      <span>5. Your Privacy Rights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Your Rights</h3>
                      <p className="text-gray-600 mb-4">
                        Under applicable data protection laws, you have the following rights:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Access:</strong> Request a copy of your personal information</li>
                        <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                        <li><strong>Portability:</strong> Receive your data in a portable format</li>
                        <li><strong>Objection:</strong> Object to certain processing activities</li>
                        <li><strong>Restriction:</strong> Limit processing of your information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">How to Exercise Your Rights</h3>
                      <p className="text-gray-600 mb-4">
                        To exercise your privacy rights, please contact us at:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">privacy@inr100.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">1800-100-1000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Cookies & Tracking */}
              <section id="cookies" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <Cookie className="h-6 w-6 text-red-600" />
                      <span>6. Cookies & Tracking</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What Are Cookies?</h3>
                      <p className="text-gray-600">
                        Cookies are small text files stored on your device that help us provide, protect, and improve our services. We use different types of cookies:
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Types of Cookies We Use</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Essential Cookies:</strong> Necessary for basic site functionality</li>
                        <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
                        <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                        <li><strong>Advertising Cookies:</strong> Show relevant advertisements</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Cookie Preferences</h3>
                      <p className="text-gray-600">
                        You can manage your cookie preferences through your browser settings or our cookie consent banner. However, disabling essential cookies may affect your ability to use our services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Children's Privacy */}
              <section id="children" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                      <span>7. Children's Privacy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                          <p className="text-yellow-700 text-sm">
                            INR100 is not intended for children under 18 years of age. We do not knowingly collect personal information from children.
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      If we discover that we have collected personal information from a child without parental consent, we will take steps to delete that information promptly. If you believe we have collected information from a child, please contact us immediately.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Contact Information */}
              <section id="contact" className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <Mail className="h-6 w-6 text-green-600" />
                      <span>8. Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Privacy-Related Inquiries</h3>
                      <p className="text-gray-600 mb-4">
                        If you have questions or concerns about this privacy policy or our privacy practices, please contact us:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Mail className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">Email:</span>
                          </div>
                          <p className="text-gray-600">privacy@inr100.com</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">Phone:</span>
                          </div>
                          <p className="text-gray-600">1800-100-1000</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Data Protection Officer</h3>
                      <p className="text-gray-600">
                        Our Data Protection Officer is responsible for overseeing our privacy program and ensuring compliance with applicable data protection laws.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Regulatory Authority</h3>
                      <p className="text-gray-600">
                        If you have unresolved privacy concerns, you have the right to file a complaint with the relevant data protection authority in your jurisdiction.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Policy Updates */}
              <section className="mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <span>Policy Updates</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. When we make changes, we will:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Update the "Last updated" date at the top of this policy</li>
                      <li>Notify users of significant changes through email or app notifications</li>
                      <li>Obtain consent when required by applicable laws</li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                      We encourage you to review this policy periodically to stay informed about how we protect your information.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Have Questions About Your Privacy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Our privacy team is here to help. Contact us with any questions or concerns about your personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Contact Privacy Team
                <Mail className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Download Privacy Policy
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}