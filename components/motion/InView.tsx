"use client"

import { motion, HTMLMotionProps, Variant } from "framer-motion"

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
        ...offsets[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true, // Only animate the first time it enters
        amount: 0.5, // Trigger when 20% of the item is visible
        margin: "-20px", // Trigger 50px before it hits the actual viewport edge
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
