import { Suspense } from "react"
import dynamic from "next/dynamic"
import EndOfPage from "@/components/ui/end-of-page"
import GithubCard from "@/components/dashboard/GithubCard"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"

const WakaTimeCardWrapper = dynamic(
  () => import("@/components/dashboard/WakaTimeWrapper"),
  {
    loading: () => <SkeletonLoader variant="wakatime-card" />,
  }
)

const SpotifyCard = dynamic(
  () => import("@/components/dashboard/SpotifyCard"),
  {
    loading: () => <SkeletonLoader variant="spotify-card" />,
  }
)

const CodewarsCardWrapper = dynamic(
  () => import("@/components/dashboard/CodewarsCardWrapper"),
  {
    loading: () => <SkeletonLoader variant="codewars-card" />,
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

      <Suspense fallback={<SkeletonLoader variant="github-card" />}>
        <GithubCard />
      </Suspense>

      <hr className="border-border" />

      <Suspense fallback={<SkeletonLoader variant="wakatime-card" />}>
        <WakaTimeCardWrapper />
      </Suspense>

      <hr className="border-border" />

      <Suspense fallback={<SkeletonLoader variant="spotify-card" />}>
        <SpotifyCard />
      </Suspense>

      <Suspense fallback={<SkeletonLoader variant="codewars-card" />}>
        <CodewarsCardWrapper />
      </Suspense>

      <EndOfPage />
    </section>
  )
}
