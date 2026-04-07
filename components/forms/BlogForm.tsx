"use client"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { CloudArrowUpIcon } from "@phosphor-icons/react"
import { useForm, Controller } from "react-hook-form"
import { BlogFormData, BlogSchema } from "@/lib/schemas/blog.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "../ui/checkbox"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
export default function BlogForm({
  onSubmit,
}: {
  onSubmit: (data: FormData) => Promise<void>
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "", 
      slug: "",
      description: "", 
      content: "",
      tags: "",
      isPublished: true,
      isFeatured: false,
    },
  })

  const handleFormSubmit = async (values: BlogFormData) => {
    const formData = new FormData()

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0])
    }

    const documentData = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      content: values.content,
      category: values.category,
      tags: values.tags.split(",").map((t) => t.trim()),
      isFeatured: values.isFeatured,
      isPublished: values.isPublished,
    }

    formData.append("document", JSON.stringify(documentData))
    await onSubmit(formData)
  }
  const onInvalid = (errors: any) => {
    console.error("Form Validation Errors:", errors)
    toast.error("Please fix the errors in the form.")
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
      className="space-y-6 rounded-sm border bg-zinc-100 p-6 shadow-md dark:bg-card"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Title
          </label>
          <Input
            {...register("title")}
            placeholder="My First Post"
            className={
              errors.title
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.title && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full justify-start rounded-md border border-input bg-input/20 px-4 py-1 text-left text-sm dark:bg-input/30">
                  {field.value || "Select Category"}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => field.onChange("Development")}
                    >
                      Development
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => field.onChange("Gaming")}>
                      Gaming
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => field.onChange("Music")}>
                      Music
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => field.onChange("General")}>
                      General
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
          {errors.category && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Slug */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Slug
          </label>
          <Input
            {...register("slug")}
            placeholder="blog-post-url"
            className={
              errors.slug
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.slug && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Cover Image
          </label>
          <Input
            {...register("image")}
            type="file"
            accept="image/*"
            className={`cursor-pointer ${errors.image ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.image && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.image.message as string}
            </p>
          )}
        </div>
      </div>
      {/* Short Description - Add this before Tags */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase">
          Short Description
        </label>
        <Input
          {...register("description")}
          placeholder="A brief summary for the blog card..."
          className={
            errors.description
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {errors.description && (
          <p className="text-[10px] font-medium text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>
      {/* Tags */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase">
          Tags
        </label>
        <Input
          {...register("tags")}
          placeholder="nextjs, tutorial"
          className={
            errors.tags
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {errors.tags && (
          <p className="text-[10px] font-medium text-destructive">
            {errors.tags.message}
          </p>
        )}
      </div>

      {/* Booleans */}
      <div className="flex gap-8 py-2">
        <div className="flex items-center gap-2">
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <span className="text-sm">Featured Post</span>
        </div>
        <div className="flex items-center gap-2">
          <Controller
            name="isPublished"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <span className="text-sm">Publish Immediately</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase">
          Content
        </label>
        <Textarea
          {...register("content")}
          rows={12}
          placeholder="Write Markdown here..."
          className={
            errors.content
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {errors.content && (
          <p className="text-[10px] font-medium text-destructive">
            {errors.content.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full gap-4 py-6 md:w-max md:px-10"
      >
        {isSubmitting ? "Uploading..." : "Save Blog"}
        <CloudArrowUpIcon className="size-5" />
      </Button>
    </form>
  )
}
