import { Navigation } from "@/components/navigation"
import { BuilderPage } from "@/components/pages/builder-page"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function Builder() {
  return (
    <ProtectedRoute requiredRole="builder">
      <div className="min-h-screen bg-black">
        <Navigation />
        <BuilderPage />
      </div>
    </ProtectedRoute>
  )
}
