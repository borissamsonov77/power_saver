import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getContentBySlug, getAllReviews } from '@/lib/mdx';
import { buildMetadata, reviewJsonLd } from '@/lib/seo';
import SourceList from '@/components/blocks/SourceList';
import SafetyWarning from '@/components/blocks/SafetyWarning';
import AffiliateButton from '@/components/blocks/AffiliateButton';
import ComparisonTable from '@/components/blocks/ComparisonTable';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const reviews = await getAllReviews(params.locale as Locale);
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = params;
  const item = await getContentBySlug(locale as Locale, 'reviews', slug);
  if (!item) return {};
  return buildMetadata({
    title: item.meta.title,
    description: item.meta.description,
    locale: locale as Locale,
    slug: `reviews/${slug}`,
    section: 'reviews',
    ogImage: item.meta.image,
  });
}

const mdxComponents = {
  SafetyWarning,
  AffiliateButton,
  ComparisonTable,
};

export default async function ReviewSlugPage({ params }: Props) {
  const { locale, slug } = params;
  const [item, t, tCommon] = await Promise.all([
    getContentBySlug(locale as Locale, 'reviews', slug),
    getTranslations({ locale, namespace: 'reviews' }),
    getTranslations({ locale, namespace: 'common' }),
  ]);
  if (!item) notFound();

  const { meta, content } = item;

  const jsonLd = reviewJsonLd({
    productName: meta.title,
    rating: meta.rating ?? 8,
    reviewBody: meta.description,
    author: meta.author,
    url: `/${locale}/reviews/${slug}`,
  });

  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-6">
        <Link href={`/${locale}/reviews`} className="text-sm text-blue-600 hover:underline">
          {t('all_reviews')}
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{meta.title}</h1>
        <p className="text-gray-600 mb-4">{meta.description}</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{meta.date.slice(0, 10)}</span>
            <span>·</span>
            <span>{meta.author}</span>
            {meta.readTime && <><span>·</span><span>{meta.readTime}</span></>}
          </div>
          {meta.rating && (
            <span className="bg-amber-100 text-amber-800 font-bold text-sm px-3 py-1 rounded-full">
              ★ {meta.rating}/10
            </span>
          )}
        </div>
        {meta.buy_url && (
          <div className="mt-5">
            <AffiliateButton href={meta.buy_url} label={t('buy')} />
          </div>
        )}
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
