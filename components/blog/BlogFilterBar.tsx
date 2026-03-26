import { BlogCategory } from "@/lib/types/blog"
import { SearchInput } from "../SearchInput"
import { Button } from "../ui/button"
import { XIcon } from "@phosphor-icons/react"

interface FilterBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeFilter: BlogCategory
  onFilterChange: (category: BlogCategory) => void
  categories: BlogCategory[]
  isFiltering: boolean
  onClear: () => void
}

export function BlogFilterBar({
  searchQuery,
  setSearchQuery,
  activeFilter,
  onFilterChange,
  categories,
  isFiltering,
  onClear,
}: FilterBarProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Search Row */}
      <div className="flex w-full items-center gap-2">
        <div className="w-full">
          <SearchInput onSearch={setSearchQuery} value={searchQuery} />
        </div>
        {isFiltering && (
          <Button variant="ghost" size="sm" onClick={onClear} className="px-2">
            <XIcon size={20} />
          </Button>
        )}
      </div>

      {/* Categories Row */}
      <div className="no-scrollbar flex flex-wrap gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            size="lg"
            variant={activeFilter === category ? "default" : "outline"}
            className="px-5 whitespace-nowrap"
            onClick={() => onFilterChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}
