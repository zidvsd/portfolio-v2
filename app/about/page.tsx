import { Suspense } from "react"
import dynamic from "next/dynamic"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Rashid Visda, a full-stack developer from the Philippines with experience in React and Next.js applications.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Rashid Visda",
    description:
      "Full-stack developer with Computer Science background and experience in modern web development.",
    url: "https://zidvsd.site/about",
    type: "profile",
  },
}

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
