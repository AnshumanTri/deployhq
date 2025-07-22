"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "builder"
  avatar?: string
  company?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    name: string,
    role: "user" | "builder",
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock users database
  const mockUsers: (User & { password: string })[] = [
    {
      id: "1",
      email: "john@example.com",
      password: "password123",
      name: "John Doe",
      role: "user",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      email: "builder@example.com",
      password: "password123",
      name: "Jane Builder",
      role: "builder",
      avatar: "/placeholder.svg?height=40&width=40&text=JB",
      company: "AI Solutions Inc.",
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      email: "admin@deployhq.com",
      password: "admin123",
      name: "Admin User",
      role: "builder", // Changed from admin to builder
      avatar: "/placeholder.svg?height=40&width=40&text=AD",
      createdAt: "2024-01-01",
    },
  ]

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem("deployhq_user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem("deployhq_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("deployhq_user", JSON.stringify(userWithoutPassword))
      setLoading(false)
      return { success: true }
    } else {
      setLoading(false)
      return { success: false, error: "Invalid email or password" }
    }
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: "user" | "builder",
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setLoading(false)
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      avatar: `/placeholder.svg?height=40&width=40&text=${name
        .split(" ")
        .map((n) => n[0])
        .join("")}`,
      createdAt: new Date().toISOString(),
    }

    // Add to mock database
    mockUsers.push({ ...newUser, password })

    setUser(newUser)
    localStorage.setItem("deployhq_user", JSON.stringify(newUser))
    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("deployhq_user")
  }

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
