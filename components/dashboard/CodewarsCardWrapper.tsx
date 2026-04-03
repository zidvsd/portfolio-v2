import { getCodewarsProfile } from "@/lib/services/codewars"
import CodewarsCard from "./CodewarsCard"

export default async function CodewarsCardWrapper() {
  const codewarsProfile = await getCodewarsProfile()

  if (!codewarsProfile) return null

  return <CodewarsCard codewarsData={codewarsProfile} />
}
