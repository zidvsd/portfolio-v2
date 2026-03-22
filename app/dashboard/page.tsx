import { getWakaTimeAllTime } from "@/lib/services/wakatime"
import { getWakaTimeWeeklyStats } from "@/lib/services/wakatime"
import { WakaTimeStats } from "../../lib/types/wakatime"
import WakaTimeCard from "@/components/dashboard/WakaTimeCard"
import SpotifyCard from "@/components/dashboard/SpotifyCard"
import EndOfPage from "@/components/ui/end-of-page"
import GithubCard from "@/components/dashboard/GithubCard"
import { getCodewarsProfile } from "@/lib/services/codewars"
import CodewarsCard from "@/components/dashboard/CodewarsCard"
export default async function page() {
  const allTimeRes = await getWakaTimeAllTime()
  const weeklyRes = await getWakaTimeWeeklyStats()
  const codewarsProfile = await getCodewarsProfile()
  const weeklyData = weeklyRes?.data || weeklyRes
  const allTimeRaw = allTimeRes?.data || allTimeRes

  const allTimeStats: WakaTimeStats = {
    ...weeklyData,
    ...allTimeRaw,
    human_readable_total: allTimeRaw?.text || "0 hrs",
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

      <section className="w-full">
        <GithubCard />
      </section>
      <hr className="border-border" />
      <section>
        <WakaTimeCard weeklyStats={weeklyData} allTimeStats={allTimeStats} />
      </section>
      <hr className="border-border" />
      <section>
        <SpotifyCard />
      </section>

      <section>
        <CodewarsCard codewarsData={codewarsProfile} />
      </section>

      <EndOfPage />
    </section>
  )
}
