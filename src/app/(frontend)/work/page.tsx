'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import Banner from '../components/banner/HeaderBanner'
import FallbackImage from '../components/fallback-image'
import RichText from '@/components/RichText'
import Link from 'next/link'

interface Post {
  id: string
  heroImage?: {
    url?: string
  }
  location?: string
  category?: 'photo' | 'video'
  slug: string
  title: string
}

export default function HomeClient() {
  const [activeFilter, setActiveFilter] = useState<'photo' | 'video'>('photo')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data?.docs || [])
    }

    fetchPosts()
  }, [])

  const filteredProjects = posts.filter((post) => post.category === activeFilter)

  type HeadingBlock = {
    id: string
    heading?: any // richText JSON
  }

  const [headingBlock, setHeadingBlock] = useState<HeadingBlock | null>(null)

  useEffect(() => {
    async function fetchHeadingBlock() {
      try {
        const res = await fetch('/api/heading-block?limit=1') // adjust the limit as needed
        const data = await res.json()
        setHeadingBlock(data.docs?.[0] || null)
      } catch (err) {
        console.error('Failed to fetch heading block:', err)
      }
    }
    fetchHeadingBlock()
  }, [])

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

      <section className="px-6 md:px-16 py-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Link href={project.slug} key={project.id} className="space-y-2">
              <div className="w-full aspect-[4/3] relative overflow-hidden rounded">
                <FallbackImage
                  src={project.heroImage?.url || '/images/fallback.jpg'}
                  alt={project.location || 'Project'}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="text-sm uppercase tracking-wide opacity-80 project-content">
                {project.title}
                <br />
                {project.category} catalogue
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
