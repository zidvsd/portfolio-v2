import { Skeleton } from "@/components/ui/skeleton"
import {
  BriefcaseIcon,
  GraduationCapIcon,
  CalendarIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr"

export function AboutSkeleton() {
  return (
    <div className="space-y-12">
      {/* 1. Intro Section Skeleton */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" /> {/* "About" Title */}
          <Skeleton className="h-4 w-56" /> {/* Subtitle */}
        </div>
        <hr className="border-border" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="mt-8 h-5 w-[40%]" /> {/* "Best regards" area */}
          <Skeleton className="h-8 w-24" /> {/* Name Sign-off */}
        </div>
      </section>

      <hr className="border-border" />

      {/* 2. Experience Section Skeleton (Work or Education) */}
      <div className="space-y-12">
        {[1, 2].map((section) => (
          <section key={section} className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center gap-2">
              <div className="p-1">
                {section === 1 ? (
                  <BriefcaseIcon
                    size={24}
                    className="text-muted-foreground/20"
                  />
                ) : (
                  <GraduationCapIcon
                    size={24}
                    className="text-muted-foreground/20"
                  />
                )}
              </div>
              <div className="space-y-1">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Experience Cards */}
            <div className="space-y-4">
              {[1, 2].map((card) => (
                <div key={card} className="rounded-xl border border-border p-6">
                  <div className="flex gap-5">
                    {/* Logo Skeleton */}
                    <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />

                    <div className="flex-1 space-y-4">
                      {/* Title and Date Row */}
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-48" /> {/* Job Title */}
                          <Skeleton className="h-4 w-32" /> {/* Company */}
                        </div>
                        <Skeleton className="h-7 w-32 rounded-md" />{" "}
                        {/* Date Badge */}
                      </div>

                      {/* Location Row */}
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon
                          size={16}
                          className="text-muted-foreground/20"
                        />
                        <Skeleton className="h-4 w-40" />
                      </div>

                      {/* Responsibilities/Bullets */}
                      <div className="space-y-2 border-l-2 border-muted pl-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[95%]" />
                        <Skeleton className="h-4 w-[60%]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
