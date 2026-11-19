"use client"

import Image from "next/image"
import {
  ArrowSquareOutIcon,
  CertificateIcon,
  CalendarDotsIcon,
  MedalIcon,
} from "@phosphor-icons/react"
import { buttonVariants } from "./ui/button"
import { useEffect, useState } from "react"
import { XIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
interface AchievementProps {
  data: {
    name: string
    issuer: string
    dateIssued: string
    supabaseUrl: string
    type: "certificate" | "badge"
    alt: string
  }
}

export default function AchievementCard({ data }: AchievementProps) {
  const Icon = data.type === "certificate" ? CertificateIcon : MedalIcon
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsFullscreen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isFullscreen])

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-md border bg-card/50 p-5 shadow-md transition-all hover:border-primary/50 hover:shadow-md">
      <div className="absolute top-3 right-3 z-20">
        <span
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black tracking-[0.12em] uppercase shadow-lg ring-1 backdrop-blur-sm ${
            data.type === "certificate"
              ? "border-blue-400/50 bg-blue-50 text-blue-700 ring-blue-200 dark:border-blue-500/50 dark:bg-blue-950/70 dark:text-blue-300 dark:ring-blue-900/50"
              : "border-amber-400/50 bg-amber-50 text-amber-700 ring-amber-200 dark:border-amber-500/50 dark:bg-amber-950/70 dark:text-amber-300 dark:ring-amber-900/50"
          }`}
        >
          <Icon size={12} weight="fill" />
          {data.type}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsFullscreen(true)}
        aria-label={`Enlarge ${data.name}`}
        className="relative mx-auto flex aspect-video w-full max-w-125 cursor-zoom-in items-center justify-center overflow-hidden rounded-md border bg-zinc-950"
      >
        <Image
          src={data.supabaseUrl}
          alt={data.alt}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="hover-utility pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-500/80 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:from-zinc-950/80" />
      </button>

      <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 font-semibold transition-colors group-hover:text-primary">
            {data.name}
          </h3>

          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span className="min-w-0 truncate">{data.issuer}</span>
            <span className="flex shrink-0 items-center gap-1 text-xs">
              <CalendarDotsIcon size={12} />
              {data.dateIssued}
            </span>
          </div>
        </div>

        <a
          href={data.supabaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg", className: "w-full gap-2" })}
        >
          View Credential
          <ArrowSquareOutIcon size={14} />
        </a>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              aria-label="Close"
              className="absolute top-6 right-6 text-white transition-colors hover:cursor-pointer hover:text-primary"
            >
              <XIcon size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl"
            >
              <Image
                sizes="100vw"
                src={data.supabaseUrl}
                alt={data.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
