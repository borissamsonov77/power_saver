import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  return buildMetadata({
    title: locale === 'uk' ? 'Редакційна політика' : 'Editorial Policy',
    description: locale === 'uk'
      ? 'Як ми створюємо, перевіряємо та оновлюємо контент на PowerBackup Guide'
      : 'How we create, verify and update content on PowerBackup Guide',
    locale: locale as Locale,
    slug: 'editorial-policy',
  });
}

export default function EditorialPolicyPage({ params }: Props) {
  const { locale } = params;
  const uk = locale === 'uk';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {uk ? 'Редакційна політика' : 'Editorial Policy'}
      </h1>

      <div className="prose prose-gray max-w-none">
        {uk ? (
          <>
            <h2>Наш підхід до контенту</h2>
            <p>
              PowerBackup Guide публікує практичну інформацію про резервне живлення на основі відкритих
              джерел, технічної документації виробників і загальнодоступних тестів.
            </p>

            <h2>Джерела</h2>
            <p>Кожна стаття містить список джерел (від 3 до 7) з прямими посиланнями. Ми використовуємо:</p>
            <ul>
              <li>Офіційну документацію виробників</li>
              <li>Публікації в авторитетних виданнях (Wirecutter, PCMag тощо)</li>
              <li>Державні нормативні документи (ДБН, NFPA, IEC)</li>
              <li>Дані органів влади (ДТЕК, Держенергоефективності)</li>
            </ul>

            <h2>Точність і оновлення</h2>
            <p>
              Ми намагаємося підтримувати актуальність матеріалів. Дата останнього оновлення вказана
              на кожній сторінці. Якщо ви помітили неточність — напишіть нам.
            </p>

            <h2>Безпека</h2>
            <p>
              Будь-які інструкції, що стосуються електромонтажних робіт, супроводжуються обов'язковим
              попередженням про необхідність залучення ліцензованого електрика.
            </p>

            <h2>Незалежність</h2>
            <p>
              Редакційні рішення приймаються незалежно від партнерських відносин. Ми не публікуємо
              проплачений контент без відповідного маркування.
            </p>

            <h2>Авторське право</h2>
            <p>
              Весь оригінальний контент на цьому сайті є власністю PowerBackup Guide. Цитування
              сторонніх матеріалів здійснюється з посиланням на джерело. Якщо ви вважаєте, що ваші
              права порушені — зв'яжіться з нами.
            </p>
          </>
        ) : (
          <>
            <h2>Our Approach to Content</h2>
            <p>
              PowerBackup Guide publishes practical information on backup power based on open sources,
              manufacturer technical documentation, and publicly available testing data.
            </p>

            <h2>Sources</h2>
            <p>Every article includes a list of 3 to 7 sources with direct links. We use:</p>
            <ul>
              <li>Official manufacturer documentation</li>
              <li>Publications from established outlets (Wirecutter, PCMag, etc.)</li>
              <li>Government and standards documents (NFPA, IEC, DBN)</li>
              <li>Regulatory authority data (DTEK, State Energy Efficiency Agency)</li>
            </ul>

            <h2>Accuracy and Updates</h2>
            <p>
              We strive to keep content up to date. The last update date is shown on every page.
              If you spot an inaccuracy, please contact us.
            </p>

            <h2>Safety</h2>
            <p>
              Any instructions involving electrical wiring work are accompanied by a mandatory safety
              warning advising readers to hire a licensed electrician.
            </p>

            <h2>Independence</h2>
            <p>
              Editorial decisions are made independently of affiliate relationships. We do not publish
              paid content without appropriate disclosure.
            </p>

            <h2>Copyright</h2>
            <p>
              All original content on this site is the property of PowerBackup Guide. Third-party
              material is cited with attribution. If you believe your rights have been infringed,
              please contact us.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
