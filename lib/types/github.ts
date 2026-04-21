// lib/types/github.ts

export interface GitHubStats {
  // Basic Profile Stats
  followers: number
  following: number
  public_repos: number

  // Contribution Data (Often from a secondary scrape or GraphQL API)
  contributions: {
    total: number
    thisWeek: number
    bestDay: {
      date: string
      count: number
    }
    dailyAverage: number
  }
}

export interface GitHubPinnedRepo {
  author: string
  repo: string // name
  link: string // The full GitHub link
  description: string
  language: string
  languageColor: string
  stars: string | number
  forks: string | number
}
