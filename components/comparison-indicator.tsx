"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, X } from "lucide-react"

interface Agent {
  id: number
  name: string
  image: string
}

interface ComparisonIndicatorProps {
  agents: Agent[]
  onOpenComparison: () => void
  onRemoveAgent: (agentId: number) => void
  onClearAll: () => void
}

export function ComparisonIndicator({ agents, onOpenComparison, onRemoveAgent, onClearAll }: ComparisonIndicatorProps) {
  if (agents.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span className="text-white font-medium">Compare Agents</span>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              {agents.length}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            {agents.map((agent) => (
              <div key={agent.id} className="relative group">
                <img
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <button
                  onClick={() => onRemoveAgent(agent.id)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-2 w-2 text-white" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={onOpenComparison}
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
            >
              Compare
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
