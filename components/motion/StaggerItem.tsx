"use client"

import { motion } from "motion/react"

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
    >
      {children}
    </motion.div>
  )
}
