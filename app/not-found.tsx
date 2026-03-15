import Link from "next/link"
import { ArrowLeftIcon, GhostIcon } from "@phosphor-icons/react/dist/ssr"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center lg:justify-start">
      {/* Visual Indicator */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <GhostIcon size={48} weight="duotone" />
      </div>

      {/* Error Code */}
      <h1 className="text-6xl font-black tracking-tighter text-destructive md:text-7xl">
        404
      </h1>

      {/* Message */}
      <div className="mt-4 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
        <p className="max-w-100 text-muted-foreground">
          Sorry, Rashid couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>
      </div>

      {/* Action */}
      <div className="mt-10">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
        >
          <ArrowLeftIcon
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
