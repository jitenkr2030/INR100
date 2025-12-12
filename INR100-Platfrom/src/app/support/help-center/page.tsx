import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Settings,
  CreditCard,
  Shield,
  TrendingUp
} from "lucide-react";

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of investing with INR100",
    icon: <BookOpen className="h-8 w-8" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    articles: 15,
    popular: true
  },
  {
    title: "Account & Security",
    description: "Manage your account and keep it secure",
    icon: <Shield className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    articles: 23,
    popular: true
  },
  {
    title: "Investing Basics",
    description: "Understand different investment options",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    articles: 31,
    popular: true
  },
  {
    title: "Payments & Billing",
    description: "Manage deposits, withdrawals, and subscriptions",
    icon: <CreditCard className="h-8 w-8" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    articles: 18,
    popular: false
  },
  {
    title: "Technical Issues",
    description: "Troubleshoot app and website problems",
    icon: <Settings className="h-8 w-8" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    articles: 12,
    popular: false
  },
  {
    title: "Premium Features",
    description: "Learn about our premium subscription benefits",
    icon: <Star className="h-8 w-8" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    articles: 9,
    popular: false
  }
];

const popularArticles = [
  {
    title: "How to create an account on INR100",
    category: "Getting Started",
    readTime: "3 min",
    views: 15420,
    helpful: 89
  },
  {
    title: "Complete KYC verification process",
    category: "Account & Security",
    readTime: "5 min",
    views: 12350,
    helpful: 92
  },
  {
    title: "How to add money to your INR100 wallet",
    category: "Payments & Billing",
    readTime: "4 min",
    views: 10980,
    helpful: 87
  },
  {
    title: "Understanding mutual fund investments",
    category: "Investing Basics",
    readTime: "7 min",
    views: 9870,
    helpful: 94
  },
  {
    title: "Setting up your first investment goal",
    category: "Getting Started",
    readTime: "6 min",
    views: 8650,
    helpful: 91
  },
  {
    title: "How to enable two-factor authentication",
    category: "Account & Security",
    readTime: "4 min",
    views: 7890,
    helpful: 88
  }
];

const quickActions = [
  {
    title: "Track your order",
    description: "Check the status of your recent investment",
    icon: <Search className="h-5 w-5" />,
    action: "Track Order"
  },
  {
    title: "Reset password",
    description: "Recover access to your account",
    icon: <Settings className="h-5 w-5" />,
    action: "Reset Password"
  },
  {
    title: "Verify KYC status",
    description: "Check your KYC verification progress",
    icon: <CheckCircle className="h-5 w-5" />,
    action: "Check KYC"
  },
  {
    title: "Contact support",
    description: "Get help from our support team",
    icon: <MessageCircle className="h-5 w-5" />,
    action: "Contact Us"
  }
];

export default function HelpCenterPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Help Center
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                Find answers to your questions and get the help you need to make the most of INR100
              </p>
              <div className="max-w-2xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  className="pl-12 pr-4 py-3 text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Help Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">&lt; 2 min</div>
                <div className="text-gray-600">Avg Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Actions</h2>
              <p className="text-lg text-gray-600">Get instant help with these common tasks</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {quickActions.map((action, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${action.icon === Search ? "bg-green-100" : action.icon === Settings ? "bg-blue-100" : action.icon === CheckCircle ? "bg-purple-100" : "bg-orange-100"} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <div className={action.icon === Search ? "text-green-600" : action.icon === Settings ? "text-blue-600" : action.icon === CheckCircle ? "text-purple-600" : "text-orange-600"}>
                        {action.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" size="sm">
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
              <p className="text-lg text-gray-600">Find help articles organized by topic</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {helpCategories.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <div className={category.color}>{category.icon}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      {category.popular && (
                        <Badge className="bg-orange-100 text-orange-800">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {category.articles} articles
                      </div>
                      <Button variant="outline" size="sm">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Articles</h2>
              <p className="text-lg text-gray-600">Most viewed and helpful articles from our knowledge base</p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {popularArticles.map((article, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 hover:text-green-600 cursor-pointer">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{article.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{article.helpful}% helpful</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Our support team is here to help you 24/7. Choose the best way to get in touch.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-white">Live Chat</CardTitle>
                  <CardDescription className="text-white/80">
                    Chat with our support team instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full bg-white text-green-600 hover:bg-gray-100">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-white">Email Support</CardTitle>
                  <CardDescription className="text-white/80">
                    Get detailed help via email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full bg-white text-green-600 hover:bg-gray-100">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-white">Phone Support</CardTitle>
                  <CardDescription className="text-white/80">
                    Speak with a support representative
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full bg-white text-green-600 hover:bg-gray-100">
                    Call Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-green-600" />
                    <span>What is the minimum investment amount?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You can start investing with just ₹100 on INR100. We believe everyone should have access to wealth creation opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    <span>Is my money safe with INR100?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, we use bank-level security and are SEBI registered. Your investments are held with regulated custodians.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-purple-600" />
                    <span>How do I complete KYC verification?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    KYC can be completed online using your PAN and Aadhaar. The process usually takes less than 5 minutes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-orange-600" />
                    <span>What investment options are available?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer stocks, mutual funds, gold, ETFs, and global assets. You can invest in fractions of any asset.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All FAQs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}