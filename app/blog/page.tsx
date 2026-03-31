import { Suspense } from "react"
import BlogSection from "@/components/sections/blog/BlogSection"
import { BlogListSkeleton } from "@/components/skeleton/BlogListSkeleton"
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

      <Suspense fallback={<BlogListSkeleton />}>
        <BlogSection />
      </Suspense>
    </section>
  )
}
