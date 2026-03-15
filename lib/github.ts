import { unstable_cache } from "next/cache"
import { MY_PROJECTS } from "./projects-config"

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
