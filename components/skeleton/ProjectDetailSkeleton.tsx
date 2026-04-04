import { Skeleton } from "../ui/skeleton"
export function ProjectDetailSkeleton() {
  return (
    <div className="mt-2 space-y-6">
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

      {/* 3. Main Image Aspect Ratio Box */}
      <Skeleton className="aspect-video w-full rounded-lg" />

      {/* 4. README Content Skeleton */}
      <div className="space-y-10 pt-4">
        {/* About Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" /> {/* H2 Header */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>

        {/* Features/Tech Stack Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-40" /> {/* H2 Header */}
          <div className="grid grid-cols-1 gap-3">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        {/* Installation Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" /> {/* H2 Header */}
          <Skeleton className="h-24 w-full rounded-md" /> {/* Code Block */}
        </div>
      </div>
    </div>
  )
}
