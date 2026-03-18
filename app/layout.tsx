import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/themes/theme-provider"
import { cn } from "@/lib/utils"
import MainLayout from "@/components/layout/MainLayout"
import ChatToggle from "@/components/ChatToggle"
import ScrollToTop from "@/components/ScrollToTop"
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
