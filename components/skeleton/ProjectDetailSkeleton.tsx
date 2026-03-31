import { Skeleton } from "../ui/skeleton"
export function ProjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Description Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* GitHub Actions Row */}
      <div className="flex items-center justify-between gap-6 border-y border-border/50 py-4">
        <div className="flex items-center gap-2">
          {" "}
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      {/* Main Image Aspect Ratio Box */}
      <Skeleton className="aspect-video w-full rounded-lg" />

      {/* README Skeleton content... */}
    </div>
  )
}
