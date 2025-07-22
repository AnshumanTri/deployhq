import { AuthProvider } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { LoginPage } from "@/components/auth/login-page"

export default function Login() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        <Navigation />
        <LoginPage />
      </div>
    </AuthProvider>
  )
}
