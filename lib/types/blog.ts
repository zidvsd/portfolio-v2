export type BlogCategory =
  | "Development"
  | "Gaming"
  | "Music"
  | "General"
  | "All"

export interface Blog {
  _id: string
  title: string
  slug: string
  description: string
  content: string
  isFeatured: boolean

  coverImageUrl: string

  category: BlogCategory
  tags: string[]

  datePublished: string
  isPublished: boolean
  readingTime?: string
}

export type CreateBlogInput = Omit<Blog, "_id" | "datePublished">
