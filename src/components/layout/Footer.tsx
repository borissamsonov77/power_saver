import Link from 'next/link'

export default function Footer({ locale }: { locale: 'uk' | 'en' }) {
  const isUk = locale === 'uk'

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="text-white font-bold text-lg flex items-center gap-2">
              <span className="text-yellow-400">⚡</span> PowerBackup Guide
            </Link>
            <p className="mt-2 text-sm">
              {isUk
                ? 'Практичні рішення для автономного живлення дому та бізнесу'
                : 'Practical backup power solutions for homes and businesses'}
            </p>
          </div>

          {/* Content links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">
              {isUk ? 'Контент' : 'Content'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/emergency`} className="hover:text-white transition-colors">{isUk ? 'Нема світла — що робити' : 'No power — what to do'}</Link></li>
              <li><Link href={`/${locale}/guides`} className="hover:text-white transition-colors">{isUk ? 'Гайди' : 'Guides'}</Link></li>
              <li><Link href={`/${locale}/reviews`} className="hover:text-white transition-colors">{isUk ? 'Огляди обладнання' : 'Equipment reviews'}</Link></li>
              <li><Link href={`/${locale}/solutions`} className="hover:text-white transition-colors">{isUk ? 'Готові рішення' : 'Ready solutions'}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">
              {isUk ? 'Правова інформація' : 'Legal'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/affiliate-disclosure`} className="hover:text-white transition-colors">{isUk ? 'Партнерська угода' : 'Affiliate Disclosure'}</Link></li>
              <li><Link href={`/${locale}/editorial-policy`} className="hover:text-white transition-colors">{isUk ? 'Редакційна політика' : 'Editorial Policy'}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{isUk ? 'Про нас' : 'About Us'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>© 2026 PowerBackup Guide. {isUk ? 'Всі права захищені.' : 'All rights reserved.'}</p>
          <p>
            {isUk
              ? 'Інформація на сайті носить ознайомчий характер. Для електромонтажних робіт звертайтесь до ліцензованого фахівця.'
              : 'Information on this site is for educational purposes. For electrical work, consult a licensed professional.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
