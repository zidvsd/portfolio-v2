import { unstable_cache } from "next/cache"
export const getCodewarsProfile = async () => {
  return unstable_cache(
    async () => {
      const username = "zidvsd"
      const res = await fetch(
        `https://www.codewars.com/api/v1/users/${username}`
      )
      if (!res.ok) return null
      return res.json()
    },
    ["codewars-profile"],
    { tags: ["codewars"], revalidate: 3600 }
  )()
}
