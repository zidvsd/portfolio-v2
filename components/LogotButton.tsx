"use client"
import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          toast.loading("Logging out...", { id: "logout-toast" })
        },
        onSuccess: () => {
          toast.success("Logged out successfully!", { id: "logout-toast" })
          // Redirect to login or home page
          window.location.href = "/login"
          router.refresh() // Ensures the server-side session is cleared
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to log out", {
            id: "logout-toast",
          })
        },
      },
    })
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Log out
    </Button>
  )
}
