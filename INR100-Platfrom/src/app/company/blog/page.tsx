import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  User, 
  Search, 
  Tag, 
  TrendingUp,
  BookOpen,
  ArrowRight,
  Clock,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Micro-Investing in India: Trends to Watch in 2024",
    excerpt: "Explore how micro-investing platforms are revolutionizing the way Indians approach wealth creation and what trends will shape the industry this year.",
    author: "Rajesh Kumar",
    date: "March 25, 2024",
    readTime: "8 min read",
    category: "Industry Trends",
    tags: ["micro-investing", "fintech", "2024 trends"],
    image: "/api/placeholder/600/400",
    likes: 234,
    comments: 45,
    featured: true
  },
  {
    id: 2,
    title: "How to Start Investing with Just ₹100: A Complete Beginner's Guide",
    excerpt: "Step-by-step guide to help you begin your investment journey with minimal capital and build wealth over time through consistent investing.",
    author: "Priya Sharma",
    date: "March 22, 2024",
    readTime: "6 min read",
    category: "Investment Guide",
    tags: ["beginners", "investing", "wealth creation"],
    image: "/api/placeholder/600/400",
    likes: 189,
    comments: 67,
    featured: true
  },
  {
    id: 3,
    title: "Understanding Mutual Funds: Direct vs Regular Plans",
    excerpt: "Learn the key differences between direct and regular mutual fund plans, and how choosing the right option can significantly impact your returns.",
    author: "Amit Patel",
    date: "March 20, 2024",
    readTime: "5 min read",
    category: "Mutual Funds",
    tags: ["mutual funds", "direct plans", "returns"],
    image: "/api/placeholder/600/400",
    likes: 156,
    comments: 23,
    featured: false
  },
  {
    id: 4,
    title: "The Power of Compound Interest: How Small Investments Grow Over Time",
    excerpt: "Discover the magic of compound interest and how starting early with small amounts can lead to substantial wealth creation over the long term.",
    author: "Neha Gupta",
    date: "March 18, 2024",
    readTime: "7 min read",
    category: "Financial Education",
    tags: ["compound interest", "long-term investing", "wealth"],
    image: "/api/placeholder/600/400",
    likes: 298,
    comments: 89,
    featured: false
  },
  {
    id: 5,
    title: "AI in Personal Finance: How Technology is Changing Investment Advice",
    excerpt: "Explore how artificial intelligence is transforming personal finance and making sophisticated investment advice accessible to everyone.",
    author: "Vikram Singh",
    date: "March 15, 2024",
    readTime: "9 min read",
    category: "Technology",
    tags: ["AI", "fintech", "robo-advisory"],
    image: "/api/placeholder/600/400",
    likes: 412,
    comments: 156,
    featured: false
  },
  {
    id: 6,
    title: "Gold Investment in 2024: Digital Gold vs Physical Gold",
    excerpt: "Compare different ways to invest in gold and understand which option might be better suited for your investment goals and risk appetite.",
    author: "Anjali Desai",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Commodities",
    tags: ["gold", "digital gold", "investment options"],
    image: "/api/placeholder/600/400",
    likes: 178,
    comments: 34,
    featured: false
  }
];

const categories = [
  "All",
  "Industry Trends",
  "Investment Guide",
  "Mutual Funds",
  "Financial Education",
  "Technology",
  "Commodities"
];

const popularTags = [
  "micro-investing",
  "fintech",
  "beginners",
  "mutual funds",
  "compound interest",
  "AI",
  "gold",
  "wealth creation"
];

export default function BlogPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              INR100 Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Insights, tips, and stories about investing, personal finance, and the future of fintech in India
            </p>
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 pr-4 py-3 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Articles</h2>
              <p className="text-lg text-gray-600">Hand-picked stories from our blog</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-green-200 via-blue-200 to-purple-200"></div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-green-100 text-green-800">
                        {post.category}
                      </Badge>
                      <Badge variant="outline">
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Latest Articles</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                      <option>Newest First</option>
                      <option>Most Popular</option>
                      <option>Most Commented</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="aspect-video md:aspect-square bg-gradient-to-r from-green-200 via-blue-200 to-purple-200"></div>
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                {post.category}
                              </Badge>
                              {post.featured && (
                                <Badge variant="outline">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                            <CardDescription className="text-base">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-gray-500">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-500">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </div>
                                <Button variant="outline" size="sm">
                                  Read
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
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
                {/* Categories */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Categories</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <button
                          key={index}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            index === 0
                              ? "bg-green-100 text-green-800 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Tag className="h-5 w-5" />
                      <span>Popular Tags</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="hover:bg-green-100 hover:text-green-800 cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Subscribe to Newsletter</span>
                    </CardTitle>
                    <CardDescription>
                      Get the latest investment insights and tips delivered to your inbox
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
                      Join 10,000+ subscribers. No spam, unsubscribe anytime.
                    </p>
                  </CardContent>
                </Card>

                {/* Popular Posts */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Popular Posts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-start space-x-3">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Investment Journey</h2>
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