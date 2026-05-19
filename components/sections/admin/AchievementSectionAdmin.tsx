import { getAchievementsAdmin } from "@/lib/services/queries"
import AchievementAdminCard from "@/components/AchievementAdminCard"
import { Achievement } from "@/lib/types/achievement"

export const dynamic = "force-dynamic"
export default async function AchievementSectionAdmin() {
  const achievements = await getAchievementsAdmin()

  if (achievements.length === 0) {
    return (
      <div className="flex min-h-50 flex-col items-center justify-center rounded-lg border border-dashed text-center">
        <p className="text-muted-foreground">
          No achievements found. Time to add some!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {achievements.map((achievement: Achievement) => (
        <AchievementAdminCard key={achievement._id} achievement={achievement} />
      ))}
    </div>
  )
}
