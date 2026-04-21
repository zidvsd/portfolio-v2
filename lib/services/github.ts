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
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`)
    }

    const data = await res.json()
    const date = data.created_at
      ? new Date(data.created_at)
      : new Date("2024-01-01")

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

export async function getProjects() {
  return unstable_cache(
    async function () {
      const repoQueries = MY_PROJECTS.map(function (project, index) {
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

        return MY_PROJECTS.map(function (project, index) {
          const githubData = result.data[`repo${index}`]

          return {
            name: project.name,
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
    ["featured-projects"],
    { tags: ["github"], revalidate: 3600 }
  )()
}

export async function getRepoDetails(slug: string) {
  if (!slug || typeof slug !== "string") return null

  return unstable_cache(
    async function (repoSlug: string) {
      const username = "zidvsd"
      const token = process.env.GITHUB_TOKEN

      const commonHeaders = {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Zid-Portfolio-App",
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
          created_at: data.created_at,
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

export async function getGithubActivity() {
  return unstable_cache(
    async function () {
      try {
        const res = await fetch(
          "https://github-contributions-api.deno.dev/zidvsd.json"
        )

        if (!res.ok) {
          throw new Error(`Failed to fetch GitHub activity: ${res.status}`)
        }

        const data = await res.json()
        return {
          contributions: data.contributions || [],
          totalContributions: data.totalContributions,
        }
      } catch (error) {
        console.error("GitHub Fetch Error:", error)
        return {
          contributions: [],
          totalContribution: 0,
        }
      }
    },
    ["github-activity-2026"],
    {
      revalidate: 3600,
      tags: ["github-contributions"],
    }
  )()
}

export async function getPinnedRepos() {
  return unstable_cache(
    async function () {
      try {
        const query = `
          {
            user(login: "zidvsd") {
              pinnedItems(first: 6, types: [REPOSITORY]) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    forkCount
                    primaryLanguage {
                      name
                      color
                    }
                  }
                }
              }
            }
          }
        `

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
          next: { revalidate: 3600 },
        })

        if (!res.ok) {
          throw new Error(`GitHub API returned ${res.status}`)
        }

        const json = await res.json()

        return json.data.user.pinnedItems.nodes.map((repo: any) => ({
          repo: repo.name,
          description: repo.description,
          link: repo.url,
          stars: repo.stargazerCount,
          forks: repo.forkCount,
          language: repo.primaryLanguage?.name,
          languageColor: repo.primaryLanguage?.color,
        }))
      } catch (error) {
        console.error("Official GitHub Fetch Error:", error)
        return []
      }
    },
    ["github-pinned-repos"],
    {
      revalidate: 3600,
      tags: ["github-pinned-repos"],
    }
  )()
}
