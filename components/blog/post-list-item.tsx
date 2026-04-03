import Image from "next/image"
import Link from "next/link"
import { PostCard } from "@/types/sanity"
import { urlForImage } from "@/sanity/lib/image"
import { CategoryBadgeList } from "./category-badge"
import { formatDateArabic } from "@/lib/format-date"

export function PostListItem({ post }: { post: PostCard }) {
  const imageUrl = post.featuredImage
    ? urlForImage(post.featuredImage).width(600).height(400).url()
    : null

  return (
    <article className="group relative flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8">
      {/* Content — RIGHT in RTL (first child) */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <CategoryBadgeList categories={post.categories} />

        <h2 className="text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base md:line-clamp-3">
          {post.excerpt}
        </p>

        <time
          dateTime={post.publishedAt}
          className="text-xs text-muted-foreground"
        >
          {formatDateArabic(post.publishedAt)}
        </time>
      </div>

      {/* Image — LEFT in RTL (second child) */}
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:w-48 sm:shrink-0 md:w-56">
          <Image
            src={imageUrl}
            alt={post.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            placeholder="blur"
            blurDataURL={post.featuredImage.asset.metadata.lqip}
            sizes="(max-width: 640px) 100vw, 224px"
          />
        </div>
      )}
    </article>
  )
}
