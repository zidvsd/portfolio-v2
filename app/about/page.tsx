// src/app/about/page.tsx
import { getExperience, getProfile } from "@/lib/queries"
import Image from "next/image" // Import Next.js Image component
import {
  BriefcaseIcon,
  GraduationCapIcon,
  MapPinIcon,
  CalendarIcon,
} from "@phosphor-icons/react/dist/ssr"

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([
    getProfile(),
    getExperience(),
  ])

  if (!profile) return null

  const workHistory = experiences.filter((exp: any) => exp.type === "work")
  const educationHistory = experiences.filter(
    (exp: any) => exp.type === "education"
  )

  return (
    <div className="space-y-12 pb-8">
      {/* Intro Section */}
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

      {/* Work Experience Section */}
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

      {/* Education Section */}
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
    </div>
  )
}

function ExperienceCard({ item }: { item: any }) {
  // Ensure the logo path starts with a slash
  const logoPath = item.logo?.startsWith("/") ? item.logo : `/${item.logo}`

  return (
    <div className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md">
      <div className="flex gap-5">
        {/* Logo Container */}
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg">
          {item.logo ? (
            <Image
              src={logoPath}
              alt={`${item.company} logo`}
              width={56}
              height={56}
              className="object-contain p-2"
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
              <p className="font-semibold text-primary">{item.company}</p>
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
    </div>
  )
}
