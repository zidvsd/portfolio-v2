"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation" // Added for redirection
import { toast } from "sonner"
import {
  PaperPlaneTiltIcon,
  ChatCenteredSlashIcon,
  SignInIcon,
} from "@phosphor-icons/react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import { EmptyState } from "@/components/EmptyState"
import Image from "next/image"
import { Message } from "@/lib/types/chat"
import StaggerWrapper from "@/components/motion/StaggerWrapper"
import { StaggerItem } from "@/components/motion/StaggerItem"

export default function ChatSection({ user }: { user: any }) {
  const router = useRouter() // Initialize router
  const [messages, setMessages] = useState<Message[]>([])
  const [textInput, setTextInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/comments?type=global")
        setMessages(res.data)
      } catch (err: any) {
        console.error(
          "Fetch comments error:",
          err?.response?.data || err.message
        )
        toast.error("Failed to load messages")
      } finally {
        setIsLoading(false)
      }
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!textInput.trim()) return

    setIsSending(true)
    try {
      const res = await axios.post("/api/comments", {
        content: textInput,
        type: "global",
      })

      setMessages((prev) => [...prev, res.data])
      setTextInput("")
    } catch (err) {
      toast.error("Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-150 w-full flex-col overflow-scroll overflow-x-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/30 p-4">
        <h3 className="text-sm font-semibold tracking-tight">
          Global Chatroom
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <SkeletonLoader variant="chat" />
        ) : messages.length === 0 ? (
          <div className="flex h-full max-w-full items-center justify-center">
            <EmptyState
              title="No messages Found"
              description="Be the first to say something!"
              icon={<ChatCenteredSlashIcon size={32} weight="duotone" />}
            />
          </div>
        ) : (
          <StaggerWrapper className="space-y-4">
            {messages.map((msg) => (
              <StaggerItem key={msg._id}>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                    {msg.author?.image ? (
                      <Image
                        src={msg.author.image.replace("http://", "https://")}
                        alt={msg.author?.name || "User"}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium">
                        {msg.author?.name?.[0]?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">
                        {msg.author?.name || "Unknown"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-1 rounded-lg rounded-tl-none bg-muted px-3 py-2 text-sm">
                      {msg.content}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
            <div ref={scrollRef} />
          </StaggerWrapper>
        )}
      </ScrollArea>

      <form
        onSubmit={handlePostComment}
        className="flex gap-2 border-t bg-background p-4"
      >
        {user ? (
          <>
            <Input
              placeholder="Type a message..."
              value={textInput}
              autoComplete="off"
              onChange={(e) => setTextInput(e.target.value)}
              disabled={isSending}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isSending || !textInput.trim()}
            >
              <PaperPlaneTiltIcon
                size={18}
                weight="bold"
                className={isSending ? "animate-pulse" : ""}
              />
            </Button>
          </>
        ) : (
          <div className="flex w-full items-center gap-4 rounded-lg border border-border bg-linear-to-br from-muted/50 to-muted/30 p-4 backdrop-blur-sm">
            <div className="flex shrink-0 items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <SignInIcon className="size-5 text-primary" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                Join the conversation
              </p>
              <p className="text-xs text-muted-foreground">
                Sign in to share your thoughts
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                onClick={() => router.push("/login")}
                variant="default"
                size="sm"
              >
                Sign In
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/signup")}
                variant="outline"
                size="sm"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
