import { getBlogs } from "@/lib/services/queries"
import BlogList from "@/components/blog/BlogList"
import EndOfPage from "@/components/ui/end-of-page"
export const dynamic = "force-dynamic"
export default async function BlogSection() {
  const blogs = await getBlogs()

  return (
    <>
      <section>
        <BlogList blogData={blogs} />
      </section>
      <EndOfPage />
    </>
  )
}
