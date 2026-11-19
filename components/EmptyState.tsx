import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react"
import React from "react"

interface EmptyStateProps {
  title: string
  description: string
  icon: React.ReactNode
  linkHref?: string
  linkText?: string
}

export function EmptyState({
  title,
  description,
  icon,
  linkHref,
  linkText = "Learn More",
}: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader className="max-w-xl">
        <EmptyMedia
          variant="icon"
          className="w-fit bg-transparent p-8 text-primary"
        >
          {icon}
        </EmptyMedia>
        <EmptyTitle className="w-full text-2xl font-semibold">
          {title}
        </EmptyTitle>
        <EmptyDescription className="text-base">{description}</EmptyDescription>
      </EmptyHeader>
      {linkHref && (
        <Link
          href={linkHref}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          {linkText} <ArrowUpRightIcon />
        </Link>
      )}
    </Empty>
  )
}
