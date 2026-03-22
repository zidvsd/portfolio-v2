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
    // Added languages to match your JSON sample
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
  // Added this as it's in your response but missing in your type
  codeChallenges: {
    totalAuthored: number
    totalCompleted: number
  }
}
