import { Navigation } from "@/components/navigation"
import { SignupPage } from "@/components/auth/signup-page"

export default function Signup() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <SignupPage />
    </div>
  )
}
