import { Suspense } from "react"
import dynamic from "next/dynamic"
import ProfileSection from "@/components/sections/home/ProfileSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rashid Visda | Full-Stack Web Developer (Next.js, React)",

  description:
    "Full-stack web developer from the Philippines specializing in React, Next.js, and modern web apps. I build fast, scalable, and clean user experiences.",

  metadataBase: new URL("https://zidvsd.site"),

  keywords: [
    "Rashid Visda",
    "Full Stack Developer Philippines",
    "Next.js Developer",
    "React Developer",
    "Web Developer Portfolio",
  ],

  alternates: {
    canonical: "https://zidvsd.site",
  },

  openGraph: {
    title: "Rashid Visda | Full-Stack Web Developer",
    description:
      "Building modern web applications with React, Next.js, and clean UI/UX design.",
    url: "https://zidvsd.site",
    siteName: "Rashid Visda Portfolio",
    type: "website",
  },
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
