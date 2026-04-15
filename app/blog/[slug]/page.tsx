export const revalidate = 3600
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import RelatedBlogsSection from "@/components/sections/blog/RelatedBlogsSection"
import BlogContentSection from "@/components/sections/blog/BlogContentSection"
import BlogCommentSection from "@/components/sections/blog/BlogCommentSection"
import { getUserSession } from "@/lib/auth/auth-util"
import { getBlogBySlug } from "@/lib/services/queries"
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!slug) notFound()
  const user = await getUserSession()
  const blog = await getBlogBySlug(slug)
  return (
    <div className="space-y-12">
      <Suspense fallback={<SkeletonLoader variant="blog-content" />}>
        <BlogContentSection slug={slug} />
      </Suspense>

      <Suspense fallback={<SkeletonLoader variant="related-blogs" />}>
        <RelatedBlogsSection slug={slug} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader variant="related-blogs" />}>
        <BlogCommentSection user={user} blogId={blog._id.toString()} />
      </Suspense>
    </div>
  )
}
