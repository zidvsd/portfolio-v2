import { Suspense } from "react"
import AchievementSection from "@/components/sections/achievements/AchievementsSection"
import { AchievementSkeleton } from "@/components/skeleton/AchievementsSkeleton"
import EndOfPage from "@/components/ui/end-of-page"

export default function AchievementsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          A showcase of certificates and badges I’ve earned so far.
        </p>
      </div>
      <hr className="border-border" />

      {/* The data fetching happens inside this component */}
      <Suspense fallback={<AchievementSkeleton />}>
        <AchievementSection />
      </Suspense>

      <EndOfPage />
    </section>
  )
}
