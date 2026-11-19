import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/themes/theme-provider"
import { cn } from "@/lib/utils"
import MainLayout from "@/components/layout/MainLayout"
import ChatToggle from "@/components/ChatToggle"
import type { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"
import { SITE_URL } from "@/lib/seo"

// No `alternates.canonical` here: a root canonical is inherited by every page
// that doesn't set its own, which told Google those pages duplicate the homepage.
export const metadata: Metadata = {
  title: {
    default: "Rashid Visda | Full-Stack Web Developer (Next.js, React)",
    template: "%s | Rashid Visda",
  },
  description:
    "Rashid Visda portfolio. Full-stack developer specializing in React, Next.js, and modern web applications.",
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Rashid Visda", url: SITE_URL }],
  creator: "Rashid Visda",
  keywords: [
    "Rashid Visda",
    "Zid Visda",
    "Zid",
    "Rashid",
    "Visda",
    "Full Stack Developer",
    "Frontend Developer",
    "Web Developer",
    "Software Engineer",
    "Frontend Developer Portfolio",
    "Full Stack Developer Philippines",
    "Next.js Developer",
    "React Developer",
    "Web Developer Portfolio",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large", "max-snippet": -1 },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Rashid Visda",
      alternateName: ["Zid Visda", "zidvsd", "Zid"],
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack web developer from Laguna, Philippines specializing in React, Next.js, and TypeScript.",
      url: SITE_URL,
      image: `${SITE_URL}/images/profile-picture.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Laguna",
        addressCountry: "PH",
      },
      sameAs: [
        "https://github.com/zidvsd",
        "https://www.linkedin.com/in/rashidvisda",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "MongoDB",
        "PostgreSQL",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rashid Visda",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
}

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <NextTopLoader height={2} showSpinner={false} color="#432dd7" />
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
        <ChatToggle />
      </body>
    </html>
  )
}
