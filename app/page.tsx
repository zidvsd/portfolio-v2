import { Suspense } from "react"
import dynamic from "next/dynamic"
import ProfileSection from "@/components/sections/home/ProfileSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"
import { ogImageUrl, pageMetadata } from "@/lib/seo"

const base = pageMetadata({
  title: "Rashid Visda | Full-Stack Web Developer (Next.js, React)",
  description:
    "Full-stack web developer from the Philippines specializing in React, Next.js, and modern web apps. I build fast, scalable, and clean user experiences.",
  path: "/",
  image: ogImageUrl("Full-Stack Web Developer"),
})

export const metadata: Metadata = {
  ...base,
  title: { absolute: base.title as string },
}

const ProjectsSection = dynamic(
  () => import("@/components/sections/home/ProjectsSection"),
  {
    loading: () => <SkeletonLoader variant="projects-carousel" />,
    ssr: true,
  }
)

export default function Page() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<SkeletonLoader variant="profile" />}>
        <ProfileSection />
      </Suspense>

      <hr className="border-border" />

      <ProjectsSection />
    </div>
  )
}
