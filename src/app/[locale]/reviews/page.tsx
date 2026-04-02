import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getAllReviews } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'reviews' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    slug: 'reviews',
    section: 'reviews',
  });
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = params;
  const reviews = await getAllReviews(locale as Locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ReviewsHeader />
      {reviews.length === 0 ? (
        <p className="text-gray-500 mt-8">Огляди незабаром з'являться.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <Link
              key={review.slug}
              href={`/${locale}/reviews/${review.slug}`}
              className="border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {review.image && (
                <div className="mb-4 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={review.image} alt={review.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{review.description}</p>
              <div className="flex items-center justify-between text-sm">
                {review.rating && (
                  <span className="text-amber-500 font-semibold">★ {review.rating}/10</span>
                )}
                {locale === 'uk' && review.price_uah && (
                  <span className="text-gray-500">≈ {review.price_uah.toLocaleString()} грн</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsHeader() {
  const t = useTranslations('reviews');
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('title')}</h1>
      <p className="text-gray-600">{t('subtitle')}</p>
    </div>
  );
}
