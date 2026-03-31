import { getBlogBySlug, getRelatedBlogs } from "@/lib/services/queries"
import BlogCard from "@/components/blog/BlogCard"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import InView from "@/components/motion/InView"
import { Blog } from "@/lib/types/blog"

export default async function RelatedBlogsSection({ slug }: { slug: string }) {
  const blog = await getBlogBySlug(slug) // De-duplicated by Next.js
  if (!blog) return null

  const relatedBlogs = await getRelatedBlogs(blog.category, slug)
  if (relatedBlogs.length === 0) return null

  return (
    <section className="border-border">
      <div className="flex items-center justify-between">
        <h3 className="mb-8 text-xl font-bold">More in {blog.category}</h3>
        <Link href="/blog">
          <Button variant="ghost">
            View More
            <ArrowRightIcon className="ml-2" />
          </Button>
        </Link>
      </div>
      <InView className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {relatedBlogs.map((related: Blog) => (
          <BlogCard key={related._id} blog={related} />
        ))}
      </InView>
    </section>
  )
}
