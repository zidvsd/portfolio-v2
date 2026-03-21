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

export interface GitHubCardProps {
  data: GitHubStats | null
}

// lib/types/github.ts
export interface GithubContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // GitHub's intensity levels
}

export interface GithubContributionData {
  total: {
    [year: string]: number
    lastYear: number
  }
  contributions: GithubContributionDay[][] // 2D array: weeks -> days
}
