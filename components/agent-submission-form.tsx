"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
} from "lucide-react"

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

export function AgentSubmissionForm() {
  const { user } = useAuth()
  const { submitAgent } = useAgentDatabase()

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
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
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl animate-glow-pulse opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)",
            animationDelay: "6s",
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-drift-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            <div className="w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            Submit Your AI Agent
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Share your AI agent with the world. Fill out the form below to submit your agent for review and publication
            on our marketplace.
          </p>
        </div>

        {/* Submission Status */}
        {submitStatus && (
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in-up">
            <Alert
              className={`${submitStatus.type === "success" ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertDescription className={submitStatus.type === "success" ? "text-green-300" : "text-red-300"}>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 animate-fade-in-up delay-200">
          {/* Basic Information */}
          <Card className="bg-black/40 backdrop-blur-md border-purple-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-400" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Provide the essential details about your AI agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-medium">
                    Agent Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your agent's name"
                    className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white font-medium">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-purple-900/50">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white font-medium">
                  Short Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of what your agent does (max 200 characters)"
                  className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 min-h-[100px]"
                  maxLength={200}
                  required
                />
                <p className="text-sm text-gray-400">{formData.description.length}/200 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription" className="text-white font-medium">
                  Detailed Description
                </Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange("longDescription", e.target.value)}
                  placeholder="Provide a detailed description of your agent's capabilities, use cases, and benefits"
                  className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400 min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Configuration */}
          <Card className="bg-black/40 backdrop-blur-md border-purple-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-400" />
                Technical Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">Configure the technical aspects of your agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-white font-medium">
                  Agent Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600">
                    {agentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white hover:bg-purple-900/50">
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-400">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="apiUrl" className="text-white font-medium flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    API URL *
                  </Label>
                  <Input
                    id="apiUrl"
                    type="url"
                    value={formData.apiUrl}
                    onChange={(e) => handleInputChange("apiUrl", e.target.value)}
                    placeholder="https://api.youragent.com/v1"
                    className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-white font-medium flex items-center">
                    <Key className="h-4 w-4 mr-1" />
                    API Key
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => handleInputChange("apiKey", e.target.value)}
                    placeholder="Optional: API key for authentication"
                    className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="bg-black/40 backdrop-blur-md border-purple-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                Pricing
              </CardTitle>
              <CardDescription className="text-gray-400">Set the pricing for your agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-white font-medium">
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
                    className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceType" className="text-white font-medium">
                    Billing Period
                  </Label>
                  <Select value={formData.priceType} onValueChange={(value) => handleInputChange("priceType", value)}>
                    <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      {priceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-purple-900/50">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags and Features */}
          <Card className="bg-black/40 backdrop-blur-md border-purple-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Tag className="h-5 w-5 mr-2 text-purple-400" />
                Tags & Features
              </CardTitle>
              <CardDescription className="text-gray-400">
                Add tags and features to help users discover your agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Key Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    placeholder="Add a feature"
                    className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-400"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature) => (
                    <div key={feature} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                      <span className="text-gray-300">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-bold py-4 px-12 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting Agent...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-2" />
                  Submit Agent for Review
                </>
              )}
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              Your agent will be reviewed by our team and published within 24-48 hours
            </p>
          </div>
        </form>
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

        @keyframes drift-slow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.05;
          }
          50% { 
            transform: translateY(-25px) translateX(12px); 
            opacity: 0.12;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-glow-pulse {
          animation: glow-pulse 8s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift-slow 30s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-200 { animation-delay: 200ms; }
      `}</style>
    </div>
  )
}
