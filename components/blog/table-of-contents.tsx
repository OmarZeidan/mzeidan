"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { type Heading } from "@/lib/extract-headings"

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  useEffect(() => {
    if (!headings.length) return

    const observers: IntersectionObserver[] = []

    headings.forEach(({ key }) => {
      const el = document.getElementById(key)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveKey(key)
        },
        { rootMargin: "-10% 0px -75% 0px" }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [headings])

  if (!headings.length) return null

  return (
    <nav aria-label="جدول المحتويات">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        المحتويات
      </p>
      <ul role="list" className="space-y-1.5">
        {headings.map(({ key, text, level }) => (
          <li key={key}>
            <a
              href={`#${key}`}
              aria-current={activeKey === key ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById(key)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={cn(
                "block text-[13px] leading-snug transition-colors duration-150",
                level === 2 && "pe-0 ps-3",
                activeKey === key
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
