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
      <Card className="flex h-full flex-col overflow-hidden border-none bg-transparent pt-0 shadow-md">
        {/* Image Section - Fixed Aspect Ratio */}
        <div className="relative aspect-video w-full overflow-hidden rounded-tl-xl rounded-tr-xl border bg-muted dark:border-none">
          {blog.coverImageUrl ? (
            <Image
              src={blog.coverImageUrl}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-500/5 text-[10px] font-medium tracking-widest text-blue-500/40 uppercase">
              No Image
            </div>
          )}
        </div>

        {/* Content Section - This expands to push footer down */}
        <CardContent className="flex flex-1 flex-col space-y-3 px-4 py-4">
          <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
            {blog.category || "General"}
          </span>

          {/* Force Title to exactly 2 lines height */}
          <h3 className="line-clamp-2 min-h-14 text-xl leading-tight font-bold transition-colors group-hover:text-blue-500">
            {blog.title}
          </h3>

          {/* Force Description to exactly 2 lines height */}
          <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
            {blog.description}
          </p>
        </CardContent>
        {/* Footer Section - mt-auto keeps it at the very bottom */}
        <CardFooter className="mt-auto flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <ClockIcon size={14} weight="bold" />
            <span className="text-[10px] font-bold tracking-tight">
              {readtime} MIN READ
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
