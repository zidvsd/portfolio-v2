"use client"

import { useToggle } from "@uidotdev/usehooks"
import { usePathname, useRouter } from "next/navigation" // Added useRouter
import Link from "next/link"
import navs from "@/lib/json/navs.json"
import { Button } from "@base-ui/react"
import { cn } from "@/lib/utils"
import StaggerWrapper from "../motion/StaggerWrapper"
import { StaggerItem } from "../motion/StaggerItem"
import { authClient } from "@/lib/auth/auth-client" // Import your client
import Image from "next/image"
import { toast } from "sonner"
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
  ChatCenteredDotsIcon,
  SignOutIcon,
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
  ChatCenteredDotsIcon,
}

// 1. Pass 'user' as a prop from the Server Layout/Header
export default function MobileMenuDrawer({ user }: { user: any }) {
  const [isOpen, toggleMenu] = useToggle(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out")
          toggleMenu(false)
          router.push("/")
          router.refresh()
        },
      },
    })
  }

  return (
    <div className="flex items-center">
      <Button
        className="hover-utility relative z-50 transition-colors hover:cursor-pointer hover:text-primary"
        onClick={() => toggleMenu()}
      >
        {isOpen ? <XIcon size={32} /> : <ListIcon size={32} />}
      </Button>

      {isOpen && (
        <nav className="absolute top-full left-0 z-40 w-full animate-in border-b bg-background p-4 shadow-xl backdrop-blur-xl duration-200 fade-in slide-in-from-top-2 lg:hidden">
          <hr className="border-border pb-2" />

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
                      className={
                        isActive ? "text-primary" : "group-hover:text-primary"
                      }
                    />
                    <span className="font-semibold">{nav.title}</span>
                  </Link>
                </StaggerItem>
              )
            })}

            {/* 2. LOGOUT SECTION */}
            {user && (
              <StaggerItem>
                <div className="mt-2 border-t border-border pt-2">
                  <button
                    onClick={handleLogout}
                    className={cn(
                      "group flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base transition-all",
                      "text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                    )}
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border bg-muted">
                      {user.image && (
                        <Image
                          fill
                          src={user.image}
                          alt="Profile"
                          sizes="32px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] leading-none text-muted-foreground">
                        {user.name}
                      </span>
                      <span className="font-semibold">Logout</span>
                    </div>
                    <SignOutIcon
                      size={20}
                      className="ml-auto opacity-70 transition-all group-hover:text-destructive group-hover:opacity-100"
                    />
                  </button>
                </div>
              </StaggerItem>
            )}
          </StaggerWrapper>
        </nav>
      )}
    </div>
  )
}
