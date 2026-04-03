import { Skeleton } from "@/components/ui/skeleton"

export default function CodewarsCardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Grid: 2 rows of 3+3 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {[...Array(4)].map((_, i) => (
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
      </div>

      {/* Skills Section */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-20" />
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
