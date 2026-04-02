import { MetadataRoute } from 'next';
import { getAllGuides, getAllReviews, getAllSolutions } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const LOCALES: Locale[] = ['uk', 'en'];

const STATIC_ROUTES = [
  '',
  '/emergency',
  '/guides',
  '/reviews',
  '/solutions',
  '/solutions/home',
  '/solutions/business',
  '/about',
  '/affiliate-disclosure',
  '/editorial-policy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes × locales
  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
      });
    }
  }

  // Dynamic content routes
  for (const locale of LOCALES) {
    const guides = await getAllGuides(locale);
    for (const g of guides) {
      entries.push({
        url: `${SITE_URL}/${locale}/guides/${g.slug}`,
        lastModified: new Date(g.date),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    const reviews = await getAllReviews(locale);
    for (const r of reviews) {
      entries.push({
        url: `${SITE_URL}/${locale}/reviews/${r.slug}`,
        lastModified: new Date(r.date),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    const solutions = await getAllSolutions(locale);
    for (const s of solutions) {
      entries.push({
        url: `${SITE_URL}/${locale}/solutions/${s.slug}`,
        lastModified: new Date(s.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
