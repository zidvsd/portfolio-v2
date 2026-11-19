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
import { pageMetadata, SITE_URL } from "@/lib/seo"

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
      robots: { index: false },
    }
  }

  return pageMetadata({
    title: blog.title,
    description:
      blog.description ||
      "Read this article on web development, React, and Next.js.",
    path: `/blog/${slug}`,
    // Facebook/LinkedIn/X can't render AVIF previews; use the generated card.
    image:
      blog.coverImageUrl && !/\.avif$/i.test(blog.coverImageUrl)
        ? blog.coverImageUrl
        : undefined,
    type: "article",
    publishedTime: blog.datePublished,
    tags: blog.tags,
    noIndex: blog.isPublished === false,
  })
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!slug) notFound()
  const [user, blog] = await Promise.all([
    getUserSession(),
    getBlogBySlug(slug),
  ])

  if (!blog) notFound()

  const url = `${SITE_URL}/blog/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.coverImageUrl ? [blog.coverImageUrl] : undefined,
    datePublished: blog.datePublished,
    url,
    mainEntityOfPage: url,
    keywords: blog.tags?.join(", "),
    articleSection: blog.category,
    author: { "@id": `${SITE_URL}/#person`, name: "Rashid Visda", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
