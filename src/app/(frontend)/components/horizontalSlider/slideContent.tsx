'use client'

import React from 'react'
import SliderContainer, { SliderItem } from './slider'
import FallbackImage from '../fallback-image'

const logos = new Array(6).fill({
  src: '/images/BE CLEAR MEDIA-logo.png',
  alt: 'Be Clear Media',
})

const ClientLogos: React.FC = () => {
  return (
    <div className="space-y-10">
      {[0, 1, 2].map((lineIndex) => (
        <SliderContainer
          key={lineIndex}
          className=""
          speed={30 + lineIndex * 10} // variation in speed per row
        >
          {logos.map((logo, idx) => (
            <SliderItem key={`line-${lineIndex}-logo-${idx}`} width={150}>
              <FallbackImage
                quality={75}
                src={logo.src}
                width={150}
                height={50}
                alt={logo.alt}
              />
            </SliderItem>
          ))}
        </SliderContainer>
      ))}
    </div>
  )
}

export default ClientLogos
