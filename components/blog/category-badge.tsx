import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Category } from "@/types/sanity"

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <Badge
      asChild
      variant="outline"
      className="h-auto border-primary/30 bg-primary/8 px-3 py-1 text-xs text-primary hover:bg-primary/15 transition-colors"
    >
      <Link href={`/category/${category.slug}`}>{category.title}</Link>
    </Badge>
  )
}

export function CategoryBadgeList({
  categories,
}: {
  categories: Category[] | null
}) {
  if (!categories?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <CategoryBadge key={cat._id} category={cat} />
      ))}
    </div>
  )
}
