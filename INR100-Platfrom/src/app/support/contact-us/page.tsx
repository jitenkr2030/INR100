import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users,
  Building,
  MessageCircle,
  HelpCircle,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Send,
  Globe,
  Smartphone
} from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Head Office",
    details: [
      "INR100 Technologies Pvt Ltd",
      "123, Financial District,",
      "Bangalore, Karnataka - 560001"
    ]
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone Support",
    details: [
      "Toll Free: 1800-100-1000",
      "International: +91-8080808080",
      "Available 24/7"
    ]
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    details: [
      "Support: support@inr100.com",
      "Business: business@inr100.com",
      "Press: press@inr100.com"
    ]
  }
];

const supportHours = [
  {
    day: "Monday - Friday",
    hours: "9:00 AM - 9:00 PM",
    type: "Phone & Chat"
  },
  {
    day: "Saturday",
    hours: "10:00 AM - 6:00 PM",
    type: "Chat Only"
  },
  {
    day: "Sunday",
    hours: "10:00 AM - 4:00 PM",
    type: "Chat Only"
  }
];

const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Customer Success Manager",
    email: "rahul.s@inr100.com",
    phone: "+91-8080808001",
    expertise: "Account Setup & KYC"
  },
  {
    name: "Priya Patel",
    role: "Technical Support Specialist",
    email: "priya.p@inr100.com",
    phone: "+91-8080808002",
    expertise: "App & Website Issues"
  },
  {
    name: "Amit Kumar",
    role: "Investment Advisor",
    email: "amit.k@inr100.com",
    phone: "+91-8080808003",
    expertise: "Investment Guidance"
  },
  {
    name: "Neha Singh",
    role: "Billing Specialist",
    email: "neha.s@inr100.com",
    phone: "+91-8080808004",
    expertise: "Payments & Subscriptions"
  }
];

const faqs = [
  {
    question: "How quickly will I get a response?",
    answer: "We typically respond to all inquiries within 2 hours during business hours and within 24 hours on weekends."
  },
  {
    question: "What information should I include in my message?",
    answer: "Please include your registered email address, phone number, and a detailed description of your issue or question."
  },
  {
    question: "Can I schedule a call with support?",
    answer: "Yes, you can request a callback through our app or website, and our team will call you at your preferred time."
  },
  {
    question: "Is there a charge for customer support?",
    answer: "Basic customer support is free for all users. Premium users get priority support with faster response times."
  }
];

export default function ContactUsPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're here to help! Get in touch with our support team for any questions or assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Live Chat
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Call Us Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600">Multiple ways to reach our support team</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-green-600">{info.icon}</div>
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Hours */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">Support Hours</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {supportHours.map((schedule, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{schedule.day}</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-800">
                        {schedule.hours}
                      </CardDescription>
                      <Badge variant="outline" className="mt-2">
                        {schedule.type}
                      </Badge>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Send us a Message</h2>
                <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you soon</p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Form</CardTitle>
                  <CardDescription>
                    We typically respond within 2 hours during business hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select a subject</option>
                        <option value="account">Account Issues</option>
                        <option value="kyc">KYC Verification</option>
                        <option value="payments">Payments & Billing</option>
                        <option value="investments">Investment Help</option>
                        <option value="technical">Technical Issues</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      rows={6}
                      placeholder="Please describe your issue or question in detail..."
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="urgent"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="urgent" className="text-sm text-gray-700">
                      Mark as urgent
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      * Required fields
                    </div>
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Support Team</h2>
              <p className="text-lg text-gray-600">Our dedicated team is here to help you succeed</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mx-auto mb-4"></div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {member.expertise}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">Quick answers to common contact questions</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <HelpCircle className="h-5 w-5 text-green-600" />
                        <span>{faq.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Emergency Contact</h2>
                <p className="text-gray-600 mb-6">
                  For urgent issues related to account security, unauthorized transactions, or immediate assistance:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">Emergency Hotline: 1800-100-1001</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">Emergency Email: emergency@inr100.com</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Available 24/7 for emergency situations only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join millions of Indians who are building wealth with INR100. Our support team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Investing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Download App
                <Smartphone className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}