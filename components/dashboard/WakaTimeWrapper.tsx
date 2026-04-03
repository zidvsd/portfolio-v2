import {
  getWakaTimeAllTime,
  getWakaTimeWeeklyStats,
} from "@/lib/services/wakatime"
import WakaTimeCard from "./WakaTimeCard"

export default async function WakaTimeCardWrapper() {
  const [allTimeRes, weeklyRes] = await Promise.all([
    getWakaTimeAllTime(),
    getWakaTimeWeeklyStats(),
  ])

  const weeklyData = weeklyRes?.data || weeklyRes
  const allTimeRaw = allTimeRes?.data || allTimeRes

  const allTimeStats = {
    ...weeklyData,
    ...allTimeRaw,
    human_readable_total: allTimeRaw?.text || "0 hrs",
  }

  return <WakaTimeCard weeklyStats={weeklyData} allTimeStats={allTimeStats} />
}
