import { Skeleton } from "../ui/skeleton"
export default function WakaTimeSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-9 w-9" />
        </div>
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl border" />
        ))}
      </div>
    </div>
  )
}
