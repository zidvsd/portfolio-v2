"use client"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { PaperPlaneRightIcon } from "@phosphor-icons/react/dist/ssr"
interface ContactFormProps {
  isLoading: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
export default function ContactForm({ onSubmit, isLoading }: ContactFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-sm border bg-zinc-100 p-6 shadow-md dark:bg-card"
    >
      {/* Row 1: Full Name and Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs">
            Full Name
          </label>
          <Input
            name="name"
            className="py-4"
            autoComplete="off"
            id="name"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs">
            Email Address
          </label>
          <Input
            name="email"
            className="py-4"
            autoComplete="off"
            id="email"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      {/* Row 2: Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs">
          Subject
        </label>
        <Input
          name="subject"
          className="py-4"
          autoComplete="off"
          id="subject"
          placeholder="Project Inquiry"
          required
        />
      </div>

      {/* Row 3: Message Textbox */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs">
          Message
        </label>
        <Textarea
          name="message"
          id="message"
          placeholder="Tell me about your project..."
          rows={6}
          className="resize-y"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="flex w-full gap-4 py-4 md:w-max md:px-8"
      >
        {isLoading ? "Sending..." : "Send Message"}
        <PaperPlaneRightIcon className="size-4" />
      </Button>
    </form>
  )
}
