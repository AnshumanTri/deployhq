"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AgentSubmission {
  id: string
  name: string
  description: string
  longDescription: string
  type: string
  category: string
  apiUrl: string
  apiKey: string
  tags: string[]
  pricing: {
    price: number
    priceType: string
  }
  features: string[]
  status: "pending" | "approved" | "rejected" | "published"
  submittedAt: string
  submittedBy: string
  builderInfo: {
    name: string
    email: string
    company?: string
  }
}

interface AgentDatabaseContextType {
  submissions: AgentSubmission[]
  submitAgent: (
    agentData: Omit<AgentSubmission, "id" | "submittedAt" | "status">,
  ) => Promise<{ success: boolean; error?: string; submissionId?: string }>
  getSubmissionsByBuilder: (builderEmail: string) => AgentSubmission[]
  updateSubmissionStatus: (submissionId: string, status: AgentSubmission["status"]) => void
  deleteSubmission: (submissionId: string) => void
}

const AgentDatabaseContext = createContext<AgentDatabaseContextType | undefined>(undefined)

export function useAgentDatabase() {
  const context = useContext(AgentDatabaseContext)
  if (context === undefined) {
    throw new Error("useAgentDatabase must be used within an AgentDatabaseProvider")
  }
  return context
}

export function AgentDatabaseProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<AgentSubmission[]>([])

  // Load submissions from localStorage on mount
  useEffect(() => {
    const storedSubmissions = localStorage.getItem("deployhq_agent_submissions")
    if (storedSubmissions) {
      try {
        const parsedSubmissions = JSON.parse(storedSubmissions)
        setSubmissions(parsedSubmissions)
      } catch (error) {
        console.error("Error loading agent submissions:", error)
      }
    }
  }, [])

  // Save submissions to localStorage whenever submissions change
  useEffect(() => {
    localStorage.setItem("deployhq_agent_submissions", JSON.stringify(submissions))
  }, [submissions])

  const submitAgent = async (
    agentData: Omit<AgentSubmission, "id" | "submittedAt" | "status">,
  ): Promise<{ success: boolean; error?: string; submissionId?: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validate required fields
      if (!agentData.name || !agentData.description || !agentData.apiUrl) {
        return { success: false, error: "Please fill in all required fields" }
      }

      // Check for duplicate agent names by the same builder
      const existingAgent = submissions.find(
        (submission) =>
          submission.name.toLowerCase() === agentData.name.toLowerCase() &&
          submission.builderInfo.email === agentData.builderInfo.email,
      )

      if (existingAgent) {
        return { success: false, error: "You already have an agent with this name" }
      }

      const newSubmission: AgentSubmission = {
        ...agentData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        submittedAt: new Date().toISOString(),
        status: "pending",
      }

      setSubmissions((prev) => [...prev, newSubmission])

      return { success: true, submissionId: newSubmission.id }
    } catch (error) {
      return { success: false, error: "Failed to submit agent. Please try again." }
    }
  }

  const getSubmissionsByBuilder = (builderEmail: string): AgentSubmission[] => {
    return submissions.filter((submission) => submission.builderInfo.email === builderEmail)
  }

  const updateSubmissionStatus = (submissionId: string, status: AgentSubmission["status"]) => {
    setSubmissions((prev) =>
      prev.map((submission) => (submission.id === submissionId ? { ...submission, status } : submission)),
    )
  }

  const deleteSubmission = (submissionId: string) => {
    setSubmissions((prev) => prev.filter((submission) => submission.id !== submissionId))
  }

  const value: AgentDatabaseContextType = {
    submissions,
    submitAgent,
    getSubmissionsByBuilder,
    updateSubmissionStatus,
    deleteSubmission,
  }

  return <AgentDatabaseContext.Provider value={value}>{children}</AgentDatabaseContext.Provider>
}
