import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import FallbackImage from '@/app/(frontend)/components/fallback-image'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import Banner from '../components/banner/ShortBanner'

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

      {/* <div className="mt-8">
        <RichText data={post.content} />
      </div> */}

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
                  <video controls className="w-full rounded">
                    <source src={url} type={mime} />
                  </video>
                ) : (
                  <img
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
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug({ slug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }): Promise<Post | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft, // preview can bypass read access
    depth: 2, // populate heroImage and mediaGallery.media
    where: { slug: { equals: slug } },
  })
  return (result.docs?.[0] as Post) ?? null
})
