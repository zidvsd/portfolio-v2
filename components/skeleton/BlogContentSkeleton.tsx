import { Skeleton } from "@/components/ui/skeleton"

export function BlogContentSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero / Header Area */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" /> {/* Date/Category */}
        <Skeleton className="h-12 w-3/4" /> {/* Title */}
        <div className="flex gap-4">
          <Skeleton className="h-10 w-10 rounded-full" /> {/* Author Avatar */}
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Main Banner Image */}
      <Skeleton className="aspect-video w-full rounded-2xl" />

      {/* Article Body */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-32 w-full" /> {/* Code block or Quote */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </div>
  )
}

export function RelatedBlogsSkeleton() {
  return (
    <div className="space-y-8 border-t border-border pt-10">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  )
}
