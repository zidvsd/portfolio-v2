import { getBlogBySlug } from "@/lib/services/queries"
import BlogSinglePage from "@/components/blog/BlogSinglePage"
import { notFound } from "next/navigation"

export default async function BlogContentSection({ blog }: { blog: any }) {
  return <BlogSinglePage blog={blog} />
}
