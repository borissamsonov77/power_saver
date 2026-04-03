import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return buildMetadata({
    title: t('hero_title'),
    description: t('hero_subtitle'),
    locale: locale as Locale,
    slug: '',
  });
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home');
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-amber-100 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('hero_title')}</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/emergency`}
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            {t('cta_emergency')}
          </Link>
          <Link
            href={`/${locale}/guides`}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-amber-400 transition-colors"
          >
            {t('section_guides')}
          </Link>
        </div>
      </div>
    </section>
  );
}

const NAV_SECTIONS = [
  { key: 'emergency', icon: '⚡', titleKey: 'quickEmergencyTitle', descKey: 'quickEmergencyDesc', color: 'border-red-400' },
  { key: 'guides', icon: '📖', titleKey: 'quickGuidesTitle', descKey: 'quickGuidesDesc', color: 'border-blue-400' },
  { key: 'reviews', icon: '⭐', titleKey: 'quickReviewsTitle', descKey: 'quickReviewsDesc', color: 'border-yellow-400' },
  { key: 'solutions', icon: '🏠', titleKey: 'quickSolutionsTitle', descKey: 'quickSolutionsDesc', color: 'border-green-400' },
] as const;

function QuickNavSection({ locale }: { locale: string }) {
  const t = useTranslations('home');

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('quickNavTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NAV_SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={`/${locale}/${s.key}`}
              className={`border-t-4 ${s.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white`}
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{t(s.titleKey)}</h3>
              <p className="text-gray-600 text-sm">{t(s.descKey)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const t = useTranslations('home');
  const points = ['why1', 'why2', 'why3', 'why4'] as const;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">{t('whyTitle')}</h2>
        <ul className="space-y-4">
          {points.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl mt-0.5">✓</span>
              <span className="text-gray-700">{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HomePage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  return (
    <>
      <HeroSection locale={locale} />
      <QuickNavSection locale={locale} />
      <WhyUsSection />
    </>
  );
}
