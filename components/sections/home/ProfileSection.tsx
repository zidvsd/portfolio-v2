import Image from "next/image"
import Link from "next/link"
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  BriefcaseIcon,
  CodeIcon,
} from "@phosphor-icons/react/dist/ssr"
import { getProfile } from "@/lib/services/queries"
import { TECH_CONFIG } from "@/lib/constants/tech-data"
import StaggerWrapper from "@/components/motion/StaggerWrapper"
import { StaggerItem } from "@/components/motion/StaggerItem"

export default async function ProfileSection() {
  const profile = await getProfile()

  if (!profile) return null

  return (
    <div className="space-y-8">
      {/* Header & Socials */}
      <section className="space-y-2">
        <div className="flex flex-row justify-between gap-6 md:items-start">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {profile.headline}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground md:text-base">
              <span className="flex items-center gap-1.5">
                <MapPinIcon size={18} weight="bold" className="text-primary" />
                {profile.location}
              </span>
              <span className="hidden text-border md:block">•</span>
              <span className="flex items-center gap-1.5">
                <BriefcaseIcon
                  size={18}
                  weight="bold"
                  className="text-primary"
                />
                {profile.workStatus}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:flex-row">
            <SocialLink
              href={profile.socials.github}
              icon={<GithubLogoIcon size={24} />}
            />
            <SocialLink
              href={profile.socials.linkedin}
              icon={<LinkedinLogoIcon size={24} />}
            />
            <SocialLink
              href={profile.socials.email}
              icon={<EnvelopeSimpleIcon size={24} />}
            />
          </div>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          {profile.bio}
        </p>
      </section>

      <hr className="border-border" />

      {/* Tech Stack - Moved here so it loads with Profile data */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <CodeIcon className="size-8 text-primary" />
          <h3 className="text-lg font-bold tracking-widest uppercase">
            Technical Stack
          </h3>
        </div>
        <StaggerWrapper delayStep={0.05} className="flex flex-wrap gap-4">
          {profile.skills?.map((skill: string) => (
            <StaggerItem key={skill}>
              <SkillBadge name={skill} />
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </section>
    </div>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
    >
      {icon}
    </Link>
  )
}

function SkillBadge({ name }: { name: string }) {
  const config = TECH_CONFIG[name] || {
    color: "bg-muted text-muted-foreground border-border",
    slug: name.toLowerCase(),
  }
  return (
    <div
      className={`hover-utility flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-110 ${config.color} shadow`}
    >
      <Image
        unoptimized
        width={16}
        height={16}
        src={`https://cdn.simpleicons.org/${config.slug}/currentColor`}
        alt=""
        className="size-4"
      />
      {name}
    </div>
  )
}
