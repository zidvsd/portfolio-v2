import { getProjects } from "@/lib/services/github"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { FeaturedCarousel } from "@/components/FeaturedCarousel"
import { PushPinIcon } from "@phosphor-icons/react/dist/ssr"

export default async function ProjectsSection() {
  const githubRepos = await getProjects()

  const featuredRepos = githubRepos
    .map((repo: any) => {
      const localConfig = MY_PROJECTS.find((p) => p.slug === repo.slug)
      return {
        ...repo,
        image: localConfig?.image || repo.image,
        isFeatured: localConfig?.isFeatured || false,
      }
    })
    .filter((repo) => repo.isFeatured)

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <PushPinIcon className="size-8 text-primary" />
        <h3 className="text-lg font-bold tracking-widest uppercase">
          Featured Projects
        </h3>
      </div>
      <FeaturedCarousel projects={featuredRepos} />
    </section>
  )
}
