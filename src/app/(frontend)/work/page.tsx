'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import Banner from '../components/banner/HeaderBanner'
import FallbackImage from '../components/fallback-image'
import RichText from '@/components/RichText'
import Link from 'next/link'
// import test from "../../../../public/video/testimonial.av1.webm"

interface Post {
  id: string
  heroImage?: { url?: string }
  location?: string
  category?: 'photo' | 'video'
  slug: string
  title: string
  previewVideoUrl?: string
}

type HeadingBlock = { id: string; heading?: any }

const FALLBACK_PREVIEW = '../../../../public/video/testimonial.av1.webm' // file must exist in /public/video

export default function HomeClient() {
  const [activeFilter, setActiveFilter] = useState<'photo' | 'video'>('photo')
  const [posts, setPosts] = useState<Post[]>([])
  const [headingBlock, setHeadingBlock] = useState<HeadingBlock | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data?.docs || [])
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/heading-block?limit=1')
        const data = await res.json()
        setHeadingBlock(data.docs?.[0] || null)
      } catch (err) {
        console.error('Failed to fetch heading block:', err)
      }
    })()
  }, [])

  const filteredProjects = posts.filter((p) => p.category === activeFilter)

  return (
    <main className="flex-1">
      <Banner url="" website="https://example.com">
        {headingBlock?.heading && <RichText data={headingBlock.heading} />}
      </Banner>

      <section className="relative">
        <motion.div
          className="z-[10] w-full h-screen overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src="https://player.vimeo.com/progressive_redirect/playback/838386999/rendition/720p/file.mp4?loc=external&log_user=0&signature=776cddfad94830fa3fcb98d0ac080d53d04db6e6cadf2d72d4215c7ee1c1c1b4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </motion.div>
      </section>

      <section className="px-6 py-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-6 text-lg font-semibold">
            <button
              onClick={() => setActiveFilter('photo')}
              className={clsx('transition-opacity', {
                'opacity-100': activeFilter === 'photo',
                'opacity-50 hover:opacity-100': activeFilter !== 'photo',
              })}
            >
              PHOTO
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={clsx('transition-opacity', {
                'opacity-100': activeFilter === 'video',
                'opacity-50 hover:opacity-100': activeFilter !== 'video',
              })}
            >
              VIDEO
            </button>
          </div>

          <div className="text-sm tracking-wider uppercase">Works ({filteredProjects.length})</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredProjects.map((project) => {
            const previewSrc = project.previewVideoUrl || FALLBACK_PREVIEW
            const hasVideo = Boolean(previewSrc)
            const isHovered = hoveredId === project.id
            const isActive = hasVideo && isHovered && !prefersReduced

            return (
              <Link
                href={project.slug}
                key={project.id}
                className="space-y-2 group"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId((id) => (id === project.id ? null : id))}
                onFocus={() => setHoveredId(project.id)}
                onBlur={() => setHoveredId((id) => (id === project.id ? null : id))}
              >
                <div className="w-full aspect-square relative overflow-hidden rounded-[1px]">
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ scale: isActive ? 1.02 : 1, opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FallbackImage
                      src={project.heroImage?.url || '/images/fallback.jpg'}
                      alt={project.location || 'Project'}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {hasVideo && (
                    <HoverVideo
                      src="https://player.vimeo.com/progressive_redirect/playback/838386999/rendition/720p/file.mp4?loc=external&log_user=0&signature=776cddfad94830fa3fcb98d0ac080d53d04db6e6cadf2d72d4215c7ee1c1c1b4"
                      active={isActive}
                    />
                  )}
                </div>

                <div className="text-sm uppercase tracking-wide opacity-80 project-content">
                  <small className="leading-none">{project.title}</small>
                  <br />
                  <p className="leading-none">{project.category} catalogue</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function HoverVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active) {
      if (v.preload !== 'auto') v.preload = 'auto'
      v.currentTime = 0
      const p = v.play()
      p?.catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [active])

  return (
    <motion.video
      ref={ref}
      src={src} // must be '/video/...' (public) or an absolute URL
      muted
      playsInline
      loop
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.04 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'opacity, transform' }}
    />
  )
}
