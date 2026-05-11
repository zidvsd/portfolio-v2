export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: "https://zidvsd.site/sitemap.xml",
    host: "https://zidvsd.site",
  }
}
