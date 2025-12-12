import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { 
  Newspaper, 
  Download, 
  Mail, 
  ExternalLink, 
  Calendar,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  FileText,
  Image
} from "lucide-react";

const pressReleases = [
  {
    id: 1,
    title: "INR100 Raises $50M Series B to Democratize Investing in India",
    date: "March 15, 2024",
    excerpt: "Leading fintech startup secures funding to expand its micro-investing platform across India",
    category: "Funding",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "INR100 Reaches 1 Million Users Milestone in Record Time",
    date: "February 28, 2024",
    excerpt: "Platform achieves rapid growth by making investing accessible with just ₹100 minimum investment",
    category: "Milestone",
    readTime: "2 min read"
  },
  {
    id: 3,
    title: "Launch of AI-Powered Investment Advisor Revolutionizes Personal Finance",
    date: "February 10, 2024",
    excerpt: "New AI feature provides personalized investment recommendations to users at all levels",
    category: "Product Launch",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "INR100 Partners with Leading Mutual Fund Houses to Offer Zero-Commission Direct Plans",
    date: "January 25, 2024",
    excerpt: "Strategic partnerships enable users to invest in direct mutual fund plans without any commission",
    category: "Partnership",
    readTime: "3 min read"
  }
];

const mediaCoverage = [
  {
    id: 1,
    publication: "Economic Times",
    title: "How INR100 is Making Stock Market Investing Accessible to Every Indian",
    date: "March 20, 2024",
    excerpt: "Deep dive into the platform's mission and impact on financial inclusion in India",
    category: "Feature",
    link: "#"
  },
  {
    id: 2,
    publication: "TechCrunch",
    title: "Indian Fintech INR100 Shows How Micro-Investing Can Work in Emerging Markets",
    date: "March 18, 2024",
    excerpt: "International coverage highlighting INR100's innovative approach to fintech in India",
    category: "International",
    link: "#"
  },
  {
    id: 3,
    publication: "Moneycontrol",
    title: "INR100's AI-Powered Platform is Changing How Young Indians Invest",
    date: "March 15, 2024",
    excerpt: "Analysis of how the platform is attracting millennial and Gen Z investors",
    category: "Analysis",
    link: "#"
  },
  {
    id: 4,
    publication: "YourStory",
    title: "From ₹100 to Crores: The INR100 Success Story",
    date: "March 12, 2024",
    excerpt: "Founder interview and company journey from startup to industry leader",
    category: "Interview",
    link: "#"
  }
];

const mediaKit = [
  {
    title: "Company Logo",
    description: "High-resolution logo files in various formats",
    download: "Download Logo Pack"
  },
  {
    title: "Brand Guidelines",
    description: "Complete brand identity guidelines and usage instructions",
    download: "Download Guidelines"
  },
  {
    title: "Executive Headshots",
    description: "Professional photos of leadership team",
    download: "Download Photos"
  },
  {
    title: "Product Screenshots",
    description: "High-quality images of the INR100 platform",
    download: "Download Screenshots"
  },
  {
    title: "Fact Sheet",
    description: "Key company statistics and information",
    download: "Download Fact Sheet"
  },
  {
    title: "Press Kit",
    description: "Complete press kit with all assets and information",
    download: "Download Press Kit"
  }
];

export default function PressPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Press Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay updated with the latest news, announcements, and media coverage about INR100
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Download Press Kit
                <Download className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Contact PR Team
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">10L+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">₹500Cr+</div>
                <div className="text-gray-600">Assets Under Management</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Investment Options</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">Media Mentions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Press Releases</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Official announcements and news from INR100
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {pressReleases.map((release) => (
                <Card key={release.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {release.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {release.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{release.title}</CardTitle>
                        <CardDescription className="text-base">
                          {release.excerpt}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {release.readTime}
                      </div>
                      <Button variant="outline" size="sm">
                        Read More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Coverage</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What the media is saying about INR100
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {mediaCoverage.map((coverage) => (
                <Card key={coverage.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="border-blue-200 text-blue-800">
                            {coverage.publication}
                          </Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            {coverage.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {coverage.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{coverage.title}</CardTitle>
                        <CardDescription className="text-base">
                          {coverage.excerpt}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      Read Article
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Kit</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Download official INR100 assets and resources for media use
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {mediaKit.map((item, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {index === 0 && <Image className="h-8 w-8 text-green-600" />}
                      {index === 1 && <FileText className="h-8 w-8 text-blue-600" />}
                      {index === 2 && <Users className="h-8 w-8 text-purple-600" />}
                      {index === 3 && <Image className="h-8 w-8 text-orange-600" />}
                      {index === 4 && <TrendingUp className="h-8 w-8 text-red-600" />}
                      {index === 5 && <Newspaper className="h-8 w-8 text-indigo-600" />}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      {item.download}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Inquiries</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    For press inquiries, interview requests, or media partnerships, please reach out to our PR team.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-gray-600">press@inr100.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-gray-600">+91 8080808080</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>
                      Fill out this form and our PR team will get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Media Outlet
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your publication"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Awards & Recognition</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Honored to be recognized for our innovation and impact
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2">Best Fintech Startup 2024</h3>
                <p className="opacity-90">
                  Awarded by Indian Fintech Association for innovation in financial inclusion
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2">Top 100 Startups India</h3>
                <p className="opacity-90">
                  Recognized by YourStory as one of India's most promising startups
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Rising Star in Fintech</h3>
                <p className="opacity-90">
                  Featured in Economic Times as a disruptor in the investment space
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}

function Phone(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}