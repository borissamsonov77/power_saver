'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: 'uk' | 'en' }) {
  const pathname = usePathname()

  function switchLocale(newLocale: 'uk' | 'en') {
    // Normalize pathname and replace the first segment (locale)
    if (!pathname) return `/${newLocale}`
    const parts = pathname.split('/').filter(Boolean) // removes empty segments
    if (parts.length === 0) return `/${newLocale}`
    // If the first segment is a locale, replace it, otherwise prepend
    const knownLocales = ['uk', 'en']
    if (knownLocales.includes(parts[0])) {
      parts[0] = newLocale
    } else {
      parts.unshift(newLocale)
    }
    return `/${parts.join('/')}`
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {(['uk', 'en'] as const).map((loc) => (
        <Link
          key={loc}
          href={switchLocale(loc)}
          className={`px-2 py-0.5 rounded font-medium transition-colors ${
            currentLocale === loc
              ? 'bg-yellow-400 text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
          aria-label={`Switch to ${loc === 'uk' ? 'Ukrainian' : 'English'}`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
