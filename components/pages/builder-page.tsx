"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useAgentDatabase } from "@/lib/agent-database-context"
import {
  Bot,
  Upload,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Zap,
  DollarSign,
  Globe,
  Key,
  FileText,
  Tag,
  Loader2,
  BarChart3,
  Edit,
  Trash2,
  Eye,
  Copy,
  Clock,
  XCircle,
  Sparkles,
  Stars,
} from "lucide-react"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const agentTypes = [
  { value: "conversational", label: "Conversational AI", description: "Chat-based interactions" },
  { value: "automation", label: "Automation Agent", description: "Task automation and workflows" },
  { value: "analytics", label: "Analytics Agent", description: "Data analysis and insights" },
  { value: "creative", label: "Creative Agent", description: "Content and design generation" },
  { value: "research", label: "Research Agent", description: "Information gathering and analysis" },
  { value: "customer-service", label: "Customer Service", description: "Support and assistance" },
]

const categories = [
  "Marketing",
  "Sales",
  "Customer Service",
  "Operations",
  "HR",
  "Finance",
  "Creative",
  "Research",
  "Travel",
  "News & Media",
  "E-commerce",
  "Healthcare",
  "Education",
  "Legal",
  "Real Estate",
  "Logistics",
]

const priceTypes = [
  { value: "month", label: "per month" },
  { value: "week", label: "per week" },
  { value: "day", label: "per day" },
  { value: "usage", label: "per usage" },
  { value: "free", label: "free" },
]

// Mock analytics data
const usageAnalyticsData = [
  { date: "2024-01", totalUsage: 1200, apiCalls: 800, activeUsers: 45 },
  { date: "2024-02", totalUsage: 1800, apiCalls: 1200, activeUsers: 67 },
  { date: "2024-03", totalUsage: 2400, apiCalls: 1600, activeUsers: 89 },
  { date: "2024-04", totalUsage: 3200, apiCalls: 2100, activeUsers: 112 },
  { date: "2024-05", totalUsage: 2800, apiCalls: 1900, activeUsers: 98 },
  { date: "2024-06", totalUsage: 4100, apiCalls: 2800, activeUsers: 134 },
  { date: "2024-07", totalUsage: 3600, apiCalls: 2400, activeUsers: 121 },
  { date: "2024-08", totalUsage: 4800, apiCalls: 3200, activeUsers: 156 },
  { date: "2024-09", totalUsage: 5200, apiCalls: 3500, activeUsers: 178 },
  { date: "2024-10", totalUsage: 4600, apiCalls: 3100, activeUsers: 165 },
  { date: "2024-11", totalUsage: 6100, apiCalls: 4200, activeUsers: 201 },
  { date: "2024-12", totalUsage: 7200, apiCalls: 4900, activeUsers: 234 },
]

const revenueAnalyticsData = [
  { month: "Jan", revenue: 2400, subscriptions: 12, oneTime: 800 },
  { month: "Feb", revenue: 3200, subscriptions: 16, oneTime: 1200 },
  { month: "Mar", revenue: 4100, subscriptions: 21, oneTime: 1600 },
  { month: "Apr", revenue: 3800, subscriptions: 19, oneTime: 1400 },
  { month: "May", revenue: 5200, subscriptions: 26, oneTime: 2000 },
  { month: "Jun", revenue: 4600, subscriptions: 23, oneTime: 1800 },
  { month: "Jul", revenue: 6800, subscriptions: 34, oneTime: 2600 },
  { month: "Aug", revenue: 7200, subscriptions: 36, oneTime: 2800 },
  { month: "Sep", revenue: 8100, subscriptions: 41, oneTime: 3200 },
  { month: "Oct", revenue: 7600, subscriptions: 38, oneTime: 3000 },
  { month: "Nov", revenue: 9200, subscriptions: 46, oneTime: 3600 },
  { month: "Dec", revenue: 10800, subscriptions: 54, oneTime: 4200 },
]

const agentPerformanceData = [
  { name: "ChatBot Pro", usage: 2400, revenue: 3200, rating: 4.8 },
  { name: "Analytics AI", usage: 1800, revenue: 2800, rating: 4.6 },
  { name: "Content Creator", usage: 1200, revenue: 1900, rating: 4.9 },
  { name: "Research Assistant", usage: 900, revenue: 1400, rating: 4.5 },
  { name: "Customer Support", usage: 1500, revenue: 2100, rating: 4.7 },
]

