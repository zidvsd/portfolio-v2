import GithubIcon from "../icons/GithubIcon"
import { Button } from "../ui/button"
import { ArrowSquareOutIcon, PushPinIcon } from "@phosphor-icons/react/dist/ssr"
import { GithubContributionsCard } from "./GithubContributionsCard"
import { getGithubActivity } from "@/lib/services/github"
import { getGithubStats } from "@/lib/services/github"
import StatTile from "../ui/stat-title"
import { getPinnedRepos } from "@/lib/services/github"
import { PinnedRepoCard } from "./GithubRepoCard"
import { GitHubPinnedRepo } from "@/lib/types/github"

export default async function GithubCard() {
  const githubData = await getGithubActivity()
  const githubStats = await getGithubStats()
  const pinnedRepos = await getPinnedRepos()

  console.log(pinnedRepos)
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GithubIcon className="size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Github Activity
            </h1>
          </div>
          <a href={"https://github.com/zidvsd"} target="_blank">
            <Button variant="ghost">
              <ArrowSquareOutIcon />
            </Button>
          </a>
        </div>

        <p className="flex items-center leading-relaxed text-muted-foreground">
          Open source contributions, repositories, and coding activity over the
          past year.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {/* Top Row (Each spans 3 of 6 columns) */}
        <div className="col-span-1 md:col-span-3">
          <StatTile label="Contributions" value="606" />
        </div>
        <div className="col-span-1 md:col-span-3">
          <StatTile label="Joined at" value={githubStats.member_since} />
        </div>

        {/* Bottom Row (Each spans 2 of 6 columns) */}
        <div className="col-span-1 md:col-span-2">
          <StatTile label="Following" value={githubStats.following} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <StatTile label="Repos" value={githubStats.followers} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <StatTile label="Followers" value={githubStats.total_repos} />
        </div>
      </div>

      <GithubContributionsCard weeks={githubData} />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <PushPinIcon className="size-6" />
          <h2 className="text-lg font-semibold text-accent-foreground">
            Pinned Repositories
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pinnedRepos.map((repo: GitHubPinnedRepo, index: number) => (
            <PinnedRepoCard
              key={`${index}-${repo.name}`}
              author={repo.author}
              name={repo.name}
              description={repo.description}
              language={repo.language}
              languageColor={repo.languageColor}
              stars={repo.stars}
              link={`https://github.com/${repo.author}/${repo.name}`}
              forks={repo.forks}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
