import { AFFILIATE_ATTRS } from '@/lib/affiliates'

interface AffiliateButtonProps {
  href: string
  label: string
  store?: string
  price?: string
  className?: string
}

export default function AffiliateButton({
  href,
  label,
  store,
  price,
  className = '',
}: AffiliateButtonProps) {
  // Validate URL to prevent javascript: or data: injection
  const safeHref = (() => {
    try {
      const u = new URL(href)
      return ['https:', 'http:'].includes(u.protocol) ? href : '#'
    } catch {
      return '#'
    }
  })()

  return (
    <div className={`my-2 ${className}`}>
      <a
        href={safeHref}
        {...AFFILIATE_ATTRS}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-white font-semibold hover:bg-green-700 transition-colors"
      >
        {label}
        {store && <span className="text-xs opacity-75 ml-1">({store})</span>}
      </a>
      {price && (
        <span className="ml-3 text-sm text-gray-500">від {price}</span>
      )}
      <p className="mt-1 text-xs text-gray-400">
        Партнерське посилання.{' '}
        <a href="/uk/affiliate-disclosure" className="underline hover:text-gray-600">
          Докладніше
        </a>
      </p>
    </div>
  )
}
