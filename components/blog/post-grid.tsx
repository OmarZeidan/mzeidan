"use client"
import Link from "next/link"
import { PostCard as PostCardType } from "@/types/sanity"
import { PostCard } from "./post-card"
import { ArrowLeftIcon } from "@phosphor-icons/react"

export function PostGrid({ posts }: { posts: PostCardType[] }) {
  if (!posts.length) return null

  return (
    <section aria-labelledby="latest-posts-heading">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">المدوّنة</p>
          <h2
            id="latest-posts-heading"
            className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
          >
            أحدث المقالات
          </h2>
        </div>

        <Link
          href="/blog"
          className="group flex shrink-0 items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          كل المقالات
          <ArrowLeftIcon
            aria-hidden="true"
            className="size-4 transition-transform group-hover:-translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
