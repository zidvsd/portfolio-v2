"use client"

import { MapPinIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function MapEmbed() {
  const [time, setTime] = useState<string>("")

  // Fixes Hydration Mismatch by ensuring time is only calculated on the client
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) + " PHT"
      )
    }

    updateTime()
    const timer = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border bg-zinc-100 shadow-sm lg:aspect-auto lg:h-80 dark:bg-card">
      {/* 1. The Glass Shield: Prevents accidental scrolling while navigating the page */}
      <div className="absolute inset-0 z-20 cursor-default bg-transparent" />

      {/* 2. The Gradient Overlay: Blends the map into your UI theme */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-zinc-100 via-zinc-100/50 to-transparent dark:from-card dark:via-card/70 dark:to-transparent" />

      {/* 3. The Actual Map */}
      <iframe
        title="Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123653.6491950294!2d121.05608643806086!3d14.125744839556814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd61726a8d799d%3A0xe5f869808d4b3df3!2sCalamba%2C%20Laguna!5e0!3m2!1sen!2sph!4v1712170000000!5m2!1sen!2sph"
        width="100%"
        height="100%"
        className="scale-[1.3] opacity-60 contrast-[1.1] grayscale invert-[0.9] dark:opacity-40"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* 4. Floating Location Badge */}
      <div className="absolute bottom-4 left-4 z-30 flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3 pr-5 shadow-lg backdrop-blur-md">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-inner">
          <MapPinIcon className="size-5" weight="fill" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">
            Laguna, Philippines
          </span>
          <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
            Local Time: {time || "--:-- --"}
          </span>
        </div>
      </div>
    </div>
  )
}
