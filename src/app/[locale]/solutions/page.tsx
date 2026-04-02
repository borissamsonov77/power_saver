import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    slug: 'solutions',
    section: 'solutions',
  });
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = params;
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SolutionsHeader />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <HomeSolutionsCard locale={locale} />
        <BusinessSolutionsCard locale={locale} />
      </div>
    </div>
  );
}

function SolutionsHeader() {
  const t = useTranslations('solutions');
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('title')}</h1>
      <p className="text-gray-600">{t('subtitle')}</p>
    </div>
  );
}

function HomeSolutionsCard({ locale }: { locale: string }) {
  const t = useTranslations('solutions');
  return (
    <Link
      href={`/${locale}/solutions/home`}
      className="border-t-4 border-green-400 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="text-4xl mb-3">🏠</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('for_home')}</h2>
      <p className="text-gray-600 text-sm mb-4">{t('home_desc')}</p>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{t('budget_min')}</span>
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{t('budget_mid')}</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{t('budget_adv')}</span>
      </div>
    </Link>
  );
}

function BusinessSolutionsCard({ locale }: { locale: string }) {
  const t = useTranslations('solutions');
  return (
    <Link
      href={`/${locale}/solutions/business`}
      className="border-t-4 border-blue-400 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="text-4xl mb-3">🏢</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('for_business')}</h2>
      <p className="text-gray-600 text-sm mb-4">{t('business_desc')}</p>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{t('budget_min')}</span>
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{t('budget_mid')}</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{t('budget_adv')}</span>
      </div>
    </Link>
  );
}
