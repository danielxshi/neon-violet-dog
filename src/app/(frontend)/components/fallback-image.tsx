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
  const fallback = 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg'

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
      width={props.width}
      height={props.height}
    />
  )
}
