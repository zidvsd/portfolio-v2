import type { Metadata } from "next"

export const SITE_URL = "https://zidvsd.site"
export const SITE_NAME = "Rashid Visda"

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  type?: "website" | "article" | "profile"
  noIndex?: boolean
  publishedTime?: string
  tags?: string[]
}

/** Default social image rendered by app/og/route.tsx. */
export const ogImageUrl = (title: string) =>
  `/og?title=${encodeURIComponent(title)}`

// Next.js replaces (not merges) a parent's openGraph/twitter objects, so every
// page builds the full set here to keep canonical, OG image and cards consistent.
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex,
  publishedTime,
  tags,
}: PageMetaInput): Metadata {
  const images = [image ?? ogImageUrl(title)]
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images,
      ...(type === "article" && { publishedTime, tags }),
    },
    twitter: { card: "summary_large_image", title, description, images },
    ...(noIndex && { robots: { index: false, follow: true } }),
  }
}
