"use client"

import { WakaTimeStats } from "@/lib/types/wakatime"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WakaTimeIcon from "../icons/WakaTimeIcon"
import { formatDate } from "@/lib/utils"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"
import StatTile from "../ui/stat-title"
import ListTile from "../ui/list-tile"
interface WakaTimeCardProps {
  weeklyStats: WakaTimeStats
  allTimeStats: WakaTimeStats
}

export default function WakaTimeCard({
  weeklyStats,
  allTimeStats,
}: WakaTimeCardProps) {
  const dailyAvg = weeklyStats?.human_readable_daily_average || "0 hrs 0 mins"
  const totalWeekly = weeklyStats?.human_readable_total || "0 hrs"
  const totalAllTime = allTimeStats?.human_readable_total || "0 hrs"

  const languages =
    weeklyStats?.languages?.filter((l) => l.name !== "Other").slice(0, 4) ?? []

  const editors = weeklyStats?.editors?.slice(0, 2) ?? []

  const endDate = formatDate(allTimeStats?.range.end_date) || "—"
  const joinedDate = formatDate(allTimeStats?.range.start_date) || "—"
  const lastUpdate = formatDate(allTimeStats?.modified_at) || "—"
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WakaTimeIcon className="size-6" />

            <h1 className="text-2xl font-semibold tracking-tight">
              WakaTime Stats
            </h1>
          </div>
          <a href="https://wakatime.com/zidvsd" target="_blank">
            <Button variant="ghost">
              <ArrowSquareOutIcon />
            </Button>
          </a>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <p>Coding activity over the past 7 days.</p>
          <span className="text-right text-xs">Last Update: {lastUpdate}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <StatTile label="Start Date / Joined WakaTime" value={joinedDate} />
        <StatTile label="End Date" value={endDate} />
        <StatTile label="Average Daily Coding Time" value={dailyAvg} />
        <StatTile label="Total This Week" value={totalWeekly} />
        <StatTile label="Best Day" value="March 13, 2026 (4 hrs 49 mins)" />
        <StatTile label="All-Time Coding" value={totalAllTime} />
        <ListTile title="Top Languages" items={languages} />
        <ListTile title="Editors" items={editors} />
      </div>
    </div>
  )
}
