import { Skeleton } from "@/components/ui/skeleton"

export function AchievementSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filter Buttons Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-16 rounded-md" /> {/* All */}
          <Skeleton className="h-10 w-28 rounded-md" /> {/* Certificates */}
          <Skeleton className="h-10 w-24 rounded-md" /> {/* Badges */}
        </div>
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative flex flex-col overflow-hidden rounded-md border p-5 shadow-md"
          >
            {/* 1. Type Badge Skeleton (Absolute positioned) */}
            <div className="absolute top-3 right-3 z-20">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* 2. Image Container (Matches aspect-video) */}
            <Skeleton className="aspect-video w-full rounded-t-lg" />

            {/* 3. Content Wrapper */}
            <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
              <div className="space-y-2">
                {/* Title (Two lines) */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                </div>

                {/* Issuer & Date Row */}
                <div className="flex items-center justify-between pt-1">
                  <Skeleton className="h-4 w-24" /> {/* Issuer */}
                  <Skeleton className="h-3 w-16" /> {/* Date */}
                </div>
              </div>

              {/* 4. Action Button (Always at bottom) */}
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
