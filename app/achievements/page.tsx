import { getAchievements } from "@/lib/services/queries"
import AchievementList from "@/components/AchievementsList"
import EndOfPage from "@/components/ui/end-of-page"
export default async function Page() {
  const achievements = await getAchievements()

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          A showcase of certificates and badges I’ve earned so far.
        </p>
      </div>
      <hr className="border-border" />

      {/* Pass the server-fetched data to the client wrapper */}
      <AchievementList initialData={achievements} />
      <EndOfPage />
    </section>
  )
}
