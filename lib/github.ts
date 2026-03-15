// src/lib/github.ts
import { unstable_cache } from "next/cache"

export async function getPinnedRepos() {
  return unstable_cache(
    async function () {
      // Replace YOUR_USERNAME with your actual GitHub handle
      const query = `
        {
          user(login: "zidvsd") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
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
              }
            }
          }
        }
      `

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
          next: { revalidate: 3600 },
        })

        const result = await response.json()

        if (!response.ok || result.errors) {
          console.error(
            "GitHub GraphQL Error:",
            result.errors || response.statusText
          )
          return []
        }

        const pinnedNodes = result.data.user.pinnedItems.nodes

        return pinnedNodes.map(function (repo: any) {
          return {
            name: repo.name,
            description: repo.description,
            url: repo.url,
            stars: repo.stargazerCount,
            // Extracts the primary language or a list
            languages: repo.languages.nodes,
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
