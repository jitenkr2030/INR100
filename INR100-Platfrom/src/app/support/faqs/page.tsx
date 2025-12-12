import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Settings,
  CreditCard,
  Shield,
  TrendingUp,
  Smartphone,
  Globe,
  Phone,
  Mail,
  Clock,
  Lock,
  DollarSign,
  FileText,
  AlertCircle,
  Info,
  ExternalLink,
  Home,
  Bell
} from "lucide-react";

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <BookOpen className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    faqs: [
      {
        question: "What is INR100 and how does it work?",
        answer: "INR100 is India's leading micro-investing platform that allows you to start investing with just ₹100. We provide access to stocks, mutual funds, gold, and global assets through an easy-to-use mobile app and website. You can invest in fractions of assets, making it affordable for everyone to start building wealth."
      },
      {
        question: "How do I create an account on INR100?",
        answer: "Creating an account is simple: 1) Download the app or visit our website, 2) Enter your mobile number and verify with OTP, 3) Complete your profile with basic details, 4) Complete KYC verification using PAN and Aadhaar, 5) Add money to your wallet and start investing. The entire process takes less than 10 minutes."
      },
      {
        question: "What documents do I need for KYC verification?",
        answer: "For KYC verification, you'll need: 1) PAN card (mandatory), 2) Aadhaar card (for e-KYC), 3) A clear selfie for photo verification, 4) Bank account details for adding money. The process is completely digital and usually completes within 5 minutes."
      },
      {
        question: "Is there a minimum investment amount?",
        answer: "Yes, you can start investing with just ₹100 on INR100. This is our unique selling point - we believe everyone should have access to wealth creation opportunities regardless of their income level."
      },
      {
        question: "How do I add money to my INR100 account?",
        answer: "You can add money through multiple methods: 1) UPI (instant and free), 2) Net banking (all major banks supported), 3) Debit cards, 4) Credit cards (with applicable fees), 5) Wallet transfers. The minimum add amount is ₹100."
      }
    ]
  },
  {
    id: "account-security",
    title: "Account & Security",
    icon: <Shield className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    faqs: [
      {
        question: "How secure is my money and data on INR100?",
        answer: "We take security very seriously. Your money is held with regulated custodians and protected by bank-level 256-bit encryption. We are SEBI registered and follow all regulatory requirements. Your personal data is encrypted and never shared with third parties without your consent."
      },
      {
        question: "How do I enable two-factor authentication (2FA)?",
        answer: "To enable 2FA: 1) Go to Profile > Security Settings, 2) Click on 'Enable 2FA', 3) Choose between SMS OTP or Authenticator App, 4) Follow the setup instructions, 5) Save your backup codes securely. We strongly recommend enabling 2FA for enhanced security."
      },
      {
        question: "What should I do if I forget my password?",
        answer: "If you forget your password: 1) Click on 'Forgot Password' on the login screen, 2) Enter your registered mobile number or email, 3) Receive OTP on your device, 4) Verify OTP and set a new password. If you don't have access to your registered device, contact support for assistance."
      },
      {
        question: "How can I update my personal information?",
        answer: "You can update most personal information through the app: 1) Go to Profile > Personal Details, 2) Edit the information you want to update, 3) Save changes. For sensitive information like PAN or bank details, you may need to contact support for security reasons."
      },
      {
        question: "Is INR100 regulated and safe?",
        answer: "Yes, INR100 is a SEBI registered platform and follows all regulatory guidelines. We work with regulated brokers and custodians to ensure your investments are safe. We also have insurance coverage to protect against fraud and unauthorized transactions."
      }
    ]
  },
  {
    id: "investing-basics",
    title: "Investing Basics",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    faqs: [
      {
        question: "What investment options are available on INR100?",
        answer: "INR100 offers a wide range of investment options: 1) Stocks - Invest in fractions of top Indian companies, 2) Mutual Funds - Direct plans with zero commission, 3) Gold - Digital gold and gold ETFs, 4) Global Assets - US stocks and international funds, 5) ETFs - Exchange Traded Funds, 6) Bonds - Government and corporate bonds."
      },
      {
        question: "What is the difference between direct and regular mutual fund plans?",
        answer: "Direct plans have no commission or distribution fees, resulting in higher returns for investors. Regular plans include commission paid to distributors, which reduces your returns. INR100 only offers direct plans to ensure you get the maximum possible returns on your investments."
      },
      {
        question: "How do I choose the right investment for me?",
        answer: "Consider these factors: 1) Your risk tolerance (conservative, moderate, aggressive), 2) Investment timeline (short-term vs long-term), 3) Financial goals, 4) Current income and expenses. Our AI-powered advisor can help you create a personalized investment strategy based on your profile."
      },
      {
        question: "What is fractional investing?",
        answer: "Fractional investing allows you to buy portions of expensive stocks or assets. Instead of needing to buy a full share (which might cost thousands), you can invest any amount starting from ₹100 and own a fraction of that asset. This makes high-value investments accessible to everyone."
      },
      {
        question: "How often should I invest?",
        answer: "We recommend regular investing through SIPs (Systematic Investment Plans). You can set up daily, weekly, or monthly investments starting from ₹100. Regular investing helps you benefit from rupee cost averaging and reduces the impact of market volatility."
      }
    ]
  },
  {
    id: "payments-billing",
    title: "Payments & Billing",
    icon: <CreditCard className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    faqs: [
      {
        question: "What payment methods are supported?",
        answer: "We support multiple payment methods: 1) UPI (all major apps - Google Pay, PhonePe, Paytm), 2) Net banking (all major Indian banks), 3) Debit cards (Visa, Mastercard, RuPay), 4) Credit cards (with 2% processing fee), 5) Wallet transfers (Paytm, PhonePe wallet)."
      },
      {
        question: "Are there any fees for adding or withdrawing money?",
        answer: "Adding money is free for all payment methods except credit cards (2% fee). Withdrawing money to your bank account is free up to 3 withdrawals per month. Additional withdrawals incur a nominal fee of ₹25 per withdrawal."
      },
      {
        question: "How long does it take to process withdrawals?",
        answer: "Withdrawal processing times: 1) UPI and wallet transfers: Instant to 2 hours, 2) IMPS: Within 2 hours, 3) NEFT: Same day if before 4:30 PM, next day otherwise, 4) RTGS: Same day for amounts above ₹2 lakh. Most withdrawals are processed instantly."
      },
      {
        question: "What are the subscription plans and their benefits?",
        answer: "We offer three subscription tiers: 1) Basic (Free) - Up to 5 transactions/month, basic features, 2) Premium (₹99/month) - Unlimited transactions, AI insights, priority support, 3) Professional (₹299/month) - Everything in Premium plus 1-on-1 advisor sessions, API access, custom strategies."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "To cancel your subscription: 1) Go to Profile > Subscription, 2) Click on 'Manage Subscription', 3) Select 'Cancel Subscription', 4) Confirm cancellation. You'll continue to have access until the end of your current billing period. No refunds are provided for partial months."
      }
    ]
  },
  {
    id: "technical-issues",
    title: "Technical Issues",
    icon: <Settings className="h-6 w-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    faqs: [
      {
        question: "The app is not working on my device. What should I do?",
        answer: "Try these troubleshooting steps: 1) Check your internet connection, 2) Update the app to the latest version, 3) Clear app cache and data, 4) Restart your device, 5) Reinstall the app if issues persist. Contact support if the problem continues."
      },
      {
        question: "Why is my transaction pending or failed?",
        answer: "Transactions may fail due to: 1) Insufficient funds, 2) Network issues, 3) Server maintenance, 4) Payment gateway issues, 5) Incorrect payment details. Check your transaction history for error details or contact support for assistance."
      },
      {
        question: "How do I update the INR100 app?",
        answer: "To update the app: 1) Go to Google Play Store or Apple App Store, 2) Search for 'INR100', 3) Click 'Update' if available, 4) Enable auto-updates in your device settings. We recommend keeping the app updated for the latest features and security patches."
      },
      {
        question: "Why can't I log in to my account?",
        answer: "Login issues can occur due to: 1) Incorrect password, 2) Account locked due to multiple failed attempts, 3) Server maintenance, 4) App version outdated, 5) Network issues. Try resetting your password or contact support if the problem persists."
      },
      {
        question: "How do I report a bug or technical issue?",
        answer: "To report bugs: 1) Go to Profile > Help & Support, 2) Select 'Report a Bug', 3) Describe the issue in detail, 4) Include screenshots if possible, 5) Submit the report. Our technical team will investigate and resolve the issue as soon as possible."
      }
    ]
  },
  {
    id: "premium-features",
    title: "Premium Features",
    icon: <Star className="h-6 w-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    faqs: [
      {
        question: "What are the benefits of a Premium subscription?",
        answer: "Premium subscription (₹99/month) includes: 1) Unlimited transactions, 2) Advanced AI-powered insights, 3) Priority customer support, 4) Advanced analytics and reporting, 5) Portfolio optimization suggestions, 6) Access to premium educational content."
      },
      {
        question: "What additional features do I get with Professional subscription?",
        answer: "Professional subscription (₹299/month) includes everything in Premium plus: 1) 1-on-1 advisor sessions, 2) Custom portfolio strategies, 3) API access for developers, 4) White-label reports, 5) Dedicated account manager, 6) Early access to new features."
      },
      {
        question: "How does the AI-powered advisor work?",
        answer: "Our AI advisor analyzes your financial profile, risk tolerance, goals, and market conditions to provide personalized investment recommendations. It uses machine learning algorithms that improve over time and considers factors like your age, income, expenses, and investment timeline."
      },
      {
        question: "Can I try premium features before subscribing?",
        answer: "Yes, we offer a 7-day free trial for both Premium and Professional subscriptions. You can explore all premium features during the trial period. No credit card is required to start the trial."
      },
      {
        question: "How do I access my premium features after subscribing?",
        answer: "Once you subscribe, premium features are automatically unlocked in your account. You'll see a premium badge on your profile, and new features will be available in the app dashboard. You'll also receive priority support with faster response times."
      }
    ]
  }
];

