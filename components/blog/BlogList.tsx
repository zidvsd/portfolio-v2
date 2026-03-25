"use client"
interface BlogDataProps {
  blogData: Blog[]
}

import { Blog } from "@/lib/types/blog"
import { useState, useEffect } from "react"
import { BlogCategory } from "@/lib/types/blog"
import { Button } from "../ui/button"
import BlogCard from "./BlogCard"
import { SearchInput } from "../SearchInput"
import { EmptyState } from "../EmptyState"
import BlogHero from "./BlogHero"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import SidebarBlogCard from "./SidebarBlogCard"
export default function BlogList({ blogData }: BlogDataProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const categories: BlogCategory[] = [
    "All",
    "Development",
    "Music",
    "Gaming",
    "General",
  ]
  const [activeFilter, setActiveFilter] = useState<BlogCategory>("All")
  const [visibleCount, setVisibleCount] = useState(6)
  const isFiltering = searchQuery !== "" || activeFilter !== "All"
  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveFilter("All")
  }
  const heroBlog = blogData.find((blog) => blog.isFeatured)
  console.log(heroBlog)
  const filteredBlogs = blogData
    .filter((blog) => blog._id !== heroBlog?._id)
    .filter((blog) => {
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
        <div className="no-scrollbar flex flex-wrap gap-2 overflow-x-auto pb-2">
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
          <div className="flex w-full flex-col lg:col-span-3">
            {/* Show next 4 blogs in the sidebar */}
            <h1 className="text-2xl font-bold tracking-tight">Recent Blogs</h1>
            <hr className="my-2 border-border" />
            {blogData.slice(1, 5).map((blog) => (
              <SidebarBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredBlogs.slice(0, visibleCount).map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Load more content button */}
      {visibleCount < filteredBlogs.length && (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setVisibleCount((prev) => prev + 3)}>
            Load More
          </Button>
        </div>
      )}

      {/* Empty state */}
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