const revenueByAgentData = [
  { name: "ChatBot Pro", value: 3200, color: "#8b5cf6" },
  { name: "Analytics AI", value: 2800, color: "#06b6d4" },
  { name: "Content Creator", value: 1900, color: "#10b981" },
  { name: "Research Assistant", value: 1400, color: "#f59e0b" },
  { name: "Customer Support", value: 2100, color: "#ef4444" },
  { name: "Others", value: 800, color: "#6b7280" },
]

const chartConfig = {
  totalUsage: {
    label: "Total Usage",
    color: "hsl(var(--chart-1))",
  },
  apiCalls: {
    label: "API Calls",
    color: "hsl(var(--chart-2))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--chart-3))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-2))",
  },
  oneTime: {
    label: "One-time",
    color: "hsl(var(--chart-3))",
  },
}

export function BuilderPage() {
  const [activeTab, setActiveTab] = useState("submit")
  const { user } = useAuth()
  const { submitAgent, getSubmissionsByBuilder } = useAgentDatabase()

  // Agent submission form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    type: "",
    category: "",
    apiUrl: "",
    apiKey: "",
    price: 0,
    priceType: "month",
    tags: [] as string[],
    features: [] as string[],
  })

  const [currentTag, setCurrentTag] = useState("")
  const [currentFeature, setCurrentFeature] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const userSubmissions = user ? getSubmissionsByBuilder(user.email) : []

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const addFeature = () => {
    if (currentFeature.trim() && !formData.features.includes(currentFeature.trim())) {
      setFormData((prev) => ({ ...prev, features: [...prev.features, currentFeature.trim()] }))
      setCurrentFeature("")
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setFormData((prev) => ({ ...prev, features: prev.features.filter((feature) => feature !== featureToRemove) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    if (!user) {
      setSubmitStatus({ type: "error", message: "You must be logged in to submit an agent" })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitAgent({
        name: formData.name,
        description: formData.description,
        longDescription: formData.longDescription,
        type: formData.type,
        category: formData.category,
        apiUrl: formData.apiUrl,
        apiKey: formData.apiKey,
        tags: formData.tags,
        pricing: {
          price: formData.price,
          priceType: formData.priceType,
        },
        features: formData.features,
        submittedBy: user.id,
        builderInfo: {
          name: user.name,
          email: user.email,
          company: user.company,
        },
      })

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: `Agent "${formData.name}" submitted successfully! Submission ID: ${result.submissionId}`,
        })
        // Reset form
        setFormData({
          name: "",
          description: "",
          longDescription: "",
          type: "",
          category: "",
          apiUrl: "",
          apiKey: "",
          price: 0,
          priceType: "month",
          tags: [],
          features: [],
        })
      } else {
        setSubmitStatus({ type: "error", message: result.error || "Failed to submit agent" })
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "published":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "approved":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "published":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  // Calculate stats
  const stats = {
    totalAgents: userSubmissions.length,
    publishedAgents: userSubmissions.filter((s) => s.status === "published").length,
    pendingAgents: userSubmissions.filter((s) => s.status === "pending").length,
    totalRevenue: userSubmissions
      .filter((s) => s.status === "published")
      .reduce((sum, s) => sum + s.pricing.price * 100, 0), // Mock revenue calculation
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs with enhanced animations */}
        <div
          className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl animate-glow-pulse-slow opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(79, 70, 229, 0.3) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-glow-pulse-medium opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(147, 51, 234, 0.25) 40%, rgba(168, 85, 247, 0.15) 70%, transparent 100%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl animate-glow-pulse-fast opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(124, 58, 237, 0.1) 80%, transparent 100%)",
            animationDelay: "6s",
          }}
        />

        {/* Additional gradient orbs for more depth */}
        <div
          className="absolute top-10 right-10 w-64 h-64 rounded-full blur-2xl animate-drift-diagonal opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(219, 39, 119, 0.15) 50%, transparent 100%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-56 h-56 rounded-full blur-2xl animate-drift-reverse opacity-18"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 100%)",
            animationDelay: "4s",
          }}
        />

        {/* Rotating gradient rings */}
        <div className="absolute top-1/3 right-1/3 w-48 h-48 animate-spin-slow opacity-10">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.3), rgba(147, 51, 234, 0.3))",
              filter: "blur(20px)",
            }}
          />
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 animate-spin-reverse opacity-12">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.2), rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))",
              filter: "blur(15px)",
            }}
          />
        </div>

        {/* Enhanced floating particles with different sizes */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute animate-drift-${i % 4 === 0 ? "slow" : i % 3 === 0 ? "medium" : "fast"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          >
            <div
              className={`bg-purple-400/20 rounded-full animate-pulse ${
                i % 5 === 0 ? "w-2 h-2" : i % 3 === 0 ? "w-1.5 h-1.5" : "w-1 h-1"
              }`}
              style={{
                boxShadow: "0 0 10px rgba(147, 51, 234, 0.3)",
              }}
            />
          </div>
        ))}

        {/* Animated mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-5 animate-mesh-shift"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
            `,
          }}
        />

        {/* Glowing geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 animate-float opacity-8">
          <div
            className="w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 transform rotate-45 rounded-lg"
            style={{
              filter: "blur(8px)",
              boxShadow: "0 0 30px rgba(147, 51, 234, 0.2)",
            }}
          />
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 animate-float-reverse opacity-10">
          <div
            className="w-full h-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full"
            style={{
              filter: "blur(6px)",
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.2)",
            }}
          />
        </div>

        {/* Pulsing light beams */}
        <div
          className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-beam opacity-15"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse-beam opacity-12"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Main Content Container - Properly spaced below navbar */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Enhanced Header with proper spacing */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-8">
              <div
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-2xl relative"
                style={{
                  boxShadow: "0 0 40px rgba(147, 51, 234, 0.4), 0 0 80px rgba(147, 51, 234, 0.2)",
                }}
              >
                <Bot className="h-10 w-10 text-white animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl animate-ping opacity-20" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-violet-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-gradient-shift">
              Builder Portal
            </h1>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-purple-400 mr-2 animate-pulse" />
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Welcome {user?.name}! Create, manage, and monetize your AI agents
              </p>
              <Stars className="h-6 w-6 text-violet-400 ml-2 animate-pulse" />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full animate-pulse" />
          </div>

          {/* Enhanced Tabs Container */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Modern Tab Navigation */}
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-2 shadow-2xl max-w-4xl w-full">
                {[
                  { value: "submit", label: "Submit Agent", icon: Upload },
                  { value: "overview", label: "Overview", icon: BarChart3 },
                  { value: "agents", label: "My Agents", icon: Bot },
                  { value: "analytics", label: "Analytics", icon: Sparkles },
                ].map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25 rounded-xl transition-all duration-300 transform data-[state=active]:scale-105 flex items-center gap-2 text-sm sm:text-base lg:text-lg py-3 px-4 font-medium"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="submit" className="space-y-8 animate-fade-in-up">
              {/* Enhanced Submission Status */}
              {submitStatus && (
                <Alert
                  className={`${
                    submitStatus.type === "success"
                      ? "border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20"
                      : "border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20"
                  } backdrop-blur-xl rounded-2xl max-w-4xl mx-auto`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
                  )}
                  <AlertDescription
                    className={`${submitStatus.type === "success" ? "text-green-300" : "text-red-300"} text-base sm:text-lg`}
                  >
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Enhanced Agent Submission Form */}
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Enhanced Basic Information Card */}
                  <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5" />
                    <CardHeader className="relative pb-6">
                      <CardTitle className="text-white flex items-center text-2xl sm:text-3xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        Basic Information
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                        Provide the essential details about your AI agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-white font-medium text-lg flex items-center">
                            <Bot className="h-4 w-4 mr-2 text-purple-400" />
                            Agent Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your agent's name"
                            className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 h-12 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="category" className="text-white font-medium text-lg flex items-center">
                            <Tag className="h-4 w-4 mr-2 text-purple-400" />
                            Category *
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleInputChange("category", value)}
                          >
                            <SelectTrigger className="bg-black/60 border-gray-600 text-white h-12 text-lg rounded-xl backdrop-blur-sm">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900/95 border-gray-600 backdrop-blur-xl rounded-xl">
                              {categories.map((category) => (
                                <SelectItem
                                  key={category}
                                  value={category}
                                  className="text-white hover:bg-purple-900/50 text-base py-3"
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="description" className="text-white font-medium text-lg">
                          Short Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Brief description of what your agent does (max 200 characters)"
                          className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 min-h-[120px] text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                          maxLength={200}
                          required
                        />
                        <p className="text-sm text-gray-400 flex justify-between">
                          <span>{formData.description.length}/200 characters</span>
                          <span className="text-purple-400">Keep it concise and engaging</span>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="longDescription" className="text-white font-medium text-lg">
                          Detailed Description
                        </Label>
                        <Textarea
                          id="longDescription"
                          value={formData.longDescription}
                          onChange={(e) => handleInputChange("longDescription", e.target.value)}
                          placeholder="Provide a detailed description of your agent's capabilities, use cases, and benefits"
                          className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 min-h-[140px] text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Technical Configuration Card */}
                  <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                    <CardHeader className="relative pb-6">
                      <CardTitle className="text-white flex items-center text-2xl sm:text-3xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        Technical Configuration
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                        Configure the technical aspects of your agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative">
                      <div className="space-y-3">
                        <Label htmlFor="type" className="text-white font-medium text-lg">
                          Agent Type *
                        </Label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger className="bg-black/60 border-gray-600 text-white h-12 text-lg rounded-xl backdrop-blur-sm">
                            <SelectValue placeholder="Select agent type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900/95 border-gray-600 backdrop-blur-xl rounded-xl">
                            {agentTypes.map((type) => (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-white hover:bg-purple-900/50 py-3"
                              >
                                <div>
                                  <div className="font-medium text-base">{type.label}</div>
                                  <div className="text-sm text-gray-400">{type.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="apiUrl" className="text-white font-medium flex items-center text-lg">
                            <Globe className="h-4 w-4 mr-2 text-blue-400" />
                            API URL *
                          </Label>
                          <Input
                            id="apiUrl"
                            type="url"
                            value={formData.apiUrl}
                            onChange={(e) => handleInputChange("apiUrl", e.target.value)}
                            placeholder="https://api.youragent.com/v1"
                            className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="apiKey" className="text-white font-medium flex items-center text-lg">
                            <Key className="h-4 w-4 mr-2 text-blue-400" />
                            API Key
                          </Label>
                          <Input
                            id="apiKey"
                            type="password"
                            value={formData.apiKey}
                            onChange={(e) => handleInputChange("apiKey", e.target.value)}
                            placeholder="Optional: API key for authentication"
                            className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Pricing Card */}
                  <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-purple-500/5" />
                    <CardHeader className="relative pb-6">
                      <CardTitle className="text-white flex items-center text-2xl sm:text-3xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        Pricing
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                        Set the pricing for your agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="price" className="text-white font-medium text-lg">
                            Price
                          </Label>
                          <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 h-12 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="priceType" className="text-white font-medium text-lg">
                            Billing Period
                          </Label>
                          <Select
                            value={formData.priceType}
                            onValueChange={(value) => handleInputChange("priceType", value)}
                          >
                            <SelectTrigger className="bg-black/60 border-gray-600 text-white h-12 text-lg rounded-xl backdrop-blur-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900/95 border-gray-600 backdrop-blur-xl rounded-xl">
                              {priceTypes.map((type) => (
                                <SelectItem
                                  key={type.value}
                                  value={type.value}
                                  className="text-white hover:bg-purple-900/50 text-base py-3"
                                >
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Tags and Features Card */}
                  <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-pink-500/5" />
                    <CardHeader className="relative pb-6">
                      <CardTitle className="text-white flex items-center text-2xl sm:text-3xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-violet-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <Tag className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        Tags & Features
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                        Add tags and features to help users discover your agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 relative">
                      {/* Enhanced Tags */}
                      <div className="space-y-4">
                        <Label className="text-white font-medium text-lg">Tags</Label>
                        <div className="flex gap-3">
                          <Input
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            placeholder="Add a tag"
                            className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 h-12 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 h-12 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {formData.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-violet-500/20 text-violet-300 border-violet-500/40 px-3 py-2 text-base rounded-xl shadow-lg backdrop-blur-sm"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:text-red-400 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Features */}
                      <div className="space-y-4">
                        <Label className="text-white font-medium text-lg">Key Features</Label>
                        <div className="flex gap-3">
                          <Input
                            value={currentFeature}
                            onChange={(e) => setCurrentFeature(e.target.value)}
                            placeholder="Add a feature"
                            className="bg-black/60 border-gray-600 text-white placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 h-12 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                          />
                          <Button
                            type="button"
                            onClick={addFeature}
                            className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 h-12 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {formData.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center justify-between bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50"
                            >
                              <span className="text-gray-300 text-lg">{feature}</span>
                              <button
                                type="button"
                                onClick={() => removeFeature(feature)}
                                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Submit Button */}
                  <div className="text-center pt-8">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:via-violet-700 hover:to-purple-800 text-white font-bold py-6 px-16 text-xl rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                      style={{
                        boxShadow: "0 0 40px rgba(147, 51, 234, 0.3)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 opacity-0 hover:opacity-20 transition-opacity duration-300" />
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                          Submitting Agent...
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 mr-3" />
                          Submit Agent for Review
                        </>
                      )}
                    </Button>
                    <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
                      Your agent will be reviewed by our team and published within 24-48 hours.
                      <span className="text-purple-400 font-medium"> Get ready to monetize your creation!</span>
                    </p>
                  </div>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="overview" className="space-y-8 animate-fade-in-up">
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Total Agents",
                    value: stats.totalAgents,
                    icon: Bot,
                    color: "purple",
                    subtitle: `${stats.publishedAgents} published, ${stats.pendingAgents} pending`,
                  },
                  {
                    title: "Published",
                    value: stats.publishedAgents,
                    icon: CheckCircle,
                    color: "green",
                    subtitle: "Live on marketplace",
                  },
                  {
                    title: "Revenue",
                    value: `$${stats.totalRevenue}`,
                    icon: DollarSign,
                    color: "emerald",
                    subtitle: "This month",
                  },
                  { title: "Avg Rating", value: "4.8", icon: BarChart3, color: "blue", subtitle: "Across all agents" },
                ].map((stat, index) => (
                  <Card
                    key={stat.title}
                    className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative group hover:scale-105 transition-all duration-300"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/5 to-purple-500/5 group-hover:from-${stat.color}-500/10 group-hover:to-purple-500/10 transition-all duration-300`}
                    />
                    <CardHeader className="pb-3 relative">
                      <CardTitle className="text-base font-medium flex items-center text-gray-300">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r from-${stat.color}-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg`}
                        >
                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                        {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <p className="text-sm text-gray-400">{stat.subtitle}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Recent Activity */}
              <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
                <CardHeader className="relative">
                  <CardTitle className="text-white text-2xl sm:text-3xl flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                    Latest updates on your agents
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  {userSubmissions.length > 0 ? (
                    <div className="space-y-4">
                      {userSubmissions.slice(0, 5).map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm"
                        >
                          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            {getStatusIcon(submission.status)}
                          </div>
                          <div className="flex-1">
                            <p className="text-base font-medium text-white">
                              Agent "{submission.name}" is {submission.status}
                            </p>
                            <p className="text-sm text-gray-400">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Bot className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">No agents submitted yet</h3>
                      <p className="text-gray-400 text-base mb-6">Start your AI agent journey today!</p>
                      <Button
                        onClick={() => setActiveTab("submit")}
                        className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-lg py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Submit Your First Agent
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents" className="space-y-6 animate-fade-in-up">
              {userSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {userSubmissions.map((submission) => (
                    <Card
                      key={submission.id}
                      className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative group hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 group-hover:from-purple-500/10 group-hover:to-violet-500/10 transition-all duration-300" />
                      <CardContent className="p-6 relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/30 to-violet-600/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                              <Bot className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-xl text-white mb-2">{submission.name}</h3>
                              <p className="text-base text-gray-400 mb-3">{submission.description}</p>
                              <div className="flex flex-wrap items-center gap-4">
                                <Badge className={`${getStatusColor(submission.status)} text-sm py-1 px-3 rounded-lg`}>
                                  {submission.status}
                                </Badge>
                                <span className="text-sm text-gray-400">{submission.category}</span>
                                <span className="text-sm text-gray-400">
                                  ${submission.pricing.price}/{submission.pricing.priceType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {[
                              { icon: Edit, color: "blue" },
                              { icon: Eye, color: "green" },
                              { icon: Copy, color: "purple" },
                              { icon: Trash2, color: "red" },
                            ].map(({ icon: Icon, color }, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className={`border-gray-600 text-gray-300 hover:border-${color}-500 hover:text-${color}-400 hover:bg-${color}-500/10 w-10 h-10 rounded-xl transition-all duration-300 transform hover:scale-110`}
                              >
                                <Icon className="h-4 w-4" />
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5" />
                  <CardContent className="text-center py-16 relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <Bot className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">No Agents Yet</h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                      Start building your AI agent portfolio and join the revolution
                    </p>
                    <Button
                      onClick={() => setActiveTab("submit")}
                      className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-lg py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Submit Your First Agent
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8 animate-fade-in-up">
              {/* Analytics Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Total Usage",
                    value: "52.4K",
                    change: "+12.5%",
                    icon: BarChart3,
                    color: "purple",
                    trend: "up",
                  },
                  {
                    title: "Revenue Growth",
                    value: "+23.1%",
                    change: "vs last month",
                    icon: DollarSign,
                    color: "green",
                    trend: "up",
                  },
                  {
                    title: "Active Users",
                    value: "1,234",
                    change: "+8.2%",
                    icon: Bot,
                    color: "blue",
                    trend: "up",
                  },
                  {
                    title: "Avg Response Time",
                    value: "1.2s",
                    change: "-0.3s",
                    icon: Zap,
                    color: "orange",
                    trend: "down",
                  },
                ].map((metric, index) => (
                  <Card
                    key={metric.title}
                    className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative group hover:scale-105 transition-all duration-300"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-${metric.color}-500/5 to-purple-500/5 group-hover:from-${metric.color}-500/10 group-hover:to-purple-500/10 transition-all duration-300`}
                    />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r from-${metric.color}-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <metric.icon className="h-5 w-5 text-white" />
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            metric.trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {metric.change}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.title}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Usage Analytics Chart */}
              <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
                <CardHeader className="relative">
                  <CardTitle className="text-white text-2xl sm:text-3xl flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    Usage Analytics
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                    Track your agent usage patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={usageAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="totalUsage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                          </linearGradient>
                          <linearGradient id="apiCalls" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis
                          dataKey="date"
                          stroke="#9ca3af"
                          fontSize={12}
                          tickFormatter={(value) => value.slice(-2)}
                        />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <ChartTooltip
                          content={<ChartTooltipContent className="bg-gray-900/95 border-gray-700 rounded-xl" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Area
                          type="monotone"
                          dataKey="totalUsage"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          fill="url(#totalUsage)"
                          name="Total Usage"
                        />
                        <Area
                          type="monotone"
                          dataKey="apiCalls"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          fill="url(#apiCalls)"
                          name="API Calls"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Revenue Analytics and Agent Performance */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Revenue Analytics */}
                <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-purple-500/5" />
                  <CardHeader className="relative">
                    <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      Revenue Trends
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base sm:text-lg ml-11 sm:ml-13">
                      Monthly revenue breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                          <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                          <YAxis stroke="#9ca3af" fontSize={12} />
                          <ChartTooltip
                            content={<ChartTooltipContent className="bg-gray-900/95 border-gray-700 rounded-xl" />}
                          />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="subscriptions" fill="#10b981" name="Subscriptions" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="oneTime" fill="#06b6d4" name="One-time" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Revenue Distribution */}
                <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5" />
                  <CardHeader className="relative">
                    <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      Revenue by Agent
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base sm:text-lg ml-11 sm:ml-13">
                      Agent contribution breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={revenueByAgentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {revenueByAgentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-gray-900/95 border border-gray-700 rounded-xl p-3">
                                    <p className="text-white font-medium">{data.name}</p>
                                    <p className="text-green-400">${data.value.toLocaleString()}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {revenueByAgentData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-400 truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agent Performance Table */}
              <Card className="bg-black/50 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                <CardHeader className="relative">
                  <CardTitle className="text-white text-2xl sm:text-3xl flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    Agent Performance
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg sm:text-xl ml-14 sm:ml-16">
                    Detailed performance metrics for each agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-4 px-4 text-gray-300 font-medium">Agent Name</th>
                          <th className="text-left py-4 px-4 text-gray-300 font-medium">Usage</th>
                          <th className="text-left py-4 px-4 text-gray-300 font-medium">Revenue</th>
                          <th className="text-left py-4 px-4 text-gray-300 font-medium">Rating</th>
                          <th className="text-left py-4 px-4 text-gray-300 font-medium">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agentPerformanceData.map((agent, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-purple-400" />
                                </div>
                                <span className="text-white font-medium">{agent.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{agent.usage.toLocaleString()}</td>
                            <td className="py-4 px-4 text-green-400 font-medium">${agent.revenue.toLocaleString()}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-1">
                                <Stars className="h-4 w-4 text-yellow-400" />
                                <span className="text-white">{agent.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${(agent.usage / 2400) * 100}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <style jsx global>{`
        @keyframes glow-pulse-slow {
          0%, 100% { 
            opacity: 0.15; 
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.35; 
            transform: scale(1.1) rotate(180deg);
          }
        }

        @keyframes glow-pulse-medium {
          0%, 100% { 
            opacity: 0.12; 
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.28; 
            transform: scale(1.08) rotate(-180deg);
          }
        }

        @keyframes glow-pulse-fast {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.25; 
            transform: scale(1.05) rotate(360deg);
          }
        }

        @keyframes drift-diagonal {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.1;
          }
          25% { 
            transform: translateY(-30px) translateX(20px) rotate(90deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-15px) translateX(40px) rotate(180deg); 
            opacity: 0.15;
          }
          75% { 
            transform: translateY(-45px) translateX(10px) rotate(270deg); 
            opacity: 0.25;
          }
        }

        @keyframes drift-reverse {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.12;
          }
          33% { 
            transform: translateY(25px) translateX(-15px) rotate(-120deg); 
            opacity: 0.22;
          }
          66% { 
            transform: translateY(-10px) translateX(-30px) rotate(-240deg); 
            opacity: 0.18;
          }
        }

        @keyframes drift-slow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.08;
          }
          50% { 
            transform: translateY(-35px) translateX(15px); 
            opacity: 0.15;
          }
        }

        @keyframes drift-medium {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.06;
          }
          50% { 
            transform: translateY(-25px) translateX(-12px); 
            opacity: 0.12;
          }
        }

        @keyframes drift-fast {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.05;
          }
          50% { 
            transform: translateY(-20px) translateX(8px); 
            opacity: 0.1;
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.08;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.15;
          }
        }

        @keyframes float-reverse {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-15px) rotate(-180deg); 
            opacity: 0.18;
          }
        }

        @keyframes pulse-beam {
          0%, 100% { 
            opacity: 0.05; 
            transform: scaleY(1);
          }
          50% { 
            opacity: 0.2; 
            transform: scaleY(1.1);
          }
        }

        @keyframes mesh-shift {
          0%, 100% { 
            transform: translateX(0%) translateY(0%); 
          }
          25% { 
            transform: translateX(2%) translateY(-1%); 
          }
          50% { 
            transform: translateX(-1%) translateY(2%); 
          }
          75% { 
            transform: translateX(1%) translateY(-2%); 
          }
        }

        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-glow-pulse-slow {
          animation: glow-pulse-slow 12s ease-in-out infinite;
        }

        .animate-glow-pulse-medium {
          animation: glow-pulse-medium 10s ease-in-out infinite;
        }

        .animate-glow-pulse-fast {
          animation: glow-pulse-fast 8s ease-in-out infinite;
        }

        .animate-drift-diagonal {
          animation: drift-diagonal 25s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 20s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift-slow 30s ease-in-out infinite;
        }

        .animate-drift-medium {
          animation: drift-medium 25s ease-in-out infinite;
        }

        .animate-drift-fast {
          animation: drift-fast 20s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-float {
          animation: float 18s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 22s ease-in-out infinite;
        }

        .animate-pulse-beam {
          animation: pulse-beam 6s ease-in-out infinite;
        }

        .animate-mesh-shift {
          animation: mesh-shift 40s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
