import { getBlogBySlug } from "@/lib/services/queries"
import BlogSinglePage from "@/components/blog/BlogSinglePage"
export const revalidate = 0
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return (
      <div className="custom-container py-20 text-center">
        <p className="text-muted-foreground">Blog not found.</p>
      </div>
    )
  }

  return <BlogSinglePage key={slug} blog={blog} />
}
