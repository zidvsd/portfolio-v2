export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import AchievementSectionAdmin from "@/components/sections/admin/AchievementSectionAdmin"

export default function StudioAchievementsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Manage Achievements
          </h1>
          <p className="text-muted-foreground">
            Update, delete, or draft your latest achievements.
          </p>
        </div>
        <Button size={"lg"} className="w-full md:w-auto">
          <Link
            href="/studio/achievements/create"
            className="flex items-center gap-2"
          >
            <PlusIcon weight="bold" />
            Add Achievement
          </Link>
        </Button>
      </div>

      <hr className="border-border" />

      <Suspense fallback={<SkeletonLoader variant="blog-list" />}>
        <AchievementSectionAdmin />
      </Suspense>
    </div>
  )
}
