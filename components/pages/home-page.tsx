"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Zap, Shield, Rocket, Play, BarChart3, Globe, Sparkles } from "lucide-react"
import Link from "next/link"
import { StarField } from "@/components/star-field"

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-violet-900 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  ),
})

export function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [splineError, setSplineError] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const FallbackBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-violet-900">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-violet-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )

  const handleSplineError = (error: any) => {
    console.warn("Spline failed to load:", error)
    setSplineError(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full z-0">
        {splineError ? (
          <FallbackBackground />
        ) : (
          <Spline
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            onError={handleSplineError}
            onLoad={() => console.log("Spline scene loaded successfully")}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-violet-900/20" />
      </div>

      {/* Moving Stars */}
      <StarField className="z-5" count={100} />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[0.5px] z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="container mx-auto text-center">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <Badge className="bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-md text-purple-200 border-white/30 px-6 py-3 text-lg font-semibold shadow-2xl">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Next-Generation AI Platform
                </Badge>
              </div>

              <h1 className="text-hero mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Deploy AI Agents
                </span>
                <br />
                <span className="text-white">That Actually Work</span>
              </h1>

              <p className="text-body-large text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed">
                Build, deploy, and scale intelligent AI agents with our powerful platform. From customer support to
                complex automation, create agents that understand your business and deliver real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link href="/builder">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-bold px-12 py-6 text-xl rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 shadow-2xl"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Start Building
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>

                <Link href="/agents">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-black/30 backdrop-blur-md border-white/30 text-white hover:bg-purple-900/40 hover:border-purple-300/60 hover:text-white font-bold px-12 py-6 text-xl rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl"
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Explore Agents
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: Users, label: "Active Users", value: "10,000+" },
                  { icon: Zap, label: "Agents Deployed", value: "50,000+" },
                  { icon: Globe, label: "Countries", value: "120+" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
                  >
                    <stat.icon className="h-8 w-8 text-purple-300 mx-auto mb-4" />
                    <div className="text-heading-3 text-white mb-2">{stat.value}</div>
                    <div className="text-body text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 relative">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-heading-1 mb-8">
                <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-body-large text-white/80 max-w-3xl mx-auto">
                Everything you need to build, deploy, and manage AI agents at scale
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Deploy agents in minutes, not hours. Our optimized infrastructure ensures peak performance.",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade security with end-to-end encryption and compliance with industry standards.",
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description: "Deep insights into agent performance with real-time monitoring and detailed reporting.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-black/30 backdrop-blur-md border-white/20 hover:border-purple-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 shadow-2xl"
                >
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-lg">
                      <feature.icon className="h-8 w-8 text-purple-300" />
                    </div>
                    <h3 className="text-heading-3 text-white mb-6">{feature.title}</h3>
                    <p className="text-body text-white/80 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/20 backdrop-blur-md rounded-3xl p-16 border border-white/10 shadow-2xl">
                <h2 className="text-heading-1 mb-8">
                  <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                    Ready to Get Started?
                  </span>
                </h2>
                <p className="text-body-large text-white/80 mb-12 max-w-2xl mx-auto">
                  Join thousands of developers and businesses already using DeployHQ to build the future of AI
                  automation.
                </p>
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-bold px-16 py-6 text-xl rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 shadow-2xl"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Start Free Trial
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
