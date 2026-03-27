"use client"

import { useToggle } from "@uidotdev/usehooks"
import { usePathname } from "next/navigation"
import Link from "next/link"
import navs from "@/lib/json/navs.json"
import { Button } from "@base-ui/react"
import { cn } from "@/lib/utils"
import StaggerWrapper from "../motion/StaggerWrapper"
import { StaggerItem } from "../motion/StaggerItem"
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
  ListIcon,
  XIcon,
} from "@phosphor-icons/react"

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
}

export default function MobileMenuDrawer() {
  const [isOpen, toggleMenu] = useToggle(false)
  const pathname = usePathname()

  return (
    <div className="flex items-center">
      {/* Trigger Button */}
      <Button
        className="hover-utility relative z-50 transition-colors hover:cursor-pointer hover:text-primary"
        onClick={() => toggleMenu()}
      >
        {isOpen ? <XIcon size={32} /> : <ListIcon size={32} />}
      </Button>

      {/* Horizontal / Expanded Header Dropdown */}
      {isOpen && (
        <nav className="absolute top-full left-0 z-40 w-full animate-in border-b bg-background p-4 shadow-xl backdrop-blur-xl duration-200 fade-in slide-in-from-top-2 lg:hidden">
          <StaggerWrapper delayStep={0.1} className="flex flex-col gap-1">
            {navs.map((nav) => {
              const Icon = IconMap[nav.icon] || CircleIcon
              const isActive = pathname === nav.href

              return (
                <StaggerItem key={nav.href}>
                  <Link
                    href={nav.href}
                    onClick={() => toggleMenu(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all",
                      isActive
                        ? "bg-neutral-100 text-foreground dark:bg-neutral-800"
                        : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                    )}
                  >
                    <Icon
                      size={20}
                      weight={isActive ? "bold" : "regular"}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-primary" : "group-hover:text-primary"
                      )}
                    />
                    <span className="font-semibold">{nav.title}</span>
                    <ArrowRightIcon
                      size={16}
                      className={cn(
                        "ml-auto transition-all",
                        isActive
                          ? "translate-x-0 text-primary opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                    />
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerWrapper>
        </nav>
      )}
    </div>
  )
}
