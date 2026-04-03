import { Skeleton } from "@/components/ui/skeleton"

export default function GithubCardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-8 w-38" />
          </div>
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        <Skeleton className="h-5 w-full max-w-125" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {/* Contributions & Joined at (3 cols each) */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="col-span-1 md:col-span-3">
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <Skeleton className="size-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
        ))}

        {/* Following, Followers, Repos (2 cols each) */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="col-span-1 last:col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <Skeleton className="size-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contribution Graph Placeholder */}
      <Skeleton className="h-40 w-full rounded-xl border" />

      {/* Pinned Repos Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 space-y-4 rounded-xl border p-5">
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
