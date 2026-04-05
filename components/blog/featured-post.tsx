import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { PostCard } from "@/types/sanity"
import { urlForImage } from "@/sanity/lib/image"
import { CategoryBadgeList } from "./category-badge"
import { formatDateArabic } from "@/lib/format-date"
import { WavyDivider } from "@/components/layout/wavy-divider"

export function FeaturedPost({ post, showBadge = true }: { post: PostCard; showBadge?: boolean }) {
  const imageUrl = post.featuredImage
    ? urlForImage(post.featuredImage).width(1200).height(800).url()
    : null

  return (
    <section aria-label="المقال المميز" className="bg-surface">
      <WavyDivider className="text-background" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
        <div className="group relative grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:items-center md:gap-12 md:p-10">

          {/* Content — right column in RTL */}
          <div className="space-y-4">
            {showBadge && (
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                المقال المميز
              </p>
            )}

            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>

            <time
              dateTime={post.publishedAt}
              className="block text-sm text-foreground/70"
            >
              {formatDateArabic(post.publishedAt)}
            </time>

            <CategoryBadgeList categories={post.categories} />

            <p className="text-base leading-7 text-foreground/80 md:text-lg">
              {post.excerpt}
            </p>

            <div className="pt-2" aria-hidden="true">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                اقرأ المقال
                <ArrowLeftIcon className="size-4" />
              </span>
            </div>
          </div>

          {/* Image — left column in RTL */}
          {imageUrl && (
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={imageUrl}
                alt={post.featuredImage.alt ?? ""}
                width={1200}
                height={800}
                priority
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                placeholder="blur"
                blurDataURL={post.featuredImage.asset.metadata.lqip}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
