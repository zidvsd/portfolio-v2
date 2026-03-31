// @/components/skeletons/HomeSkeletons.tsx
import { Skeleton } from "@/components/ui/skeleton"
import {
  MapPinIcon,
  BriefcaseIcon,
  CodeIcon,
  PushPinIcon,
} from "@phosphor-icons/react/dist/ssr"

// PART 1: Profile & Bio
export function ProfileSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex flex-row justify-between gap-6 md:items-start">
        <div className="space-y-3">
          <Skeleton className="h-9 w-72 md:w-96" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <MapPinIcon
                size={18}
                weight="bold"
                className="text-muted-foreground/20"
              />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[92%]" />
        <Skeleton className="h-5 w-[45%]" />
      </div>
    </section>
  )
}

// PART 2: Carousel
export function ProjectsSkeleton() {
  return (
    <section className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <PushPinIcon className="size-8 text-muted-foreground/20" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="relative grid aspect-video w-full grid-cols-2 gap-4 overflow-hidden rounded-xl border border-border md:aspect-21/9">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    </section>
  )
}
