"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Star,
  Users,
  Plus,
  Check,
  ArrowRight,
  Megaphone,
  Plane,
  Newspaper,
  BookOpen,
  Palette,
  UserCheck,
  Headphones,
  TrendingUp,
  Settings,
  DollarSign,
  Paintbrush,
  Heart,
  GraduationCap,
  Scale,
  Home,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { AgentPreviewModal } from "@/components/agent-preview-modal"
import { AgentComparisonModal } from "@/components/agent-comparison-modal"
import { ComparisonIndicator } from "@/components/comparison-indicator"
import Link from "next/link"
import { StarField } from "@/components/star-field"
import dynamic from "next/dynamic"

// Dynamically import Spline for client-only rendering with a loading fallback
const LazySpline = dynamic(() => import("@splinetool/react-spline").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-violet-900/20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      <span className="ml-4 text-white/70 font-medium">Loading 3D Environment...</span>
    </div>
  ),
})

function SplineBackground({ scene }: { scene: string }) {
  return <LazySpline scene={scene} style={{ width: "100%", height: "100%" }} />
}

// Enhanced mock agent data (empty for now)
const mockAgents: any[] = []

// Categories
const categories = [
  { id: "all", label: "All Categories", icon: Settings },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "news-media", label: "News & Media", icon: Newspaper },
  { id: "research", label: "Research", icon: BookOpen },
  { id: "creative", label: "Creative", icon: Palette },
  { id: "human-resources", label: "Human Resources", icon: UserCheck },
  { id: "customer-support", label: "Customer Support", icon: Headphones },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "operations", label: "Operations", icon: Settings },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "design", label: "Design", icon: Paintbrush },
  { id: "healthcare", label: "Healthcare", icon: Heart },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "legal", label: "Legal", icon: Scale },
  { id: "real-estate", label: "Real Estate", icon: Home },
  { id: "e-commerce", label: "E-commerce", icon: ShoppingCart },
  { id: "logistics", label: "Logistics", icon: Truck },
]

const MAX_COMPARISON_AGENTS = 4

export function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [comparisonAgents, setComparisonAgents] = useState<any[]>([])
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)

  const handleAgentPreview = useCallback((agent: any) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }, [])

  const handleAddToComparison = useCallback((agent: any) => {
    setComparisonAgents((prev) => {
      if (prev.length < MAX_COMPARISON_AGENTS && !prev.find((a) => a.id === agent.id)) {
        return [...prev, agent]
      }
      return prev
    })
  }, [])

  const handleRemoveFromComparison = useCallback((agentId: number) => {
    setComparisonAgents((prev) => prev.filter((agent) => agent.id !== agentId))
  }, [])

  const handleClearComparison = useCallback(() => {
    setComparisonAgents([])
  }, [])

  const isAgentInComparison = useCallback(
    (agentId: number) => comparisonAgents.some((agent) => agent.id === agentId),
    [comparisonAgents],
  )

  const filteredAgents = useMemo(() => {
    return mockAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory =
        selectedCategory === "all" ||
        agent.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory ||
        (selectedCategory === "news-media" && agent.category === "News & Media") ||
        (selectedCategory === "human-resources" && agent.category === "Human Resources") ||
        (selectedCategory === "customer-support" && agent.category === "Customer Support")

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <SplineBackground scene="https://prod.spline.design/ddziQQCLOwzEev9x/scene.splinecode" />
      </div>

      {/* Moving Stars */}
      <StarField className="z-5" count={60} />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen text-white">
        <div className="container mx-auto px-6 pt-20 pb-20">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="bg-black/20 backdrop-blur-md rounded-3xl p-12 border border-white/10 shadow-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                  AI Agents Marketplace
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed font-medium">
                Discover powerful AI agents designed to transform your workflow and boost productivity across all
                industries
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto relative">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-violet-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-purple-300 h-6 w-6 z-10" />
                    <Input
                      placeholder="Search AI Agents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-16 pr-6 py-6 text-xl bg-black/50 backdrop-blur-md border-purple-400/50 text-white placeholder:text-white/70 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-300 transition-all duration-300 shadow-2xl font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-16">
            <div className="bg-black/15 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        px-6 py-3 rounded-2xl text-base font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-3 shadow-lg
                        ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25 border-0"
                            : "bg-black/30 backdrop-blur-md border-white/30 text-white/90 hover:bg-purple-900/40 hover:border-purple-300/60 hover:text-white"
                        }
                      `}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{category.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Agents Grid or Empty State */}
          {filteredAgents.length > 0 ? (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group bg-black/40 backdrop-blur-md border-white/20 hover:border-purple-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden relative transform hover:scale-105 min-h-[400px] shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToComparison(agent)}
                    disabled={comparisonAgents.length >= MAX_COMPARISON_AGENTS || isAgentInComparison(agent.id)}
                    className={`absolute top-6 right-6 z-10 transition-all duration-200 backdrop-blur-md shadow-lg ${
                      isAgentInComparison(agent.id)
                        ? "bg-green-500/30 text-green-300 hover:bg-green-500/40 border border-green-400/40"
                        : "bg-black/50 hover:bg-purple-900/50 text-white hover:text-purple-300 border border-white/30"
                    }`}
                  >
                    {isAgentInComparison(agent.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>

                  <CardContent className="p-8 h-full flex flex-col relative z-10">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:border-purple-300/60 transition-all duration-300 shadow-lg">
                          <Settings className="h-6 w-6 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300 leading-tight">
                            {agent.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-md text-purple-200 border-white/30 transition-all duration-300 shadow-lg"
                          >
                            {agent.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/80 text-base leading-relaxed mb-8 flex-grow group-hover:text-white/90 transition-colors duration-300 font-medium">
                      {agent.description}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-bold text-white text-base">{agent.rating}</span>
                            <span className="text-white/70 ml-2 font-medium">({agent.reviews.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center text-white/70 group-hover:text-white/80 transition-colors duration-300">
                            <Users className="h-5 w-5 mr-2" />
                            <span className="font-semibold">{agent.users.toLocaleString()} users</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">
                          ${agent.price}
                          <span className="text-base text-white/70 font-semibold">/{agent.priceType}</span>
                        </div>
                        <div className="text-sm text-purple-300 font-bold">{agent.autonomyLevel} Autonomy</div>
                      </div>
                    </div>

                    <Link href={`/agents/${agent.id}`}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-bold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 shadow-2xl">
                        <span className="flex items-center justify-center">
                          Try AI Agent
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center mt-20">
              <div className="max-w-2xl mx-auto">
                <div className="bg-black/30 backdrop-blur-md rounded-3xl p-16 border border-white/20 relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Search className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">No AI Agents Deployed Yet</h3>
                    <p className="text-white/80 text-xl leading-relaxed font-medium">
                      Be the first to deploy an AI agent! Use our Builder Portal to create and deploy your custom AI
                      agents. Once deployed, they'll appear here for the community to discover and use.
                    </p>
                    <Link href="/builder">
                      <Button className="mt-8 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg shadow-2xl font-bold">
                        Deploy Your First Agent
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ComparisonIndicator
        agents={comparisonAgents}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onRemoveAgent={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
      />

      <AgentPreviewModal agent={selectedAgent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AgentComparisonModal
        agents={comparisonAgents}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onRemoveAgent={handleRemoveFromComparison}
      />
    </div>
  )
}
