'use client'

import Image from 'next/image'
import FallbackImage from '../fallback-image'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

interface HeroBannerProps {
  image: string
  title: string
  subtitle?: string
  height?: string
  overlayOpacity?: number
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  image,
  title,
  subtitle,
  height = 'h-[55vh]',
  overlayOpacity = 0.4,
}) => {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.5, // half-second delay before animation starts
        },
      )
    }
  }, [])
  return (
    <section className={`relative w-full ${height}`}>
      <FallbackImage src={image} alt={title} fill className="object-cover z-0" priority />
      <div
        className="absolute inset-0 flex items-end *:ml-8"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      >
        <div ref={bannerRef} className="text-white space-y-4 mb-24">
          {subtitle && <h3 className="text-sm uppercase tracking-widest">{subtitle}</h3>}
          <h1 className="text-7xl font-bold">{title}</h1>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
