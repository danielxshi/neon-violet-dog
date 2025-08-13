'use client'

import styles from './zoomparallax.module.scss'
import Picture1 from '../../../../../../public/images/testimonial/2JY04545.webp'
import Picture2 from '../../../../../../public/images/testimonial/Daylight-print13.webp'
import Picture3 from '../../../../../../public/images/testimonial/DJI_0295.webp'
import Picture4 from '../../../../../../public/images/testimonial/DSC06109.webp'
import Picture5 from '../../../../../../public/images/testimonial/DSC06694.webp'
import Picture6 from '../../../../../../public/images/testimonial/2JY04530 copy.webp'
import Picture7 from '../../../../../../public/images/testimonial/DJI_20250722120401_0247_D.webp'

import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function ZoomParallaxSection() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'], // animation over full container
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const pictures = [
    { src: Picture1, scale: scale4 },
    { src: Picture2, scale: scale5 },
    { src: Picture3, scale: scale6 },
    { src: Picture4, scale: scale5 },
    { src: Picture5, scale: scale6 },
    { src: Picture6, scale: scale8 },
    { src: Picture7, scale: scale9 },
  ]

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale, transformOrigin: 'center center' }}
            className={styles.el}
          >
            <div className={styles.imageContainer}>
              <Image src={src} alt={`image-${index}`} fill placeholder="blur" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
