import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export function buildMetadata({
  title,
  description,
  locale,
  slug,
  section,
  ogImage,
}: {
  title: string
  description: string
  locale: 'uk' | 'en'
  slug?: string
  section?: string
  ogImage?: string
}): Metadata {
  const path = slug && section ? `/${locale}/${section}/${slug}` : slug ? `/${locale}/${slug}` : `/${locale}`
  const canonical = `${BASE_URL}${path}`
  const altLocale = locale === 'uk' ? 'en' : 'uk'
  const altPath = path.replace(`/${locale}/`, `/${altLocale}/`)

  return {
    title: `${title} | PowerBackup Guide`,
    description,
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [altLocale]: `${BASE_URL}${altPath}`,
      },
    },
    openGraph: {
      title: `${title} | PowerBackup Guide`,
      description,
      url: canonical,
      siteName: 'PowerBackup Guide',
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      type: 'article',
      images: [
        {
          url: ogImage ?? `${BASE_URL}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | PowerBackup Guide`,
      description,
    },
  }
}

export function articleJsonLd({
  title,
  description,
  date,
  author,
  url,
  image,
}: {
  title: string
  description: string
  date: string
  author: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'PowerBackup Guide',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    },
    ...(image ? { image } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}

export function reviewJsonLd({
  productName,
  rating,
  reviewBody,
  author,
  url,
}: {
  productName: string
  rating: number
  reviewBody: string
  author: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Product', name: productName },
    reviewRating: { '@type': 'Rating', ratingValue: rating, bestRating: 10 },
    reviewBody,
    author: { '@type': 'Person', name: author },
    url,
  }
}
