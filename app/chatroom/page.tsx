import ChatSection from "@/components/sections/comments/ChatSection"
import EndOfPage from "@/components/ui/end-of-page"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import { Suspense } from "react"
import { getUserSession } from "@/lib/auth/auth-util"
export default async function page() {
  const user = await getUserSession()
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Chat Room</h1>
        <p className="text-muted-foreground">
          Feel free to share your thoughts, suggestions, and questions!
        </p>
      </div>
      <hr className="border-border" />
      {/* Chat room section */}

      <Suspense fallback={<SkeletonLoader variant="chat" />}>
        <ChatSection user={user} />
      </Suspense>
    </div>
  )
}
