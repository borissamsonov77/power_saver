import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getAllGuides } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    slug: 'guides',
    section: 'guides',
  });
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const guides = await getAllGuides(locale as Locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <GuidesHeader />
      {guides.length === 0 ? (
        <p className="text-gray-500 mt-8">Гайди незабаром з'являться.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {guides.map((guide) => (
            <li key={guide.slug} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <Link href={`/${locale}/guides/${guide.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                  {guide.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{guide.date}</span>
                  {guide.readTime && <span>{guide.readTime}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GuidesHeader() {
  const t = useTranslations('guides');
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('title')}</h1>
      <p className="text-gray-600">{t('subtitle')}</p>
    </div>
  );
}
