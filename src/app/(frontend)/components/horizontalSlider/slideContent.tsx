'use client'

import React, { useEffect, useState } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'
import SliderContainer, { SliderItem } from './slider'
import FallbackImage from '../fallback-image'

type Logo = {
  id: string
  companyName: string
  logo: {
    url: string
    alt?: string
  }
}

const ClientLogos: React.FC = () => {
  const [logos, setLogos] = useState<Logo[]>([])

  // Define motion values at top level to comply with React rules
  const speed0 = useSpring(useMotionValue(30), {
    damping: 15,
    stiffness: 150,
  })
  const speed1 = useSpring(useMotionValue(40), {
    damping: 15,
    stiffness: 150,
  })
  const speed2 = useSpring(useMotionValue(50), {
    damping: 15,
    stiffness: 150,
  })

  const motionSpeeds = [speed0, speed1, speed2]

  useEffect(() => {
    async function fetchLogos() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/client-logos?limit=100`)
        const data = await res.json()
        const formatted = data.docs.map((doc: any) => ({
          id: doc.id,
          companyName: doc.companyName,
          logo: {
            url: typeof doc.logo === 'object' ? doc.logo.url : '',
            alt: doc.logo.alt || doc.companyName,
          },
        }))
        setLogos(formatted)
      } catch (err) {
        console.error('Failed to fetch client logos:', err)
      }
    }
    fetchLogos()
  }, [])

  const handleHover = (index: number, hover: boolean) => {
    const target = hover ? (30 + index * 10) / 5 : 30 + index * 10
    motionSpeeds[index].set(target)
  }

  return (
    <div className="space-y-6">
      {[0, 1, 2].map((lineIndex) => (
        <div
          key={lineIndex}
          onMouseEnter={() => handleHover(lineIndex, true)}
          onMouseLeave={() => handleHover(lineIndex, false)}
        >
          <SliderContainer speed={motionSpeeds[lineIndex].get()}>
            {logos.map((logo) => (
              <SliderItem key={`line-${lineIndex}-${logo.id}`} width={100}>
                <FallbackImage
                  quality={80}
                  src={logo.logo.url}
                  width={75}
                  height={25}
                  alt={logo.logo.alt || logo.companyName}
                />
              </SliderItem>
            ))}
          </SliderContainer>
        </div>
      ))}
    </div>
  )
}

export default ClientLogos
