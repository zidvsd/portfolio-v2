// app/projects/page.tsx
import { getPinnedRepos } from "@/lib/github"
import EndOfPage from "@/components/ui/end-of-page"
export default async function ProjectsPage() {
  const repos = await getPinnedRepos()

  if (repos.length === 0) {
    return <p className="p-10 text-center">No pinned projects found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {repos.map(function (repo: any) {
        return (
          <div
            key={repo.name}
            className="flex flex-col rounded-lg border p-5 shadow-sm transition-colors hover:border-primary"
          >
            <h3 className="text-lg font-bold">{repo.name}</h3>
            <p className="mt-2 grow text-sm text-muted-foreground">
              {repo.description || "No description provided."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {repo.languages.map(function (lang: any) {
                return (
                  <span
                    key={lang.name}
                    className="rounded-full bg-secondary px-2 py-1 text-[10px] font-bold tracking-wider uppercase"
                  >
                    {lang.name}
                  </span>
                )
              })}
            </div>

            <a
              href={repo.url}
              target="_blank"
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              View on GitHub →
            </a>
          </div>
        )
      })}

      <div className="col-span-2">
        <EndOfPage />
      </div>
    </div>
  )
}
