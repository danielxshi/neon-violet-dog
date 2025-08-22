import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
import FallbackImage from '@/app/(frontend)/components/fallback-image'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import Banner from '../components/banner/ShortBanner'
import Link from 'next/link'

type Post = RequiredDataFromCollectionSlug<'posts'>

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return docs?.map(({ slug }) => ({ slug })) ?? []
}

type Args = { params: Promise<{ slug: string }> }

export default async function PostPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug({ slug })
  if (!post) notFound()

  const next = await queryNextPost({ currentSlug: slug })
  const gallery = Array.isArray(post.mediaGallery) ? post.mediaGallery : []

  return (
    <div>
      <Banner
        title={post.title}
        subtitle="Be Clear Media"
        image={
          post.heroImage &&
          typeof post.heroImage === 'object' &&
          'url' in post.heroImage &&
          post.heroImage.url
            ? post.heroImage.url
            : ''
        }
      />

      <LivePreviewListener />

      {/* Content / gallery */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mt-12">
          {gallery.map((item: any, i: number) => {
            const file = item?.media
            if (!file || typeof file !== 'object' || !('url' in file)) return null
            const url = file.url as string
            const mime = (file as any).mimeType as string | undefined
            const isVideo = !!mime && mime.startsWith('video/')
            return (
              <div key={i}>
                {isVideo ? (
                  <video controls className="w-full rounded max-h-[80vh]">
                    <source src={url} type={mime} />
                  </video>
                ) : (
                  <FallbackImage
                    width={1200}
                    height={800}
                    src={url}
                    alt={item?.caption ?? ''}
                    className="w-full rounded object-cover"
                  />
                )}
                {item?.caption && <p className="text-sm opacity-70 mt-1">{item.caption}</p>}
              </div>
            )
          })}
        </div>
      )}

      {/* Next Project */}
      {/* {next && (
        <section className="mt-20 border-t pt-10">
          <div className="flex items-start gap-6">
            <div className="w-28 shrink-0 text-xs tracking-widest uppercase text-neutral-500">
              Next Project
            </div>

            <Link
              href={`/posts/${next.slug}`}
              className="group grid md:grid-cols-[220px_1fr] gap-6 items-start"
            >
              <div className="relative h-[140px] w-[220px] overflow-hidden rounded bg-neutral-100">
                {!!next.heroImage?.url && (
                  <FallbackImage
                    src={next.heroImage.url}
                    alt={next.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold group-hover:underline">{next.title}</h3>
                {next.excerpt && (
                  <p className="mt-2 text-sm text-neutral-600 line-clamp-3">{next.excerpt}</p>
                )}
                <span className="mt-3 inline-block text-sm font-medium group-hover:underline">
                  View project →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )} */}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug({ slug })
  return generateMeta({ doc: post })
}

/** fetch the current post by slug */
const queryPostBySlug = cache(async ({ slug }: { slug: string }): Promise<Post | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    depth: 2,
    where: { slug: { equals: slug } },
  })
  return (result.docs?.[0] as Post) ?? null
})

/**
 * get the "next" post. we try to sort by a manual `order` field if your posts have it;
 * otherwise we fall back to createdAt ascending.
 * wraps around to the first post if we're on the last.
 */
const queryNextPost = cache(
  async ({
    currentSlug,
  }: {
    currentSlug: string
  }): Promise<
    | (Pick<Post, 'slug' | 'title'> & {
        heroImage?: { url?: string } | null
        excerpt?: string | null
      })
    | null
  > => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    // try order first; if you don't have an `order` field, Payload will just ignore it
    const { docs } = await payload.find({
      collection: 'posts',
      draft,
      pagination: false,
      limit: 1000,
      depth: 1,
      // try to sort by order (if present), then createdAt
      sort: ['order', 'createdAt'] as any, // Payload accepts array or string; cast keeps TS happy
      select: {
        slug: true,
        title: true,
        excerpt: true,
        heroImage: { url: true },
        // order intentionally not selected; not needed in UI
      } as any,
    })

    if (!docs?.length) return null

    const idx = docs.findIndex((d: any) => d.slug === currentSlug)
    const next = docs[(idx + 1) % docs.length] as any

    return {
      slug: next.slug,
      title: next.title,
      excerpt: next.excerpt ?? null,
      heroImage:
        next.heroImage && typeof next.heroImage === 'object' && 'url' in next.heroImage
          ? { url: next.heroImage.url as string }
          : null,
    }
  },
)
