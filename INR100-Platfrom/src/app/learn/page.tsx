"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Trophy, 
  Target, 
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Award,
  Users,
  Search,
  Filter,
  Lock,
  Unlock,
  Calendar,
  BarChart3,
  Brain,
  Briefcase,
  TrendingUp as TrendUp,
  Shield
} from "lucide-react";

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("courses");

  // Mock learning content data
  const courses = [
    {
      id: "1",
      title: "Stock Market Basics",
      description: "Learn the fundamentals of stock market investing",
      category: "basics",
      level: "beginner",
      duration: 45,
      lessons: 8,
      enrolled: 12500,
      rating: 4.8,
      instructor: "Dr. Ananya Sharma",
      progress: 75,
      isEnrolled: true,
      isCompleted: false,
      xpReward: 100,
      thumbnail: "/course-thumbnails/stock-basics.jpg",
      tags: ["stocks", "beginner", "fundamentals"],
      learningPath: "Investment Foundations"
    },
    {
      id: "2",
      title: "Mutual Fund Mastery",
      description: "Master the art of mutual fund investing",
      category: "mutual-funds",
      level: "intermediate",
      duration: 60,
      lessons: 12,
      enrolled: 8900,
      rating: 4.9,
      instructor: "Rajesh Kumar",
      progress: 0,
      isEnrolled: false,
      isCompleted: false,
      xpReward: 150,
      thumbnail: "/course-thumbnails/mutual-funds.jpg",
      tags: ["mutual-funds", "sip", "intermediate"],
      learningPath: "Investment Strategies"
    },
    {
      id: "3",
      title: "Technical Analysis Pro",
      description: "Learn to read charts and market patterns",
      category: "technical-analysis",
      level: "advanced",
      duration: 90,
      lessons: 15,
      enrolled: 5600,
      rating: 4.7,
      instructor: "Priya Singh",
      progress: 0,
      isEnrolled: false,
      isCompleted: false,
      xpReward: 200,
      thumbnail: "/course-thumbnails/technical-analysis.jpg",
      tags: ["technical", "charts", "advanced"],
      learningPath: "Advanced Trading"
    },
    {
      id: "4",
      title: "Personal Finance Management",
      description: "Complete guide to managing your personal finances",
      category: "personal-finance",
      level: "beginner",
      duration: 30,
      lessons: 6,
      enrolled: 15200,
      rating: 4.6,
      instructor: "Amit Patel",
      progress: 100,
      isEnrolled: true,
      isCompleted: true,
      xpReward: 80,
      thumbnail: "/course-thumbnails/personal-finance.jpg",
      tags: ["budgeting", "savings", "beginner"],
      learningPath: "Financial Planning"
    }
  ];

  const lessons = [
    {
      id: "1",
      title: "What is Stock Market?",
      type: "video",
      duration: 8,
      category: "basics",
      level: "beginner",
      isCompleted: true,
      isLocked: false,
      xpReward: 20,
      courseId: "1"
    },
    {
      id: "2",
      title: "Understanding Stock Exchanges",
      type: "article",
      duration: 5,
      category: "basics",
      level: "beginner",
      isCompleted: true,
      isLocked: false,
      xpReward: 15,
      courseId: "1"
    },
    {
      id: "3",
      title: "Types of Stocks",
      type: "video",
      duration: 12,
      category: "basics",
      level: "beginner",
      isCompleted: false,
      isLocked: false,
      xpReward: 25,
      courseId: "1"
    },
    {
      id: "4",
      title: "How to Read Financial Statements",
      type: "interactive",
      duration: 15,
      category: "fundamentals",
      level: "intermediate",
      isCompleted: false,
      isLocked: true,
      xpReward: 30,
      courseId: "1"
    }
  ];

  const learningPaths = [
    {
      id: "1",
      title: "Investment Foundations",
      description: "Start your investment journey with the basics",
      courses: 4,
      duration: "3 weeks",
      level: "beginner",
      progress: 50,
      enrolled: 25000,
      icon: Briefcase,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "2",
      title: "Advanced Trading",
      description: "Master advanced trading strategies",
      courses: 6,
      duration: "8 weeks",
      level: "advanced",
      progress: 0,
      enrolled: 8500,
      icon: TrendUp,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "3",
      title: "Financial Planning",
      description: "Plan your financial future",
      courses: 5,
      duration: "4 weeks",
      level: "intermediate",
      progress: 20,
      enrolled: 12000,
      icon: Shield,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const achievements = [
    {
      id: "1",
      title: "Quick Learner",
      description: "Complete 5 lessons in one day",
      icon: Trophy,
      isUnlocked: true,
      unlockedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Course Master",
      description: "Complete your first course",
      icon: Award,
      isUnlocked: true,
      unlockedAt: "2024-01-10"
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Complete 10 courses",
      icon: Brain,
      isUnlocked: false,
      progress: 4
    }
  ];

  const stats = {
    totalCourses: 4,
    completedCourses: 1,
    totalLessons: 41,
    completedLessons: 12,
    totalXp: 450,
    currentStreak: 7,
    learningHours: 24
  };

  const categories = [
    { id: "all", name: "All Categories", icon: BookOpen },
    { id: "basics", name: "Basics", icon: Star },
    { id: "mutual-funds", name: "Mutual Funds", icon: BarChart3 },
    { id: "technical-analysis", name: "Technical Analysis", icon: TrendUp },
    { id: "personal-finance", name: "Personal Finance", icon: Shield }
  ];

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  const getFilteredCourses = () => {
    return courses.filter(course => {
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    });
  };

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-white" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription className="mt-1">{course.description}</CardDescription>
          </div>
          <Badge className={course.level === "beginner" ? "bg-green-100 text-green-800" : 
                           course.level === "intermediate" ? "bg-yellow-100 text-yellow-800" : 
                           "bg-red-100 text-red-800"}>
            {course.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Play className="h-4 w-4" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Progress */}
          {course.isEnrolled && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action */}
          <div className="flex space-x-2">
            {course.isCompleted ? (
              <Button variant="outline" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </Button>
            ) : course.isEnrolled ? (
              <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                {course.progress > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            ) : (
              <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Enroll Now
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Target className="h-4 w-4" />
            </Button>
          </div>

          {/* XP Reward */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">XP Reward:</span>
            <Badge className="bg-purple-100 text-purple-800">
              +{course.xpReward} XP
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout user={{
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      avatar: "/placeholder-avatar.jpg",
      level: 5,
      xp: 2500,
      nextLevelXp: 3000,
      walletBalance: 15000,
      notifications: 3
    }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span>Learning Academy</span>
              <Badge className="bg-green-100 text-green-800">
                <Trophy className="h-3 w-3 mr-1" />
                Earn XP
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">
              Master investing with our comprehensive courses and earn rewards while learning
            </p>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCourses}</div>
              <div className="text-sm text-gray-600">Courses</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completedCourses}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.completedLessons}/{stats.totalLessons}</div>
              <div className="text-sm text-gray-600">Lessons</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.totalXp}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.learningHours}h</div>
              <div className="text-sm text-gray-600">Learning Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="lessons">Individual Lessons</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredCourses().map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${path.color}`}>
                        <path.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Courses</div>
                          <div className="font-medium">{path.courses}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Duration</div>
                          <div className="font-medium">{path.duration}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{path.enrolled.toLocaleString()} enrolled</span>
                        <Badge className={path.level === "beginner" ? "bg-green-100 text-green-800" : 
                                         path.level === "intermediate" ? "bg-yellow-100 text-yellow-800" : 
                                         "bg-red-100 text-red-800"}>
                          {path.level}
                        </Badge>
                      </div>

                      <Button className="w-full">
                        {path.progress > 0 ? "Continue Path" : "Start Path"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          lesson.isCompleted ? "bg-green-100 text-green-600" :
                          lesson.isLocked ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-600"
                        }`}>
                          {lesson.type === "video" && <Play className="h-5 w-5" />}
                          {lesson.type === "article" && <BookOpen className="h-5 w-5" />}
                          {lesson.type === "interactive" && <Target className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.duration} min</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                            <Badge className={`text-xs ${
                              lesson.level === "beginner" ? "bg-green-100 text-green-800" :
                              lesson.level === "intermediate" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {lesson.level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-purple-100 text-purple-800">
                          +{lesson.xpReward} XP
                        </Badge>
                        {lesson.isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : lesson.isLocked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Button size="sm">Start</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      achievement.isUnlocked ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      <achievement.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-medium mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                    
                    {achievement.isUnlocked ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                        <div className="text-xs text-gray-500">
                          Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-gray-500">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                        {achievement.progress !== undefined && (
                          <div className="text-xs text-gray-500">
                            Progress: {achievement.progress}/10
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}