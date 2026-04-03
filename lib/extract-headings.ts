import { PortableTextBlock } from "@/types/sanity"

export interface Heading {
  key: string
  text: string
  level: 1 | 2
}

export function extractHeadings(body: PortableTextBlock[]): Heading[] {
  return body
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h1" || block.style === "h2")
    )
    .map((block) => ({
      key: block._key,
      text: block.children?.map((c) => c.text ?? "").join("") ?? "",
      level: (block.style === "h1" ? 1 : 2) as 1 | 2,
    }))
    .filter((h) => h.text.trim().length > 0)
}
