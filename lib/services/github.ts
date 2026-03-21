import { unstable_cache } from "next/cache"
import { MY_PROJECTS } from "../constants/projects-config"

export async function getGithubStats() {
  const githubId = 172535603

  try {
    const res = await fetch(`https://api.github.com/user/${githubId}`, {
      headers: {
        "User-Agent": "zidvsd-portfolio",
        Accept: "application/vnd.github+json",
      },
      // You can still control caching here without unstable_cache
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`)
    }

    const data = await res.json()
    console.log(data)
    const date = data.created_at
      ? new Date(data.created_at)
      : new Date("2024-01-01")

    // Option A: "May 2024" (Recommended for Bento Grids)
    const memberSince = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    })
    return {
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      total_repos: data.public_repos ?? 0,
      name: data.name ?? "",
      member_since: memberSince,
      bio: data.bio ?? "",
    }
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)

    // Return safe defaults so your UI components don't break
    return {
      followers: 0,
      following: 0,
      public_repos: 0,
      name: "",
      bio: "",
      member_since: "2024",
    }
  }
}

export async function getPinnedRepos() {
  return unstable_cache(
    async function () {
      // 1. Build dynamic GraphQL query aliases based on your config slugs
      const repoQueries = MY_PROJECTS.map(function (project, index) {
        // Fallback to project.name if slug is missing in config
        const identifier = project.slug || project.name

        return `
          repo${index}: repository(owner: "zidvsd", name: "${identifier}") {
            name
            description
            url
            stargazerCount
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
                color
              }
            }
          }
        `
      }).join("\n")

      const query = `{ ${repoQueries} }`

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        })

        const result = await response.json()

        if (!response.ok || result.errors) {
          console.error(
            "GitHub GraphQL Error:",
            result.errors || response.statusText
          )
          return []
        }

        // 2. Map the Aliased results (repo0, repo1...) back to your project list
        return MY_PROJECTS.map(function (project, index) {
          const githubData = result.data[`repo${index}`]

          return {
            name: project.name, // Use the pretty name from config
            slug: project.slug,
            description: githubData?.description || "No description provided.",
            githubUrl:
              githubData?.url || `https://github.com/zidvsd/${project.slug}`,
            deployUrl: project.deployUrl || null,
            image: project.image || null,
            stars: githubData?.stargazerCount || 0,
            languages: githubData?.languages?.nodes || [],
          }
        })
      } catch (error) {
        console.error("Fetch error:", error)
        return []
      }
    },
    ["pinned-repos"],
    { tags: ["github"], revalidate: 3600 }
  )()
}

export async function getRepoDetails(slug: string) {
  // Guard clause for Next.js 15 pre-rendering
  if (!slug || typeof slug !== "string") return null

  return unstable_cache(
    async (repoSlug: string) => {
      const username = "zidvsd"
      const token = process.env.GITHUB_TOKEN

      const commonHeaders = {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Zid-Portfolio-App", // CRITICAL: GitHub REST API often 404s without this
        Accept: "application/vnd.github+json",
      }

      try {
        const [repoRes, readmeRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${username}/${repoSlug}`, {
            headers: commonHeaders,
            next: { revalidate: 3600 },
          }),
          fetch(`https://api.github.com/repos/${username}/${repoSlug}/readme`, {
            headers: {
              ...commonHeaders,
              Accept: "application/vnd.github.raw",
            },
            next: { revalidate: 3600 },
          }),
        ])

        if (!repoRes.ok) {
          // This will help you see if it's a Rate Limit (403) or Not Found (404)
          console.error(`GitHub API Status: ${repoRes.status} for ${repoSlug}`)
          return null
        }

        const data = await repoRes.json()
        const readmeText = readmeRes.ok
          ? await readmeRes.text()
          : "No README found."

        return {
          name: data.name,
          description: data.description,
          githubUrl: data.html_url,
          deployUrl: data.homepage,
          stars: data.stargazers_count,
          forks: data.forks_count,
          topics: data.topics || [],
          language: data.language,
          readme: readmeText,
        }
      } catch (error) {
        console.error("Fetch error:", error)
        return null
      }
    },
    [`repo-detail-${slug}`],
    { tags: [`repo-${slug}`], revalidate: 3600 }
  )(slug)
}

export const getGithubActivity = unstable_cache(
  async () => {
    try {
      const res = await fetch(
        "https://github-contributions-api.deno.dev/zidvsd.json?year=2024"
      )

      if (!res.ok) {
        throw new Error(`Failed to fetch GitHub activity: ${res.status}`)
      }

      const data = await res.json()
      return data.contributions || []
    } catch (error) {
      console.error("GitHub Fetch Error:", error)
      return []
    }
  },
  ["github-activity-2024"],
  {
    revalidate: 3600,
    tags: ["github-contributions"],
  }
)
