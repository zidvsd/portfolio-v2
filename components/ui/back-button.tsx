import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

interface BackButtonProps {
  url?: string
  label?: string
}

const BackButton = ({
  url = "/projects",
  label = "Back to Projects",
}: BackButtonProps) => {
  return (
    <Link
      href={url}
      className="group flex w-fit items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <span className="mr-2 transition-transform group-hover:-translate-x-1">
        <ArrowLeftIcon size={18} weight="bold" />
      </span>
      {label}
    </Link>
  )
}

export default BackButton
