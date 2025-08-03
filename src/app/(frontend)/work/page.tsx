'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import clsx from 'clsx'
import Banner from '../components/banner/HeaderBanner'
import FallbackImage from '../components/fallback-image'

const testimonials = [
  {
    id: 1,
    image: '/images/project-1.jpg',
    location: 'Burnaby, BC',
    category: 'photo',
  },
  {
    id: 2,
    image: '/images/project-2.jpg',
    location: 'Vancouver, BC',
    category: 'video',
  },
  {
    id: 3,
    image: '/images/project-3.jpg',
    location: 'Richmond, BC',
    category: 'photo',
  },
  {
    id: 4,
    image: '/images/project-4.jpg',
    location: 'Surrey, BC',
    category: 'video',
  },
]

export default function HomeClient() {
  const [activeFilter, setActiveFilter] = useState<'photo' | 'video'>('photo')

  const filteredProjects = testimonials.filter((project) => project.category === activeFilter)

  return (
    <main className="flex-1">
      <Banner
        title="We're a multi-disciplinary Real Estate development firm focusing on developing properties that connect Nature, Architecture, Technology, and Functionality."
        url=""
        website="https://example.com"
      />

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
            <div key={project.id} className="space-y-2">
              <div className="w-full aspect-[4/3] relative overflow-hidden rounded">
                <FallbackImage
                  src={project.image}
                  alt={project.location}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="text-sm uppercase tracking-wide opacity-80">
                {project.location}
                <br />
                {project.category} category
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
