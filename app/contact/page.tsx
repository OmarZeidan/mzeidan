import type { Metadata } from "next"
import { SkipLink } from "@/components/layout/skip-link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ContactForm } from "@/components/contact/contact-form"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { siteConfig } from "@/lib/site-config"
import {
  EnvelopeIcon,
  XLogoIcon,
  LinkedinLogoIcon,
  ChatCircleDotsIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { socialLinks } from "@/lib/social-links"

export const metadata: Metadata = {
  title: "تواصل معي",
  description: "تواصل مع محمّد زيدان — أسعد بكل رسالة أو سؤال أو فكرة.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact`,
    title: "تواصل معي",
    description: "تواصل مع محمّد زيدان — أسعد بكل رسالة أو سؤال أو فكرة.",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
}

const socialIcons: Record<string, React.ReactNode> = {
  x: <XLogoIcon aria-hidden="true" className="size-5" />,
  linkedin: <LinkedinLogoIcon aria-hidden="true" className="size-5" />,
}

export default function ContactPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">

        {/* Hero */}
        <section aria-label="تواصل" className="bg-surface">
          <WavyDivider className="text-background" />
          <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
            <div className="max-w-xl">
              <p className="mb-3 text-sm font-medium text-primary">تواصل</p>
              <h1 className="font-heading mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                أسعد بسماعك
              </h1>
              <p className="text-lg leading-8 text-foreground/70">
                سواء كانت فكرة، سؤالاً، أو مجرد تحية — الرسائل مفتوحة دائماً.
              </p>
            </div>
          </div>
        </section>

        {/* Form + side info */}
        <section className="bg-white px-6 pt-12 pb-20 dark:bg-card md:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_320px] md:gap-16">

            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Side info */}
            <aside aria-label="معلومات التواصل" className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <EnvelopeIcon aria-hidden="true" className="size-4 text-primary" />
                  البريد الإلكتروني
                </div>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="break-all text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.author.email}
                </a>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">على الشبكات الاجتماعية</p>
                <ul role="list" className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {socialIcons[link.id]}
                        {link.href.replace("https://", "")}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <Alert className="border-border/60 bg-muted/40">
                <ChatCircleDotsIcon aria-hidden="true" />
                <AlertDescription>
                  أحرص على الرد على كل رسالة، وإن تأخّر الرد أحياناً.
                </AlertDescription>
              </Alert>
            </aside>

          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}
