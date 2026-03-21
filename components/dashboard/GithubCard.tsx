import GithubIcon from "../icons/GithubIcon"
import { Button } from "../ui/button"
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr"
import { GithubContributionsCard } from "./GithubContributionsCard"
export default function GithubCard() {
  return (
    <div className="custom-container">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#1DB954]/10 p-2">
              <GithubIcon className="size-5 text-[#1DB954]" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Listening Activity
            </h1>
          </div>
          <a href={"https://github.com/zidvsd"} target="_blank">
            <Button variant="ghost">
              <ArrowSquareOutIcon />
            </Button>
          </a>
        </div>

        <p className="flex items-center leading-relaxed text-muted-foreground">
          Real-time music & coding vibes from the past week
        </p>
      </div>
    </div>
  )
}
