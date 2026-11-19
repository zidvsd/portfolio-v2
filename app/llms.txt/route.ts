import { getBlogs, getProfile } from "@/lib/services/queries"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { SITE_URL } from "@/lib/seo"

// llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI assistants.
export const revalidate = 3600

type BlogLite = {
  title: string
  slug: string
  description?: string
  isPublished?: boolean
}

export async function GET() {
  const [profile, blogs] = await Promise.all([
    getProfile().catch(() => null),
    getBlogs() as Promise<BlogLite[]>,
  ])

  const about =
    profile?.bio ||
    "Full-stack web developer specializing in React, Next.js, TypeScript, and modern web applications."

  const posts = blogs
    .filter((b) => b.isPublished !== false)
    .map(
      (b) =>
        `- [${b.title}](${SITE_URL}/blog/${b.slug})${b.description ? `: ${b.description}` : ""}`
    )

  const projects = MY_PROJECTS.map(
    (p) =>
      `- [${p.name}](${SITE_URL}/projects/${p.slug})${p.deployUrl ? ` (live: ${p.deployUrl})` : ""}`
  )

  const body = `# Rashid Visda

> Rashid Visda (also known as Zid Visda, "zidvsd") is a full-stack web developer based in Laguna, Philippines, specializing in React, Next.js, TypeScript, Tailwind CSS, Supabase, MongoDB, and PostgreSQL. This site is his portfolio, blog, and live developer dashboard.

${about}

## Main pages

- [Home](${SITE_URL}/): Introduction, tech stack, and featured projects
- [About](${SITE_URL}/about): Background and work experience
- [Projects](${SITE_URL}/projects): Full-stack web apps, with source code on GitHub
- [Blog](${SITE_URL}/blog): Articles on web development, gaming, and music
- [Achievements](${SITE_URL}/achievements): Certifications and badges
- [Dashboard](${SITE_URL}/dashboard): Live GitHub, WakaTime, Spotify, and Codewars stats
- [Contact](${SITE_URL}/contact): Freelance work, collaborations, and job opportunities

## Projects

${projects.join("\n")}
${posts.length ? `\n## Blog posts\n\n${posts.join("\n")}\n` : ""}
## Links

- [GitHub](https://github.com/zidvsd)
- [LinkedIn](https://www.linkedin.com/in/rashidvisda)
- [Resume (PDF)](${SITE_URL}/Rashid_Visda_Resume.pdf)
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
