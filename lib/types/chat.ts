export interface Message {
  _id: string
  content: string
  author: {
    name: string
    image?: string
  }
  createdAt: string
}
