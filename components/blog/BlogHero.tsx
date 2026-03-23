"use client"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Blog } from "@/lib/types/blog"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { ClockIcon, CalendarIcon } from "@phosphor-icons/react"
interface BlogCardProps {
  blogHero: Blog
}

export default function BlogHero({ blogHero }: BlogCardProps) {
  const noOfWords = blogHero.content.split(/\s+/).length // Splits by any whitespace
  const readtime = noOfWords / 200
  return (
    <Link href={`/blog/${blogHero.slug}`} className="group block">
      <Card className="h-full overflow-hidden py-0 shadow-sm">
        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden">
          {blogHero.coverImageUrl ? (
            <Image
              src={blogHero.coverImageUrl}
              alt={blogHero.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-500/10 text-blue-500/40">
              No Image
            </div>
          )}
        </div>

        {/* header */}
        <CardHeader className="flex items-center gap-8 px-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} />
            <span>{formatDate(blogHero.datePublished)}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon size={18} />
            <span>{readtime} min read</span>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="space-y-2 px-8">
          <h3 className="text-2xl leading-tight font-bold transition-colors group-hover:text-blue-500">
            {blogHero.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {blogHero.description}
          </p>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="px-8 py-4">
          <div className="space-x-2">
            {blogHero.tags.map((tag) => (
              <span className="rounded-background bg-primary px-2 py-1.5 text-xs font-semibold text-white">
                {" "}
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
