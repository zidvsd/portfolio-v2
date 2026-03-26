"use client"
import ContactForm from "@/components/ContactForm"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { ContactSchema } from "@/lib/schema"
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
        <div className="space-y-6 lg:col-span-4">
          {/* Social Links */}
          <div className="rounded-xl border border-white/5 bg-white/2 p-6">
            <h3 className="mb-4 text-xs font-black tracking-widest text-muted-foreground/70 uppercase">
              Connect with me
            </h3>
            {/* Your Social Icons/Links go here */}
          </div>

          {/* Embed Gmaps */}
          <div className="aspect-square overflow-hidden rounded-xl border border-white/5 bg-white/2 lg:aspect-auto lg:h-75">
            {/* Your iframe or Google Maps component goes here */}
            <div className="flex h-full w-full items-center justify-center bg-blue-500/5 text-blue-500/20">
              Google Maps Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
