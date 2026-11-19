"use client"

import ContactForm from "@/components/forms/ContactForm"
import dynamic from "next/dynamic"
import axios from "axios"
import { toast } from "sonner"
import {
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react"
import StaggerWrapper from "@/components/motion/StaggerWrapper"
import { StaggerItem } from "@/components/motion/StaggerItem"
import { ContactInput } from "@/lib/schemas/contact.schema"

const MapSection = dynamic(() => import("@/components/sections/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="h-75 w-full animate-pulse rounded-xl bg-muted" />
  ),
})

const socialLinks = [
  {
    title: "Github",
    description: "Explore my open-source projects and code repositories.",
    href: "https://github.com/zidvsd",
    icon: GithubLogoIcon,
  },
  {
    title: "LinkedIn",
    description:
      "Connect with me for professional networking and opportunities.",
    href: "https://linkedin.com/in/Rashid-Visda",
    icon: LinkedinLogoIcon,
  },
  {
    title: "Email",
    description: "Send me a direct message for inquiries or a quick chat.",
    href: "mailto:rashidvisda@gmail.com",
    icon: EnvelopeIcon,
  },
]

export default function ContactSection() {
  const handleSendMessage = async (data: ContactInput) => {
    try {
      const res = await axios.post("/api/contact", data)

      if (res.status === 200 || res.status === 201) {
        toast.success("Message sent successfully!", {
          description: "I'll get back to you as soon as possible.",
        })
      }
    } catch (error: any) {
      const serverError =
        error.response?.data?.error || "Failed to send message"

      toast.error(serverError)
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-muted-foreground">
          Have a project in mind or just want to say hi? Feel free to reach out
          through the form below or connect via my digital channels.
        </p>
      </div>

      <hr className="border-border" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
        {/* 60% Section: Contact Form */}
        <div className="lg:col-span-6">
          <ContactForm onSuccess={handleSendMessage} />
        </div>

        {/* 40% Section: Socials & Map */}
        <div className="space-y-8 lg:col-span-4">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Connect & Follow
            </h2>

            <StaggerWrapper className="space-y-4">
              {socialLinks.map((link) => (
                <StaggerItem key={link.title}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-md border bg-card p-4 shadow-sm transition-colors hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted transition-colors group-hover:text-primary">
                      <link.icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium">{link.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {link.description}
                      </p>
                    </div>

                    <ArrowUpRightIcon className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </StaggerItem>
              ))}
            </StaggerWrapper>
          </section>

          <MapSection />
        </div>
      </div>
    </section>
  )
}
