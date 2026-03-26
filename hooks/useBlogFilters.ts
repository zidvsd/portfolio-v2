import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Blog, BlogCategory } from "@/lib/types/blog"
import { capitalizeFirstChar } from "@/lib/utils"

const CATEGORIES: BlogCategory[] = [
  "All",
  "Development",
  "Music",
  "Gaming",
  "General",
]

export function useBlogFilters(blogData: Blog[]) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(6)

  const rawParam = searchParams.get("category")
  const initialCategory =
    rawParam &&
    CATEGORIES.includes(capitalizeFirstChar(rawParam) as BlogCategory)
      ? (capitalizeFirstChar(rawParam) as BlogCategory)
      : "All"

  const [activeFilter, setActiveFilter] =
    useState<BlogCategory>(initialCategory)

  const isFiltering = searchQuery !== "" || activeFilter !== "All"
  // Sync state with URL
  useEffect(() => {
    const raw = searchParams.get("category")
    setActiveFilter(raw ? (capitalizeFirstChar(raw) as BlogCategory) : "All")
  }, [searchParams])

  const handleFilterChange = (category: BlogCategory) => {
    setActiveFilter(category)
    const url =
      category === "All" ? "/blog" : `/blog?category=${category.toLowerCase()}`
    router.push(url, { scroll: false })
  }
  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveFilter("All")
    router.push("/blog", { scroll: false })
  }
  const filteredBlogs = useMemo(() => {
    const hero = blogData.find((b) => b.isFeatured)

    return blogData.filter((b) => {
      // 1. If searching, show EVERYTHING that matches (including the hero)
      // 2. If NOT searching, hide the hero so it doesn't appear twice on the page
      const isHero = b._id === hero?._id
      if (!isFiltering && isHero) return false

      const matchesSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        activeFilter === "All" || b.category === activeFilter

      return matchesSearch && matchesCategory
    })
  }, [blogData, searchQuery, activeFilter, isFiltering])

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    handleFilterChange,
    filteredBlogs,
    visibleCount,
    setVisibleCount,
    handleClearFilters,
    isFiltering: searchQuery !== "" || activeFilter !== "All",
    heroBlog: blogData.find((b) => b.isFeatured),
    CATEGORIES,
  }
}
