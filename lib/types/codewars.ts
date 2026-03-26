export interface CodewarsProfile {
  username: string
  name: string
  honor: number
  clan: string
  leaderboardPosition: number
  skills: string[]
  ranks: {
    overall: {
      rank: number
      name: string
      color: string
      score: number
    }

    languages: Record<
      string,
      {
        rank: number
        name: string
        color: string
        score: number
      }
    >
  }

  codeChallenges: {
    totalAuthored: number
    totalCompleted: number
  }
}
