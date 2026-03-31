import { getBlogBySlug } from "@/lib/services/queries"
import BlogSinglePage from "@/components/blog/BlogSinglePage"
import { notFound } from "next/navigation"

export default async function BlogContentSection({ slug }: { slug: string }) {
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()

  return <BlogSinglePage key={slug} blog={blog} />
}
