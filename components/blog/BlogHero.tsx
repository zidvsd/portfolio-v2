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
  recentBlogs: Blog[]
}

export default function BlogHero({ blogHero, recentBlogs }: BlogHeroProps) {
  const noOfWords = blogHero.content.split(/\s+/).length
  const readtime = Math.ceil(noOfWords / 200)

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <div className="lg:col-span-7">
        <Link href={`/blog/${blogHero.slug}`} className="group block h-full">
          <Card className="h-full overflow-hidden py-0 shadow-sm">
            <div className="relative aspect-video w-full overflow-hidden">
              {blogHero.coverImageUrl ? (
                <Image
                  src={blogHero.coverImageUrl}
                  alt={blogHero.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary/50">
                  No Image
                </div>
              )}
            </div>

            <CardHeader className="flex flex-row items-center gap-6 px-5 text-xs text-muted-foreground md:px-8">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>{formatDate(blogHero.datePublished)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon size={16} />
                <span>{readtime} min read</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 px-5 md:px-8">
              <h3 className="text-2xl leading-tight font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                {blogHero.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {blogHero.description}
              </p>
            </CardContent>

            <CardFooter className="px-5 pt-2 pb-6 md:px-8 md:pb-8">
              <div className="flex flex-wrap gap-2">
                {blogHero.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="flex flex-col lg:col-span-3">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold tracking-widest text-nowrap text-muted-foreground uppercase">
            Recent Blogs
          </h2>
          <hr className="w-full border-border" />
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
