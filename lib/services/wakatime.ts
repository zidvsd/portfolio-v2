
import { unstable_cache } from "next/cache"

async function fetchWakaTime(endpoint: string) {
  const token = process.env.WAKATIME_ACCESS_TOKEN

  if (!token) {
    console.error("Missing WAKATIME_ACCESS_TOKEN")
    return null
  }

  try {
    const res = await fetch(
      `https://api.wakatime.com/api/v1/users/current/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok) {
      console.error(
        `WakaTime API error (${endpoint}):`,
        res.status,
        await res.text()
      )
      return null
    }

    const json = await res.json()
    return json.data ?? null
  } catch (error) {
    console.error("WakaTime request failed:", error)
    return null
  }
}

export function getWakaTimeAllTime() {
  return unstable_cache(
    () => fetchWakaTime("all_time_since_today"),
    ["waka-all-time-v2"],
    { revalidate: 86400 }
  )()
}

export function getWakaTimeWeeklyStats() {
  return unstable_cache(
    () => fetchWakaTime("stats/last_7_days"),
    ["waka-weekly-stats-v2"],
    { revalidate: 60 }
  )()
}
