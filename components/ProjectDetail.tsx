import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import { Badge } from "@/components/ui/badge"
import { MY_PROJECTS } from "@/lib/projects-config"
import Image from "next/image"
import {
  GithubLogoIcon,
  GlobeIcon,
  StarIcon,
  GitForkIcon,
} from "@phosphor-icons/react/dist/ssr"

export default function ProjectDetail(repo: any) {
  // remove readme text from md
  const cleanedReadme = repo.readme?.replace(
    /Live demo:\s*https?:\/\/[^\s\n]+/gi,
    ""
  )
  return (
    <div className="space-y-4">
      {/* GitHub Actions/Links */}
      <div className="flex items-center gap-6 border-y border-border/50 py-4">
        {repo.deployUrl && (
          <a
            href={repo.deployUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <GlobeIcon size={22} /> Live Demo
          </a>
        )}
        <a
          href={repo.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <GithubLogoIcon size={22} /> Source Code
        </a>

        <div className="ml-auto hidden items-center gap-4 text-muted-foreground md:flex">
          <div className="flex items-center gap-1">
            <StarIcon size={18} /> {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitForkIcon size={18} /> {repo.forks}
          </div>
        </div>
      </div>
      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {repo.topics.map((topic: string) => (
          <Badge
            key={topic}
            variant="secondary"
            className="rounded-full bg-secondary/50 px-3 py-1"
          >
            {topic}
          </Badge>
        ))}
      </div>

      {/* Image  */}
      {repo.projectImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
          <Image
            src={repo.projectImage}
            alt={`${repo.displayTitle} preview`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      )}
      {/* README */}
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {cleanedReadme}
        </ReactMarkdown>
      </article>
    </div>
  )
}
