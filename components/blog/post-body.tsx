import { PortableText, type PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr"
import { urlForImage } from "@/sanity/lib/image"
import { PortableTextBlock } from "@/types/sanity"

function YouTubeEmbed({ url, caption }: { url: string; caption?: string }) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (!match) return null
  const videoId = match[1]

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={caption ?? "فيديو يوتيوب"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-sm text-foreground/70">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlForImage(value).width(1400).fit("max").url()
      const lqip = value.asset.metadata?.lqip

      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={imageUrl}
            alt={value.alt ?? ""}
            width={1400}
            height={900}
            className="h-auto w-full object-cover"
            placeholder={lqip ? "blur" : undefined}
            blurDataURL={lqip}
          />
          {value.caption && (
            <figcaption className="px-4 py-3 text-sm text-foreground/70">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    youtube: ({ value }) => (
      <YouTubeEmbed url={value.url} caption={value.caption} />
    ),
  },
  block: {
    // h1 in body renders as h2 to preserve heading hierarchy
    h1: ({ value, children }) => (
      <h2
        id={value?._key}
        className="font-heading mt-12 mb-5 scroll-mt-24 text-3xl font-bold leading-tight md:text-4xl"
      >
        {children}
      </h2>
    ),
    h2: ({ value, children }) => (
      <h2
        id={value?._key}
        className="font-heading mt-12 mb-5 scroll-mt-24 text-3xl font-bold leading-tight md:text-4xl"
      >
        {children}
      </h2>
    ),
    h3: ({ value, children }) => (
      <h3
        id={value?._key}
        className="font-heading mt-10 mb-4 scroll-mt-24 text-2xl font-bold leading-tight md:text-3xl"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 text-xl font-semibold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-7 text-lg leading-9 text-foreground/90 md:text-[1.19rem]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-10 p-6 pt-10 text-lg leading-9 text-foreground/90">
        <QuotesIcon
          aria-hidden="true"
          className="absolute top-3 start-4 size-8 text-primary/40"
        />
        <div className="inline [box-decoration-break:clone] rounded-sm bg-primary/10 px-1 py-0.5">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-2 ps-6 text-lg text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 ps-6 text-lg text-foreground/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-8">{children}</li>,
    number: ({ children }) => <li className="leading-8">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const isExternal = value?.href && !value.href.startsWith("/")
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {children}
        </a>
      )
    },
  },
}

export function PostBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div>
      <PortableText value={body} components={components} />
    </div>
  )
}
