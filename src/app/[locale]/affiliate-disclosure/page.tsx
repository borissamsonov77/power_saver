import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  return buildMetadata({
    title: locale === 'uk' ? 'Партнерська угода' : 'Affiliate Disclosure',
    description: locale === 'uk'
      ? 'Інформація про партнерські посилання на PowerBackup Guide'
      : 'Information about affiliate links on PowerBackup Guide',
    locale: locale as Locale,
    slug: 'affiliate-disclosure',
  });
}

export default function AffiliateDisclosurePage({ params }: Props) {
  const { locale } = params;
  const uk = locale === 'uk';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {uk ? 'Партнерська угода (Affiliate Disclosure)' : 'Affiliate Disclosure'}
      </h1>

      <div className="prose prose-gray max-w-none">
        {uk ? (
          <>
            <p>
              Відповідно до вимог FTC (Federal Trade Commission) та стандартів прозорості в інтернеті,
              ми зобов'язані повідомити вас про таке:
            </p>

            <h2>Що таке партнерські посилання?</h2>
            <p>
              Деякі посилання на цьому сайті є партнерськими (affiliate links). Це означає, що якщо ви
              перейдете за таким посиланням і зробите покупку, ми можемо отримати невелику комісію від
              продавця — <strong>без додаткових витрат для вас</strong>.
            </p>

            <h2>З якими партнерами ми співпрацюємо?</h2>
            <ul>
              <li>Amazon Associates Program</li>
              <li>Партнерські програми виробників обладнання (EcoFlow, Anker тощо)</li>
              <li>Українські маркетплейси (Rozetka, Prom.ua)</li>
            </ul>

            <h2>Чи впливає це на наші огляди?</h2>
            <p>
              <strong>Ні.</strong> Партнерські відносини не впливають на об'єктивність наших оглядів
              та рекомендацій. Ми не рекомендуємо товар лише тому, що він приносить нам більшу комісію.
            </p>
            <p>
              Наша репутація важливіша за будь-які партнерські доходи. Якщо ми вважаємо, що товар
              не підходить для наших читачів — ми так і пишемо.
            </p>

            <h2>Як розпізнати партнерські посилання?</h2>
            <p>
              Партнерські посилання позначені кнопками "Купити" або "Перейти до магазину" та мають
              атрибути <code>rel="nofollow sponsored"</code> у коді сторінки.
            </p>
          </>
        ) : (
          <>
            <p>
              In compliance with FTC guidelines and internet transparency standards, we are required to
              disclose the following:
            </p>

            <h2>What Are Affiliate Links?</h2>
            <p>
              Some links on this site are affiliate links. This means that if you click through and make
              a purchase, we may receive a small commission from the retailer —{' '}
              <strong>at no additional cost to you</strong>.
            </p>

            <h2>Who Do We Partner With?</h2>
            <ul>
              <li>Amazon Associates Program</li>
              <li>Equipment manufacturer affiliate programs (EcoFlow, Anker, etc.)</li>
              <li>Ukrainian marketplaces (Rozetka, Prom.ua)</li>
            </ul>

            <h2>Does This Affect Our Reviews?</h2>
            <p>
              <strong>No.</strong> Affiliate relationships do not influence the objectivity of our reviews
              and recommendations. We do not recommend a product simply because it generates a higher
              commission.
            </p>
            <p>
              Our credibility matters more than any affiliate revenue. If we believe a product is not
              suitable for our readers, we say so clearly.
            </p>

            <h2>How to Identify Affiliate Links?</h2>
            <p>
              Affiliate links are marked with "Buy" or "Go to Store" buttons and carry{' '}
              <code>rel="nofollow sponsored"</code> attributes in the page source code.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
