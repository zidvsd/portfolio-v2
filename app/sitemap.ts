import type { MetadataRoute } from "next"
import { getBlogs } from "@/lib/services/queries"
import { MY_PROJECTS } from "@/lib/constants/projects-config"
import { SITE_URL } from "@/lib/seo"

// Regenerate hourly so new posts show up without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Query the DB directly: the old self-fetch hit /api/blogs (wrong path, and
  // /api/blog is auth-protected), so no blog post ever made it into the sitemap.
  const blogs: { slug: string; datePublished?: string; isPublished?: boolean }[] =
    await getBlogs()

  const staticPages = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/achievements",
    "/dashboard",
    "/contact",
  ].map((path) => ({ url: `${SITE_URL}${path}` }))

  const projectPages = MY_PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
  }))

  const blogPages = blogs
    .filter((b) => b.isPublished !== false)
    .map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      ...(b.datePublished && { lastModified: new Date(b.datePublished) }),
    }))

  return [...staticPages, ...projectPages, ...blogPages]
}
