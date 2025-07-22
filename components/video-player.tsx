"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Download,
  Share,
  Bookmark,
} from "lucide-react"

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
}

interface VideoPlayerProps {
  video: DemoVideo
  onVideoChange?: (videoId: string) => void
}

export function VideoPlayer({ video, onVideoChange }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [activeChapter, setActiveChapter] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  // Update active chapter based on current time
  useEffect(() => {
    const currentChapter = video.chapters.findIndex((chapter, index) => {
      const nextChapter = video.chapters[index + 1]
      return currentTime >= chapter.time && (!nextChapter || currentTime < nextChapter.time)
    })
    if (currentChapter !== -1) {
      setActiveChapter(currentChapter)
    }
  }, [currentTime, video.chapters])

  const togglePlay = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newTime = (value[0] / 100) * duration
    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newVolume = value[0] / 100
    videoElement.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isMuted) {
      videoElement.volume = volume
      setIsMuted(false)
    } else {
      videoElement.volume = 0
      setIsMuted(true)
    }
  }

  const skipTime = (seconds: number) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  const jumpToChapter = (chapterTime: number) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.currentTime = chapterTime
    setCurrentTime(chapterTime)
  }

  const changePlaybackSpeed = (speed: number) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.playbackRate = speed
    setPlaybackSpeed(speed)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Main Video Player */}
      <Card className="bg-gray-900/50 border-gray-700 overflow-hidden">
        <div
          ref={containerRef}
          className="relative aspect-video bg-black group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Element */}
          <video ref={videoRef} className="w-full h-full object-cover" poster={video.thumbnail} preload="metadata">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button
                size="lg"
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          )}

          {/* Video Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleSeek}
                className="w-full"
                step={0.1}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => skipTime(-10)} className="text-white">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => skipTime(10)} className="text-white">
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Playback Speed */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => changePlaybackSpeed(Number(e.target.value))}
                  className="bg-transparent text-white text-sm border border-gray-600 rounded px-2 py-1"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>

                <Button variant="ghost" size="sm" className="text-white">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chapter Indicator */}
          {video.chapters.length > 0 && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-purple-600/90 text-white">
                Chapter {activeChapter + 1}: {video.chapters[activeChapter]?.title}
              </Badge>
            </div>
          )}
        </div>

        {/* Video Info */}
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
              <p className="text-gray-400 leading-relaxed">{video.description}</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Duration: {video.duration}</span>
            <span>•</span>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {video.category}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Video Chapters */}
      {video.chapters.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Video Chapters</h4>
            <div className="space-y-2">
              {video.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => jumpToChapter(chapter.time)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeChapter === index
                      ? "bg-purple-600/20 border border-purple-500/30"
                      : "bg-gray-800/50 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-purple-400 font-medium">{formatTime(chapter.time)}</span>
                        <span className="text-white font-medium">{chapter.title}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{chapter.description}</p>
                    </div>
                    {activeChapter === index && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
