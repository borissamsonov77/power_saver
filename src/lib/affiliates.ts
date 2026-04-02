// Affiliate link configuration
// Replace placeholder IDs with real partner program IDs after registration

export const AFFILIATE_CONFIG = {
  rozetka: {
    name: 'Rozetka',
    // Register: https://partner.rozetka.ua
    trackingParam: 'utm_source=powerbackup&utm_medium=affiliate&utm_campaign=review',
  },
  amazon: {
    name: 'Amazon',
    // Register: https://affiliate-program.amazon.com
    associateTag: 'REPLACE_YOUR_TAG',
  },
  prom: {
    name: 'Prom.ua',
    trackingParam: 'utm_source=powerbackup&utm_medium=affiliate',
  },
} as const

export type AffiliateStore = keyof typeof AFFILIATE_CONFIG

/**
 * Add tracking params to a URL.
 * Never allows javascript: or data: protocols (security).
 */
export function withTracking(rawUrl: string, store: AffiliateStore): string {
  try {
    const u = new URL(rawUrl)
    if (!['https:', 'http:'].includes(u.protocol)) return '#'
    const cfg = AFFILIATE_CONFIG[store]
    if ('trackingParam' in cfg) {
      cfg.trackingParam.split('&').forEach((pair) => {
        const [k, v] = pair.split('=')
        u.searchParams.set(k, v)
      })
    }
    if (store === 'amazon' && 'associateTag' in cfg) {
      u.searchParams.set('tag', cfg.associateTag)
    }
    return u.toString()
  } catch {
    return '#'
  }
}

// All affiliate links must use these attributes (Google & legal requirement)
export const AFFILIATE_ATTRS = {
  rel: 'nofollow sponsored',
  target: '_blank',
} as const
