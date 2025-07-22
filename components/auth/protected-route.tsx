"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bot } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "builder"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/auth/login" }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }

      // If a specific role is required and user doesn't have it, redirect appropriately
      if (requiredRole && user?.role !== requiredRole) {
        // For builder role requirement, redirect to signup if not a builder
        if (requiredRole === "builder" && user?.role !== "builder") {
          router.push("/auth/signup")
          return
        }

        // For other roles, redirect based on user's actual role
        switch (user?.role) {
          case "builder":
            router.push("/builder")
            break
          default:
            router.push("/agents")
        }
        return
      }
    }
  }, [user, loading, isAuthenticated, requiredRole, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-purple-500/30">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Bot className="h-8 w-8 text-purple-400 animate-pulse mb-4" />
            <p className="text-gray-300">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
