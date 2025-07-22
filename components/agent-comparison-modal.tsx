"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Users, DollarSign, CheckCircle, X, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

interface Agent {
  id: number
  name: string
  description: string
  longDescription: string
  category: string
  rating: number
  reviews: number
  price: number
  priceType: string
  tags: string[]
  builder: {
    name: string
    avatar: string
    verified: boolean
  }
  features: string[]
  stats: {
    users: number
    uptime: string
    avgResponseTime: string
  }
  image: string
}

interface AgentComparisonModalProps {
  agents: Agent[]
  isOpen: boolean
  onClose: () => void
  onRemoveAgent: (agentId: number) => void
}

export function AgentComparisonModal({ agents, isOpen, onClose, onRemoveAgent }: AgentComparisonModalProps) {
  if (agents.length === 0) return null

  // Get all unique features from all agents for comparison
  const allFeatures = Array.from(new Set(agents.flatMap((agent) => agent.features)))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-white flex items-center">
                <Zap className="h-6 w-6 text-purple-500 mr-2" />
                Compare AI Agents
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Compare features, pricing, and performance across {agents.length} agents
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {/* Mobile View - Stacked Cards */}
          <div className="block lg:hidden space-y-6">
            {agents.map((agent, index) => (
              <div key={agent.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{agent.name}</h3>
                      <p className="text-sm text-gray-400">by {agent.builder.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveAgent(agent.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Category & Rating</h4>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {agent.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-white">{agent.rating}</span>
                        <span className="text-gray-400 ml-1">({agent.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Pricing</h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-2xl font-bold text-white">${agent.price}</span>
                      <span className="text-gray-400">/{agent.priceType}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Key Stats</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-white">{agent.stats.users.toLocaleString()}</div>
                        <div className="text-gray-400">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-white">{agent.stats.uptime}</div>
                        <div className="text-gray-400">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-white">{agent.stats.avgResponseTime}</div>
                        <div className="text-gray-400">Response</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
                      Deploy
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-600 text-gray-300" asChild>
                      <Link href={`/agents/${agent.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Side-by-side Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <td className="p-4 w-48">
                      <div className="text-sm font-medium text-gray-400">Agent</div>
                    </td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveAgent(agent.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="space-y-3">
                          <img
                            src={agent.image || "/placeholder.svg"}
                            alt={agent.name}
                            className="w-20 h-20 rounded-lg object-cover mx-auto"
                          />
                          <div>
                            <h3 className="font-semibold text-white">{agent.name}</h3>
                            <div className="flex items-center justify-center space-x-1 mt-1">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={agent.builder.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {agent.builder.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-400">{agent.builder.name}</span>
                              {agent.builder.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                            </div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category Row */}
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium text-gray-300">Category</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {agent.category}
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium text-gray-300">Rating</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium text-white">{agent.rating}</span>
                          <span className="text-gray-400 ml-1">({agent.reviews})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Pricing Row */}
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium text-gray-300">Pricing</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-xl font-bold text-white">${agent.price}</span>
                          <span className="text-gray-400">/{agent.priceType}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Users Row */}
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium text-gray-300">Active Users</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="font-medium text-white">{agent.stats.users.toLocaleString()}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Uptime Row */}
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium text-gray-300">Uptime</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center">
                        <span className="font-medium text-white">{agent.stats.uptime}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Response Time Row */}
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium text-gray-300">Response Time</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4 text-center">
                        <span className="font-medium text-white">{agent.stats.avgResponseTime}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Features Section */}
                  <tr>
                    <td colSpan={agents.length + 1} className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Features Comparison</h3>
                    </td>
                  </tr>

                  {allFeatures.slice(0, 8).map((feature) => (
                    <tr key={feature} className="border-b border-gray-800">
                      <td className="p-4 text-sm text-gray-300">{feature}</td>
                      {agents.map((agent) => (
                        <td key={agent.id} className="p-4 text-center">
                          {agent.features.includes(feature) ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Action Buttons Row */}
                  <tr>
                    <td className="p-4 font-medium text-gray-300">Actions</td>
                    {agents.map((agent) => (
                      <td key={agent.id} className="p-4">
                        <div className="space-y-2">
                          <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
                            Deploy Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                            asChild
                          >
                            <Link href={`/agents/${agent.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
