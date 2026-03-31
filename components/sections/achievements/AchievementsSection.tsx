import { getAchievements } from "@/lib/services/queries"
import AchievementList from "@/components/AchievementsList"

export default async function AchievementSection() {
  const achievements = await getAchievements()

  // We fetch here, then pass the data to your existing client component
  return <AchievementList initialData={achievements} />
}
