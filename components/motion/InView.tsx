"use client"

import { motion, HTMLMotionProps } from "motion/react"

interface InViewProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  fullWidth?: boolean
}

export default function InView({
  children,
  delay = 0.1,
  direction = "up",
  distance = 10,
  fullWidth = false,
  className,
  ...props
}: InViewProps) {
  // Dynamic offset based on direction
  const offsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        ...offsets[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      // amount 0.5 never fired for sections taller than 2x the viewport
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0, delay }}
      className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
