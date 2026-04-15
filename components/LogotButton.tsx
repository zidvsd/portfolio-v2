"use client"

import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

export function LogoutButton() {
  const router = useRouter()
  // 1. Get the session data (hook name may vary slightly based on your auth-client setup)
  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          toast.loading("Logging out...", { id: "logout-toast" })
        },
        onSuccess: () => {
          toast.success("Logged out successfully!", { id: "logout-toast" })
          router.push("/login")
          router.refresh()
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to log out", {
            id: "logout-toast",
          })
        },
      },
    })
  }

  // Only render if user exists (optional, but cleaner for layouts)
  if (!user) return null

  return (
    <Button
      variant="ghost"
      className="group flex h-auto items-center gap-3 px-3 py-2 hover:bg-destructive/10 hover:text-destructive"
      onClick={handleLogout}
    >
      {/* 2. User Avatar */}
      <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border bg-muted">
        {user.image ? (
          <Image
            fill
            src={user.image}
            alt={user.name || "User"}
            sizes="24px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-bold uppercase">
            {user.name?.[0] || "?"}
          </div>
        )}
      </div>

      <span className="text-sm font-medium">Log out</span>
      <SignOutIcon className="ml-auto size-4 transition-colors group-hover:text-destructive" />
    </Button>
  )
}
