/**
 * Parse markdown-style content to HTML
 * Handles:
 * - \n\n for paragraphs
 * - **text** for bold
 * - > text for blockquotes
 * - * text for unordered lists
 */

export function parseMarkdownContent(content: string): string {
  if (!content) return ""

  // Normalize line endings
  const lines = content.split("\n")
  const blocks: string[] = []
  let buffer: string[] = []

  const flushBuffer = () => {
    if (buffer.length > 0) {
      blocks.push(buffer.join("\n"))
      buffer = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (
      trimmed.startsWith(">") ||
      trimmed.startsWith("*") ||
      /^\d+\.\s/.test(trimmed)
    ) {
      flushBuffer()
      blocks.push(line)
    } else if (trimmed === "") {
      flushBuffer()
    } else {
      buffer.push(line)
    }
  }

  flushBuffer()

  return blocks
    .filter((b) => b.trim())
    .map((paragraph) => {
      const trimmed = paragraph.trim()

      if (trimmed.startsWith(">")) {
        const quote = trimmed.replace(/^>\s*/, "").trim()
        return `<blockquote class="border-l-4 border-blue-500 pl-4 text-gray-600 italic my-4">${formatInlineMarkdown(quote)}</blockquote>`
      }

      if (trimmed.startsWith("*")) {
        const items = paragraph
          .split("\n")
          .filter((line) => line.trim().startsWith("*"))
          .map((line) => {
            const item = line.replace(/^\*\s*/, "").trim()
            return `<li>${formatInlineMarkdown(item)}</li>`
          })
        return `<ul class="list-disc list-inside space-y-2">${items.join("")}</ul>`
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const items = paragraph
          .split("\n")
          .filter((line) => /^\d+\.\s/.test(line.trim()))
          .map((line) => {
            const item = line.replace(/^\d+\.\s*/, "").trim()
            return `<li>${formatInlineMarkdown(item)}</li>`
          })
        return `<ol class="list-decimal list-inside space-y-2">${items.join("")}</ol>`
      }

      return `<p class="leading-relaxed">${formatInlineMarkdown(trimmed)}</p>`
    })
    .join("")
}

function formatInlineMarkdown(text: string): string {
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
  text = text.replace(/\n/g, "<br />")
  return text
}
