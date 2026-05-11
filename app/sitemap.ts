import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: MetadataRoute.Sitemap = []

  try {
    const blogs = await fetch("https://zidvsd.site/api/blogs", {
      next: { revalidate: 3600 },
    }).then((res) => res.json())

    blogUrls = blogs.map((post: { slug: string; datePublished?: string }) => ({
      url: `https://zidvsd.site/blog/${post.slug}`,
      lastModified: post.datePublished
        ? new Date(post.datePublished)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch {
    blogUrls = []
  }

  return [
    {
      url: "https://zidvsd.site",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://zidvsd.site/about",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://zidvsd.site/projects",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://zidvsd.site/blog",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://zidvsd.site/achievements",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://zidvsd.site/contact",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.5, // ✅ Lowered — contact pages aren't that important for SEO
    },
    ...blogUrls,
  ]
}
