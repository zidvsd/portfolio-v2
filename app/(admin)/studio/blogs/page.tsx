// app/studio/blogs/page.tsx
export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import BlogSectionAdmin from "@/components/sections/admin/BlogSectionAdmin"

export default function StudioBlogsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-muted-foreground">
            Update, delete, or draft your latest stories.
          </p>
        </div>
        <Button size={"lg"} className="w-full md:w-auto">
          <Link href="/studio/blogs/create" className="flex items-center gap-2">
            <PlusIcon weight="bold" />
            Create New Post
          </Link>
        </Button>
      </div>

      <hr className="border-border" />

      {/* Blog List with Admin Actions */}
      <Suspense fallback={<SkeletonLoader variant="blog-list" />}>
        <BlogSectionAdmin />
      </Suspense>
    </div>
  )
}
