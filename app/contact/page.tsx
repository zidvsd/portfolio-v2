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
  MapPinIcon,
} from "@phosphor-icons/react"
import StaggerWrapper from "@/components/motion/StaggerWrapper"
import { StaggerItem } from "@/components/motion/StaggerItem"
import { ContactInput } from "@/lib/schemas/contact.schema"
const MapSection = dynamic(() => import("@/components/sections/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="h-75 w-full animate-pulse rounded-md bg-zinc-100" />
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
export default function page() {
  const handleSendMessage = async (data: ContactInput) => {
    try {
      const res = await axios.post("/api/contact", data)

      if (res.status === 200 || res.status === 201) {
        toast.success("Message sent successfully!", {
          description: "I'll get back to you as soon as possible.",
        })
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      const serverError =
        error.response?.data?.error || "Failed to send message"
      toast.error(serverError)
      throw error
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

        {/* 40% Section: Socials & Google Maps */}
        <div className="space-y-8 lg:col-span-4">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Connect & Follow
            </h2>
            {/* Social Links */}
            <StaggerWrapper className="space-y-4">
              {socialLinks.map((link) => (
                <StaggerItem key={link.title}>
                  <div className="hover-utility flex items-center justify-between rounded-md border bg-zinc-100 p-2 shadow-md transition-colors hover:bg-white/5 dark:bg-card">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-lg p-2"
                    >
                      <div className="hover-utility flex size-10 shrink-0 items-center justify-center rounded-md bg-background/70 text-accent-foreground group-hover:text-primary">
                        <link.icon className="size-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{link.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </a>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-lg p-2"
                    >
                      <ArrowUpRightIcon className="shrink-0" />
                    </a>
                  </div>
                </StaggerItem>
              ))}
            </StaggerWrapper>
          </section>

          {/* Social Icons/Links go here */}

        
            <MapSection />
  
        </div>
      </div>
    </section>
  )
}
