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
    title: locale === 'uk' ? 'Резервне живлення для дому і квартири' : 'Backup Power for Home & Apartment',
    description: locale === 'uk'
      ? 'Готові рішення резервного живлення для квартири та будинку — три бюджетних рівні від мінімального до автономного'
      : 'Ready backup power solutions for apartments and homes — three budget tiers from minimal to autonomous',
    locale: locale as Locale,
    slug: 'solutions/home',
    section: 'solutions',
  });
}

const TIERS_UK = [
  {
    id: 'min',
    label: 'Мінімальний',
    badge: '💰',
    budget: 'до 5 000 грн',
    items: [
      { name: 'Powerbank 20 000 мАг (напр. Anker 737)', note: 'заряджає телефон 5-7 разів' },
      { name: 'Налобний ліхтар з USB-зарядкою', note: 'тривалість роботи 10+ год' },
      { name: 'Роутер на PoE або власному акумуляторі', note: 'інтернет 4-8 год без світла' },
    ],
    desc: 'Забезпечує зв\'язок, освітлення і зарядку телефону при відключеннях до 8 годин.',
  },
  {
    id: 'mid',
    label: 'Оптимальний',
    badge: '⚡',
    budget: '15 000 – 30 000 грн',
    items: [
      { name: 'Зарядна станція 500-1000 Вт·год (напр. EcoFlow RIVER 2 Pro)', note: 'ноутбук + освітлення + роутер ~8-12 год' },
      { name: 'LED лампи з акумулятором', note: 'автономне освітлення без розетки' },
      { name: 'UPS для роутера (мін. 1 год)', note: 'миттєве переключення' },
    ],
    desc: 'Підтримує "цифровий офіс" (ноутбук, інтернет, телефон) і освітлення до 12 годин.',
  },
  {
    id: 'adv',
    label: 'Автономія',
    badge: '🔋',
    budget: '50 000+ грн',
    items: [
      { name: 'Зарядна станція 2000+ Вт·год (напр. EcoFlow DELTA Pro)', note: 'холодильник + ноутбук + освітлення' },
      { name: 'Сонячні панелі 200-400 Вт', note: 'поповнення від сонця за 6-8 год' },
      { name: 'Перехідник Smart Transfer Switch', note: 'автоматичне переключення живлення' },
    ],
    desc: 'Повна автономія на 24+ год навіть при тривалих відключеннях. Підходить для будинку.',
  },
];

const TIERS_EN = [
  {
    id: 'min',
    label: 'Minimal',
    badge: '💰',
    budget: 'under $130',
    items: [
      { name: '20,000 mAh powerbank (e.g. Anker 737)', note: 'charges phone 5-7 times' },
      { name: 'USB rechargeable headlamp', note: '10+ hours runtime' },
      { name: 'PoE or battery-backed router', note: '4-8 hours internet without power' },
    ],
    desc: 'Keeps you connected, lit up, and phone-charged during outages up to 8 hours.',
  },
  {
    id: 'mid',
    label: 'Optimal',
    badge: '⚡',
    budget: '$400 – $800',
    items: [
      { name: '500-1000 Wh power station (e.g. EcoFlow RIVER 2 Pro)', note: 'laptop + lights + router ~8-12 hours' },
      { name: 'Battery-backup LED lights', note: 'autonomous lighting without outlet' },
      { name: 'UPS for router (min. 1 hour)', note: 'instant switchover' },
    ],
    desc: 'Supports a "digital office" (laptop, internet, phone) and lighting for up to 12 hours.',
  },
  {
    id: 'adv',
    label: 'Autonomous',
    badge: '🔋',
    budget: '$1,300+',
    items: [
      { name: '2000+ Wh power station (e.g. EcoFlow DELTA Pro)', note: 'fridge + laptop + lighting' },
      { name: '200-400W solar panels', note: 'recharge from sun in 6-8 hours' },
      { name: 'Smart Transfer Switch', note: 'automatic power switchover' },
    ],
    desc: 'Full 24+ hour autonomy even during prolonged outages. Ideal for houses with yards.',
  },
];

const SOURCES_UK: Source[] = [
  {
    text: 'EcoFlow — офіційні характеристики RIVER 2 Pro і DELTA Pro',
    url: 'https://www.ecoflow.com/products/delta-pro-portable-power-station',
    accessed: '2024-01-20',
  },
  {
    text: 'Anker — Powerbank 737 технічні характеристики',
    url: 'https://www.anker.com/products/anker-737-power-bank',
    accessed: '2024-01-20',
  },
  {
    text: 'Wirecutter — Best Portable Power Stations',
    url: 'https://www.nytimes.com/wirecutter/reviews/best-portable-power-stations/',
    accessed: '2024-01-20',
  },
  {
    text: 'ДТЕК — графіки відключень 2024',
    url: 'https://www.dtek.com/outages',
    accessed: '2024-01-20',
  },
  {
    text: 'Enerhiya.ua — огляди зарядних станцій для України',
    url: 'https://enerhiya.ua',
    accessed: '2024-01-20',
  },
];

const SOURCES_EN: Source[] = [
  {
    text: 'EcoFlow — official specs for RIVER 2 Pro and DELTA Pro',
    url: 'https://www.ecoflow.com/products/delta-pro-portable-power-station',
    accessed: '2024-01-20',
  },
  {
    text: 'Anker — Powerbank 737 specifications',
    url: 'https://www.anker.com/products/anker-737-power-bank',
    accessed: '2024-01-20',
  },
  {
    text: 'Wirecutter — Best Portable Power Stations',
    url: 'https://www.nytimes.com/wirecutter/reviews/best-portable-power-stations/',
    accessed: '2024-01-20',
  },
  {
    text: 'DTEK — outage schedules 2024 (Ukraine)',
    url: 'https://www.dtek.com/outages',
    accessed: '2024-01-20',
  },
];

export default async function HomeSolutionsPage({ params }: Props) {
  const { locale } = params;
  const tiers = locale === 'uk' ? TIERS_UK : TIERS_EN;
  const sources = locale === 'uk' ? SOURCES_UK : SOURCES_EN;
  const heading = locale === 'uk' ? 'Резервне живлення для дому і квартири' : 'Backup Power for Home & Apartment';
  const subheading = locale === 'uk'
    ? 'Три рівні готовності — обирайте під свій бюджет і потреби'
    : 'Three preparedness tiers — choose by your budget and needs';

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
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tier.badge}</span>
                <h2 className="text-xl font-bold text-gray-900">{tier.label}</h2>
              </div>
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                {tier.budget}
              </span>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-600 text-sm mb-4">{tier.desc}</p>
              <ul className="space-y-3">
                {tier.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-gray-500 ml-1">— {item.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-sm text-amber-800">
          ⚠️ {locale === 'uk'
            ? 'Підключення генераторів та інверторів до домашньої мережі вимагає кваліфікованого електрика.'
            : 'Connecting generators and inverters to home wiring requires a qualified electrician.'}
        </p>
      </div>

      <div className="mt-8">
        <SourceList sources={sources} />
      </div>
    </div>
  );
}