export default function FAQsPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions about INR100, investing, and account management
            </p>
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Search FAQs..."
                className="pl-12 pr-4 py-3 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
              <p className="text-lg text-gray-600">Find answers organized by topic</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqCategories.map((category) => (
                <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                        <div className={category.color}>{category.icon}</div>
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {category.faqs.length} articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      View All FAQs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All FAQs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">All Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">Comprehensive answers to help you understand INR100 better</p>
              </div>

              <div className="space-y-8">
                {faqCategories.map((category) => (
                  <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className={`p-6 ${category.bgColor}`}>
                      <div className="flex items-center space-x-3">
                        <div className={category.color}>{category.icon}</div>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      {category.faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg text-gray-600">Can't find what you're looking for? Our support team is here to help</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our support team instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Call Support</CardTitle>
                  <CardDescription>
                    Speak with a support representative
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Call Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Email Support</CardTitle>
                  <CardDescription>
                    Get detailed help via email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Topics</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Quick access to the most searched help topics
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
                <p className="opacity-90 text-sm">
                  App installation, updates, and troubleshooting
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Payments</h3>
                <p className="opacity-90 text-sm">
                  Adding money, withdrawals, and payment methods
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="opacity-90 text-sm">
                  Account safety, 2FA, and data protection
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Investing</h3>
                <p className="opacity-90 text-sm">
                  Investment options, strategies, and tips
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Investing?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join millions of Indians who are building wealth with INR100. Start with just ₹100 today.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
      <div className="flex items-center justify-between cursor-pointer">
        <h4 className="text-lg font-semibold text-gray-900">{question}</h4>
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </div>
      <div className="mt-4 text-gray-600">
        <p>{answer}</p>
      </div>
    </div>
  );
}