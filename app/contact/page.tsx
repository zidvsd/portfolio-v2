import type { Metadata } from "next"
import ContactSection from "@/components/sections/contact/ContactSection"

export const metadata: Metadata = {
  title: "Contact | Rashid Visda - Full-Stack Developer",
  description:
    "Get in touch with Rashid Visda for freelance work, collaborations, or full-stack development opportunities using React and Next.js.",

  alternates: {
    canonical: "https://zidvsd.site/contact",
  },
  keywords: [
    "contact rashid visda",
    "contact zid visda",
    "hire full stack developer philippines",
    "full stack developer contact",
    "nextjs developer contact",
    "freelance web developer",
  ],

  openGraph: {
    title: "Contact | Rashid Visda",
    description:
      "Hire or collaborate with a full-stack developer specializing in React and Next.js.",
    url: "https://zidvsd.site/contact",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactSection />
}
