"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  ChatTeardropDotsIcon,
  XIcon,
  PaperPlaneRightIcon,
} from "@phosphor-icons/react"
import axios from "axios"
import { Button } from "./ui/button"
interface Message {
  role: "user" | "ai"
  content: string
}

export default function ChatToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const { data } = await axios.post("/api/chat", { message: input })
      if (data.text) {
        setMessages((prev) => [...prev, { role: "ai", content: data.text }])
      }
    } catch (error) {
      console.error("Chat Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I'm having trouble connecting right now.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex h-112 w-80 animate-in flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl duration-300 slide-in-from-bottom-5 fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight">
                AI Assistant
              </span>
              <div
                className={`h-2 w-2 rounded-full ${isLoading ? "animate-pulse bg-blue-500" : "bg-green-500"}`}
              />
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="hover:text-foreground"
            >
              <XIcon size={18} />
            </Button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-4 text-sm"
          >
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                Yo! I'm Zid, I'm probably deep into a project or chasing a John
                Mayer tone right now, but my digital self is here. What's on
                your mind?
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="animate-pulse rounded-2xl bg-muted px-3 py-2 text-xs text-muted-foreground">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="flex gap-2 border-t bg-muted/10 p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            <Button
              type="submit"
              variant={"ghost"}
              disabled={isLoading || !input.trim()}
              className="text-primary transition-transform hover:scale-110 disabled:opacity-50"
            >
              <PaperPlaneRightIcon className="size-6" />
            </Button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all hover:scale-110 active:scale-90"
      >
        {isOpen ? (
          <XIcon weight="bold" size={24} />
        ) : (
          <ChatTeardropDotsIcon weight="duotone" className="size-6" />
        )}
      </Button>
    </div>
  )
}
