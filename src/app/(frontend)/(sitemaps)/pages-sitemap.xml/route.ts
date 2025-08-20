// src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts
export const runtime = 'nodejs' // Payload needs Node runtime
export const revalidate = 3600 // 1h; adjust as needed

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

type PageDoc = {
  slug?: string | null
  updatedAt?: string | null
}

function getSiteUrl(): string {
  // Prefer explicit public URL. Fallbacks for local/Vercel.
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    'http://localhost:3000'

  // Normalize trailing slash off
  return fromEnv.replace(/\/+$/, '')
}

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getSiteUrl()

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })

    const dateFallback = new Date().toISOString()

    const defaults = [
      { loc: `${SITE_URL}/search`, lastmod: dateFallback },
      { loc: `${SITE_URL}/posts`, lastmod: dateFallback },
    ]

    const dynamic =
      results.docs?.flatMap((page: PageDoc) => {
        const slug = typeof page?.slug === 'string' ? page.slug : null
        if (!slug) return []
        const loc = slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${slug}`
        const lastmod = page?.updatedAt ?? dateFallback
        return [{ loc, lastmod }]
      }) ?? []

    return [...defaults, ...dynamic]
  },
  ['pages-sitemap'],
  { tags: ['pages-sitemap'] },
)

function buildXml(urls: Array<{ loc: string; lastmod?: string }>): string {
  const rows = urls
    .map(({ loc, lastmod }) => {
      const safeLoc = loc.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      const mod = lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''
      return `<url><loc>${safeLoc}</loc>${mod}</url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${rows}
</urlset>`
}

export async function GET() {
  const urls = await getPagesSitemap()
  const xml = buildXml(urls)

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // cache at the edge/CDN
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
    },
  })
}
