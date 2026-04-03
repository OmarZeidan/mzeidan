import Image from "next/image"
import Link from "next/link"
import {
  XLogoIcon,
  LinkedinLogoIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react/dist/ssr"
import { socialLinks, type SocialLinkId } from "@/lib/social-links"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"

const socialIcons: Record<SocialLinkId, React.ReactNode> = {
  x: <XLogoIcon aria-hidden="true" className="size-5" />,
  linkedin: <LinkedinLogoIcon aria-hidden="true" className="size-5" />,
}

export function AuthorSection() {
  return (
    <section
      id="contact"
      aria-labelledby="author-heading"
      className="bg-surface"
    >
      <WavyDivider className="text-background" />

      <div className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          {/* Photo — right column in RTL */}
          <div className="flex justify-center md:justify-start">
            <div className="relative size-48 overflow-hidden rounded-3xl shadow-md ring-4 ring-background md:size-64">
              <Image
                src="/person.jpg"
                alt="صورة محمّد زيدان"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          </div>

          {/* Content — left column in RTL */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary">عن الكاتب</p>

            <h2
              id="author-heading"
              className="text-3xl leading-tight font-extrabold tracking-tight md:text-4xl"
            >
              محمّد زيدان
            </h2>

            <p className="max-w-xl text-base leading-7 text-foreground/80 md:text-lg">
              كاتب ومفكّر مهتمّ بالفلسفة واللغة والثقافة العربية. أكتب عن
              الأفكار التي تشكّل طريقة تفكيرنا في العالم، وأسعى إلى تقديم محتوى
              يجمع بين العمق والوضوح.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/blog"
                className="group flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                كل المقالات
                <ArrowLeftIcon
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-x-1"
                />
              </Link>

              <ul
                className="flex items-center gap-1"
                aria-label="روابط التواصل الاجتماعي"
                role="list"
              >
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
