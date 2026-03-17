"use client"

import Image from "next/image"
import {
  ArrowSquareOutIcon,
  CertificateIcon,
  CalendarDotsIcon,
} from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { useState } from "react"
import { XIcon } from "@phosphor-icons/react"

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
  const [isFullscreen, setIsFullscreen] = useState(false)
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md">
      {/* Type Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-[10px] font-medium tracking-wider text-purple-400 uppercase">
          <CertificateIcon size={12} />
          {data.type}
        </span>
      </div>

      {/* Image Container */}
      <div
        onClick={() => setIsFullscreen(true)}
        className="relative flex aspect-video w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-950 group-hover:shadow-xl"
      >
        {" "}
        <Image
          src={data.supabaseUrl}
          alt={data.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover Gradient Overlay */}
        <div className="hover-utility pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      </div>

      {/* Content Wrapper - flex-1 pushes everything below it to the bottom */}
      <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 font-semibold text-slate-100 transition-colors group-hover:text-primary">
            {data.name}
          </h3>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span className="max-w-36 flex-wrap">{data.issuer}</span>
            <span className="flex shrink-0 items-center gap-1 text-xs">
              <CalendarDotsIcon size={12} />
              {data.dateIssued}
            </span>
          </div>
        </div>

        {/* Action Button - Always at the bottom */}
        <Button variant="accent" size="lg" className="w-full">
          <a
            href={data.supabaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            View Credential
            <ArrowSquareOutIcon size={14} />
          </a>
        </Button>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-100 flex animate-in items-center justify-center bg-black/90 p-4 backdrop-blur-sm duration-200 fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          <button className="absolute top-6 right-6 text-white transition-colors hover:cursor-pointer hover:text-primary">
            <XIcon size={32} />
          </button>

          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={data.supabaseUrl}
              alt={data.alt}
              fill
              className="object-contain" // Contain ensures you see the full cert
            />
          </div>
        </div>
      )}
    </div>
  )
}
