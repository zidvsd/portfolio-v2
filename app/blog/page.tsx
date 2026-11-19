export const dynamic = "force-dynamic"
import { Suspense } from "react"
import BlogSection from "@/components/sections/blog/BlogSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Blog: Web Development, Gaming & Music",
  description:
    "Articles by Rashid Visda on full-stack development, React, Next.js, and web performance, plus the occasional post on gaming and guitar tones.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          A collection of my thoughts on full-stack dev, late-night gaming
          sessions, and the occasional deep dive into guitar tones.
        </p>
      </div>
      <hr className="border-border" />

      <Suspense fallback={<SkeletonLoader variant="blog-list" />}>
        <BlogSection />
      </Suspense>
    </section>
  )
}
