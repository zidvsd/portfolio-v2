import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  BriefcaseIcon,
  CodeIcon,
} from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import Image from "next/image"
import { TECH_CONFIG } from "@/lib/constants/tech-data"
import { getProjects } from "@/lib/services/github"
import { getProfile } from "@/lib/services/queries"
import { FeaturedCarousel } from "@/components/FeaturedCarousel"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { PushPinIcon } from "@phosphor-icons/react/dist/ssr"
export default async function Page() {
  const profile = await getProfile()
  const githubRepos = await getProjects()

  const featuredRepos = githubRepos
    .map((repo: any) => {
      const localConfig = MY_PROJECTS.find((p) => p.slug === repo.slug)
      return {
        ...repo,
        image: localConfig?.image || repo.image,
        isFeatured: localConfig?.isFeatured || false,
      }
    })
    .filter((repo) => repo.isFeatured)
  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="animate-pulse text-muted-foreground">
          Initializing Rashid's Profile...
        </p>
      </div>
    )
  }
  return (
    <div className="space-y-8">
      {/* Header Section */}
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
          {/* Social Actions */}
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

        {/* About/Bio Section */}
        <section>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {profile.bio}
          </p>
        </section>
      </section>

      <hr className="border-border" />
      {/* Skill Grid Preview (Optional) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <CodeIcon className="size-8 text-primary" />
          <h3 className="text-lg font-bold tracking-widest uppercase">
            Technical Stack
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          {profile.skills?.map((skill: string) => (
            <SkillBadge key={skill} name={skill} />
          ))}
        </div>
      </section>

      {/* Carousel for featured works */}

      <hr className="border-border" />

      <section className="w-full">
        <div className="flex items-center gap-2">
          <PushPinIcon className="size-8 text-primary" />
          <h3 className="text-lg font-bold tracking-widest uppercase">
            Featured Projects
          </h3>
        </div>
        <FeaturedCarousel projects={featuredRepos} />
      </section>
    </div>
  )
}

// Small helper component for social buttons
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

// Tech stack badges
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
        width={4}
        height={4}
        src={`https://cdn.simpleicons.org/${config.slug}/currentColor`}
        alt=""
        className="size-4"
      />
      {name}
    </div>
  )
}
