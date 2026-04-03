import { XLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr"
import { socialLinks, type SocialLinkId } from "@/lib/social-links"
import { Button } from "@/components/ui/button"

const socialIcons: Record<SocialLinkId, React.ReactNode> = {
  x: <XLogoIcon aria-hidden="true" className="size-5" />,
  linkedin: <LinkedinLogoIcon aria-hidden="true" className="size-5" />,
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-muted py-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">

        <div className="space-y-2">
          <div className="font-heading flex items-center gap-2 text-xl font-bold md:text-2xl">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary/70 md:size-2.5" />
            <span>محمّد زيدان</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-foreground/70 md:text-base">
            مدوّنة شخصية لمشاركة أفكار وتأمّلات في الفلسفة واللغة والثقافة العربية.
          </p>
          <p className="text-xs text-foreground/50 md:text-sm">
            © {currentYear} محمّد زيدان. جميع الحقوق محفوظة.
          </p>
        </div>

        <nav aria-label="روابط التواصل الاجتماعي">
          <ul className="flex items-center gap-1" role="list">
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
        </nav>

      </div>
    </footer>
  )
}
