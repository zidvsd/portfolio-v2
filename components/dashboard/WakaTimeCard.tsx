"use client"

import { WakaTimeStats } from "@/app/types/wakatime"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WakaTimeIcon from "../icons/WakaTimeIcon"
import { formatDate } from "@/lib/utils"
interface WakaTimeCardProps {
  weeklyStats: WakaTimeStats
  allTimeStats: WakaTimeStats
}

export default function WakaTimeCard({
  weeklyStats,
  allTimeStats,
}: WakaTimeCardProps) {
  console.log(allTimeStats)

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
        <div className="flex items-center gap-2">
          <WakaTimeIcon className="size-6" />
          <a href="https://wakatime.com/zidvsd" target="_blank">
            <h2 className="text-lg font-semibold tracking-tight">
              WakaTime Stats
            </h2>
          </a>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Coding activity over the past 7 days.</span>
          <span>Last Update: {lastUpdate}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <StatTile label="Start Date / Joined WakaTime" value={joinedDate} />
        <StatTile label="End Date" value={endDate} />
        <StatTile label="Average Daily Coding Time" value={dailyAvg} />
        <StatTile label="Total This Week" value={totalWeekly} />
        <StatTile label="Best Day" value="March 13, 2026 (4 hrs 49 mins)" />
        <StatTile label="All-Time Coding" value={totalAllTime} highlight />
        <ListTile title="Top Languages" items={languages} />
        <ListTile title="Editors" items={editors} />
      </div>
    </div>
  )
}

function StatTile({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <p
          className={`text-sm font-semibold ${
            highlight ? "text-chart-3" : "text-foreground"
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

function ListTile({ title, items }: { title: string; items: any[] }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-foreground/80">{item.name}</span>
              <span className="text-muted-foreground">{item.percent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ring/20">
              <div
                className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
