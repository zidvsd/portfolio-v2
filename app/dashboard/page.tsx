import { Suspense } from "react"
import dynamic from "next/dynamic"
import EndOfPage from "@/components/ui/end-of-page"
import GithubCard from "@/components/dashboard/GithubCard"
import GithubCardSkeleton from "@/components/skeleton/GithubCardSkeleton"
import WakaTimeSkeleton from "@/components/skeleton/WakaTimeSkeleton"
import CodewarsCardSkeleton from "@/components/skeleton/CodewarsCardSkeleton"
import SpotifyCardSkeleton from "@/components/skeleton/SpotifyCardSkeleton"

const WakaTimeCardWrapper = dynamic(
  () => import("@/components/dashboard/WakaTimeWrapper"),
  {
    loading: () => <WakaTimeSkeleton />,
  }
)

const SpotifyCard = dynamic(
  () => import("@/components/dashboard/SpotifyCard"),
  {
    loading: () => <SpotifyCardSkeleton />,
  }
)

const CodewarsCardWrapper = dynamic(
  () => import("@/components/dashboard/CodewarsCardWrapper"),
  {
    loading: () => <CodewarsCardSkeleton />,
  }
)
export default async function page() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          A personal dashboard that tracks my development activity, hobbies, and
          recreation in real time
        </p>
      </div>
      <hr className="border-border" />

      <Suspense fallback={<GithubCardSkeleton />}>
        <GithubCard />
      </Suspense>

      <hr className="border-border" />

      <Suspense fallback={<WakaTimeSkeleton />}>
        <WakaTimeCardWrapper />
      </Suspense>

      <hr className="border-border" />

      <Suspense fallback={<SpotifyCardSkeleton />}>
        <SpotifyCard />
      </Suspense>
      <Suspense fallback={<CodewarsCardSkeleton />}>
        <CodewarsCardWrapper />
      </Suspense>

      <EndOfPage />
    </section>
  )
}
