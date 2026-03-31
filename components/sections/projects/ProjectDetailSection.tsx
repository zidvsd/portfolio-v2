// components/sections/projects/ProjectDetailSection.tsx
import { getRepoDetails } from "@/lib/services/github"
import notFound from "@/app/not-found"
import ProjectDetail from "@/components/ProjectDetail"
export default async function ProjectDetailSection({
  projectId,
  projectConfig,
}: any) {
  const githubData = await getRepoDetails(projectId)

  if (!githubData) notFound()

  return (
    <div className="space-y-6">
      {/* Description now streams in here */}
      <p className="max-w-xl text-lg text-muted-foreground">
        {githubData?.description}
      </p>

      <ProjectDetail
        {...githubData}
        projectImage={projectConfig?.image}
        displayTitle={projectConfig?.name}
      />
    </div>
  )
}
