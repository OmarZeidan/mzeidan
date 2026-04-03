export type SocialLinkId = "x" | "linkedin"

export interface SocialLink {
  id: SocialLinkId
  href: string
  ariaLabel: string
}

export const socialLinks: SocialLink[] = [
  {
    id: "x",
    href: "https://x.com/mszeidan",
    ariaLabel: "محمّد زيدان على منصة إكس",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/mohammad-zeidan-06945321/",
    ariaLabel: "محمّد زيدان على لينكدإن",
  },
]
