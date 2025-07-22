import { Navigation } from "@/components/navigation"
import { ProfilePage } from "@/components/pages/profile-page"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function Profile() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <ProfilePage />
      </div>
    </ProtectedRoute>
  )
}
