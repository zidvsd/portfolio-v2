"use client"

interface BlogDataProps {
  blogData: Blog[]
}

import { Blog } from "@/lib/types/blog"
import { Button } from "../ui/button"
import BlogCard from "./BlogCard"
import { EmptyState } from "../EmptyState"
import BlogHero from "./BlogHero"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import { useBlogFilters } from "@/hooks/useBlogFilters"
import { BlogFilterBar } from "./BlogFilterBar"
import StaggerWrapper from "../motion/StaggerWrapper"
import { StaggerItem } from "../motion/StaggerItem"
export default function BlogList({ blogData }: BlogDataProps) {
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    handleFilterChange,
    filteredBlogs,
    visibleCount,
    setVisibleCount,
    isFiltering,
    handleClearFilters,
    heroBlog,
    CATEGORIES,
  } = useBlogFilters(blogData)

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col gap-4">
        {/* Top Row: Search and Clear */}
        <BlogFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          categories={CATEGORIES}
          onClear={handleClearFilters}
          isFiltering={isFiltering}
        />
      </div>

      {/* Only show this featured section when NOT filtering */}
      {/* Only show this featured section when NOT filtering */}
      {!isFiltering && heroBlog && (
        <BlogHero blogHero={heroBlog} recentBlogs={blogData.slice(1, 5)} />
      )}

      <StaggerWrapper className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredBlogs.slice(0, visibleCount).map((blog) => (
          <StaggerItem key={blog._id}>
            <BlogCard blog={blog} />
          </StaggerItem>
        ))}
      </StaggerWrapper>

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
