import type { Metadata } from "next"
import Link from "next/link"
import { SkipLink } from "@/components/layout/skip-link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none flex min-h-[60vh] items-center justify-center px-6 py-24"
      >
        <div className="text-center space-y-6 max-w-md">
          <p className="text-8xl font-bold text-primary/20 font-heading leading-none">٤٠٤</p>
          <h1 className="text-2xl font-bold text-foreground">
            الصفحة غير موجودة
          </h1>
          <p className="text-base text-foreground/60 leading-7">
            يبدو أن هذه الصفحة لا وجود لها أو أنها نُقلت إلى مكان آخر.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              العودة للرئيسية
              <ArrowLeftIcon aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              تصفّح المقالات
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
