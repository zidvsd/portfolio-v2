import { getAchievements } from "@/lib/services/queries"
import AchievementList from "@/components/AchievementsList"

export default async function AchievementSection() {
  const achievements = await getAchievements()

  return <AchievementList initialData={achievements} />
}
