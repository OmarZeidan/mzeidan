import Image from "next/image"
import Link from "next/link"
import { PostCard as PostCardType } from "@/types/sanity"
import { urlForImage } from "@/sanity/lib/image"
import { CategoryBadgeList } from "./category-badge"
import { formatDateArabic } from "@/lib/format-date"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function PostCard({ post }: { post: PostCardType }) {
  const imageUrl = post.featuredImage
    ? urlForImage(post.featuredImage).width(800).height(600).url()
    : null

  return (
    <Card className="relative pt-0 shadow-none transition-shadow hover:shadow-md">
      {imageUrl && (
        <div className="relative aspect-4/3 overflow-hidden rounded-t-4xl">
          <Image
            src={imageUrl}
            alt={post.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
            placeholder="blur"
            blurDataURL={post.featuredImage.asset.metadata.lqip}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader className="gap-2.5">
        <CategoryBadgeList categories={post.categories} />
        <CardTitle className="text-lg leading-snug font-semibold">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors outline-none after:absolute after:inset-0 hover:text-primary focus-visible:underline focus-visible:decoration-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <time
          dateTime={post.publishedAt}
          className="text-xs text-muted-foreground"
        >
          {formatDateArabic(post.publishedAt)}
        </time>
      </CardFooter>
    </Card>
  )
}
