import { Skeleton } from "@/components/ui/skeleton"

export function ProjectsSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-card/50"
        >
          {/* Top Half: Image Container */}
          <div className="relative h-56 w-full border-b bg-muted/50">
            {/* Optional: Add a subtle logo skeleton in the center of the image area */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>

          {/* Bottom Half: Content */}
          <div className="flex flex-col space-y-4 p-5">
            <div className="space-y-2">
              <Skeleton className="h-7 w-3/4" /> {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" /> {/* Description Line 1 */}
                <Skeleton className="h-4 w-[90%]" /> {/* Description Line 2 */}
              </div>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-5 w-12 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
