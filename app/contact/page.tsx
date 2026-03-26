"use client"
import ContactForm from "@/components/ContactForm"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { ContactSchema } from "@/lib/schema"
import {
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  ArrowUpRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react"
import { formatDate } from "@/lib/utils"
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
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    const result = ContactSchema.safeParse(payload)
    if (!result.success) {
      setIsLoading(false)

      const firstError = result.error.issues[0]
      const errorMessage = firstError.message
      return toast.error("Check your input", { description: errorMessage })
    }
    try {
      const res = await axios.post("/api/contact", result.data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.status === 200 || res.status === 201) {
        setStatus("success")
        ;(e.target as HTMLFormElement).reset() // Clear the form on success
        toast.success("Successfully sent the message")
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      setStatus("error")
      setIsLoading(false)
      const serverError =
        error.response?.data?.error || "Failed to send message"
      toast.error(serverError)
    } finally {
      setIsLoading(false)
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
          <ContactForm isLoading={isLoading} onSubmit={handleSubmit} />
        </div>

        {/* 40% Section: Socials & Google Maps */}
        <div className="space-y-8 lg:col-span-4">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Connect & Follow
            </h2>
            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <div
                  key={link.title}
                  className="hover-utility flex items-center justify-between rounded-md border bg-zinc-100 p-2 shadow-md transition-colors hover:bg-white/5 dark:bg-card"
                >
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
              ))}
            </div>
          </section>

          {/* Social Icons/Links go here */}

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">
              Based in
            </h2>
            {/* Embed Gmaps */}
            <div className="relative aspect-square overflow-hidden rounded-md border bg-zinc-100 shadow-md lg:aspect-auto lg:h-75 dark:bg-card">
              {/* 1. The Glass Shield: Prevents all clicking/interaction */}
              <div className="absolute inset-0 z-20 cursor-default bg-transparent" />
              {/* 1. The Gradient Overlay - place right inside the parent <form> */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 rounded-b-sm bg-linear-to-t from-zinc-100 via-zinc-100/50 to-transparent dark:from-card dark:via-card/70 dark:to-transparent" />
              {/* 2. The Map with Scaling: Pushes "Open in Maps" outside the box */}
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123652.7533860528!2d121.04273033502932!3d14.215264879590885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6268802956cf%3A0x6a05367664320984!2sCalamba%2C%20Laguna!5e0!3m2!1sen!2sph!4v1709212345678!5m2!1sen!2sph"
                width="100%"
                height="100%"
                className="scale-[1.3] opacity-75 contrast-[1.2] grayscale invert-[0.9]"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
              {/* Location with time */}
              <div className="absolute bottom-2 left-2 z-30 flex items-center gap-3 rounded-lg bg-transparent p-2 pr-4">
                {/* Icon Container */}
                <div className="flex size-10 items-center justify-center rounded-full bg-muted-foreground text-white shadow-inner">
                  <MapPinIcon className="size-5 fill-white" weight="fill" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col text-foreground/80">
                  <span className="tracking-wide">Laguna, Philippines</span>
                  <span className="text-xs tracking-widest uppercase">
                    Local Time:
                    {new Date().toLocaleTimeString("en-US", {
                      timeZone: "Asia/Manila",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }) + " PHT"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
