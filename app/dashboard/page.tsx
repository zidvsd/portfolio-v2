import { Suspense } from "react"
import EndOfPage from "@/components/ui/end-of-page"
import GithubCard from "@/components/dashboard/GithubCard"
import SpotifyCard from "@/components/dashboard/SpotifyCard"
import WakaTimeCardWrapper from "@/components/dashboard/WakaTimeWrapper"
import CodewarsCardWrapper from "@/components/dashboard/CodewarsCardWrapper"
import GithubCardSkeleton from "@/components/skeleton/GithubCardSkeleton"
import WakaTimeSkeleton from "@/components/skeleton/WakaTimeSkeleton"
import CodewarsCardSkeleton from "@/components/skeleton/CodewarsCardSkeleton"
import SpotifyCardSkeleton from "@/components/skeleton/SpotifyCardSkeleton"
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
