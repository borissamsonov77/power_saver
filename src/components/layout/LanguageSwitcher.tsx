'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: 'uk' | 'en' }) {
  const pathname = usePathname()

  function switchLocale(newLocale: 'uk' | 'en') {
    // Replace the locale segment in the current path
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
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
