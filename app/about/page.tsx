import { Suspense } from "react"
import dynamic from "next/dynamic"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"

const ExperienceSection = dynamic(
  () => import("@/components/sections/about/ExperienceSection"),
  {
    loading: () => <SkeletonLoader variant="about" />,
    ssr: true,
  }
)
import IntroSection from "@/components/sections/about/IntroSection"

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-8">
      <Suspense
        fallback={
          <div className="h-40 w-full animate-pulse rounded-xl bg-muted" />
        }
      >
        <IntroSection />
      </Suspense>

      <hr className="border-border" />

      <ExperienceSection />
    </div>
  )
}
