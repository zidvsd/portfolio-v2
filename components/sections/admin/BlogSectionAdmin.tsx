// components/sections/blog/BlogSectionAdmin.tsx
import { getBlogs } from "@/lib/services/queries"
import BlogAdminCard from "@/components/BlogAdminCard"
export default async function BlogSectionAdmin() {
  const blogs = await getBlogs()

  if (blogs.length === 0) {
    return (
      <div className="flex min-h-50 flex-col items-center justify-center rounded-lg border border-dashed text-center">
        <p className="text-muted-foreground">No blogs found. Time to write!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog: any) => (
        <BlogAdminCard key={blog._id} blog={blog} />
      ))}
    </div>
  )
}
