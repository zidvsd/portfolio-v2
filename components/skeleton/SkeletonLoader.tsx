import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonLoaderProps {
  variant:
    | "profile"
    | "projects-carousel"
    | "projects-grid"
    | "blog-list"
    | "blog-content"
    | "related-blogs"
    | "achievement"
    | "about"
    | "spotify-card"
    | "github-card"
    | "codewars-card"
    | "wakatime-card"
    | "project-detail"
    | "chat"
    | "comments"
}

export function SkeletonLoader({ variant }: SkeletonLoaderProps) {
  switch (variant) {
    case "profile":
      return (
        <section className="space-y-4">
          <div className="flex flex-row justify-between gap-6 md:items-start">
            <div className="space-y-3">
              <Skeleton className="h-9 w-72 md:w-96" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-1.5">
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

    case "projects-carousel":
      return (
        <section className="w-full space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="relative grid aspect-video w-full grid-cols-2 gap-4 overflow-hidden rounded-xl border border-border md:aspect-21/9">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
          </div>
        </section>
      )

    case "projects-grid":
      return (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card/50"
            >
              <div className="relative h-56 w-full border-b bg-muted/50">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col space-y-4 p-5">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                  </div>
                </div>
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

    case "blog-list":
      return (
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-10 w-full md:w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="hidden space-y-4 lg:col-span-4 lg:block">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-20 w-20 shrink-0 rounded-md" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="space-y-4 rounded-xl border border-border p-4"
              >
                <Skeleton className="aspect-video w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case "blog-content":
      return (
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <Skeleton className="aspect-video w-full rounded-2xl" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        </div>
      )

    case "related-blogs":
      return (
        <div className="space-y-8 border-t border-border pt-10">
          <div className="flex justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      )

    case "achievement":
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-16 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex flex-col overflow-hidden rounded-md border p-5 shadow-md"
              >
                <div className="absolute top-3 right-3 z-20">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <Skeleton className="aspect-video w-full rounded-t-lg" />

                <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-2/3" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>

                  <Skeleton className="h-11 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case "about":
      return (
        <div className="space-y-12">
          <section className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-56" />
            </div>
            <hr className="border-border" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="mt-8 h-5 w-[40%]" />
              <Skeleton className="h-8 w-24" />
            </div>
          </section>

          <hr className="border-border" />

          <div className="space-y-12">
            {[1, 2].map((section) => (
              <section key={section} className="space-y-8">
                <div className="flex items-center gap-2">
                  <div className="p-1">
                    <Skeleton className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>

                <div className="space-y-8">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-8">
                      <div className="space-y-2 pt-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )

    case "spotify-card":
      return (
        <div className="space-y-6">
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

          <div className="flex items-center gap-4 rounded-xl border p-4">
            <Skeleton className="size-16 rounded-md md:size-20" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>

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

    case "github-card":
      return (
        <div className="space-y-6">
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

          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
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

          <Skeleton className="h-40 w-full rounded-xl border" />

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

    case "codewars-card":
      return (
        <div className="space-y-6">
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

    case "wakatime-card":
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

    case "project-detail":
      return (
        <div className="mt-2 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>

          <div className="flex items-center justify-between gap-6 border-y border-border/50 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>

          <Skeleton className="aspect-video w-full rounded-lg" />

          <div className="space-y-10 pt-4">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <div className="grid grid-cols-1 gap-3">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          </div>
        </div>
      )
    case "chat":
      return (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-12 w-full rounded-lg rounded-tl-none bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      )

    case "comments":
      return (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              {/* Root Comment */}
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-[85%]" />
                </div>
              </div>

              {/* Nested Reply (Indent) */}
              <div className="ml-12 flex items-start gap-3 border-l-2 border-border/50 pl-4">
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-[70%]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}
