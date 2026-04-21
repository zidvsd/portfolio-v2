"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChatCenteredSlashIcon, SignInIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import { EmptyState } from "@/components/EmptyState"
import Image from "next/image"
import { Message } from "@/lib/types/chat"
import StaggerWrapper from "@/components/motion/StaggerWrapper"
import { StaggerItem } from "@/components/motion/StaggerItem"
import { IUser } from "@/lib/types/user"
import { ChatCircleIcon } from "@phosphor-icons/react"
import { formatTime, formatDate } from "@/lib/utils"

interface BlogCommentSectionProps {
  user: IUser[] | null | any
  blogId: string
}

export default function BlogCommentSection({
  user,
  blogId,
}: BlogCommentSectionProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [textInput, setTextInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments?blogId=${blogId}&type=blog`)
        setMessages(res.data)
      } catch (err: any) {
        console.error("Fetch blog comments error:", err.message)
        toast.error("Failed to load comments")
      } finally {
        setIsLoading(false)
      }
    }
    if (blogId) fetchComments()
  }, [blogId])

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!textInput.trim()) return

    setIsSending(true)
    try {
      const res = await axios.post("/api/comments", {
        content: textInput,
        blogId: blogId,
        type: "blog",
      })

      setMessages((prev) => [res.data, ...prev])
      setTextInput("")
      toast.success("Comment posted!")
    } catch (err) {
      toast.error("Failed to post comment")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="w-full space-y-6 py-10">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-bold tracking-tight">
          Comments ({messages.length})
        </h3>
        <ChatCircleIcon className="size-6" />
      </div>
      <hr className="border-border" />

      {/* Comment Input Section */}
      {user ? (
        <form onSubmit={handlePostComment} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted">
              {user?.image ? (
                <Image
                  src={user.image.replace("http://", "https://")}
                  alt="User"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold">
                  {user?.name?.[0] || "?"}
                </div>
              )}
            </div>
            <Textarea
              placeholder="Write a comment..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={isSending}
              className="min-h-25 resize-none focus-visible:ring-1"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSending || !textInput.trim()}
              className="p-4"
            >
              {isSending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-lg border border-border bg-linear-to-br from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <SignInIcon className="size-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">
                Join the Discussion
              </h4>
              <p className="text-sm text-muted-foreground">
                Sign in to share your thoughts and join our community
              </p>
            </div>
            <div className="flex w-full gap-3 sm:w-auto sm:flex-row">
              <Button
                onClick={() => router.push("/login")}
                variant="default"
                className="flex-1 sm:flex-none"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <SkeletonLoader variant="chat" />
        ) : messages.length === 0 ? (
          <EmptyState
            title="No comments yet"
            description="Start the conversation!"
            icon={<ChatCenteredSlashIcon className="size-12" />}
          />
        ) : (
          <StaggerWrapper className="space-y-6">
            {messages.map((msg) => (
              <StaggerItem key={msg._id}>
                <div className="group flex gap-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted">
                    {msg.author?.image ? (
                      <Image
                        src={msg.author.image.replace("http://", "https://")}
                        alt={msg.author.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold">
                        {msg.author?.name?.[0] || "?"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="text-base font-bold">
                        {msg.author?.name || "Unknown"}
                      </span>

                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(msg.createdAt)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          at
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerWrapper>
        )}
      </div>
    </div>
  )
}
