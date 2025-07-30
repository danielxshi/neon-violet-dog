'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import styles from './style.module.scss'
import FallbackImage from '../fallback-image'

import Picture1 from '../../../../../public/images/1.jpeg'
import Picture2 from '../../../../../public/images/2.jpeg'
import Picture3 from '../../../../../public/images/3.jpg'
import Picture4 from '../../../../../public/images/4.jpg'
import Picture5 from '../../../../../public/images/5.jpg'
import Picture6 from '../../../../../public/images/6.jpg'
import Image from 'next/image'

const dummyNews = [
  {
    title: 'AI Startup Raises $100M in Series B',
    excerpt: 'Revolutionizing healthcare diagnostics...',
    image: Picture1,
    href: '/blog/ai-startup',
  },
  {
    title: 'Climate Tech Launches New Carbon Capture',
    excerpt: 'Breakthrough carbon device outpaces rivals.',
    image: Picture2,
    href: '/blog/climate',
  },
  {
    title: 'Crypto Regulation Bill Passed',
    excerpt: 'New rules safeguard digital investments.',
    image: Picture3,
    href: '/blog/crypto',
  },
  {
    title: 'VR in Schools Gains Momentum',
    excerpt: 'Education meets immersive learning.',
    image: Picture4,
    href: '/blog/vr-classroom',
  },
  {
    title: 'Smartphone Camera Challenges DSLR',
    excerpt: 'Quad lens and RAW support impress pros.',
    image: Picture5,
    href: '/blog/phone-camera',
  },
  {
    title: 'Eco Packaging Wins Innovation Prize',
    excerpt: 'Plant-based, dissolves in 3 weeks.',
    image: Picture6,
    href: '/blog/eco-packaging',
  },
]

export default function HorizontalScrollNews() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (container && track) {
      const scrollWidth = track.scrollWidth
      const containerWidth = container.offsetWidth
      setMaxScroll(scrollWidth - containerWidth)
    }
  }, [])

  // Reset dragging flag after short delay
  useEffect(() => {
    if (dragging) {
      const timeout = setTimeout(() => setDragging(false), 150)
      return () => clearTimeout(timeout)
    }
  }, [dragging])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <motion.div
        ref={trackRef}
        className={styles.track}
        drag="x"
        dragConstraints={{ left: -maxScroll, right: 0 }}
        dragElastic={0.1}
        style={{ x }}
        onDragStart={() => setDragging(true)}
      >
        {dummyNews.map((item, index) => (
          <a key={index} href={item.href} className={styles.card} onClick={handleClick}>
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={item.image}
                alt={item.title}
                className={styles.image}
                draggable={false}
              />
            </div>
            <div className={styles.content}>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  )
}
