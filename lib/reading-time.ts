import { PortableTextBlock } from "@/types/sanity"

export function estimateReadingTime(blocks: PortableTextBlock[]): number {
  const text = blocks
    .filter((block) => block._type === "block" && block.children)
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join(" ")

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const wordsPerMinute = 250 // adjusted for Arabic readers
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function formatReadingTime(minutes: number): string {
  const arabicMinutes = minutes.toLocaleString("ar-EG")
  return `${arabicMinutes} دقيقة للقراءة`
}
