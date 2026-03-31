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

  // Split into paragraphs by double newlines
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim())

  return paragraphs
    .map((paragraph) => {
      const trimmed = paragraph.trim()

      // Handle blockquotes (starts with >)
      if (trimmed.startsWith(">")) {
        const quote = trimmed.replace(/^>\s*/, "").trim()
        const formattedQuote = formatInlineMarkdown(quote)
        return `<blockquote class="border-l-4 border-blue-500 pl-4 text-gray-600 italic">${formattedQuote}</blockquote>`
      }

      // Handle lists
      if (trimmed.startsWith("*")) {
        const items = paragraph
          .split("\n")
          .filter((line) => line.trim().startsWith("*"))
          .map((line) => {
            const item = line.replace(/^\*\s*/, "").trim()
            const formattedItem = formatInlineMarkdown(item)
            return `<li>${formattedItem}</li>`
          })

        return `<ul class="list-disc list-inside space-y-2">${items.join("")}</ul>`
      }

      // Handle ordered lists (1. 2. 3.)
      if (/^\d+\.\s/.test(trimmed)) {
        const items = paragraph
          .split("\n")
          .filter((line) => /^\d+\.\s/.test(line.trim()))
          .map((line) => {
            const item = line.replace(/^\d+\.\s*/, "").trim()
            const formattedItem = formatInlineMarkdown(item)
            return `<li>${formattedItem}</li>`
          })

        return `<ol class="list-decimal list-inside space-y-2">${items.join("")}</ol>`
      }

      // Regular paragraphs
      const formattedParagraph = formatInlineMarkdown(trimmed)
      return `<p class="leading-relaxed">${formattedParagraph}</p>`
    })
    .join("")
}

/**
 * Format inline markdown elements within text
 * - **text** → <strong>text</strong>
 * - *text* → <em>text</em>
 */
function formatInlineMarkdown(text: string): string {
  // Bold: **text** → <strong>text</strong>
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

  // Italic: *text* → <em>text</em> (but not if it's part of bold)
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>")

  // Handle line breaks within paragraphs
  text = text.replace(/\n/g, "<br />")

  return text
}
