"use client"

import { formatDate } from "@/lib/utils"
import { CalendarIcon, ClockIcon } from "@phosphor-icons/react"
import Image from "next/image"
import { Blog } from "@/lib/types/blog"
import { getReadingTime } from "@/lib/utils"
import { parseMarkdownContent } from "@/lib/markdown-parser"

export default function BlogSinglePage({ blog }: { blog: Blog }) {
  if (!blog) return null

  const tags = Array.isArray(blog.tags) ? blog.tags : []

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <p className="rounded-full bg-primary px-2 py-1 text-sm text-white">
          {blog.category}
        </p>

        <div className="flex items-center gap-2">
          <CalendarIcon />
          <p className="text-sm text-muted-foreground">
            {formatDate(blog.datePublished)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon />
          <p className="text-sm text-muted-foreground">
            {getReadingTime(blog.content ?? "")} min read
          </p>
        </div>
      </header>

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      {blog.description && <h3>{blog.description}</h3>}

      {blog.coverImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={blog.coverImageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      <div className="prose max-w-full space-y-4 wrap-break-word whitespace-normal">
        <div
          dangerouslySetInnerHTML={{
            __html: parseMarkdownContent(blog.content ?? ""),
          }}
        />
      </div>

      <hr className="border-border" />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-500 uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <hr className="border-border" />
    </div>
  )
}
