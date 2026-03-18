import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseISO, format } from "date-fns"

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
