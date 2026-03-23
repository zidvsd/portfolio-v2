"use client"
interface BlogDataProps {
  blogData: Blog[]
}

import { Blog } from "@/lib/types/blog"
import { useState } from "react"
import { BlogCategory } from "@/lib/types/blog"
import { Button } from "../ui/button"
import BlogCard from "./BlogCard"
import { SearchInput } from "../SearchInput"
import { EmptyState } from "../EmptyState"
import BlogHero from "./BlogHero"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
export default function BlogList({ blogData }: BlogDataProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const categories: BlogCategory[] = ["All", "Development", "Music", "Gaming"]
  const [activeFilter, setActiveFilter] = useState<BlogCategory>("All")
  const isFiltering = searchQuery !== "" || activeFilter !== "All"
  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveFilter("All")
  }
  const heroBlog = blogData.find((blog) => blog.isFeatured || [blogData[0]])
  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      activeFilter === "All" || blog.category === activeFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col gap-4">
        {/* Top Row: Search and Clear */}
        <div className="flex w-full items-center gap-2">
          <div className="w-full">
            <SearchInput onSearch={setSearchQuery} value={searchQuery} />
          </div>
          {isFiltering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="px-2"
            >
              <XIcon size={20} />
            </Button>
          )}
        </div>

        {/* Bottom Row: Horizontally Scrollable Categories */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              size="lg"
              variant={activeFilter === category ? "default" : "outline"}
              className="px-5 whitespace-nowrap" // whitespace-nowrap is key!
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog hero */}
      {/* Only show this featured section when NOT filtering */}
      {!isFiltering && heroBlog && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
          {/* 70% Section: Main Hero */}
          <div className="lg:col-span-7">
            <BlogHero blogHero={heroBlog} />
          </div>

          {/* 30% Section: Secondary Featured Card */}
          <div className="h-full lg:col-span-3">
            {/* Fallback to second blog in array if available */}
            {blogData[1] ? (
              <div className="flex h-full flex-col">
                <BlogCard blog={blogData[1]} />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-blue-500/10 p-6 text-center">
                <p className="text-xs tracking-tighter text-muted-foreground uppercase">
                  More logs coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-6 xl:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {(filteredBlogs.length === 0 || null) && (
        <EmptyState
          title="Unable to find any blogs related to your query ://"
          description="Try adjusting your filters or search terms."
          icon={<MagnifyingGlassIcon className="size-14" />}
        />
      )}
    </div>
  )
}
