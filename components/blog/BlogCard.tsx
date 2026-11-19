"use client"
import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/lib/types/blog"
import { Card, CardContent, CardFooter } from "../ui/card"
import { ClockIcon } from "@phosphor-icons/react"

interface BlogCardProps {
  blog: Blog
}
export default function BlogCard({ blog }: BlogCardProps) {
  const noOfWords = blog.content.split(/\s+/).length
  const readtime = Math.ceil(noOfWords / 200)

  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden pt-0 shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden border-b bg-muted">
          {blog.coverImageUrl ? (
            <Image
              src={blog.coverImageUrl}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/5 text-[10px] font-medium tracking-widest text-primary/50 uppercase">
              No Image
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col space-y-3 px-4 py-4">
          <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
            {blog.category || "General"}
          </span>

          <h3 className="line-clamp-2 text-lg leading-tight font-bold transition-colors group-hover:text-primary">
            {blog.title}
          </h3>

          <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
            {blog.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ClockIcon size={14} weight="bold" />
            <span className="text-xs font-medium">{readtime} min read</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
