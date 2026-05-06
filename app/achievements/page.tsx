import { Suspense } from "react"
import AchievementSection from "@/components/sections/achievements/AchievementsSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import EndOfPage from "@/components/ui/end-of-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Achievements | Rashid Visda - Certifications & Milestones",

  description:
    "Explore the achievements of Rashid Visda including certifications, project milestones, and accomplishments as a full-stack developer specializing in React and Next.js.",

  alternates: {
    canonical: "https://zidvsd.site/achievements",
  },

  openGraph: {
    title: "Rashid Visda - Achievements",
    description:
      "Certifications, milestones, and accomplishments as a full-stack developer.",
    url: "https://zidvsd.site/achievements",
    type: "website",
  },
}

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

      <EndOfPage />
    </section>
  )
}
