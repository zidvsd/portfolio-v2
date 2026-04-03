// components/skeleton/SpotifyCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function SpotifyCardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-9 w-9" />
        </div>
        <Skeleton className="h-5 w-72" />
      </div>

      {/* Now Playing Card Skeleton */}
      <div className="flex items-center gap-4 rounded-xl border p-4">
        <Skeleton className="size-16 rounded-md md:size-20" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* Playlist Carousel Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="min-w-37.5 space-y-2">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
