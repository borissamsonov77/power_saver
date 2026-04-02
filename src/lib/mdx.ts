import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export type Locale = 'uk' | 'en'

export interface Source {
  text: string
  url: string
  accessed: string
}

export interface ContentMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: 'guide' | 'review' | 'solution' | 'blog' | 'page'
  tags: string[]
  locale: Locale
  sources: Source[]
  image?: string
  readTime?: string
  // Review-specific
  rating?: number
  price_uah?: number
  equipment_category?: string
  buy_url?: string
}

export interface ContentItem {
  meta: ContentMeta
  content: string
}

function contentDir(locale: Locale, type: string): string {
  return path.join(process.cwd(), 'src', 'content', locale, type)
}

function readAll(locale: Locale, type: string): ContentMeta[] {
  const dir = contentDir(locale, type)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        author: data.author ?? 'PowerBackup Guide Editorial',
        category: data.category ?? type,
        tags: data.tags ?? [],
        locale: data.locale ?? locale,
        sources: data.sources ?? [],
        image: data.image,
        readTime: readingTime(raw).text,
        rating: data.rating,
        price_uah: data.price_uah,
        equipment_category: data.equipment_category,
        buy_url: data.buy_url,
      } as ContentMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getAllGuides(locale: Locale): Promise<ContentMeta[]> {
  return readAll(locale, 'guides')
}

export async function getAllReviews(locale: Locale): Promise<ContentMeta[]> {
  return readAll(locale, 'reviews')
}

export async function getAllSolutions(locale: Locale): Promise<ContentMeta[]> {
  return readAll(locale, 'solutions')
}

export async function getContentBySlug(
  locale: Locale,
  type: string,
  slug: string
): Promise<ContentItem | null> {
  const dir = contentDir(locale, type)
  const filePath = path.join(dir, `${slug}.mdx`)
  const fallback = path.join(dir, `${slug}.md`)
  const fp = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!fp) return null

  const raw = fs.readFileSync(fp, 'utf-8')
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      ...data,
      readTime: readingTime(raw).text,
    } as ContentMeta,
    content,
  }
}
