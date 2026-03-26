import { getBlogBySlug } from "@/lib/services/queries"
import BlogSinglePage from "@/components/blog/BlogSinglePage"
import { getRelatedBlogs } from "@/lib/services/queries"
import BlogCard from "@/components/blog/BlogCard"
import { Blog } from "@/lib/types/blog"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import InView from "@/components/motion/InView"
export const revalidate = 0
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  const relatedBlogs = await getRelatedBlogs(blog.category, slug)

  if (!blog) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Blog not found.</p>
      </div>
    )
  }

  return (
    <>
      <BlogSinglePage key={slug} blog={blog} />

      <section className="border-white/10 pt-10">
        <div className="flex items-center justify-between">
          <h3 className="mb-8 text-xl font-bold">More in {blog.category}</h3>
          <Link href="/blog">
            <Button variant={"ghost"}>
              View More
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
        <InView className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {relatedBlogs.map((related: Blog) => (
            <BlogCard key={related._id} blog={related} />
          ))}
        </InView>
      </section>
    </>
  )
}
