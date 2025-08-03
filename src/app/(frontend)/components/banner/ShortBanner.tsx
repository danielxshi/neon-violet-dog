'use client'

import Image from 'next/image'
import FallbackImage from '../fallback-image'

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
  return (
    <section className={`relative w-full ${height}`}>
      <FallbackImage src={image} alt={title} fill className="object-cover z-0" priority />
      <div
        className="absolute inset-0 flex items-end *:ml-8"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      >
        <div className="text-white space-y-4 mb-24">
          {subtitle && <h3 className="text-sm uppercase tracking-widest">{subtitle}</h3>}
          <h1 className="text-7xl font-bold">{title}</h1>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
