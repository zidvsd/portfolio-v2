"use client"

import { useRef, useState, useEffect, useCallback, useTransition } from "react"
import { motion } from "motion/react"
import { getGithubActivityByYear } from "@/lib/services/github"

interface GithubContributionsCardProps {
  weeks: any[][]
  currentYear?: number // defaults to this year
}

export function GithubContributionsCard({
  weeks: initialWeeks,
  currentYear,
}: GithubContributionsCardProps) {
  const thisYear = currentYear ?? new Date().getFullYear()
  const [weeks, setWeeks] = useState(initialWeeks)
  const [selectedYear, setSelectedYear] = useState(thisYear)
  const [isPending, startTransition] = useTransition()
  const [hoverData, setHoverData] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({
    thumbWidth: 100,
    thumbLeft: 0,
    canScroll: false,
  })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)

  const years = [thisYear, thisYear - 1, thisYear - 2]

  const handleYearChange = (year: number) => {
    if (year === selectedYear || isPending) return
    setSelectedYear(year)
    startTransition(async () => {
      const data = await getGithubActivityByYear(year)
      setWeeks(data.contributions)
    })
  }

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

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollWidth, clientWidth, scrollLeft } = el
    if (scrollWidth <= clientWidth) {
      setScrollState({ thumbWidth: 100, thumbLeft: 0, canScroll: false })
      return
    }
    const thumbWidthPct = (clientWidth / scrollWidth) * 100
    const maxScrollLeft = scrollWidth - clientWidth
    const thumbLeftPct = (scrollLeft / maxScrollLeft) * (100 - thumbWidthPct)
    setScrollState({
      thumbWidth: thumbWidthPct,
      thumbLeft: thumbLeftPct,
      canScroll: true,
    })
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState)
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      resizeObserver.disconnect()
    }
  }, [updateScrollState, weeks])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || weeks.length === 0) return

    // Find the index of the week containing today (or the most recent day with data)
    const todayStr = new Date().toISOString().split("T")[0]

    let targetWeekIndex = weeks.length - 1 // fallback: last week

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i]
      const hasToday = week.some((day: any) => day.date === todayStr)
      const hasFutureOnly = week.every((day: any) => day.date > todayStr)

      if (hasToday) {
        targetWeekIndex = i
        break
      }
      if (hasFutureOnly) {
        // we've gone past today — use the previous week
        targetWeekIndex = Math.max(0, i - 1)
        break
      }
    }

    // Scroll so the target week is visible, with a little padding so it's not flush against the edge
    requestAnimationFrame(() => {
      const weekElements = el.children
      const targetEl = weekElements[targetWeekIndex] as HTMLElement | undefined
      if (targetEl) {
        const scrollTarget =
          targetEl.offsetLeft - el.clientWidth + targetEl.clientWidth * 4
        el.scrollLeft = Math.max(0, scrollTarget)
      } else {
        el.scrollLeft = el.scrollWidth
      }
    })
  }, [weeks])
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartScrollLeft.current = scrollRef.current?.scrollLeft || 0
  }

  useEffect(() => {
    if (!isDragging) return

    // Prevent text selection while dragging
    document.body.style.userSelect = "none"
    document.body.style.cursor = "grabbing"

    const handleMouseMove = (e: MouseEvent) => {
      const el = scrollRef.current
      const track = trackRef.current
      if (!el || !track) return

      const deltaX = e.clientX - dragStartX.current
      const trackWidth = track.clientWidth
      const scrollableWidth = el.scrollWidth - el.clientWidth
      const scrollRatio = scrollableWidth / trackWidth

      const newScrollLeft = dragStartScrollLeft.current + deltaX * scrollRatio
      el.scrollLeft = Math.max(0, Math.min(newScrollLeft, scrollableWidth))
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [isDragging])

  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return
    const trackRect = track.getBoundingClientRect()
    const clickRatio = (e.clientX - trackRect.left) / trackRect.width
    const scrollableWidth = el.scrollWidth - el.clientWidth
    el.scrollLeft = clickRatio * scrollableWidth
  }

  if (!weeks || weeks.length === 0) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-zinc-500">
        {isPending
          ? "Loading contributions..."
          : "Waiting for contribution data..."}
      </div>
    )
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="scrollbar-none flex gap-1 overflow-scroll overflow-y-hidden pb-2"
      >
        {weeks.map((week, weekIndex) => {
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
              transition={{ delay: weekIndex * 0.03 }}
              className="flex flex-col gap-0.75"
            >
              <span className="h-4 text-[10px] text-zinc-500">
                {showMonth ? currentMonth : ""}
              </span>

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

      {scrollState.canScroll && (
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative mt-1 h-2 w-full cursor-pointer rounded-full bg-white/5"
        >
          <div
            onMouseDown={handleThumbMouseDown}
            className={`absolute top-0 h-2 cursor-grab rounded-full bg-zinc-500/60 transition-colors hover:bg-zinc-400/80 ${
              isDragging ? "cursor-grabbing bg-zinc-400/80" : ""
            }`}
            style={{
              width: `${scrollState.thumbWidth}%`,
              left: `${scrollState.thumbLeft}%`,
            }}
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
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
        <div className="flex items-center">
          {years.map((year) => {
            const isActive = year === selectedYear
            return (
              <button
                key={year}
                type="button"
                disabled={isPending}
                onClick={() => handleYearChange(year)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium tabular-nums transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-zinc-500 hover:bg-white/5 hover:text-accent-foreground"
                } ${isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              >
                {year}
              </button>
            )
          })}
        </div>
      </div>
      <section className="mt-2 flex items-end justify-between">
        <div
          className={`${
            hoverData && !hoverData.startsWith("0")
              ? "text-accent-foreground"
              : "text-zinc-500"
          } text-xs font-medium tabular-nums transition-colors duration-200`}
        >
          {hoverData || "Hover squares for details"}
        </div>
      </section>
    </div>
  )
}
