export interface GitHubRepoResponse {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  forkCount: number
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string
      }
    }>
  }
  languages: {
    nodes: Array<{
      name: string
      color: string
    }>
  }
  readme: {
    text: string
  } | null
}
