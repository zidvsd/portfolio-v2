import { getProjects } from "@/lib/services/github"
import EndOfPage from "@/components/ui/end-of-page"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { ProjectCard } from "@/components/ProjectCard"
export default async function ProjectsPage() {
  const githubRepos = await getProjects()
  // Merge GitHub data with your local config
  const repos = githubRepos.map((repo: any) => {
    const localConfig = MY_PROJECTS.find((p) => p.slug === repo.slug)
    return {
      ...repo,
      image: localConfig?.image || repo.image,
      isFeatured: localConfig?.isFeatured || false,
      name: localConfig?.name || repo.name,
    }
  })

  // Sort featured projects to the top
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
    <section>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A showcase of both private and open-source projects I’ve built or
          contributed to.
        </p>
      </div>
      <hr className="mt-6 border-border" />

      {/* Grid container handles the column logic */}
      <div className="mt-8 grid grid-flow-row-dense grid-cols-1 gap-6 md:grid-cols-2">
        {sortedRepos.map((repo: any) => (
          <ProjectCard key={repo.slug} repo={repo} />
        ))}

        <div className="col-span-full">
          <EndOfPage />
        </div>
      </div>
    </section>
  )
}
