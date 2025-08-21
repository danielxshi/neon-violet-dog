'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FallbackImage from '../fallback-image'
// import test from '@/../public/images/Brian-Suico-Realtor.jpg'
// import test2 from '../../../../../public/images/Judy-Sehling-Realtor.jpg'
// import test3 from '../../../../../public/images/Terry-Realtor.jpg'

// {
//   name: 'Brian Suico',
//   role: '1NE Collective Top 1% Realtor',
//   stats: ['X2.0', '+18%'],
//   labels: ['Better Page Performance', 'Better Page Performance'],
//   text: 'Honestly the best Real Estate Photographer I have ever used. Mike is always on time, very professional, and has a great eye for the perfect shots. Photos always comes out so beautiful, I even got a new real estate listing just because of his photography skills! Highly recommended to all my friends and colleagues.',
//   image: '/images/Brian-Suico-Realtor.jpg',
// },
// {
//   name: 'Judy Sehling',
//   role: 'Marketing Director',
//   stats: ['+45%', '+60%'],
//   labels: ['Brand Reach', 'Lead Conversions'],
//   text: 'Incredible photographer and videographer! My photos are always edited better than I could do on my own. Such a relief to always have the best shots. He is fast yet thorough at the appointments as well... which is another thing I greatly appreciate. Best of the best!',
//   image: '/images/Judy-Sehling-Realtor.jpg',
// },
// {
//   name: 'Terry Tea',
//   role: 'Marketing Director',
//   stats: ['+45%', '+60%'],
//   labels: ['Brand Reach', 'Lead Conversions'],
//   text: 'I had great pleasure working with Mike and the team over at Be Clear Media to prepare my listing. Mike works like a close team of in-house photographers and videographers to showcase our property. I was very impressed with their service and follow up. We are always looking for quick turn-over times as this market is fast paced. We are incredibly happy with the results and will continue to use Mike and his team.',
//   image: '/images/Terry-Realtor.jpg',
// },
const testimonials = [
  {
    name: 'Terry Tea',
    role: 'Oakwyn Realty & Luxe Real Estate Group',
    stats: ['+45%', '+60%'],
    labels: ['Brand Reach', 'Lead Conversions'],
    text: 'I had great pleasure working with Mike and the team over at Be Clear Media to prepare my listing. Mike works like a close team of in-house photographers and videographers to showcase our property. I was very impressed with their service and follow up. We are always looking for quick turn-over times as this market is fast paced. We are incredibly happy with the results and will continue to use Mike and his team.',
    video: '/video/alpro-testimonial.mp4',
    image: undefined, // Optional image property added
  },
]

export default function TestimonialCarousel() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0])

  const paginate = (dir: number) => {
    setIndex(([prev]) => {
      const newIndex = (prev + dir + testimonials.length) % testimonials.length
      return [newIndex, dir]
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => paginate(1), 8000) // smoother timing
    return () => clearTimeout(timer)
  }, [index])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0.2,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { stiffness: 50, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0.2,
      scale: 0.96,
    }),
  }

  const current = testimonials[index]

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none" />

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) paginate(1)
            else if (info.offset.x > 100) paginate(-1)
          }}
        >
          {current.image ? (
            <FallbackImage
              src={current.image}
              alt={current.name}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
          ) : current.video ? (
            <video
              key={`vid-${index}`}
              className="absolute inset-0 w-full h-full object-cover"
              src={current.video}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              // poster={current.poster ?? undefined} // optional
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 text-white h-full flex flex-col justify-between px-8 md:px-16 py-10 pointer-events-none">
        <div className="mt-20 space-y-4 max-w-3xl">
          {/* <div className="flex items-baseline gap-8 text-5xl font-bold">
            {current.stats.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div> */}
          <div className="flex gap-8 text-xs tracking-widest uppercase">
            {current.labels.map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
        </div>

        <div className="mb-20 max-w-2xl space-y-5">
          <div className="text-xl font-semibold">{current.name}</div>
          <div className="uppercase text-sm tracking-wider opacity-80">{current.role}</div>
          <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-xl">{current.text}</p>
        </div>
      </div>

      <div className="absolute right-8 bottom-10 z-20 flex gap-3 pointer-events-auto">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => paginate(1)}
          className="bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
