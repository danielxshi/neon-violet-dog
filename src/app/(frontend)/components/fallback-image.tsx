'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface FallbackImageProps extends Omit<ImageProps, 'src' | 'alt' | 'fill'> {
  src: string
  alt: string
  fill?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function FallbackImage({
  src,
  alt,
  className,
  style,
  fill,
  ...props
}: FallbackImageProps) {
  const fallback =
    'https://nailcissist.com/cdn/shop/files/Untitled_design_b4accec6-a4b2-4f66-9d85-e4023ac11aa4.png?v=1751867630&width=900'

  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || fallback}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className={className}
      style={style}
      fill={fill}
      {...props}
    />
  )
}
