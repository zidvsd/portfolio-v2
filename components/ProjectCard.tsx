import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "@/components/icons"
import { PushPinIcon } from "@phosphor-icons/react/dist/ssr"
import { Card } from "./ui/card"
interface ProjectCardProps {
  repo: {
    slug: string
    name: string
    image?: string
    isFeatured?: boolean
    stars?: number
    description?: string
    languages: { name: string }[]
  }
}

export function ProjectCard({ repo }: ProjectCardProps) {
  const isFeatured = repo.isFeatured === true

  return (
    <Card className="py-0">
      <Link
        href={`/projects/${repo.slug}`}
        className={`group } flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md`}
      >
        {/* TOP HALF: IMAGE WITH OVERLAY */}
        <div
          className={`} relative h-56 w-full overflow-hidden border-b bg-muted`}
        >
          <Image
            src={repo.image || "/images/projects/placeholder.png"}
            alt={repo.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold tracking-widest text-black uppercase shadow-lg ring-1 ring-yellow-500/50">
                Featured
                <PushPinIcon size={12} weight="fill" className="-rotate-45" />
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
          <h3
            className={`font-bold tracking-tight ${isFeatured ? "text-2xl" : "text-lg"}`}
          >
            {repo.name}
          </h3>

          <p
            className={`mt-2 text-muted-foreground ${isFeatured ? "text-base" : "line-clamp-2 text-sm"}`}
          >
            {repo.description ||
              "A full-stack web development project built with modern technologies."}
          </p>

          {/* TAGS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {repo.languages.map((lang) => (
              <span
                key={lang.name}
                className="rounded-md border bg-secondary/30 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-secondary-foreground uppercase"
              >
                {lang.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  )
}
