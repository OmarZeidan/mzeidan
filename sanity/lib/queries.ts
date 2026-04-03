import { groq } from "next-sanity"

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  isFeatured,
  featuredImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt,
    hotspot,
    crop
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`

export const FEATURED_POST_QUERY = groq`
  *[_type == "post" && isFeatured == true][0]{
    ${POST_CARD_FIELDS}
  }
`

export const LATEST_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6]{
    ${POST_CARD_FIELDS}
  }
`

export const POST_SLUGS_QUERY = groq`
  *[_type == "post"]{ "slug": slug.current, publishedAt }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_CARD_FIELDS},
    body,
    _updatedAt
  }
`

export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc){
    ${POST_CARD_FIELDS}
  }
`

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
    ${POST_CARD_FIELDS}
  }
`

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current
  }
`
