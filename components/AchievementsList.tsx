"use client"

import { useState } from "react"
import AchievementCard from "./AchievementCard"
import { Button } from "./ui/button"
import { Achievement } from "@/app/types/achievement"

// 1. Define the FilterType so useState knows what 'filter' can be
type FilterType = "all" | "certificate" | "badge"

// 2. Define the Props interface correctly
interface AchievementListProps {
  initialData: Achievement[]
}

export default function AchievementList({ initialData }: AchievementListProps) {
  // 3. Apply the FilterType here
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = initialData.filter((item) =>
    filter === "all" ? true : item.type === filter
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            onClick={() => setFilter("all")}
            className="text-md px-6 py-4 transition-all"
          >
            All
          </Button>
          <Button
            variant={filter === "certificate" ? "default" : "ghost"}
            onClick={() => setFilter("certificate")}
            className="text-md px-6 py-4 transition-all"
          >
            Certificates
          </Button>
          <Button
            variant={filter === "badge" ? "default" : "ghost"}
            onClick={() => setFilter("badge")}
            className="text-md px-6 py-4 transition-all"
          >
            Badges
          </Button>
        </div>

        <p className="text-sm text-muted-foreground italic">
          Showing{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "result" : "results"}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((achievement) => (
          <AchievementCard key={achievement._id} data={achievement} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-muted-foreground">
            No achievements found in this category.
          </p>
        </div>
      )}
    </div>
  )
}
