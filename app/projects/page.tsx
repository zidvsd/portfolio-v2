import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import ProjectsSection from "@/components/sections/projects/ProjectsSection"

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
