"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpenTextIcon, XLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { socialLinks, type SocialLinkId } from "@/lib/social-links"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"

const socialIcons: Record<SocialLinkId, React.ReactNode> = {
  x: <XLogoIcon aria-hidden="true" className="size-5" />,
  linkedin: <LinkedinLogoIcon aria-hidden="true" className="size-5" />,
}

export function SiteHeader() {
  const pathname = usePathname()
  const isBlogActive = pathname.startsWith("/blog")
  const isContactActive = pathname === "/contact"

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

          {/* Brand + nav */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-heading flex items-center gap-2 rounded-sm text-xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-2xl"
              aria-label="الصفحة الرئيسية — محمّد زيدان"
            >
              <span aria-hidden="true" className="hidden size-2 rounded-full bg-primary/70 md:inline-block" />
              <span>محمّد زيدان</span>
            </Link>

            <BookOpenTextIcon aria-hidden="true" className="hidden size-4 text-muted-foreground md:block" />

            <nav aria-label="التنقل الرئيسي">
              <ul className="flex items-center gap-5 text-sm font-medium" role="list">
                <li>
                  <Link
                    href="/blog"
                    aria-current={isBlogActive ? "page" : undefined}
                    className={cn(
                      "rounded-sm px-1 py-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      isBlogActive
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    المقالات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    aria-current={isContactActive ? "page" : undefined}
                    className={cn(
                      "rounded-sm px-1 py-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      isContactActive
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    تواصل
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social links + theme toggle */}
          <ul className="flex items-center gap-1" aria-label="الروابط الاجتماعية" role="list">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <Button asChild size="icon" variant="ghost">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                  >
                    {socialIcons[link.id]}
                  </a>
                </Button>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>

        </div>
      </header>
      <div aria-hidden="true" className="h-[73px]" />
    </>
  )
}
