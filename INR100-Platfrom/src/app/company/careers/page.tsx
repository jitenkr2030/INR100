import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FooterLayout from "@/components/layout/footer-layout";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart,
  Award,
  ArrowRight,
  Star,
  Building,
  Laptop
} from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    experience: "3-5 years",
    description: "Build amazing user experiences for our investment platform using React and Next.js",
    requirements: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    experience: "2-4 years",
    description: "Design and develop scalable backend systems for our fintech platform",
    requirements: ["Node.js", "TypeScript", "PostgreSQL", "AWS"],
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "Mumbai",
    type: "Full-time",
    experience: "4-6 years",
    description: "Lead product strategy and development for our core investment platform",
    requirements: ["Product Management", "Fintech", "Analytics", "User Research"],
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "UX/UI Designer",
    department: "Design",
    location: "Bangalore",
    type: "Full-time",
    experience: "2-4 years",
    description: "Create intuitive and beautiful designs for our investment platform",
    requirements: ["Figma", "UI Design", "UX Research", "Prototyping"],
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    experience: "3-5 years",
    description: "Drive user acquisition and brand awareness for INR100",
    requirements: ["Digital Marketing", "Growth Hacking", "Analytics", "Content Strategy"],
    posted: "1 week ago"
  },
  {
    id: 6,
    title: "Customer Success Specialist",
    department: "Support",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    description: "Help our users succeed in their investment journey",
    requirements: ["Customer Support", "Communication", "Problem Solving", "Fintech Knowledge"],
    posted: "4 days ago"
  }
];

const benefits = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family"
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Competitive Salary",
    description: "Above-market compensation with performance bonuses"
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "ESOPs",
    description: "Own a piece of the company you're helping build"
  },
  {
    icon: <Laptop className="h-6 w-6" />,
    title: "Work From Home",
    description: "Flexible remote work options and hybrid model"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and books"
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Unlimited Leave",
    description: "Flexible time off policy when you need it"
  }
];

export default function CareersPage() {
  return (
    <FooterLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Careers at INR100
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join us in our mission to make investing accessible to every Indian. 
              Build meaningful products that impact millions of lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join INR100?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're not just building a company, we're building a movement. Here's why you should be part of it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Meaningful Impact</CardTitle>
                  <CardDescription>
                    Work on products that help millions of Indians start their investment journey
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Amazing Team</CardTitle>
                  <CardDescription>
                    Collaborate with passionate, talented people from diverse backgrounds
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Growth Opportunities</CardTitle>
                  <CardDescription>
                    Learn, grow, and advance your career in a fast-paced environment
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Perks & Benefits</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We take care of our team so they can focus on doing their best work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <div className="text-green-600">{benefit.icon}</div>
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Open Positions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're always looking for talented people to join our team
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {job.department}
                          </Badge>
                        </div>
                        <CardDescription className="text-base mb-4">
                          {job.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Posted {job.posted}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Don't see your dream role? We're always looking for great talent.
              </p>
              <Button variant="outline" size="lg">
                Send Us Your Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                We believe in creating an environment where everyone can thrive and do their best work
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Collaborative</h3>
                <p className="opacity-90">
                  We work together, share knowledge, and support each other's growth
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Innovative</h3>
                <p className="opacity-90">
                  We embrace new ideas and constantly push the boundaries of what's possible
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">🌱</div>
                <h3 className="text-xl font-semibold mb-2">Inclusive</h3>
                <p className="opacity-90">
                  We celebrate diversity and create opportunities for everyone to succeed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Help us build the future of investing in India. We can't wait to meet you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Browse All Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Contact HR Team
              </Button>
            </div>
          </div>
        </section>
      </div>
    </FooterLayout>
  );
}