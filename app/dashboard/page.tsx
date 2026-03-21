import { getWakaTimeAllTime } from "@/lib/services/wakatime"
import { getWakaTimeWeeklyStats } from "@/lib/services/wakatime"
import { WakaTimeStats } from "../../lib/types/wakatime"
import WakaTimeCard from "@/components/dashboard/WakaTimeCard"
import SpotifyCard from "@/components/dashboard/SpotifyCard"
import { getGithubActivity } from "@/lib/services/github"
import EndOfPage from "@/components/ui/end-of-page"
import { GithubContributionsCard } from "@/components/dashboard/GithubContributionsCard"
export default async function page() {
  const allTimeRes = await getWakaTimeAllTime()
  const weeklyRes = await getWakaTimeWeeklyStats()

  // Extract the inner data objects
  const weeklyData = weeklyRes?.data || weeklyRes
  const allTimeRaw = allTimeRes?.data || allTimeRes

  // Github profile
  const githubData = await getGithubActivity()
  console.log(githubData)
  // Format the all-time object so it satisfies the WakaTimeStats interface
  const allTimeStats: WakaTimeStats = {
    ...weeklyData,
    ...allTimeRaw,
    // NOW WE OVERWRITE: These MUST come after the spread
    human_readable_total: allTimeRaw?.text || "0 hrs",
    human_readable_daily_average: "N/A",

    // If your interface uses this specific key:
    human_readable_total_including_other_language: allTimeRaw?.text || "0 hrs",
  }

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
      <section>
        <WakaTimeCard weeklyStats={weeklyData} allTimeStats={allTimeStats} />
      </section>
      <hr className="border-border" />
      <section>
        <SpotifyCard />
      </section>
      <hr className="border-border" />
      <section className="w-full">
        <GithubContributionsCard weeks={githubData} />
      </section>
      <hr className="border-border" />

      <EndOfPage />
    </section>
  )
}
