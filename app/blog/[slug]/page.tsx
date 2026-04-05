import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SkipLink } from "@/components/layout/skip-link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PostHeader } from "@/components/blog/post-header"
import { PostBody } from "@/components/blog/post-body"
import { ShareButtons } from "@/components/blog/share-buttons"
import { EditPostButton } from "@/components/blog/edit-post-button"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { sanityFetch } from "@/sanity/lib/fetch"
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries"
import { Post } from "@/types/sanity"
import { extractHeadings } from "@/lib/extract-headings"
import { siteConfig } from "@/lib/site-config"
import { urlForImage } from "@/sanity/lib/image"

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ admin?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  })

  if (!post) return {}

  const postUrl = `${siteConfig.url}/blog/${slug}`
  const ogImage = post.featuredImage
    ? urlForImage(post.featuredImage).width(1200).height(630).fit("crop").url()
    : undefined
  const categories = post.categories?.map((c) => c.title) ?? []

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [siteConfig.author.name],
      tags: categories,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.author.x,
      creator: siteConfig.author.x,
      title: post.title,
      description: post.excerpt,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
  })
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function PostPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { admin } = await searchParams
  const isAdmin = admin === "1" || process.env.NODE_ENV === "development"

  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  })

  if (!post) notFound()

  const headings = extractHeadings(post.body)
  const postUrl = `${siteConfig.url}/blog/${slug}`
  const ogImage = post.featuredImage
    ? urlForImage(post.featuredImage).width(1200).height(630).fit("crop").url()
    : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    inLanguage: "ar",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
      sameAs: [siteConfig.author.xUrl, siteConfig.author.linkedinUrl],
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    ...(ogImage && { image: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630 } }),
    ...(post.categories?.length && { keywords: post.categories.map((c) => c.title).join(", ") }),
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
        <PostHeader post={post} />

        <section className="bg-white px-4 pt-10 pb-16 dark:bg-card md:px-8 md:pt-14 md:pb-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[300px_1fr] md:gap-10">

            {/* Sidebar — right in RTL */}
            <aside
              aria-label="التنقل في المقال"
              className="hidden space-y-6 lg:block lg:sticky lg:top-24 lg:self-start"
            >
              {headings.length > 0 && (
                <div className="rounded-2xl border border-border bg-background p-5">
                  <TableOfContents headings={headings} />
                </div>
              )}
              <div>
                <p className="mb-3 text-sm font-bold text-foreground">
                  شارك المقال
                </p>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </aside>

            {/* Article body */}
            <article>
              {post.excerpt && (
                <p className="mb-10 rounded-2xl border border-border bg-background/40 p-5 text-lg leading-8 text-foreground/80 md:text-xl">
                  {post.excerpt}
                </p>
              )}
              <PostBody body={post.body} />

              {/* Share on mobile */}
              <div className="lg:hidden">
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </article>

          </div>
        </section>
      </main>
      <SiteFooter />
      {isAdmin && <EditPostButton id={post._id} />}
    </>
  )
}
