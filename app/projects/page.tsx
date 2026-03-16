import Image from "next/image"
import { getPinnedRepos } from "@/lib/github"
import EndOfPage from "@/components/ui/end-of-page"
import Link from "next/link"
import { ArrowUpRightIcon } from "@/components/icons"
import { MY_PROJECTS } from "@/lib/projects-config"
import { PushPinIcon } from "@phosphor-icons/react/dist/ssr"
export default async function ProjectsPage() {
  const githubRepos = await getPinnedRepos()

  // Merge GitHub data with your local config
  const repos = githubRepos.map((repo: any) => {
    const localConfig = MY_PROJECTS.find((p) => p.slug === repo.slug)
    return {
      ...repo,
      // Use local config if available, otherwise default to GitHub data
      image: localConfig?.image || repo.image,
      isFeatured: localConfig?.isFeatured || false,
      name: localConfig?.name || repo.name,
    }
  })

  // Optional: Sort featured projects to the top
  const sortedRepos = repos.sort(
    (a: any, b: any) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
  )

  if (repos.length === 0) {
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
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {repos.map(function (repo: any) {
          const isFeatured = repo.isFeatured === true
          return (
            <Link
              href={`/projects/${repo.slug}`}
              key={repo.name}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              {/* TOP HALF: IMAGE WITH OVERLAY */}
              <div className="relative h-56 w-full overflow-hidden border-b bg-muted md:h-56">
                <Image
                  src={repo.image || "/images/projects/placeholder.png"}
                  alt={repo.name}
                  fill
                  className="object-cover"
                />

                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold tracking-widest text-black uppercase shadow-lg ring-1 ring-yellow-500/50">
                      Featured
                      <PushPinIcon
                        size={12}
                        weight="fill"
                        className="-rotate-45"
                      />
                    </span>
                  </div>
                )}

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex translate-y-2 items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-xl transition-transform duration-300 group-hover:translate-y-0">
                    View Project
                    <ArrowUpRightIcon size={16} weight="bold" />
                  </div>
                </div>
              </div>

              {/* BOTTOM HALF: CONTENT & TAGS */}
              <div className="flex grow flex-col p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold tracking-tight">
                    {repo.name}
                  </h3>
                  {repo.stars > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ★ {repo.stars}
                    </span>
                  )}
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {repo.description ||
                    "A full-stack web development project built with modern technologies."}
                </p>

                {/* TAGS */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.languages.map(function (lang: any) {
                    return (
                      <span
                        key={lang.name}
                        className="rounded-md border bg-secondary/30 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-secondary-foreground uppercase"
                      >
                        {lang.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            </Link>
          )
        })}

        <div className="col-span-full">
          <EndOfPage />
        </div>
      </div>
    </section>
  )
}
