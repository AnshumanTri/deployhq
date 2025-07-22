"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Users, DollarSign, CheckCircle, ArrowRight, Heart, Share } from "lucide-react"
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

interface AgentPreviewModalProps {
  agent: Agent | null
  isOpen: boolean
  onClose: () => void
}

export function AgentPreviewModal({ agent, isOpen, onClose }: AgentPreviewModalProps) {
  const [isLiked, setIsLiked] = useState(false)

  if (!agent) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        {/* Header */}
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white mb-2">{agent.name}</DialogTitle>
              <DialogDescription className="text-gray-300 text-base">{agent.description}</DialogDescription>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="text-gray-400 hover:text-white"
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Agent Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {agent.category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium text-white">{agent.rating}</span>
              <span className="text-gray-400 ml-1">({agent.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Users className="h-4 w-4 mr-1" />
              <span>{agent.stats.users.toLocaleString()} users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={agent.builder.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {agent.builder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-400">by {agent.builder.name}</span>
              {agent.builder.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Image */}
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
              <img src={agent.image || "/placeholder.svg"} alt={agent.name} className="w-full h-full object-cover" />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About This Agent</h3>
              <p className="text-gray-300 leading-relaxed">{agent.longDescription}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {agent.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                  <span className="text-3xl font-bold text-white">${agent.price}</span>
                  <span className="text-gray-400">/{agent.priceType}</span>
                </div>
                <p className="text-sm text-gray-400">per user</p>
              </div>

              <div className="space-y-3 mb-6">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white">
                  Deploy Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800" asChild>
                  <Link href={`/agents/${agent.id}`}>View Full Details</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Active Users</span>
                  <span className="font-medium text-white">{agent.stats.users.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Uptime</span>
                  <span className="font-medium text-white">{agent.stats.uptime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Response Time</span>
                  <span className="font-medium text-white">{agent.stats.avgResponseTime}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {agent.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">{agent.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Reviews</span>
                  <span className="text-white font-medium">{agent.reviews}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
