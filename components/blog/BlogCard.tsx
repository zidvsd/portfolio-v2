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
  const noOfWords = blog.content.split(/\s+/).length // Splits by any whitespace
  const readtime = noOfWords / 200
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden pt-0 shadow-sm">
        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden">
          {blog.coverImageUrl ? (
            <Image
              src={blog.coverImageUrl}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-500/10 text-blue-500/40">
              No Image
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="space-y-3 px-4">
          <h3 className="text-xl leading-tight font-bold transition-colors group-hover:text-blue-500">
            {blog.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {blog.description}
          </p>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="mt-auto flex h-full flex-1 items-center justify-between px-4 pb-0">
          <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
            {blog.category}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ClockIcon size={16} />
            <span className="text-xs font-medium">{readtime} MIN READ</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
