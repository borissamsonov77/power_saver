import { defineRouting } from 'next-intl/routing'

export type Locale = 'uk' | 'en';

export const routing = defineRouting({
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
  pathnames: {
    '/': '/',
    '/emergency': '/emergency',
    '/guides': '/guides',
    '/guides/[slug]': '/guides/[slug]',
    '/reviews': '/reviews',
    '/reviews/[slug]': '/reviews/[slug]',
    '/solutions': '/solutions',
    '/solutions/home': '/solutions/home',
    '/solutions/business': '/solutions/business',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/about': '/about',
    '/affiliate-disclosure': '/affiliate-disclosure',
    '/editorial-policy': '/editorial-policy',
  },
})
