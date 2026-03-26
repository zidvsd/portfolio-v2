"use client"

import { useState } from "react"
import { motion } from "motion/react"
export function GithubContributionsCard({ weeks }: { weeks: any[][] }) {
  const [hoverData, setHoverData] = useState<string | null>(null)
  // Function to get short month name (e.g., "Jan")
  const getMonthName = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", { month: "short" })
  }
  const getColorByCount = (count: number) => {
    if (count === 0) return "bg-[#ebedf0] dark:bg-[#161b22]"
    if (count < 3) return "bg-blue-200 dark:bg-blue-900"
    if (count < 6) return "bg-blue-400 dark:bg-blue-700"
    if (count < 10) return "bg-blue-600 dark:bg-blue-500"
    return "bg-blue-800 dark:bg-blue-300"
  }

  if (!weeks || weeks.length === 0) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-zinc-500">
        Waiting for contribution data...
      </div>
    )
  }

  return (
    <div>
      <div className="scrollbar-none flex gap-1 overflow-scroll overflow-y-hidden pb-2">
        {weeks.map((week, weekIndex) => {
          // Check if this week is the start of a new month to show the label
          const firstDayOfMonth = week[0].date
          const currentMonth = getMonthName(firstDayOfMonth)
          const prevMonth =
            weekIndex > 0 ? getMonthName(weeks[weekIndex - 1][0].date) : null
          const showMonth = weekIndex === 0 || currentMonth !== prevMonth

          return (
            <motion.div
              key={weekIndex}
              initial={{ opacity: 0, x: -1 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: weekIndex * 0.03 }} // Very fast stagger
              className="flex flex-col gap-0.75"
            >
              {/* Month Label */}
              <span className="h-4 text-[10px] text-zinc-500">
                {showMonth ? currentMonth : ""}
              </span>

              {/* Day Squares */}
              <div className="flex flex-col gap-0.75">
                {week.map((day: any) => (
                  <div
                    key={day.date}
                    onMouseEnter={() =>
                      setHoverData(
                        `${day.contributionCount} contributions on ${day.date.replace(/-/g, "/")}`
                      )
                    }
                    onMouseLeave={() => setHoverData(null)}
                    className={`size-3.5 rounded-sm transition-all hover:scale-110 hover:ring-1 hover:ring-white/30 ${getColorByCount(
                      day.contributionCount
                    )}`}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <section className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase">
          <span>Less</span>
          <div className="flex items-center gap-0.75">
            <div className="size-3.5 rounded-sm bg-[#ebedf0] dark:bg-[#161b22]" />
            <div className="size-3.5 rounded-sm bg-blue-200 dark:bg-blue-900" />
            <div className="size-3.5 rounded-sm bg-blue-400 dark:bg-blue-700" />
            <div className="size-3.5 rounded-sm bg-blue-600 dark:bg-blue-500" />
            <div className="size-3.5 rounded-sm bg-blue-800 dark:bg-blue-300" />
          </div>
          <span className="text-accent-foreground">More</span>
        </div>

        <div
          className={`${
            hoverData && !hoverData.startsWith("0")
              ? "text-accent-foreground" // Green if there are contributions
              : "text-zinc-500" // Gray if 0 or empty
          } text-xs font-medium tabular-nums transition-colors duration-200`}
        >
          {hoverData || "Hover squares for details"}
        </div>
      </section>
    </div>
  )
}
