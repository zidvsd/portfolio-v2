import { Suspense } from "react"
import AchievementSection from "@/components/sections/achievements/AchievementsSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Achievements & Certifications",
  description:
    "Certifications, badges, and milestones earned by Rashid Visda as a full-stack developer specializing in React and Next.js.",
  path: "/achievements",
})

export default function AchievementsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          A showcase of certificates and badges I've earned so far.
        </p>
      </div>
      <hr className="border-border" />

      <Suspense fallback={<SkeletonLoader variant="achievement" />}>
        <AchievementSection />
      </Suspense>
    </section>
  )
}
