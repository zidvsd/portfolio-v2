"use client"

import Link from "next/link"
import BlogCard from "./blog/BlogCard"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { deleteBlogAction } from "@/lib/services/blogs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BlogAdminCard({ blog }: { blog: any }) {
  const router = useRouter()

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting post...")

    try {
      const res = await deleteBlogAction(blog._id)

      if (res.success) {
        toast.success("Blog deleted successfully", { id: toastId })
        router.refresh()
      } else {
        toast.error(res.message || "Delete failed", { id: toastId })
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId })
    }
  }

  return (
    <div className="group relative w-full">
      <BlogCard blog={blog} />

      {/* Admin Action Overlay */}
      <div className="pointer-events-none absolute top-3 right-3 z-10 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        {/* EDIT BUTTON */}
        <Link href={`/studio/blogs/edit/${blog._id}`}>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 border border-border/50 bg-background/80 shadow-xl backdrop-blur-sm"
          >
            <PencilSimpleIcon size={18} weight="bold" />
          </Button>
        </Link>

        {/* DELETE DIALOG */}
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              size="icon"
              variant="secondary"
              className="hover-utility h-9 w-9 border border-destructive/50 bg-destructive/10 text-destructive shadow-xl backdrop-blur-sm transition-all hover:bg-destructive hover:text-white"
            >
              <TrashIcon size={18} weight="bold" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this post?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground italic">
                  "{blog.title}"
                </span>
                ? This action cannot be undone and will remove the cover image
                from storage.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
