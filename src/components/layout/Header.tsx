import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'

const navLinks = (locale: string) => [
  { href: `/${locale}/emergency`, labelUk: 'Нема світла?', labelEn: 'No Power?' },
  { href: `/${locale}/guides`, labelUk: 'Гайди', labelEn: 'Guides' },
  { href: `/${locale}/reviews`, labelUk: 'Огляди', labelEn: 'Reviews' },
  { href: `/${locale}/solutions`, labelUk: 'Рішення', labelEn: 'Solutions' },
  { href: `/${locale}/solutions/business`, labelUk: 'Бізнес', labelEn: 'Business' },
]

export default function Header({ locale }: { locale: 'uk' | 'en' }) {
  const isUk = locale === 'uk'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <span className="text-yellow-500">⚡</span>
            <span>PowerBackup</span>
            <span className="text-yellow-500 font-normal text-sm">Guide</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks(locale).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                {isUk ? link.labelUk : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* Right: emergency CTA + lang switcher */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/emergency`}
              className="hidden sm:inline-flex items-center gap-1 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              🚨 {isUk ? 'Нема світла!' : 'No Power!'}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}
