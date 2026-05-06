export const dynamic = "force-dynamic"
import { Suspense } from "react"
import BlogSection from "@/components/sections/blog/BlogSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Web Development Insights by Rashid Visda",

  description:
    "Articles and thoughts by Rashid Visda on full-stack development, React, Next.js, web performance, and personal developer experiences.",

  alternates: {
    canonical: "https://zidvsd.site/blog",
  },

  openGraph: {
    title: "Blog | Rashid Visda",
    description:
      "Insights on full-stack development, React, Next.js, and software engineering.",
    url: "https://zidvsd.site/blog",
    type: "website",
  },
}

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
