import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Award, 
  Calendar,
  Search,
  Hash,
  Star,
  ArrowRight,
  Heart,
  Share2,
  Bookmark,
  Plus,
  Filter,
  User,
  Bell,
  UserPlus,
  Eye,
  MessageSquare,
  ThumbsUp
} from "lucide-react";

const communityStats = [
  { label: "Community Members", value: "50K+", icon: <Users className="h-6 w-6" /> },
  { label: "Daily Discussions", value: "1K+", icon: <MessageCircle className="h-6 w-6" /> },
  { label: "Expert Contributors", value: "500+", icon: <Award className="h-6 w-6" /> },
  { label: "Problems Solved", value: "10K+", icon: <TrendingUp className="h-6 w-6" /> }
];

const trendingTopics = [
  { name: "Mutual Funds", posts: 1234, trend: "+12%" },
  { name: "Stock Market", posts: 987, trend: "+8%" },
  { name: "Cryptocurrency", posts: 756, trend: "+15%" },
  { name: "Gold Investment", posts: 645, trend: "+5%" },
  { name: "Tax Planning", posts: 523, trend: "+10%" },
  { name: "Retirement Planning", posts: 432, trend: "+7%" }
];

const recentDiscussions = [
  {
    id: 1,
    title: "Best mutual funds for beginners in 2024?",
    author: "Rahul Sharma",
    category: "Mutual Funds",
    replies: 45,
    likes: 123,
    views: 1234,
    timeAgo: "2 hours ago",
    isTrending: true,
    isSolved: true
  },
  {
    id: 2,
    title: "How to start investing with just ₹1000 per month?",
    author: "Priya Patel",
    category: "Getting Started",
    replies: 67,
    likes: 234,
    views: 2345,
    timeAgo: "4 hours ago",
    isTrending: true,
    isSolved: false
  },
  {
    id: 3,
    title: "Understanding SIP vs Lumpsum investment",
    author: "Amit Kumar",
    category: "Investment Strategy",
    replies: 89,
    likes: 345,
    views: 3456,
    timeAgo: "6 hours ago",
    isTrending: false,
    isSolved: true
  },
  {
    id: 4,
    title: "Tax benefits of investing in ELSS funds",
    author: "Neha Gupta",
    category: "Tax Planning",
    replies: 34,
    likes: 89,
    views: 890,
    timeAgo: "8 hours ago",
    isTrending: false,
    isSolved: true
  },
  {
    id: 5,
    title: "Should I invest in gold during market volatility?",
    author: "Vikram Singh",
    category: "Commodities",
    replies: 56,
    likes: 167,
    views: 1678,
    timeAgo: "12 hours ago",
    isTrending: false,
    isSolved: false
  },
  {
    id: 6,
    title: "Complete guide to KYC verification process",
    author: "Anjali Desai",
    category: "Account Setup",
    replies: 78,
    likes: 256,
    views: 2567,
    timeAgo: "1 day ago",
    isTrending: false,
    isSolved: true
  }
];

const expertMembers = [
  {
    name: "Dr. Rajesh Kumar",
    title: "Senior Financial Advisor",
    expertise: "Mutual Funds, Tax Planning",
    posts: 1234,
    followers: 15420,
    isOnline: true,
    avatar: "/api/placeholder/100/100"
  },
  {
    name: "Priya Sharma CFA",
    title: "Investment Analyst",
    expertise: "Stock Analysis, Portfolio Management",
    posts: 987,
    followers: 12350,
    isOnline: true,
    avatar: "/api/placeholder/100/100"
  },
  {
    name: "Amit Patel",
    title: "Tax Consultant",
    expertise: "Tax Planning, ELSS Funds",
    posts: 876,
    followers: 9870,
    isOnline: false,
    avatar: "/api/placeholder/100/100"
  },
  {
    name: "Neha Gupta",
    title: "Certified Financial Planner",
    expertise: "Retirement Planning, Goal Setting",
    posts: 765,
    followers: 8760,
    isOnline: true,
    avatar: "/api/placeholder/100/100"
  }
];

const communityGuidelines = [
  {
    title: "Be Respectful",
    description: "Treat all community members with respect and kindness",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Stay Relevant",
    description: "Keep discussions focused on investing and personal finance",
    icon: <Hash className="h-5 w-5" />
  },
  {
    title: "No Spam",
    description: "Avoid promotional content and self-promotion",
    icon: <MessageCircle className="h-5 w-5" />
  },
  {
    title: "Be Helpful",
    description: "Share knowledge and help others learn",
    icon: <Star className="h-5 w-5" />
  }
];

export default function CommunityPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              INR100 Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect, learn, and grow with fellow investors. Share knowledge, ask questions, and build wealth together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Join Community
                <UserPlus className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Browse Discussions
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-green-600 mr-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Search discussions..."
                        className="pl-10 pr-4"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Discussion
                    </Button>
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-orange-500" />
                      <span>Trending Topics</span>
                    </h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div>
                          <div className="font-medium text-sm">{topic.name}</div>
                          <div className="text-xs text-gray-500">{topic.posts} posts</div>
                        </div>
                        <Badge variant="outline" className="text-xs text-green-600">
                          {topic.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Discussions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Recent Discussions</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Newest
                      </Button>
                      <Button variant="outline" size="sm">
                        Popular
                      </Button>
                      <Button variant="outline" size="sm">
                        Unanswered
                      </Button>
                    </div>
                  </div>

                  {recentDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {discussion.category}
                              </Badge>
                              {discussion.isTrending && (
                                <Badge className="bg-orange-100 text-orange-800 text-xs">
                                  Trending
                                </Badge>
                              )}
                              {discussion.isSolved && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Solved
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 hover:text-green-600 cursor-pointer">
                              {discussion.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{discussion.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{discussion.timeAgo}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{discussion.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{discussion.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{discussion.likes}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Community Guidelines */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5" />
                      <span>Community Guidelines</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {communityGuidelines.map((guideline, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="text-green-600 mt-1">{guideline.icon}</div>
                          <div>
                            <h4 className="font-medium text-sm">{guideline.title}</h4>
                            <p className="text-xs text-gray-600">{guideline.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Read Full Guidelines
                    </Button>
                  </CardContent>
                </Card>

                {/* Expert Members */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Expert Members</span>
                    </CardTitle>
                    <CardDescription>
                      Learn from experienced investors and financial experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expertMembers.map((expert, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-200 to-blue-200 rounded-full"></div>
                            {expert.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{expert.name}</h4>
                            <p className="text-xs text-gray-600">{expert.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {expert.posts} posts
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {expert.followers.toLocaleString()} followers
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Follow
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      View All Experts
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Upcoming Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-sm">Webinar: Mutual Fund Basics</h4>
                        <p className="text-xs text-gray-600">March 30, 2024 • 6:00 PM</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Register
                        </Button>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-sm">Live Q&A: Tax Planning 2024</h4>
                        <p className="text-xs text-gray-600">April 2, 2024 • 7:00 PM</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Register
                        </Button>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium text-sm">Workshop: Stock Analysis</h4>
                        <p className="text-xs text-gray-600">April 5, 2024 • 3:00 PM</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Register
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Community Newsletter</span>
                    </CardTitle>
                    <CardDescription>
                      Get weekly updates on trending discussions and expert insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full"
                    />
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Subscribe
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Join 25,000+ community members
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Conversation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Be part of India's most active investment community. Share your knowledge, learn from experts, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Join Community Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}