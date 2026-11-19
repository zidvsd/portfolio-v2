"use client"

import { motion, stagger } from "motion/react"

interface StaggerWrapperProps {
  children: React.ReactNode
  className?: string
  delayStep?: number
}

export default function StaggerWrapper({
  children,
  delayStep = 0.06,
  className,
}: StaggerWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delayChildren: stagger(delayStep),
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
