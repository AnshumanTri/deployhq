"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Heart,
  Share,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
  Award,
  BookOpen,
  MessageSquare,
  Play,
} from "lucide-react"
import Link from "next/link"

interface AgentDetailPageProps {
  agentId: string
}

// Mock agent data with demo videos
const getAgentById = (id: string) => {
  const agents = [
    {
      id: 1,
      name: "AI Marketing Agent",
      description:
        "Supercharge your marketing campaigns with our AI Marketing Agent that delivers strategies, optimized content, and data-driven insights for business growth.",
      longDescription:
        "Our AI Marketing Agent revolutionizes how businesses approach marketing by combining advanced machine learning algorithms with deep market analysis. It automatically creates personalized marketing strategies, optimizes content for maximum engagement, and provides real-time insights that drive measurable business growth. Perfect for businesses looking to scale their marketing efforts while maintaining personalization at every touchpoint.",
      category: "Marketing",
      rating: 4.8,
      reviews: 1247,
      users: 12847,
      price: 29,
      priceType: "month",
      tags: ["Marketing", "Content", "Analytics", "Automation", "Strategy"],
      builder: {
        name: "MarketingAI Inc.",
        avatar: "/placeholder.svg?height=40&width=40&text=MAI",
        verified: true,
      },
      features: [
        "AI-powered content generation",
        "Advanced audience segmentation",
        "Automated campaign optimization",
        "Real-time performance analytics",
        "Multi-platform integration",
        "24/7 customer support",
      ],
      stats: {
        users: 12847,
        uptime: "99.9%",
        avgResponseTime: "1.2s",
      },
      performanceScore: 94,
      autonomyLevel: "High",
      robotImage: "/placeholder.svg?height=200&width=200&text=%F0%9F%A4%96",
      image: "/placeholder.svg?height=400&width=600&text=AI+Marketing+Agent+Demo",
      useCases: [
        "Social media campaign automation",
        "Email marketing personalization",
        "Content strategy development",
        "Lead generation optimization",
        "Brand sentiment analysis",
      ],
      researchHighlights: [
        "Increases conversion rates by 45% on average",
        "Reduces marketing spend by 30% through optimization",
        "Improves customer engagement by 60%",
      ],
      similarAgents: [
        { id: 2, name: "AI Travel Agent", rating: 4.9, category: "Travel" },
        { id: 5, name: "StyleSwap AI Agent", rating: 4.8, category: "Creative" },
      ],
    },
    // Add other agents here...
  ]

  return agents.find((agent) => agent.id === Number.parseInt(id)) || agents[0]
}

const reviews = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32&text=SC",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Incredible results! Our email open rates increased by 40% within the first month. The AI personalization is spot-on.",
    helpful: 24,
    position: "Marketing Director at TechCorp",
  },
  {
    id: 2,
    user: "Mike Johnson",
    avatar: "/placeholder.svg?height=32&width=32&text=MJ",
    rating: 5,
    date: "2024-01-08",
    comment: "Easy to set up and integrate. The automation features saved us hours of manual work every week.",
    helpful: 18,
    position: "CMO at StartupXYZ",
  },
  {
    id: 3,
    user: "Lisa Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32&text=LR",
    rating: 4,
    date: "2024-01-05",
    comment:
      "Great agent overall. The analytics dashboard is very comprehensive. Would love to see more customization options.",
    helpful: 12,
    position: "Growth Manager at ScaleUp",
  },
]

export function AgentDetailPage({ agentId }: AgentDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false)
  const agent = getAgentById(agentId)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl animate-glow-pulse opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.2) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-glow-pulse opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 100%)",
            animationDelay: "3s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={agent.robotImage || "/placeholder.svg"}
                    alt={`${agent.name} robot`}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {agent.name}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {agent.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium text-white">{agent.rating}</span>
                        <span className="text-gray-400 ml-1">({agent.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{agent.users.toLocaleString()} users</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{agent.description}</p>

                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={agent.builder.avatar || "/placeholder.svg"} />
                    <AvatarFallback>MAI</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-white font-medium">by {agent.builder.name}</span>
                    {agent.builder.verified && <CheckCircle className="h-4 w-4 text-blue-500 inline ml-2" />}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-6">
                <Button variant="outline" size="sm" onClick={() => setIsLiked(!isLiked)} className="border-gray-600">
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600">
                  <Share className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold text-white">{agent.performanceScore}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Performance Score</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-2xl font-bold text-white">{agent.autonomyLevel}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Autonomy Level</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold text-white">{agent.stats.avgResponseTime}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Response Time</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pricing Sidebar */}
          <div>
            <Card className="sticky top-4 bg-gray-900/80 border-gray-700">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                  <span className="text-3xl font-bold text-white">${agent.price}</span>
                  <span className="text-gray-400">/{agent.priceType}</span>
                </div>
                <p className="text-sm text-gray-400">per user</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold py-3 text-lg">
                  <Play className="h-5 w-5 mr-2" />
                  Use This Agent
                </Button>

                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  Start Free Trial
                </Button>

                <div className="pt-4 border-t border-gray-700 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Active Users</span>
                    <span className="font-medium text-white">{agent.users.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Uptime</span>
                    <span className="font-medium text-white">{agent.stats.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Support</span>
                    <span className="font-medium text-white">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900/50 border border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-purple-600">
              Features
            </TabsTrigger>
            <TabsTrigger value="use-cases" className="data-[state=active]:bg-purple-600">
              Use Cases
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-purple-600">
              Research
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-600">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="compare" className="data-[state=active]:bg-purple-600">
              Compare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                  About This Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg">{agent.longDescription}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Performance Score</span>
                      <span className="text-white font-medium">{agent.performanceScore}/100</span>
                    </div>
                    <Progress value={agent.performanceScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">User Satisfaction</span>
                      <span className="text-white font-medium">{Math.round(agent.rating * 20)}/100</span>
                    </div>
                    <Progress value={agent.rating * 20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Reliability</span>
                      <span className="text-white font-medium">99/100</span>
                    </div>
                    <Progress value={99} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-500" />
                  Key Features
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive capabilities that make this agent powerful
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {agent.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="use-cases" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-500" />
                  Use Cases
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-world applications where this agent excels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {agent.useCases.map((useCase, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <span className="text-purple-400 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-gray-300 font-medium">{useCase}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Research Highlights
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Data-driven insights and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.researchHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-300 font-medium">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-purple-500" />
                Customer Reviews
              </h3>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Write a Review
              </Button>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-white">{review.user}</p>
                            <p className="text-sm text-gray-400">{review.position}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-300 mb-3 leading-relaxed">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <button className="hover:text-white transition-colors">👍 Helpful ({review.helpful})</button>
                          <button className="hover:text-white transition-colors">Reply</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Similar Agents</CardTitle>
                <CardDescription className="text-gray-400">
                  Compare with other agents in similar categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {agent.similarAgents?.map((similarAgent) => (
                    <div key={similarAgent.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{similarAgent.name}</h4>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {similarAgent.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-white">{similarAgent.rating}</span>
                        </div>
                        <Link href={`/agents/${similarAgent.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            Compare
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
        @keyframes glow-pulse {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.05);
          }
        }

        .animate-glow-pulse {
          animation: glow-pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
