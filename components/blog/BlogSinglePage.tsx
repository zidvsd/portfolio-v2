"use client"

import { useState, useEffect } from "react"
import { formatDate } from "@/lib/utils"
import { CalendarIcon, ClockIcon } from "@phosphor-icons/react"
import Image from "next/image"
import { Blog } from "@/lib/types/blog"
import { getReadingTime } from "@/lib/utils"
import { parseMarkdownContent } from "@/lib/markdown-parser"
export default function BlogSinglePage({ blog }: { blog: Blog }) {
  const [loading, setLoading] = useState(false) // optional if you want client-side skeletons

  // Optional: any client-side logic, like comments or animations
  useEffect(() => {
    // Example: simulate some client-side work
    // setLoading(true)
    // setTimeout(() => setLoading(false), 300)
  }, [])

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
            {getReadingTime(blog.content)} min read
          </p>
        </div>
      </header>
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <h3>{blog.description}</h3>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={blog.coverImageUrl}
          alt={blog.title}
          fill
          className="object-cover"
          priority 
        />
      </div>
      <div className="prose break-word max-w-full space-y-4 break-all whitespace-normal">
        <div
          dangerouslySetInnerHTML={{
            __html: parseMarkdownContent(blog.content),
          }}
        />
      </div>
      <hr className="border-border" />
      <div className="flex flex-wrap gap-2">
        {blog.tags?.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-500 uppercase"
          >
            #{tag}
          </span>
        ))}
      </div>
      <hr className="border-border" />
    </div>
  )
}
