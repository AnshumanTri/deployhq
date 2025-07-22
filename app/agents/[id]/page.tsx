import { Navigation } from "@/components/navigation"
import { AgentDetailPage } from "@/components/pages/agent-detail-page"

export default function AgentDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AgentDetailPage agentId={params.id} />
    </div>
  )
}
