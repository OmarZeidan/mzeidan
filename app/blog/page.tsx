import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import {
  ALL_POSTS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  ALL_CATEGORIES_QUERY,
} from "@/sanity/lib/queries"
import { PostCard, Category } from "@/types/sanity"
import { PostListItem } from "@/components/blog/post-list-item"
import { SkipLink } from "@/components/layout/skip-link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Props {
  searchParams: Promise<{ category?: string }>
}

export const metadata = {
  title: "المقالات",
  description: "جميع مقالات محمّد زيدان",
}

export default async function BlogPage({ searchParams }: Props) {
  const { category: categorySlug } = await searchParams

  const [posts, categories] = await Promise.all([
    sanityFetch<PostCard[]>({
      query: categorySlug ? POSTS_BY_CATEGORY_QUERY : ALL_POSTS_QUERY,
      params: categorySlug ? { categorySlug } : {},
      tags: ["post"],
    }),
    sanityFetch<Category[]>({
      query: ALL_CATEGORIES_QUERY,
      tags: ["category"],
    }),
  ])

  const activeCategory = categories.find((c) => c.slug === categorySlug)

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-6 py-14 outline-none"
      >
        {/* Page header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            الأرشيف
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {activeCategory ? activeCategory.title : "المقالات"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {posts.length === 0
              ? "لا توجد مقالات"
              : posts.length === 1
                ? "مقال واحد"
                : `${posts.length.toLocaleString("ar-EG")} مقالات`}
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            <Link href="/blog">
              <Badge
                variant={!categorySlug ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 text-xs transition-colors"
              >
                الكل
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat._id} href={`/blog?category=${cat.slug}`}>
                <Badge
                  variant={cat.slug === categorySlug ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1 text-xs transition-colors"
                >
                  {cat.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        <Separator className="mb-2" />

        {/* Post list */}
        {posts.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            لا توجد مقالات في هذا التصنيف
          </p>
        ) : (
          <div>
            {posts.map((post, index) => (
              <div key={post._id}>
                <PostListItem post={post} />
                {index < posts.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
