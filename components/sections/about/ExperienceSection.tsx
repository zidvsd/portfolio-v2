import { getExperience } from "@/lib/services/queries"
import {
  BriefcaseIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { CalendarIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr"
export default async function ExperienceSection() {
  const experiences = await getExperience()

  const workHistory = experiences.filter((exp: any) => exp.type === "work")
  const educationHistory = experiences.filter(
    (exp: any) => exp.type === "education"
  )

  return (
    <>
      {/* Work Experience */}
      <section className="space-y-8">
        <div className="flex items-center gap-2">
          <BriefcaseIcon size={24} weight="bold" className="text-primary" />
          <div>
            <h2 className="text-2xl font-semibold">Work Experience</h2>
            <p className="text-sm text-muted-foreground">
              My professional journey.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {workHistory.map((job: any) => (
            <ExperienceCard key={job._id} item={job} />
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Education */}
      <section className="space-y-8">
        <div className="flex items-center gap-2">
          <GraduationCapIcon size={24} weight="bold" className="text-primary" />
          <div>
            <h2 className="text-2xl font-semibold">Education</h2>
            <p className="text-sm text-muted-foreground">
              My educational journey.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {educationHistory.map((edu: any) => (
            <ExperienceCard key={edu._id} item={edu} />
          ))}
        </div>
      </section>
    </>
  )
}
function ExperienceCard({ item }: { item: any }) {
  const cleanLogo = item.logo?.replace(/^\//, "")
  const fullPath = `/icons/experiences/${cleanLogo}`

  return (
    <Card className="group relative overflow-hidden rounded-xl border border-border p-0 transition-all hover:shadow-md md:p-4">
      <CardContent className="p-4">
        <div className="flex gap-5">
          {/* Logo Container */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            {item.logo ? (
              <Image
                src={fullPath}
                alt={`${item.company} logo`}
                width={56}
                height={56}
                className="object-contain p-1"
              />
            ) : (
              <BriefcaseIcon size={28} className="text-muted-foreground" />
            )}
          </div>

          {/* Content Container */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-xl leading-tight font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-lg font-semibold text-primary">
                  {item.company}
                </p>
              </div>

              <div className="flex w-fit items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1 text-sm font-medium text-muted-foreground">
                <CalendarIcon size={16} />
                {item.startDate} — {item.endDate}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon size={16} />
              <span>
                {item.location} {item.mode && `• ${item.mode}`}
              </span>
            </div>

            {item.responsibilities?.length > 0 && (
              <ul className="mt-4 space-y-2 border-l-2 border-muted pl-4">
                {item.responsibilities.map((resp: string, i: number) => (
                  <li
                    key={i}
                    className="text-sm leading-snug text-muted-foreground"
                  >
                    {resp}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
