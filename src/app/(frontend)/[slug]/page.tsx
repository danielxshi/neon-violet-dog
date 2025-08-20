// src/app/(frontend)/[slug]/page.tsx
export const runtime = 'nodejs'

import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

function normalizeSlug(raw: unknown): string | undefined {
  if (typeof raw === 'string') return raw.trim()
  if (raw && typeof raw === 'object') {
    const r = raw as any
    if (typeof r.current === 'string') return r.current.trim()
    if (typeof r.value === 'string') return r.value.trim()
    if (typeof r.slug === 'string') return r.slug.trim()
  }
  return undefined
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const payload = await getPayload({ config })
  const { docs = [] } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
    overrideAccess: false,
  })

  const slugs = Array.from(
    new Set(
      docs.map((d: any) => normalizeSlug(d?.slug)).filter((s): s is string => !!s && s.length > 0),
    ),
  )

  return slugs.map((slug) => ({ slug }))
}

// TEMPORARY: use `any` here to bypass your bad global PageProps constraint.
// After you fix the global type (see section 2), change `any` to:
//   { params: { slug: string } }
export default async function Page({ params }: any) {
  const slug: string = params?.slug
  const page = await queryPageBySlug({ slug })
  if (!page) notFound()

  // Render something minimal; replace with your real component
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">{page.title ?? slug}</h1>
      {/* add your rich text/content component here */}
    </main>
  )
}

export async function generateMetadata(
  { params }: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug: string = params?.slug
  const page = await queryPageBySlug({ slug })
  return {
    title: page?.title ?? slug,
    description:
      page && typeof page === 'object' && 'excerpt' in page
        ? String((page as any).excerpt)
        : undefined,
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'pages',
    draft: isDraft,
    limit: 1,
    pagination: false,
    overrideAccess: isDraft,
    where: { slug: { equals: slug } },
  })
  return res.docs?.[0] ?? null
})
