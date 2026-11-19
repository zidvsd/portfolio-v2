import { Suspense } from "react"
import dynamic from "next/dynamic"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "About Me",
  description:
    "Learn more about Rashid Visda, a full-stack developer from the Philippines with a Computer Science background and experience building React and Next.js applications.",
  path: "/about",
  type: "profile",
})

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
