import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// /login and /signup stay crawlable on purpose: they carry `noindex`, and
// Google can only see that tag if it's allowed to fetch the page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
