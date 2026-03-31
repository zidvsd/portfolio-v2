import { Suspense } from "react"
import { notFound } from "next/navigation"
import {
  BlogContentSkeleton,
  RelatedBlogsSkeleton,
} from "@/components/skeleton/BlogContentSkeleton"

import RelatedBlogsSection from "@/components/sections/blog/RelatedBlogsSection"
import BlogContentSection from "@/components/sections/blog/BlogContentSection"

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!slug) notFound()

  return (
    <div className="space-y-12">
      {/* 1. The Main Blog Article */}
      <Suspense fallback={<BlogContentSkeleton />}>
        <BlogContentSection slug={slug} />
      </Suspense>

      {/* 2. The Related Posts Section */}
      <Suspense fallback={<RelatedBlogsSkeleton />}>
        <RelatedBlogsSection slug={slug} />
      </Suspense>
    </div>
  )
}
