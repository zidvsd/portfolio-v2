import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

export default function LogoAndAvatar() {
  return (
    <div className="flex flex-row items-center gap-3 lg:flex-col lg:gap-1">
      {/* Avatar */}
      <Avatar className="size-10 border lg:size-24">
        <AvatarImage src="/images/profile-picture.jpg" alt="Rashid Visda" />
        <AvatarFallback>RV</AvatarFallback>
      </Avatar>

      {/* Name */}
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight transition hover:opacity-80 lg:text-xl"
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
