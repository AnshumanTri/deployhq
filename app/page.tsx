import { Navigation } from "@/components/navigation"
import { HomePage } from "@/components/pages/home-page"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HomePage />
    </div>
  )
}
