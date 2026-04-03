export const siteConfig = {
  // Update this to your production domain before deploying
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mzeidan.com",
  name: "محمّد زيدان",
  description:
    "مدوّنة شخصية لمشاركة أفكار وتأمّلات في الفلسفة واللغة والثقافة العربية.",
  author: {
    name: "محمّد زيدان",
    email: "iam.zdeveloper@gmail.com",
    x: "@mszeidan",
    xUrl: "https://x.com/mszeidan",
    linkedinUrl: "https://www.linkedin.com/in/mohammad-zeidan-06945321/",
  },
  locale: "ar_SA",
} as const
