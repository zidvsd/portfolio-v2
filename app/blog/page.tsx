import EndOfPage from "@/components/ui/end-of-page"
import { getBlogs } from "@/lib/services/queries"
import BlogList from "@/components/blog/BlogList"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
export default async function page() {
  const blogs = await getBlogs()
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          A collection of my thoughts on full-stack dev, late-night gaming
          sessions, and the occasional deep dive into guitar tones
        </p>
      </div>
      <hr className="border-border" />

      {/* Pass the server-fetched data to the client wrapper */}
      <Suspense fallback={<BlogListSkeleton />}>
        <section>
          <BlogList blogData={blogs} />
        </section>
      </Suspense>
      <EndOfPage />
    </section>
  )
}

function BlogListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      Loading posts...
    </div>
  )
}
