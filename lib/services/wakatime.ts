// src/lib/queries.ts
import { unstable_cache } from "next/cache"

export function getWakaTimeAllTime() {
  return unstable_cache(
    async () => {
      const encodedKey = Buffer.from(
        process.env.WAKATIME_API_KEY || ""
      ).toString("base64")

      const res = await fetch(
        "https://wakatime.com/api/v1/users/current/all_time_since_today",
        {
          headers: { Authorization: `Basic ${encodedKey}` },
          next: { revalidate: 86400 }, // Lifetime doesn't need to update every hour
        }
      )
      if (!res.ok) {
        console.error(`WakaTime all-time error: ${res.status}`)
        return null
      }
      const json = await res.json()
      return json.data
    },
    ["waka-all-time"],
    { revalidate: 86400 }
  )()
}

export function getWakaTimeWeeklyStats() {
  return unstable_cache(
    async () => {
      const encodedKey = Buffer.from(
        process.env.WAKATIME_API_KEY || ""
      ).toString("base64")

      const res = await fetch(
        "https://wakatime.com/api/v1/users/current/stats/last_7_days",
        {
          headers: { Authorization: `Basic ${encodedKey}` },
          next: { revalidate: 60 },
        }
      )
      if (!res.ok) {
        console.error(`WakaTime all-time error: ${res.status}`)
        return null
      }
      const json = await res.json()
      return json.data // This will contain .languages, .editors, etc.
    },
    ["waka-weekly-stats"],
    { revalidate: 60 }
  )()
}
