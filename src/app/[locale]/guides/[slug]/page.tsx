import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getContentBySlug, getAllGuides } from '@/lib/mdx';
import { buildMetadata, articleJsonLd } from '@/lib/seo';
import SourceList from '@/components/blocks/SourceList';
import SafetyWarning from '@/components/blocks/SafetyWarning';
import AffiliateButton from '@/components/blocks/AffiliateButton';
import ComparisonTable from '@/components/blocks/ComparisonTable';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const guides = await getAllGuides(params.locale as Locale);
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = params;
  const item = await getContentBySlug(locale as Locale, 'guides', slug);
  if (!item) return {};
  return buildMetadata({
    title: item.meta.title,
    description: item.meta.description,
    locale: locale as Locale,
    slug: `guides/${slug}`,
    section: 'guides',
    ogImage: item.meta.image,
  });
}

const mdxComponents = {
  SafetyWarning,
  AffiliateButton,
  ComparisonTable,
};

export default async function GuideSlugPage({ params }: Props) {
  const { locale, slug } = params;
  const [item, t, tCommon] = await Promise.all([
    getContentBySlug(locale as Locale, 'guides', slug),
    getTranslations({ locale, namespace: 'guides' }),
    getTranslations({ locale, namespace: 'common' }),
  ]);
  if (!item) notFound();

  const { meta, content } = item;

  const jsonLd = articleJsonLd({
    title: meta.title,
    description: meta.description,
    date: meta.date,
    author: meta.author,
    url: `/${locale}/guides/${slug}`,
  });

  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-6">
        <Link href={`/${locale}/guides`} className="text-sm text-blue-600 hover:underline">
          {t('all_guides')}
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{meta.title}</h1>
        <p className="text-gray-600 mb-4">{meta.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{meta.date.slice(0, 10)}</span>
          <span>{meta.author}</span>
          {meta.readTime && <span>{meta.readTime}</span>}
        </div>
      </header>

      <div className="prose prose-gray max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {meta.sources?.length > 0 && (
        <SourceList sources={meta.sources} note={tCommon('sources_note')} />
      )}
    </article>
  );
}
