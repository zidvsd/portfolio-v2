export const revalidate = 60
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import RelatedBlogsSection from "@/components/sections/blog/RelatedBlogsSection"
import BlogContentSection from "@/components/sections/blog/BlogContentSection"
import BlogCommentSection from "@/components/sections/blog/BlogCommentSection"
import { getUserSession } from "@/lib/auth/auth-util"
import type { Metadata } from "next"
import { getBlogBySlug } from "@/lib/services/queries"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post does not exist.",
    }
  }

  const title = `${blog.title} | Rashid Visda Blog`
  const description =
    blog.excerpt ||
    blog.content?.slice(0, 150) ||
    "Read this article on web development, React, and Next.js."

  return {
    title,
    description,

    alternates: {
      canonical: `https://zidvsd.site/blog/${slug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: `https://zidvsd.site/blog/${slug}`,
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!slug) notFound()

  const user = await getUserSession()
  const blog = await getBlogBySlug(slug)

  if (!blog) notFound()

  return (
    <div className="space-y-12">
      <Suspense fallback={<SkeletonLoader variant="blog-content" />}>
        <BlogContentSection blog={blog} />
      </Suspense>

      <Suspense fallback={<SkeletonLoader variant="related-blogs" />}>
        <RelatedBlogsSection blog={blog} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader variant="related-blogs" />}>
        <BlogCommentSection user={user} blogId={blog._id.toString()} />
      </Suspense>
    </div>
  )
}
