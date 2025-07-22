import { Navigation } from "@/components/navigation"
import { AgentsPage } from "@/components/pages/agents-page"

export default function Agents() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <AgentsPage />
    </div>
  )
}
