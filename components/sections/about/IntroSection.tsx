import { getProfile } from "@/lib/services/queries"

export default async function IntroSection() {
  const profile = await getProfile()
  if (!profile) return null

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">About</h1>
        <p className="text-muted-foreground">
          A brief introduction to who I am.
        </p>
      </div>
      <hr className="border-border" />
      <div className="space-y-6 text-lg leading-relaxed text-muted-foreground/90">
        {profile.about?.map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
        <div className="pt-4">
          <p className="font-medium text-foreground italic">Best regards,</p>
          <h1 className="text-2xl font-bold tracking-tighter text-primary">
            RVisda
          </h1>
        </div>
      </div>
    </section>
  )
}
