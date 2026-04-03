export interface SanityImageAsset {
  _id: string
  url: string
  metadata: {
    lqip: string
    dimensions: { width: number; height: number; aspectRatio: number }
  }
}

export interface SanityImage {
  asset: SanityImageAsset
  alt: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface Category {
  _id: string
  title: string
  slug: string
}

export interface PostCard {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  isFeatured: boolean
  featuredImage: SanityImage
  categories: Category[] | null
}

export type PortableTextBlock = {
  _type: string
  _key: string
  children?: Array<{ _key: string; _type: string; text?: string; marks?: string[] }>
  style?: string
  listItem?: string
}

export interface Post extends PostCard {
  body: PortableTextBlock[]
  _updatedAt: string
}
