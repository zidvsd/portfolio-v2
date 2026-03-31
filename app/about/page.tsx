import { Suspense } from "react"
import IntroSection from "@/components/sections/about/IntroSection"
import ExperienceSection from "@/components/sections/about/ExperienceSection"
import { AboutSkeleton } from "@/components/skeleton/AboutSkeleton"
export default function AboutPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* 1. Intro Section (Bio/About text) */}
      <Suspense
        fallback={
          <div className="h-40 w-full animate-pulse rounded-xl bg-muted" />
        }
      >
        <IntroSection />
      </Suspense>

      <hr className="border-border" />

      {/* 2. Work & Education (The Data-Heavy Part) */}
      <Suspense fallback={<AboutSkeleton />}>
        <ExperienceSection />
      </Suspense>
    </div>
  )
}
