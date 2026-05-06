import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

export default function LogoAndAvatar() {
  return (
    <div className="flex flex-row items-center gap-1 lg:flex-col">
      {/* Avatar */}
      <Avatar className="size-20 border md:size-22 lg:size-24">
        <AvatarImage src="/images/profile-picture.jpg" />
        <AvatarFallback>RV</AvatarFallback>
      </Avatar>

      {/* Name */}
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight transition hover:opacity-80"
      >
        Rashid Visda
      </Link>

      {/* Username */}
      <Link
        href="/"
        className="hidden text-sm font-semibold tracking-tight text-muted-foreground transition hover:opacity-80 lg:block"
      >
        @zidvsd
      </Link>
    </div>
  )
}
