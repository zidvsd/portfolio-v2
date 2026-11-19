"use client"

import { useState } from "react"
import AchievementCard from "./AchievementCard"
import { Button } from "./ui/button"
import { Achievement } from "@/lib/types/achievement"
import StaggerWrapper from "./motion/StaggerWrapper"
import { StaggerItem } from "./motion/StaggerItem"
type FilterType = "all" | "certificate" | "badge"

interface AchievementListProps {
  initialData: Achievement[]
}

export default function AchievementList({ initialData }: AchievementListProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = initialData.filter((item) =>
    filter === "all" ? true : item.type === filter
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            onClick={() => setFilter("all")}
            size="lg"
            className="px-4"
          >
            All
          </Button>
          <Button
            variant={filter === "certificate" ? "default" : "ghost"}
            onClick={() => setFilter("certificate")}
            size="lg"
            className="px-4"
          >
            Certificates
          </Button>
          <Button
            variant={filter === "badge" ? "default" : "ghost"}
            onClick={() => setFilter("badge")}
            size="lg"
            className="px-4"
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
      <StaggerWrapper
        key={filter}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {filtered.map((achievement) => (
          <StaggerItem key={achievement._id}>
            <AchievementCard data={achievement} />
          </StaggerItem>
        ))}
      </StaggerWrapper>
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
