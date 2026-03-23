export type BlogCategory =
  | "Development"
  | "Gaming"
  | "Music"
  | "General"
  | "All"

export interface Blog {
  _id: string // MongoDB ObjectId as a string
  title: string
  slug: string // SEO friendly URL: "my-cisco-vlan-setup"
  description: string // Short snippet for the blog card
  content: string // Markdown string for paragraphs, quotes, and bullets
  isFeatured: boolean
  // Supabase Integration
  coverImageUrl: string // The public URL from your Supabase bucket

  // Categorization & Social
  category: BlogCategory
  tags: string[] // Your hashtags: ["NextJS", "Cisco", "JohnMayer"]

  // Metadata
  datePublished: string
  isPublished: boolean
  readingTime?: string // Optional: "5 min read"
}

// For creating a new blog (omitting generated fields)
export type CreateBlogInput = Omit<Blog, "_id" | "datePublished">
