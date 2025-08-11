"use client"

import { Button } from "@/components/ui/button"
import { Bot, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState, useCallback, memo } from "react"
import dynamic from "next/dynamic"
import React from "react"

// Spline Error Boundary Component
class SplineErrorBoundary extends React.Component<
  { onError: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

// Dynamically import Spline with loading optimization
const LazySpline = dynamic(() => import("@splinetool/react-spline").then((m) => m.Spline), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-black w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  ),
})

// Spline Wrapper Component (integrated)
const SplineWrapper = memo(({ scene, className }: { scene: string; className?: string }) => {
  const [errored, setErrored] = useState(false)

  if (!scene || errored) {
    return (
      <div className={`flex items-center justify-center bg-black ${className}`}>
        <img
          src="/placeholder.svg?height=600&width=800&text=3D+Preview+Unavailable"
          alt="3D preview unavailable"
          className="object-contain opacity-40"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <SplineErrorBoundary onError={() => setErrored(true)}>
      <div className={className}>
        <LazySpline
          scene={scene}
          style={{ width: "100%", height: "100%" }}
          onLoad={() => {
            // Optional: Add any post-load optimizations
          }}
        />
      </div>
    </SplineErrorBoundary>
  )
})

SplineWrapper.displayName = "SplineWrapper"

export function HomePage() {
  const { isAuthenticated } = useAuth()
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [handleScroll])

  // Calculate scroll-based intensities for each section (optimized)
  const heroIntensity = Math.max(0, Math.min(1, 1 - scrollY / window.innerHeight))
  const empowerStart = window.innerHeight
  const empowerEnd = empowerStart + window.innerHeight
  const empowerIntensity = Math.max(
    0,
    Math.min(
      1,
      scrollY > empowerStart
        ? scrollY < empowerEnd
          ? 1 - Math.abs(scrollY - (empowerStart + empowerEnd) / 2) / (window.innerHeight / 2)
          : Math.max(0, 1 - (scrollY - empowerEnd) / (window.innerHeight / 2))
        : 0,
    ),
  )

  const simplifyStart = empowerEnd
  const simplifyEnd = simplifyStart + window.innerHeight
  const simplifyIntensity = Math.max(
    0,
    Math.min(
      1,
      scrollY > simplifyStart
        ? scrollY < simplifyEnd
          ? 1 - Math.abs(scrollY - (simplifyStart + simplifyEnd) / 2) / (window.innerHeight / 2)
          : Math.max(0, 1 - (scrollY - simplifyEnd) / (window.innerHeight / 2))
        : 0,
    ),
  )

  return (
    <div className="flex flex-col relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-black text-white overflow-hidden z-10">
        {/* Animated Background */}
        <div className="absolute inset-0 animate-gradient-shift opacity-90">
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-black/60 to-white/8"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black/80 via-white/6 to-black/70"></div>
        </div>

        {/* Moving Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-star-move"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${20 + Math.random() * 10}s`,
              }}
            >
              <div className="w-1 h-1 bg-white/20 rounded-full animate-star-twinkle" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>

        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-hero mb-6 text-white leading-tight bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
                  Your AI Command Center.
                </h1>
                <p className="text-body-large text-gray-300 mb-8 max-w-lg leading-relaxed">
                  Empower your business with AI agents tailored to your needs. Your trusted command center for agentic
                  AI solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-button-large px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/agents">
                    Explore AI Agents
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-4 transform hover:scale-105 transition-all duration-200 bg-transparent"
                    asChild
                  >
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="relative h-full min-h-[600px]">
              <SplineWrapper
                scene="https://prod.spline.design/hb7JeUFmtIdBjQzS/scene.splinecode"
                className="w-full h-full min-h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Empower Section */}
      <section className="relative py-20 px-4 bg-black text-white z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/4"></div>

        {/* Moving Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={`empower-star-${i}`}
              className="absolute animate-star-move"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${25 + Math.random() * 10}s`,
              }}
            >
              <div className="w-0.5 h-0.5 bg-white/15 rounded-full animate-star-twinkle" />
            </div>
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-overline text-gray-400 mb-4">Empower</p>
            <h2 className="text-heading-1 mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
              Unlock the Future of AI Agents
            </h2>
            <p className="text-body-large text-gray-300 max-w-3xl leading-relaxed">
              Discover, test, and deploy AI agents designed for your business needs. Our platform simplifies the
              process, allowing you to find the perfect solution for marketing, sales, operations, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/working%20together-YBK9e5Gzj8cOeogTEe4KirqV8V9htL.webp"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-heading-3 mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Explore Tailored AI Solutions
                </h3>
                <p className="text-body text-gray-400 leading-relaxed">
                  Browse our extensive directory to find agents that fit your specific use cases.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__the-style-is-candid-image-photography-with-natural__47085-ivgAZCuNTejEt8bdiy3E4p9qKsCjAb.jpeg"
                  alt="Professional testing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-heading-3 mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Test Agents in Real-Time
                </h3>
                <p className="text-body text-gray-400 leading-relaxed">
                  Experience agents live before making a commitment.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-full overflow-hidden transform hover:scale-105 transition-all duration-300">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wt%202-w3zjwbCLPEZIJaPqumMek7Mkai6eb6.webp"
                  alt="Performance tracking"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-heading-3 mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Deploy with Confidence
                </h3>
                <p className="text-body text-gray-400 leading-relaxed">
                  Monitor usage and analytics to ensure optimal performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
              asChild
            >
              <Link href="/agents">Learn More</Link>
            </Button>
            {!isAuthenticated && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-8 py-3"
                asChild
              >
                <Link href="/auth/signup">
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Simplify Section */}
      <section className="relative py-20 px-4 bg-black text-white z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-white/8"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-overline text-gray-400 mb-4">Simplify</p>
              <h2 className="text-heading-1 mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
                AI Deployment Without the Technical Overhead
              </h2>
              <p className="text-body-large text-gray-300 mb-12 leading-relaxed">
                DeployHQ simplifies the AI deployment process, making it accessible for everyone. Experience seamless
                integration and management without the need for technical expertise.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 border-2 border-white transform rotate-45"></div>
                  </div>
                  <h3 className="text-heading-4 mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    For Builders
                  </h3>
                  <p className="text-body text-gray-400 leading-relaxed">
                    Easily submit and manage your AI agents with insightful analytics.
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 border-2 border-white transform rotate-45"></div>
                  </div>
                  <h3 className="text-heading-4 mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    For Customers
                  </h3>
                  <p className="text-body text-gray-400 leading-relaxed">
                    Explore, test, and compare AI agents effortlessly.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
                  asChild
                >
                  <Link href="/builder">Start Building</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-8 py-3"
                  asChild
                >
                  <Link href="/agents">
                    Explore Agents
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person1.jpg-xgsF5fZoobEmueiEzIyC2uDatD7rMF.jpeg"
                  alt="Person working with AI tools"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 bg-black text-white z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/robot-cta-bg.png')`,
            backgroundSize: "contain",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-black/80 to-black/90"></div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-heading-2 mb-4 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
            Ready to Deploy AI Agents?
          </h2>
          <p className="text-body-large mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of businesses already using DeployHQ to automate their workflows with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-8 py-4"
              asChild
            >
              <Link href="/agents">Browse Agents</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 bg-transparent"
              asChild
            >
              <Link href="/builder">Become a Builder</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-gray-800 bg-black z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6 text-white" />
                <span className="text-heading-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  DeployHQ
                </span>
              </div>
              <p className="text-body-small text-gray-400">
                The trusted marketplace for AI agents. Discover, test, and deploy with confidence.
              </p>
            </div>
            <div>
              <h4 className="text-heading-4 mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Product
              </h4>
              <div className="space-y-2">
                <Link
                  href="/agents"
                  className="text-body-small block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  AI Agents
                </Link>
                <Link
                  href="/pricing"
                  className="text-body-small block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Pricing
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-heading-4 mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Builders
              </h4>
              <div className="space-y-2">
                <Link
                  href="/builder"
                  className="text-body-small block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Builder Portal
                </Link>
                <Link
                  href="/docs"
                  className="text-body-small block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Documentation
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-heading-4 mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Company
              </h4>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="text-body-small block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-body-small block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-caption text-gray-400">© 2024 DeployHQ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }

        @keyframes star-move {
          0% {
            transform: translate3d(-100vw, 100vh, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate3d(100vw, -100vh, 0);
            opacity: 0;
          }
        }

        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease-in-out infinite;
        }

        .animate-star-move {
          animation: star-move linear infinite;
        }

        .animate-star-twinkle {
          animation: star-twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
