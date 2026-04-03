import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow social crawlers to read OG tags
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      // Block all search engine indexing
      { userAgent: "*", disallow: "/" },
    ],
  }
}
