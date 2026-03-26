"use client"

import { motion, stagger } from "motion/react"

interface StaggerWrapperProps {
  children: React.ReactNode
  className?: string
  delayStep?: number
}

export default function StaggerWrapper({
  children,
  delayStep = 0.2,
  className,
}: StaggerWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true, margin: "-50px" }} // Triggers slightly before it hits the top
      transition={{
        delayChildren: stagger(delayStep),
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
