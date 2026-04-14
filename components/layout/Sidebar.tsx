"use client"

import {
  HouseIcon,
  UserIcon,
  TrophyIcon,
  CodeIcon,
  ArticleIcon,
  LayoutIcon,
  EnvelopeIcon,
  CircleIcon,
  ArrowRightIcon,
  ChatCenteredDotsIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import navs from "@/lib/json/navs.json"
import LogoAndAvatar from "../LogoAndAvatar"
import ThemeToggle from "../themes/theme-toggle"
import { cn } from "@/lib/utils"
import { LogoutButton } from "../LogotButton"
import { authClient } from "@/lib/auth/auth-client"
const IconMap: Record<string, any> = {
  HouseIcon,
  UserIcon,
  TrophyIcon,
  CodeIcon,
  ArticleIcon,
  LayoutIcon,
  EnvelopeIcon,
  CircleIcon,
  ArrowRightIcon,
  ChatCenteredDotsIcon,
}

export default function Sidebar() {
  const { data: session } = authClient.useSession()
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col px-2">
      <div className="space-y-3">
        <LogoAndAvatar />

        <div className="flex items-center justify-center self-center">
          <ThemeToggle />
        </div>
        <hr className="border-border" />
        <nav className="flex flex-col gap-2 pb-2">
          {navs.map((nav) => {
            const Icon = IconMap[nav.icon] || CircleIcon
            const isActive = pathname === nav.href

            return (
              <Link
                key={nav.href}
                href={nav.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-neutral-100 text-foreground dark:bg-neutral-800"
                    : "text-foreground/70 hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                )}
              >
                <Icon
                  size={18}
                  weight={isActive ? "bold" : "regular"}
                  className={cn(
                    "hover-utility transition-colors group-hover:scale-110 group-hover:-rotate-30",
                    isActive
                      ? "text-sidebar-primary"
                      : "group-hover:text-sidebar-primary"
                  )}
                />

                <span className="font-medium">{nav.title}</span>

                <ArrowRightIcon
                  size={14}
                  className={cn(
                    "ml-auto transition-all",
                    isActive
                      ? "translate-x-0 text-sidebar-primary opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )}
                />
              </Link>
            )
          })}
        </nav>
      </div>
      <hr className="border-border" />
      <div className="mt-4 px-3 text-center text-[10px] leading-relaxed text-muted-foreground/60">
        <p>Copyright © 2026</p>
        <p>Rashid Visda. All rights reserved.</p>
      </div>

      {session ? <LogoutButton /> : null}
    </div>
  )
}
