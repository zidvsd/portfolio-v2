import { getProjects } from "@/lib/services/github"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { ProjectCard } from "@/components/ProjectCard"
import StaggerWrapper from "@/components/motion/StaggerWrapper"
import { StaggerItem } from "@/components/motion/StaggerItem"
import EndOfPage from "@/components/ui/end-of-page"

export default async function ProjectsSection() {
  const githubRepos = await getProjects()

  const repos = githubRepos.map((repo: any) => {
    const localConfig = MY_PROJECTS.find((p) => p.slug === repo.slug)
    return {
      ...repo,
      image: localConfig?.image || repo.image,
      isFeatured: localConfig?.isFeatured || false,
      name: localConfig?.name || repo.name,
    }
  })

  const sortedRepos = repos.sort(
    (a: any, b: any) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
  )

  if (sortedRepos.length === 0) {
    return (
      <p className="p-10 text-center text-muted-foreground">
        No projects found.
      </p>
    )
  }

  return (
    <StaggerWrapper
      key="projects-grid"
      className="mt-8 grid grid-flow-row-dense grid-cols-1 gap-6 md:grid-cols-2"
    >
      {sortedRepos.map((repo: any) => (
        <StaggerItem key={repo.slug}>
          <ProjectCard repo={repo} />
        </StaggerItem>
      ))}

      <div className="col-span-full">
        <EndOfPage />
      </div>
    </StaggerWrapper>
  )
}
