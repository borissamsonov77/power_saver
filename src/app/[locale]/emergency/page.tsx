import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import SafetyWarning from '@/components/blocks/SafetyWarning';
import SourceList from '@/components/blocks/SourceList';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'emergency' });
  return buildMetadata({
    title: t('title'),
    description: t('step1_desc'),
    locale: locale as Locale,
    slug: 'emergency',
  });
}

const EMERGENCY_SOURCES = [
  {
    text: 'ДТЕК — графіки відключень / DTEK — outage schedules',
    url: 'https://www.dtek.com/outages',
    accessed: '2024-01-15',
  },
  {
    text: 'Держенергоефективності — рекомендації при відключеннях',
    url: 'https://saee.gov.ua',
    accessed: '2024-01-15',
  },
  {
    text: 'Червоний Хрест України — посібник з екстреної підготовки',
    url: 'https://redcross.org.ua',
    accessed: '2024-01-15',
  },
  {
    text: 'FEMA — Food Safety During a Power Outage',
    url: 'https://www.ready.gov/power-outages',
    accessed: '2024-01-15',
  },
  {
    text: 'WHO — Candle safety and alternatives',
    url: 'https://www.who.int/docs/default-source/documents/publications/occupational-health/occupational-health-5th-print.pdf',
    accessed: '2024-01-15',
  },
];

interface StepCardProps {
  number: number;
  title: string;
  desc: string;
  urgent?: boolean;
}

function StepCard({ number, title, desc, urgent }: StepCardProps) {
  return (
    <div className={`flex gap-4 p-5 rounded-xl border-l-4 ${urgent ? 'border-red-500 bg-red-50' : 'border-amber-400 bg-amber-50'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${urgent ? 'bg-red-500 text-white' : 'bg-amber-400 text-gray-900'}`}>
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function EmergencySteps() {
  const t = useTranslations('emergency');

  const steps = [
    { titleKey: 'step1_title', descKey: 'step1_desc', urgent: true },
    { titleKey: 'step2_title', descKey: 'step2_desc' },
    { titleKey: 'step3_title', descKey: 'step3_desc', urgent: true },
    { titleKey: 'step4_title', descKey: 'step4_desc' },
    { titleKey: 'step5_title', descKey: 'step5_desc' },
  ] as const;

  return (
    <div className="space-y-4 my-8">
      {steps.map((step, i) => (
        <StepCard
          key={step.titleKey}
          number={i + 1}
          title={t(step.titleKey)}
          desc={t(step.descKey)}
          urgent={'urgent' in step ? step.urgent : undefined}
        />
      ))}
    </div>
  );
}

export default function EmergencyPage({ params }: Props) {
  const { locale } = params;
  const t = useTranslations('emergency');
  const common = useTranslations('common');

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-4">
        <span className="inline-block bg-red-100 text-red-700 font-semibold text-sm px-3 py-1 rounded-full">
          ⚡ {t('title')}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>

      <SafetyWarning>{common('safety_warning')}</SafetyWarning>

      <EmergencySteps />

      <div className="mt-10 p-5 bg-blue-50 rounded-xl border border-blue-200">
        <h2 className="font-semibold text-blue-900 mb-3">{t('what_next')}</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/${locale}/guides`} className="flex-1 text-center bg-white border border-blue-300 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
            {t('guides_link')} →
          </Link>
          <Link href={`/${locale}/solutions`} className="flex-1 text-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            {t('solutions_link')} →
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <SourceList sources={EMERGENCY_SOURCES} note={common('sources_note')} />
      </div>
    </div>
  );
}
