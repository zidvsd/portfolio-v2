"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-18 cursor-pointer items-center rounded-full border border-border bg-muted/50 p-1 transition-colors duration-500 focus:outline-none"
      aria-label="Toggle Theme"
    >
      <div
        className={cn(
          "absolute h-7 w-7 rounded-full bg-background shadow-md transition-transform duration-500 ease-in-out",
          isDark ? "translate-x-8.5" : "translate-x-0"
        )}
      />

      <div className="relative flex w-full items-center justify-between">
        <div className="flex size-7 items-center justify-center">
          <SunIcon
            size={16}
            weight={isDark ? "regular" : "fill"}
            className={cn(
              "z-10 transition-colors duration-500",
              isDark ? "text-muted-foreground" : "text-amber-500"
            )}
          />
        </div>

        <div className="flex size-7 items-center justify-center">
          <MoonIcon
            size={16}
            weight={isDark ? "fill" : "regular"}
            className={cn(
              "z-10 transition-colors duration-500",
              isDark ? "text-chart-2" : "text-muted-foreground"
            )}
          />
        </div>
      </div>
    </button>
  )
}
