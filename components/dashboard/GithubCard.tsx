import GithubIcon from "../icons/GithubIcon"
import { Button } from "../ui/button"
import {
  ArrowSquareOutIcon,
  PushPinIcon,
  FolderIcon,
  CalendarIcon,
  UserPlusIcon,
  UsersIcon,
  GitForkIcon,
} from "@phosphor-icons/react/dist/ssr"
import { GithubContributionsCard } from "./GithubContributionsCard"
import { getGithubActivity } from "@/lib/services/github"
import { getGithubStats } from "@/lib/services/github"
import StatTile from "../ui/stat-title"
import { getPinnedRepos } from "@/lib/services/github"
import { PinnedRepoCard } from "./GithubRepoCard"
import { GitHubPinnedRepo } from "@/lib/types/github"
import InView from "../motion/InView"
import { StaggerItem } from "../motion/StaggerItem"
import StaggerWrapper from "../motion/StaggerWrapper"
export default async function GithubCard() {
  const [githubData, githubStats, pinnedRepos] = await Promise.all([
    getGithubActivity(),
    getGithubStats(),
    getPinnedRepos(),
  ])

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
        <InView delay={0.1} className="col-span-1 md:col-span-3">
          <StatTile
            label="Contributions"
            value={githubData.totalContributions || "0"}
            icon={<GitForkIcon size={18} weight="duotone" />}
          />
        </InView>
        <InView delay={0.2} className="col-span-1 md:col-span-3">
          <StatTile
            label="Joined at"
            value={githubStats.member_since}
            icon={<CalendarIcon size={18} weight="duotone" />}
          />
        </InView>

        <InView delay={0.3} className="col-span-1 md:col-span-2">
          <StatTile
            label="Following"
            value={githubStats.following}
            icon={<UserPlusIcon size={18} weight="duotone" />}
          />
        </InView>
        <InView delay={0.4} className="col-span-1 md:col-span-2">
          <StatTile
            label="Followers"
            value={githubStats.followers}
            icon={<UsersIcon size={18} weight="duotone" />}
          />
        </InView>
        <InView delay={0.5} className="col-span-2 md:col-span-2">
          <StatTile
            label="Repos"
            value={githubStats.total_repos.toString()}
            icon={<FolderIcon size={18} weight="duotone" />}
          />
        </InView>
      </div>

      <GithubContributionsCard weeks={githubData.contributions} />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <PushPinIcon className="size-6" />
          <h2 className="text-lg font-semibold text-accent-foreground">
            Pinned Repositories
          </h2>
        </div>
        <StaggerWrapper className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pinnedRepos.map((repo: GitHubPinnedRepo, index: number) => (
            <StaggerItem key={`${index}-${repo.name}`}>
              <PinnedRepoCard
                author={repo.author}
                name={repo.name}
                description={repo.description}
                language={repo.language}
                languageColor={repo.languageColor}
                stars={repo.stars}
                link={`https://github.com/${repo.author}/${repo.name}`}
                forks={repo.forks}
              />
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </div>
    </div>
  )
}
