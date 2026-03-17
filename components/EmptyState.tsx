import { Button } from "@/components/ui/button"
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
  // Using React.ElementType allows you to pass a component like {EmptyIcon}
  icon: React.ElementType
  linkHref?: string
  linkText?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon, // Alias to uppercase so it can be rendered as a tag
  linkHref = "#",
  linkText = "Learn More",
}: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {/* Render the passed Phosphor icon */}
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <Button
        variant="link"
        className="flex flex-row text-muted-foreground"
        size="sm"
      >
        <Link href={linkHref} className="flex items-center gap-2">
          {linkText} <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  )
}
