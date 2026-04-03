import type { Metadata } from "next"
import { SkipLink } from "@/components/layout/skip-link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { FeaturedPost } from "@/components/blog/featured-post"
import { PostGrid } from "@/components/blog/post-grid"
import { AuthorSection } from "@/components/sections/author-section"
import { sanityFetch } from "@/sanity/lib/fetch"
import { FEATURED_POST_QUERY, LATEST_POSTS_QUERY } from "@/sanity/lib/queries"
import { siteConfig } from "@/lib/site-config"
import type { PostCard } from "@/types/sanity"

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    url: siteConfig.url,
  },
}

export default async function HomePage() {
  const [featuredPost, latestPosts] = await Promise.all([
    sanityFetch<PostCard | null>({
      query: FEATURED_POST_QUERY,
      tags: ["featured-post"],
    }),
    sanityFetch<PostCard[]>({
      query: LATEST_POSTS_QUERY,
      tags: ["latest-posts"],
    }),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "ar",
        author: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.author.name,
        url: siteConfig.url,
        sameAs: [siteConfig.author.xUrl, siteConfig.author.linkedinUrl],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : (
          <p className="py-24 text-center text-muted-foreground">
            لا توجد مقالات مميزة بعد.
          </p>
        )}
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <PostGrid posts={latestPosts} />
        </div>
        <AuthorSection />
      </main>
      <SiteFooter />
    </>
  )
}
