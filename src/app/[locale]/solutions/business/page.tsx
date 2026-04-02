import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import SourceList from '@/components/blocks/SourceList';
import type { Locale } from '@/i18n/routing';
import type { Source } from '@/lib/mdx';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  return buildMetadata({
    title: locale === 'uk' ? 'Резервне живлення для бізнесу' : 'Backup Power for Business',
    description: locale === 'uk'
      ? 'Рішення безперебійної роботи для кафе, магазинів, офісів та малого бізнесу під час відключень електрики'
      : 'Uninterrupted operation solutions for cafes, shops, offices and small businesses during power outages',
    locale: locale as Locale,
    slug: 'solutions/business',
    section: 'solutions',
  });
}

const BUSINESS_TIERS_UK = [
  {
    id: 'small',
    label: 'Мікро-бізнес',
    examples: 'кіоск, барбершоп, невелике кафе',
    badge: '☕',
    budget: '20 000 – 50 000 грн',
    items: [
      { name: 'УБЖ/ІБП 1500–3000 ВА', note: 'каса, ПК, модем — 2-4 год' },
      { name: 'Зарядна станція 1000 Вт·год', note: 'освітлення + заряджання' },
      { name: 'LED-освітлення з акумулятором', note: 'аварійне освітлення' },
    ],
    warning: 'Для підключення будь-якого обладнання до існуючої мережі зверніться до ліцензованого електрика.',
  },
  {
    id: 'medium',
    label: 'Малий бізнес',
    examples: 'кафе 30+ місць, магазин, офіс',
    badge: '🏪',
    budget: '100 000 – 200 000 грн',
    items: [
      { name: 'Генератор 5-10 кВт (інверторний)', note: 'тиха робота, стабільна напруга' },
      { name: 'АВР (автоматичне введення резерву)', note: 'переключення без зупинки' },
      { name: 'ІБП для ПОС-термінали і каси', note: 'миттєвий захист платіжних систем' },
      { name: 'Дизель/газ — уточнюйте норми пожежної безпеки', note: 'дотримуйтесь ДБН' },
    ],
    warning: 'Генератори в приміщеннях категорично заборонені. Встановлення АВР — тільки ліцензований електрик.',
  },
  {
    id: 'large',
    label: 'Середній бізнес',
    examples: 'готель, велике виробництво, бізнес-центр',
    badge: '🏨',
    budget: 'від 500 000 грн',
    items: [
      { name: 'Промисловий ДГУ (дизельний генератор)', note: '20-100 кВт залежно від навантаження' },
      { name: 'ДБЖ серверне обладнання', note: 'UPS для ІТ-інфраструктури' },
      { name: 'Аккумуляторний накопичувач (BESS)', note: 'пікова компенсація + аварійний резерв' },
    ],
    warning: 'Проектування системи резервного живлення для промислових об\'єктів потребує ліцензованого проекту.',
  },
];

const BUSINESS_TIERS_EN = [
  {
    id: 'small',
    label: 'Micro-Business',
    examples: 'kiosk, barbershop, small café',
    badge: '☕',
    budget: '$500 – $1,300',
    items: [
      { name: 'UPS 1500–3000 VA', note: 'cash register, PC, modem — 2-4 hours' },
      { name: '1000 Wh power station', note: 'lighting + device charging' },
      { name: 'Battery-backup LED lighting', note: 'emergency illumination' },
    ],
    warning: 'For connecting any equipment to the existing grid, consult a licensed electrician.',
  },
  {
    id: 'medium',
    label: 'Small Business',
    examples: 'café 30+ seats, retail store, office',
    badge: '🏪',
    budget: '$2,600 – $5,200',
    items: [
      { name: '5-10 kW inverter generator', note: 'quiet operation, stable voltage' },
      { name: 'ATS (Automatic Transfer Switch)', note: 'switchover without interruption' },
      { name: 'UPS for POS terminals and cash registers', note: 'instant protection for payment systems' },
      { name: 'Diesel/gas — verify local fire safety codes', note: 'comply with local regulations' },
    ],
    warning: 'Never run generators indoors. ATS installation requires a licensed electrician.',
  },
  {
    id: 'large',
    label: 'Medium Business',
    examples: 'hotel, light manufacturing, office building',
    badge: '🏨',
    budget: '$13,000+',
    items: [
      { name: 'Industrial diesel generator', note: '20-100 kW depending on load' },
      { name: 'Server-grade UPS', note: 'for IT infrastructure' },
      { name: 'Battery Energy Storage System (BESS)', note: 'peak compensation + emergency reserve' },
    ],
    warning: 'Industrial backup power system design requires a licensed engineering project and permits.',
  },
];

const SOURCES: Source[] = [
  {
    text: 'IEA — Electricity Supply Security Recommendations',
    url: 'https://www.iea.org/reports/maintaining-power-system-reliability',
    accessed: '2024-01-20',
  },
  {
    text: 'NFPA — Generator Safety Guidelines',
    url: 'https://www.nfpa.org/resources/home-fire-safety/generators',
    accessed: '2024-01-20',
  },
  {
    text: 'EcoFlow — commercial power solutions',
    url: 'https://www.ecoflow.com/commercial',
    accessed: '2024-01-20',
  },
  {
    text: 'Schneider Electric — ATS product guide',
    url: 'https://www.se.com/ua/uk/work/solutions/for-business/automatic-transfer-switch/',
    accessed: '2024-01-20',
  },
  {
    text: 'ДБН В.2.5-27:2006 — Захисні заходи від ураження електричним струмом (Україна)',
    url: 'https://dbn.co.ua/load/normativy/dbn/dbn_v_2_5_27/1-1-0-1006',
    accessed: '2024-01-20',
  },
];

export default async function BusinessSolutionsPage({ params }: Props) {
  const { locale } = params;
  const tiers = locale === 'uk' ? BUSINESS_TIERS_UK : BUSINESS_TIERS_EN;
  const heading = locale === 'uk' ? 'Резервне живлення для бізнесу' : 'Backup Power for Business';
  const subheading = locale === 'uk'
    ? 'Рішення для різних масштабів бізнесу — від кіоску до офісного центру'
    : 'Solutions for different business scales — from a kiosk to an office building';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href={`/${locale}/solutions`} className="text-sm text-blue-600 hover:underline">
          ← {locale === 'uk' ? 'Всі рішення' : 'All Solutions'}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{heading}</h1>
      <p className="text-gray-600 mb-10">{subheading}</p>

      <div className="space-y-8">
        {tiers.map((tier) => (
          <div key={tier.id} className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tier.badge}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{tier.label}</h2>
                  <p className="text-sm text-gray-500">{tier.examples}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                {tier.budget}
              </span>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-3 mb-4">
                {tier.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-gray-500 ml-1">— {item.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                ⚠️ {tier.warning}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SourceList sources={SOURCES} />
      </div>
    </div>
  );
}
