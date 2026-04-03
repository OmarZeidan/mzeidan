import Image from "next/image"
import { Post } from "@/types/sanity"
import { urlForImage } from "@/sanity/lib/image"
import { CategoryBadgeList } from "./category-badge"
import { PostBreadcrumb } from "./post-breadcrumb"
import { formatDateArabic } from "@/lib/format-date"
import { estimateReadingTime } from "@/lib/reading-time"
import { WavyDivider } from "@/components/layout/wavy-divider"

export function PostHeader({ post }: { post: Post }) {
  const imageUrl = post.featuredImage
    ? urlForImage(post.featuredImage).width(1400).height(900).url()
    : null

  const readingMinutes = estimateReadingTime(post.body)
  const arabicMinutes = readingMinutes.toLocaleString("ar-EG")
  const firstCategory = post.categories?.[0]

  return (
    <section aria-label="رأس المقال" className="bg-surface">
      <WavyDivider className="text-background" />

      <div className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Details — right in RTL */}
          <div className="flex flex-col gap-5">
            <PostBreadcrumb
              title={post.title}
              firstCategory={firstCategory}
            />

            <CategoryBadgeList categories={post.categories} />

            <h1 className="font-heading text-4xl leading-tight font-bold tracking-tight text-foreground md:text-6xl md:leading-[1.15]">
              {post.title}
            </h1>

            <div className="inline-flex w-fit flex-wrap items-center gap-2 rounded-full bg-background/60 px-4 py-2 text-sm text-foreground/70">
              <time dateTime={post.publishedAt}>
                {formatDateArabic(post.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>
                <span dir="ltr" className="inline">
                  {arabicMinutes}
                </span>{" "}
                دقيقة للقراءة
              </span>
            </div>
          </div>

          {/* Image — left in RTL */}
          {imageUrl ? (
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <Image
                src={imageUrl}
                alt={post.featuredImage.alt}
                width={1400}
                height={900}
                priority
                className="h-full w-full object-cover"
                placeholder="blur"
                blurDataURL={post.featuredImage.asset.metadata.lqip}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : null}
        </div>
      </div>

    </section>
  )
}
