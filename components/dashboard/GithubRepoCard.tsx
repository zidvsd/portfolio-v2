import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  StarIcon,
  GitForkIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react/dist/ssr"
import { GitHubPinnedRepo } from "@/lib/types/github"

export function PinnedRepoCard({
  name,
  description,
  language,
  languageColor,
  stars,
  forks,
  link,
}: GitHubPinnedRepo) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-transform duration-200 active:scale-[0.98]"
    >
      <Card className="flex h-full flex-col p-4">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <CardTitle className="truncate font-bold tracking-tight text-accent-foreground transition-colors group-hover:text-chart-3">
              {name}
            </CardTitle>

            <div className="flex shrink-0 items-center gap-3 text-zinc-500">
              <div className="flex items-center gap-1 text-xs font-medium">
                <StarIcon weight="fill" className="size-4 text-yellow-500/80" />
                <span>{stars}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <GitForkIcon weight="bold" className="size-4 text-zinc-500" />
                <span>{forks}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <CardDescription className="line-clamp-2 px-0 text-sm leading-relaxed">
            {description || "No description provided."}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-0">
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: languageColor || "#52525b" }}
            />
            <p className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
              {language}
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs">View</span>
            <ArrowSquareOutIcon className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </a>
  )
}
