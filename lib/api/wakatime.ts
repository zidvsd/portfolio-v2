// src/lib/queries.ts
import { unstable_cache } from "next/cache"
const encodedKey = Buffer.from(process.env.WAKATIME_API_KEY || "").toString(
  "base64"
)

export const getWakaTimeAllTime = unstable_cache(
  async () => {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/current/all_time_since_today",
      {
        headers: { Authorization: `Basic ${encodedKey}` },
        next: { revalidate: 86400 }, // Lifetime doesn't need to update every hour
      }
    )
    const json = await res.json()
    return json.data
  },
  ["waka-all-time"],
  { revalidate: 86400 }
)

export const getWakaTimeWeeklyStats = unstable_cache(
  async () => {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: { Authorization: `Basic ${encodedKey}` },
        next: { revalidate: 3600 },
      }
    )
    const json = await res.json()
    return json.data // This will contain .languages, .editors, etc.
  },
  ["waka-weekly-stats"],
  { revalidate: 3600 }
)
