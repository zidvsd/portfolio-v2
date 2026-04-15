import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseISO, format, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string) {
  if (!dateString) return "—"

  try {
    const date = parseISO(dateString)
    return format(date, " MMM dd, yyyy") // e.g., "15 Nov 2025"
  } catch (err) {
    console.error("Invalid date string:", dateString)
    return dateString
  }
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const noOfWords = content.split(/\s+/).length
  return Math.ceil(noOfWords / wordsPerMinute)
}

export function capitalizeFirstChar(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
export function formatTime(dateInput: string | Date | undefined) {
  if (!dateInput) return ""

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput

  if (!isValid(date)) return "Invalid date"

  return format(date, "h:mm a")
}
