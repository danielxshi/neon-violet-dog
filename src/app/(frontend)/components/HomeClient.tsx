'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Section from '../../(frontend)/components/section/Section'
import SectionLabel from '../../(frontend)/components/section/SectionLabel'
import BigText from '../../(frontend)/components/section/BigText'
import Accordion from './list/accordion/accordion'
import ZoomParallaxSection from './parallax/ZoomParallax'
import News from './news'
import Banner from './banner/HeaderBanner'
import SliderContainer from './horizontalSlider/slideContent'
import TestimonialCarousel from './testimonial'
import RichText from '@/components/RichText'

interface Props {
  children?: React.ReactNode
}
type HeadingBlock = { id: string; heading?: any }

export default function HomeClient({ children }: Props) {
  const [headingBlock, setHeadingBlock] = useState<HeadingBlock | null>(null)

  const { scrollY } = useScroll()
  // Overlay still fades mostly out by 600px
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0])
  // 0 → 1 progress we’ll use to blend body color
  const bgProgress = useTransform(scrollY, [1500, 1800], [0, 1])

  // Smoothly blend body background from #101B3E to #FFFFFF as you scroll
  useEffect(() => {
    const start = { r: 0, g: 0, b: 0 } // #101B3E
    const end = { r: 255, g: 255, b: 255 } // #FFFFFF

    const unsub = bgProgress.on('change', (t) => {
      const clamp = (n: number) => Math.min(1, Math.max(0, n))
      const u = clamp(t)
      const r = Math.round(start.r + (end.r - start.r) * u)
      const g = Math.round(start.g + (end.g - start.g) * u)
      const b = Math.round(start.b + (end.b - start.b) * u)
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    })

    return () => {
      unsub()
      document.body.style.backgroundColor = ''
    }
  }, [bgProgress])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/heading-block?limit=1')
        const data = await res.json()
        setHeadingBlock(data.docs?.[0] || null)
      } catch (err) {
        console.error('Failed to fetch heading block:', err)
      }
    })()
  }, [])

  return (
    <main className="flex-1">
      <Banner url="" website="https://example.com">
        <h1 className="font-montserrat normal-case">
          {headingBlock?.heading && <RichText data={headingBlock.heading} />}
        </h1>
      </Banner>

      <section className="relative">
        <motion.div
          style={{
            opacity: overlayOpacity,
            background: `linear-gradient(rgba(16, 27, 62, 0) 0%, rgb(16, 27, 62) 95%)`,
          }}
          className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none z-[1]"
        />
        <motion.div
          className="z-[10] w-full h-screen overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src="https://player.vimeo.com/progressive_redirect/playback/838386999/rendition/720p/file.mp4?loc=external&log_user=0&signature=776cddfad94830fa3fcb98d0ac080d53d04db6e6cadf2d72d4215c7ee1c1c1b4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </motion.div>
      </section>

      <Section className="service-section overflow-hidden mx-auto w-[90vw] my-[20vh]">
        <SectionLabel>EXPERTISES</SectionLabel>
        <BigText data-scroll-speed="1.2">Service with excellence, award-winning results</BigText>
        <Accordion />
      </Section>

      <section className="relative">
        <div className="*:mx-auto mb-8 flex w-full *:justify-items-center text-black">
          <SectionLabel>TRUSTED BY</SectionLabel>
        </div>
        <SliderContainer />
      </section>

      <Section className="my-24">
        <TestimonialCarousel />
      </Section>

      {children}

      <Section>
        <News />
      </Section>

      <div className="relative h-[300vh] w-full">
        <ZoomParallaxSection />
      </div>
    </main>
  )
}
