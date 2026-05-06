import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import ProjectsSection from "@/components/sections/projects/ProjectsSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Full-Stack Web Development Portfolio",

  description:
    "Explore full-stack web development projects by Rashid Visda, built with React, Next.js, TypeScript, and modern web technologies. Includes personal and open-source work.",

  alternates: {
    canonical: "https://zidvsd.site/projects",
  },

  openGraph: {
    title: "Projects | Rashid Visda",
    description:
      "A collection of full-stack web applications built with React and Next.js.",
    url: "https://zidvsd.site/projects",
    type: "website",
  },
}

export default function ProjectsPage() {
  return (
    <section>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A showcase of both private and open-source projects I've built or
          contributed to.
        </p>
      </div>
      <hr className="mt-6 border-border" />

      <Suspense fallback={<SkeletonLoader variant="projects-grid" />}>
        <ProjectsSection />
      </Suspense>
    </section>
  )
}
