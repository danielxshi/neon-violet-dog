'use client'

import FallbackImage from '../components/fallback-image'

interface LogoProps {
  src: string
  alt?: string
}

const Logo: React.FC<LogoProps> = ({ src, alt = '' }) => {
  return (
    <FallbackImage
      className="transform px-[.5em] py-[.5em] object-contain"
      fill
      priority
      src={src}
      alt={alt}
    />
  )
}

export default Logo
