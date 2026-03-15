"use client"

import React, { useState } from "react"
import { ChatTeardropDots, X } from "@phosphor-icons/react" // npm install @phosphor-icons/react

export default function ChatToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Conditional Chat Box */}
      {isOpen && (
        <div className="mb-4 h-96 w-80 origin-bottom-right animate-in rounded-3xl border border-border bg-card p-5 shadow-2xl duration-200 zoom-in-95 fade-in">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-sm font-bold tracking-tight">
              AI Assistant
            </span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          </div>
          <div className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Hi Rashid! Ask me anything about my projects or tech stack.
          </div>
        </div>
      )}

      <button
        onClick={function () {
          setIsOpen(!isOpen)
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all hover:scale-110 active:scale-90"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X weight="bold" size={24} />
        ) : (
          <ChatTeardropDots weight="duotone" size={28} />
        )}
      </button>
    </div>
  )
}
