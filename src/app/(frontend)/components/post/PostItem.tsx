'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import FallbackImage from '../fallback-image'

type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  projectType?: string
  website?: string
  image?: {
    url: string
    alt?: string
  }
}
interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [mouseDirection, setMouseDirection] = useState<'top' | 'bottom'>('top')
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = itemRef.current?.getBoundingClientRect()
    if (!rect) return
    const mouseY = e.clientY - rect.top
    setMouseDirection(mouseY > rect.height / 2 ? 'bottom' : 'top')
    setIsHovered(true)
  }

  const handleMouseLeave = () => setIsHovered(false)

  return (
    <motion.div
      ref={itemRef}
      className="pb-2 border-b border-gray-700 flex items-center group text-gray-400 justify-between *:mt-0 *:mb-auto *:h-full *:py-8 cursor-pointer relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setIsHovered(false)
        router.push(`/posts/${post.slug}`)
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{
          scaleY: 0,
          backgroundColor: '#FFFFFF',
          opacity: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
        animate={{
          scaleY: isHovered ? 1 : 0,
        }}
        style={{
          transformOrigin: mouseDirection === 'bottom' ? 'bottom' : 'top',
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
      <motion.div
        className="relative z-10 flex w-full items-center justify-between"
        animate={{
          color: isHovered ? '#000' : '#9CA3AF',
          paddingLeft: isHovered ? '1rem' : '0',
          paddingRight: isHovered ? '1rem' : '0',
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className="flex flex-row h-fit">
          {post.image?.url && (
            <div className="h-full w-16 aspect-square mr-4 rounded-full overflow-hidden relative">
              <FallbackImage
                src={post.image.url}
                alt={post.image.alt || post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="flex-col flex">
            <h4 className="text-xl font-normal w-[450px]">{post.title}</h4>
            {post.website && (
              <p className="text-lg text-gray-500 text-left">{post.website.split(',')[0]}</p>
            )}
          </div>
        </div>
        {post.excerpt && (
          <p className="text-xl text-left hidden md:flex w-[450px] px-4">{post.excerpt}</p>
        )}
        {post.projectType && (
          <div className="h-full hidden md:flex w-[350px]">
            <p className="text-xl">{post.projectType}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
