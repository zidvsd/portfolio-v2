import { Metadata } from "next"
import { getRepoDetails } from "@/lib/api/github"
import { notFound } from "next/navigation"
import ProjectDetail from "@/components/ProjectDetail"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import BackButton from "@/components/ui/back-button"
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

  // 1. Find local project config for the image and custom name
  const projectConfig = MY_PROJECTS.find((p) => p.slug === projectId)

  // 2. Fetch GitHub data
  const githubData = await getRepoDetails(projectId)

  if (!githubData) notFound()

  // 3. Combine GitHub data with local config data
  const combinedData = {
    ...githubData,
    // Prioritize the name from config if it exists, otherwise use GitHub name
    displayTitle: projectConfig?.name || githubData.name,
    projectImage: projectConfig?.image || null,
  }

  return (
    <div>
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {combinedData.displayTitle}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          {combinedData.description}
        </p>
      </div>
      {/* Passing combined data including the image to the UI component */}
      <ProjectDetail {...combinedData} />
    </div>
  )
}

export default ProjectDetailPage
