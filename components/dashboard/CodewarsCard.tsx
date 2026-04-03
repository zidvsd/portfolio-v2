import { CodewarsProfile } from "@/lib/types/codewars"
import StatTile from "../ui/stat-title"
import {
  TrophyIcon,
  FireIcon,
  ArrowSquareOutIcon,
  RankingIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/dist/ssr"
import CodewarsIcon from "../icons/CodewarsIcon"
import { Button } from "../ui/button"
import InView from "../motion/InView" // Assuming this is your Client Motion Wrapper

interface CodewarsCardProps {
  codewarsData: CodewarsProfile
}

export default function CodewarsCard({ codewarsData }: CodewarsCardProps) {
  const profileUri = `https://www.codewars.com/users/${codewarsData.username}`

  return (
    <InView className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CodewarsIcon className="size-12 text-red-700" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Codewars Activity
            </h1>
          </div>
          <a href={profileUri} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <ArrowSquareOutIcon size={20} />
            </Button>
          </a>
        </div>
        <p className="leading-relaxed text-muted-foreground">
          Algorithmic challenges and rank progression on Codewars.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        <div className="col-span-1 md:col-span-3">
          <StatTile
            label="Overall Rank"
            value={codewarsData.ranks?.overall?.name || "N/A"}
            icon={<TrophyIcon size={18} weight="duotone" />}
            highlight={true}
          />
        </div>
        <div className="col-span-1 md:col-span-3">
          <StatTile
            label="Honor"
            value={codewarsData.honor?.toLocaleString() || "0"}
            icon={<FireIcon size={18} weight="duotone" />}
          />
        </div>

        <div className="col-span-1 md:col-span-3">
          <StatTile
            label="Leaderboard"
            value={
              codewarsData.leaderboardPosition
                ? `#${codewarsData.leaderboardPosition.toLocaleString()}`
                : "—"
            }
            icon={<RankingIcon size={18} weight="duotone" />}
          />
        </div>

        <div className="col-span-1 md:col-span-3">
          <StatTile
            label="Score"
            value={codewarsData.ranks?.overall?.score?.toLocaleString() || "0"}
            icon={<TrendUpIcon size={18} weight="duotone" />}
          />
        </div>
      </div>

      {/* Skills Tags Section */}
      {codewarsData.skills && codewarsData.skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
            Top Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {codewarsData.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/5 bg-zinc-900/50 px-3 py-1 text-[11px] font-medium text-zinc-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </InView>
  )
}
