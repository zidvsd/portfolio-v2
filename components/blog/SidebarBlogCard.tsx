"use client"
import Link from "next/link"
import { Blog } from "@/lib/types/blog"
import { formatDistanceToNow } from "date-fns"

interface SidebarBlogCardProps {
  blog: Blog
}

export default function SidebarBlogCard({ blog }: SidebarBlogCardProps) {
  const timeAgo = formatDistanceToNow(new Date(blog.datePublished), {
    addSuffix: true,
  })

  return (
    <Link href={`/blog/${blog.slug}`} className="group block w-full">
      <div className="flex flex-col gap-2 py-4 last:border-0">
        {/* Top Row: Dot and Time */}
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            {timeAgo}
          </span>
        </div>

        {/* Title */}
        <h4 className="line-clamp-2 text-sm leading-snug font-bold transition-colors group-hover:text-blue-400">
          {blog.title}
        </h4>
      </div>
      <hr className="border-border" />
    </Link>
  )
}
