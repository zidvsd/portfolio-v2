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
      <section className="space-y-6 md:space-y-4">
        {" "}
        {/* Increased mobile vertical spacing */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 md:space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {profile.headline}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground md:text-base">
              <span className="flex items-center gap-1.5">
                <MapPinIcon size={18} weight="bold" className="text-primary" />
                {profile.location}
              </span>
              {/* Dot is hidden on mobile to prevent weird wrapping */}
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

          {/* Social Icons: Now aligned left on mobile, right on desktop */}
          <div className="flex items-center gap-2 md:justify-end">
            <SocialLink
              href={profile.socials.github}
              icon={<GithubLogoIcon size={22} />}
            />
            <SocialLink
              href={profile.socials.linkedin}
              icon={<LinkedinLogoIcon size={22} />}
            />
            <SocialLink
              href={profile.socials.email}
              icon={<EnvelopeSimpleIcon size={22} />}
            />
          </div>
        </div>
        {/* Bio: Adjusted line-height for better mobile readability */}
        <p className="text-base leading-relaxed text-muted-foreground md:text-xl md:leading-8">
          {profile.bio}
        </p>
      </section>

      <hr className="border-border" />

      {/* Tech Stack */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <CodeIcon className="size-6 text-primary md:size-8" />
          <h3 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase md:text-lg">
            Technical Stack
          </h3>
        </div>
        <StaggerWrapper
          delayStep={0.05}
          className="flex flex-wrap gap-3 md:gap-4"
        >
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
