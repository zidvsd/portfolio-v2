import { Metadata } from "next"
import { getRepoDetails } from "@/lib/services/github"
import { notFound } from "next/navigation"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { Suspense } from "react"
import BackButton from "@/components/ui/back-button"
import ProjectDetailSection from "@/components/sections/projects/ProjectDetailSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
interface ProjectDetailPageProps {
  params: Promise<{ projectId: string }>
}

export const generateMetadata = async ({
  params,
}: ProjectDetailPageProps): Promise<Metadata> => {
  const { projectId } = await params
  const repo = await getRepoDetails(projectId)

  if (!repo) return { title: "Project Not Found" }

  return {
    title: `${repo.name} | Rashid Visda`,
    description: repo.description,
    openGraph: {
      title: repo.name,
      description: repo.description,
      type: "article",
    },
  }
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = await params
  if (!projectId) notFound()

  const projectConfig = MY_PROJECTS.find((p) => p.slug === projectId)

  return (
    <div>
      <div className="mb-6">
        <BackButton />
      </div>

      <div>
        {/* Render Name instantly from local config */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {projectConfig?.name || "Project Details"}
        </h1>

        {/* We REMOVE the description <p> tag from here because 
            it's not available yet. It will live inside the Suspense block. */}
      </div>

      <Suspense fallback={<SkeletonLoader variant="project-detail" />}>
        <ProjectDetailSection
          projectId={projectId}
          projectConfig={projectConfig}
        />
      </Suspense>
    </div>
  )
}

export default ProjectDetailPage
