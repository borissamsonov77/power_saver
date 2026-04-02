import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  return buildMetadata({
    title: locale === 'uk' ? 'Про нас' : 'About Us',
    description: locale === 'uk'
      ? 'PowerBackup Guide — незалежний ресурс про резервне живлення для домівок і бізнесу в Україні та Європі'
      : 'PowerBackup Guide — independent resource on backup power solutions for homes and businesses in Ukraine and Europe',
    locale: locale as Locale,
    slug: 'about',
  });
}

export default function AboutPage({ params }: Props) {
  const { locale } = params;
  const uk = locale === 'uk';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {uk ? 'Про PowerBackup Guide' : 'About PowerBackup Guide'}
      </h1>

      <div className="prose prose-gray max-w-none">
        {uk ? (
          <>
            <p>
              <strong>PowerBackup Guide</strong> — незалежний інформаційний ресурс про резервне живлення
              для житлових і комерційних об'єктів. Ми розробляємо практичні гайди, огляди обладнання
              та готові рішення для людей, які стикаються з відключеннями електрики.
            </p>

            <h2>Для кого цей сайт?</h2>
            <ul>
              <li>Мешканці міст і сіл України, що стикаються з відключеннями</li>
              <li>Власники малого бізнесу (кафе, магазини, офіси)</li>
              <li>Люди, що готуються до переїзду або вже живуть в Євросоюзі</li>
              <li>Всі, хто хоче забезпечити базовий рівень автономії</li>
            </ul>

            <h2>Наші принципи</h2>
            <ul>
              <li><strong>Перевірені факти</strong> — кожна стаття містить посилання на відкриті джерела</li>
              <li><strong>Незалежна думка</strong> — ми не рекламуємо обладнання без реальних даних</li>
              <li><strong>Безпека понад усе</strong> — будь-яка інструкція супроводжується попередженнями про електробезпеку</li>
              <li><strong>Двомовність</strong> — весь контент доступний українською та англійською</li>
            </ul>

            <h2>Монетизація та прозорість</h2>
            <p>
              Сайт містить партнерські посилання (affiliate links). Дохід від партнерських посилань
              допомагає підтримувати ресурс. Це не впливає на об'єктивність оглядів — ми ніколи не
              рекомендуємо товари, які вважаємо непридатними для читачів.
            </p>
            <p>
              Детальніше про це — у нашій&nbsp;
              <a href={`/${locale}/affiliate-disclosure`}>партнерській угоді</a>.
            </p>

            <h2>Контакт</h2>
            <p>
              Питання, виправлення, пропозиції для огляду? Пишіть на email:{' '}
              <a href="mailto:hello@powerbackup.guide">hello@powerbackup.guide</a>
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>PowerBackup Guide</strong> is an independent information resource on backup power
              solutions for residential and commercial properties. We create practical guides, equipment
              reviews, and ready-made solutions for people dealing with power outages.
            </p>

            <h2>Who Is This For?</h2>
            <ul>
              <li>Residents of Ukraine's cities and villages affected by scheduled outages</li>
              <li>Small business owners (cafés, shops, offices)</li>
              <li>People preparing for or already living in the EU</li>
              <li>Anyone wanting a basic level of energy autonomy</li>
            </ul>

            <h2>Our Principles</h2>
            <ul>
              <li><strong>Verified facts</strong> — every article links to open sources</li>
              <li><strong>Independent opinion</strong> — we do not promote equipment without real data</li>
              <li><strong>Safety first</strong> — all electrical instructions carry safety warnings</li>
              <li><strong>Bilingual</strong> — all content is available in Ukrainian and English</li>
            </ul>

            <h2>Monetization &amp; Transparency</h2>
            <p>
              This site contains affiliate links. Revenue from affiliate links helps sustain the resource.
              This does not affect the objectivity of our reviews — we never recommend products we consider
              unsuitable for our readers.
            </p>
            <p>
              See our&nbsp;
              <a href={`/${locale}/affiliate-disclosure`}>affiliate disclosure</a> for details.
            </p>

            <h2>Contact</h2>
            <p>
              Questions, corrections, review suggestions? Email us:{' '}
              <a href="mailto:hello@powerbackup.guide">hello@powerbackup.guide</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
