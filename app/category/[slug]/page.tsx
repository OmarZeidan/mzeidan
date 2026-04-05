import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import {
  CATEGORY_BY_SLUG_QUERY,
  ALL_CATEGORIES_QUERY,
  POSTS_BY_CATEGORY_QUERY,
} from "@/sanity/lib/queries"
import { PostCard, Category } from "@/types/sanity"
import { PostListItem } from "@/components/blog/post-list-item"
import { SkipLink } from "@/components/layout/skip-link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await sanityFetch<Category[]>({
    query: ALL_CATEGORIES_QUERY,
    tags: ["category"],
  })
  return categories.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await sanityFetch<Category | null>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: [`category:${slug}`],
  })
  if (!category) return {}
  return {
    title: category.title,
    description: `جميع مقالات تصنيف ${category.title}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const [category, posts, categories] = await Promise.all([
    sanityFetch<Category | null>({
      query: CATEGORY_BY_SLUG_QUERY,
      params: { slug },
      tags: [`category:${slug}`],
    }),
    sanityFetch<PostCard[]>({
      query: POSTS_BY_CATEGORY_QUERY,
      params: { categorySlug: slug },
      tags: ["post"],
    }),
    sanityFetch<Category[]>({
      query: ALL_CATEGORIES_QUERY,
      tags: ["category"],
    }),
  ])

  if (!category) notFound()

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
            التصنيف
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {category.title}
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
                variant="outline"
                className="cursor-pointer px-3 py-1 text-xs transition-colors"
              >
                الكل
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat._id} href={`/category/${cat.slug}`}>
                <Badge
                  variant={cat.slug === slug ? "default" : "outline"}
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
