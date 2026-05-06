import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/themes/theme-provider"
import { cn } from "@/lib/utils"
import MainLayout from "@/components/layout/MainLayout"
import ChatToggle from "@/components/ChatToggle"
import ScrollToTop from "@/components/ScrollToTop"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rashid Visda - Full-Stack Developer Portfolio",
  description:
    "Rashid Visda portfolio. Full-stack developer specializing in React, Next.js, and modern web applications.",
  metadataBase: new URL("https://zidvsd.site"),
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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rashid Visda - Web Developer Portfolio",
    description:
      "Full-stack developer building modern web apps with React and Next.js.",
    url: "https://zidvsd.site",
    siteName: "Rashid Visda Portfolio",
    locale: "en_US",
    type: "website",
  },
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rashid Visda",
              jobTitle: "Full-Stack Developer",
              alternateName: ["Zid Visda", "zidvsd", "Zid"],
              url: "https://zidvsd.site",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Laguna",
                addressCountry: "PH",
              },
              sameAs: [
                "https://github.com/zidvsd",
                "https://linkedin.com/in/rashidvisda",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Supabase",
                "MongoDB",
                "Postgresql",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
          <ScrollToTop />
        </ThemeProvider>
        <ChatToggle />
      </body>
    </html>
  )
}
