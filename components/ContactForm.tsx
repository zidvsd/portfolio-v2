"use client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { PaperPlaneRightIcon } from "@phosphor-icons/react/dist/ssr"
import { ContactSchema, ContactInput } from "@/lib/schemas/contact.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface ContactFormProps {
  onSuccess: (data: ContactInput) => void
}
export default function ContactForm({ onSuccess }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  })

  const onSubmit = async (data: ContactInput) => {
    // This only runs if Zod validation passes
    await onSuccess(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-sm border bg-zinc-100 p-6 shadow-md dark:bg-card"
    >
      {/* Row 1: Full Name and Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs">
            Full Name
          </label>
          <Input
            {...register("name")}
            className={`py-4 ${errors.name ? "border border-destructive" : ""}`}
            autoComplete="off"
            id="name"
            placeholder="John Doe"
            required
          />
          {errors.name && (
            <p className="text-xs font-medium text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs">
            Email Address
          </label>
          <Input
            {...register("email")}
            className={`py-4 ${errors.email ? "border border-destructive" : ""}`}
            autoComplete="off"
            id="email"
            type="email"
            placeholder="john@example.com"
            required
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs">
          Subject
        </label>
        <Input
          {...register("subject")}
          className={`py-4 ${errors.email ? "border border-destructive" : ""}`}
          autoComplete="off"
          id="subject"
          placeholder="Project Inquiry"
          required
        />
        {errors.subject && (
          <p className="text-xs font-medium text-destructive">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Row 3: Message Textbox */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs">
          Message
        </label>
        <Textarea
          {...register("message")}
          className={`resize-y py-4 ${errors.email ? "border border-destructive" : ""}`}
          autoComplete="off"
          id="message"
          placeholder="Tell me about your project..."
          rows={6}
          required
        />
        <p className="text-xs font-medium text-destructive">
          {errors.message?.message}
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full gap-4 py-4 md:w-max md:px-8"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <PaperPlaneRightIcon className="size-4" />
      </Button>
    </form>
  )
}
