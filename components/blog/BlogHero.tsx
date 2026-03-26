"use client"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Blog } from "@/lib/types/blog"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { ClockIcon, CalendarIcon } from "@phosphor-icons/react"
import SidebarBlogCard from "./SidebarBlogCard"
import { StaggerItem } from "../motion/StaggerItem"
import StaggerWrapper from "../motion/StaggerWrapper"
interface BlogHeroProps {
  blogHero: Blog
  recentBlogs: Blog[] // Now this is correctly handled
}

export default function BlogHero({ blogHero, recentBlogs }: BlogHeroProps) {
  const noOfWords = blogHero.content.split(/\s+/).length
  const readtime = Math.ceil(noOfWords / 200)

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      {/* 70% SECTION: THE MAIN FEATURED CARD */}
      <div className="lg:col-span-7">
        <Link href={`/blog/${blogHero.slug}`} className="group block h-full">
          <Card className="h-full overflow-hidden border-white/5 bg-white/2 py-0 shadow-sm transition-colors hover:bg-white/4">
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden">
              {blogHero.coverImageUrl ? (
                <Image
                  src={blogHero.coverImageUrl}
                  alt={blogHero.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority // Good for LCP
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-500/10 text-blue-500/40">
                  No Image
                </div>
              )}
            </div>

            {/* Header */}
            <CardHeader className="flex flex-row items-center gap-6 px-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>{formatDate(blogHero.datePublished)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon size={16} />
                <span>{readtime} min read</span>
              </div>
            </CardHeader>

            {/* Content Section */}
            <CardContent className="space-y-3 px-8">
              <h3 className="text-3xl leading-tight font-bold tracking-tight transition-colors group-hover:text-blue-500">
                {blogHero.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {blogHero.description}
              </p>
            </CardContent>

            {/* Footer Section (Tags) */}
            <CardFooter className="px-8 pt-4 pb-8">
              <div className="flex flex-wrap gap-2">
                {blogHero.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-500 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>

      {/* 30% SECTION: THE RECENT BLOGS SIDEBAR */}
      <div className="flex flex-col lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black tracking-[0.2em] text-muted-foreground/70">
            Recent Blogs
          </h2>
          <div className="ml-4 h-px flex-1 bg-white/5" />
        </div>

        <StaggerWrapper className="flex flex-col gap-1">
          {recentBlogs.map((blog) => (
            <StaggerItem key={blog._id}>
              <SidebarBlogCard blog={blog} />
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </div>
    </div>
  )
}
