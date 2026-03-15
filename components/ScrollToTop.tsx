"use client"

import React, { useEffect, useState } from "react"
import { CaretDoubleUp } from "@phosphor-icons/react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(function () {
    function toggleVisibility() {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", toggleVisibility)
    return function () {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={function () {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 shadow-lg backdrop-blur-md transition-all duration-500 hover:bg-secondary ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-10 scale-50 opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <CaretDoubleUp weight="bold" size={20} />
      </button>
    </div>
  )
}
