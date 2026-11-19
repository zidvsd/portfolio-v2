import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import ContactSection from "@/components/sections/contact/ContactSection"

export const metadata: Metadata = pageMetadata({
  title: "Contact & Hire Me",
  description:
    "Get in touch with Rashid Visda for freelance work, collaborations, or full-stack development opportunities using React and Next.js.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactSection />
}
