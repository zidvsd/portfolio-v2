import BlogSinglePage from "@/components/blog/BlogSinglePage"
import { Blog } from "@/lib/types/blog"

export default async function BlogContentSection({ blog }: { blog: Blog }) {
  return <BlogSinglePage blog={blog} />
}
