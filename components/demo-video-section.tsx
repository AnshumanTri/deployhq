"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { Play, Eye } from "lucide-react"

interface VideoChapter {
  time: number
  title: string
  description: string
}

interface DemoVideo {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
  chapters: VideoChapter[]
  category: string
  views?: number
}

interface DemoVideoSectionProps {
  videos: DemoVideo[]
  agentName: string
}

export function DemoVideoSection({ videos, agentName }: DemoVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          See <span className="text-purple-400">{agentName}</span> in Action
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Watch interactive demos to understand how this agent works and see real-world use cases
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-3">
          <VideoPlayer video={selectedVideo} onVideoChange={setSelectedVideo} />
        </div>

        {/* Video Playlist */}
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Play className="h-5 w-5 mr-2 text-purple-500" />
                Demo Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                    selectedVideo.id === video.id
                      ? "bg-purple-600/20 border border-purple-500/30 shadow-lg"
                      : "bg-gray-800/50 hover:bg-gray-800 border border-transparent"
                  }`}
                >
                  <div className="flex space-x-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm line-clamp-2 mb-1">{video.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          {video.category}
                        </Badge>
                        {video.views && (
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>{video.views.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <h4 className="text-white font-semibold mb-4">Demo Statistics</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Videos</span>
                  <span className="text-white font-medium">{videos.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Duration</span>
                  <span className="text-white font-medium">
                    {videos.reduce((total, video) => {
                      const [minutes, seconds] = video.duration.split(":").map(Number)
                      return total + minutes * 60 + seconds
                    }, 0) / 60}{" "}
                    min
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-white font-medium">
                    {videos.reduce((total, video) => total + (video.views || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <h4 className="text-white font-semibold mb-2">Ready to Try?</h4>
              <p className="text-gray-300 text-sm mb-4">Start using this agent in your workflow today</p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800">
                Use This Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
