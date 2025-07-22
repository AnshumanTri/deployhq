"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bot, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { UserMenu } from "@/components/auth/user-menu"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const isHomePage = pathname === "/"

  // Handle scroll effect for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/agents", label: "Explore AI Agents" },
    { href: "/builder", label: "Builder Portal" },
  ]

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-black/95 backdrop-blur-lg border-b border-gray-800/50 shadow-lg shadow-black/20"
            : isHomePage
              ? "bg-transparent"
              : "bg-black border-b border-gray-800"
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Bot
                className={`h-8 w-8 transition-colors duration-300 ${
                  isHomePage && !isScrolled ? "text-white" : "text-white"
                } group-hover:text-purple-400`}
              />
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  isHomePage && !isScrolled ? "text-white" : "text-white"
                } group-hover:text-purple-400`}
              >
                DeployHQ
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-white relative group ${
                  pathname === item.href ? "text-white" : isHomePage && !isScrolled ? "text-gray-300" : "text-gray-300"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full ${
                    pathname === item.href ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`transition-all duration-300 ${
                    isHomePage && !isScrolled
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  asChild
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden transition-colors duration-300 ${
              isHomePage && !isScrolled ? "text-white" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-black/95 backdrop-blur-lg rounded-lg mt-2 border border-gray-800/50 shadow-xl animate-slide-down">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-white hover:bg-purple-900/30 rounded-md mx-2 ${
                  pathname === item.href ? "text-white bg-purple-900/50 border-l-4 border-purple-500" : "text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-4 space-y-2 border-t border-gray-800/50 mt-4">
              {isAuthenticated ? (
                <div className="flex items-center justify-center">
                  <UserMenu />
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                    asChild
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 transform hover:scale-105"
                    asChild
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}
