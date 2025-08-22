'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Section from '../../(frontend)/components/section/Section'
import SectionLabel from '../../(frontend)/components/section/SectionLabel'
import BigText from '../../(frontend)/components/section/BigText'
import Accordion from './list/accordion/accordion'
import ZoomParallaxSection from './parallax/ZoomParallax'
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

  // 1) Your existing overlay fade for the hero video
  const { scrollY } = useScroll()
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0])

  // 2) Smooth background/text transition BEFORE we hit the trusted-by section
  const trustedRef = useRef<HTMLDivElement | null>(null)
  // Progress goes 0 -> 1 as the top of #trusted-by moves from 90% to 40% of viewport height
  const { scrollYProgress: trustedProgress } = useScroll({
    target: trustedRef,
    offset: ['start 90%', 'start 40%'],
  })
  // Spring for buttery easing
  const themeProgress = useSpring(trustedProgress, { stiffness: 120, damping: 20, mass: 0.3 })

  useEffect(() => {
    const dark = { r: 0, g: 0, b: 0 }
    const light = { r: 255, g: 255, b: 255 }

    const prev = {
      bg: document.body.style.backgroundColor,
      color: document.body.style.color,
      transition: document.body.style.transition,
    }
    document.body.style.transition = 'background-color 200ms linear, color 200ms linear'

    const unsub = themeProgress.on('change', (t) => {
      // background: black -> white
      const r = Math.round(dark.r + (light.r - dark.r) * t)
      const g = Math.round(dark.g + (light.g - dark.g) * t)
      const b = Math.round(dark.b + (light.b - dark.b) * t)
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

      // text: white -> near-black
      const txt = Math.round(255 - 215 * t) // ends ~#1A1A1A for good contrast
      document.body.style.color = `rgb(${txt}, ${txt}, ${txt})`
    })

    return () => {
      unsub()
      document.body.style.backgroundColor = prev.bg
      document.body.style.color = prev.color
      document.body.style.transition = prev.transition
    }
  }, [themeProgress])

  // Fetch heading
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
      {/* HERO */}
      <section id="hero" aria-label="Hero">
        <Banner url="" website="https://example.com">
          <h1 className="font-montserrat normal-case">
            {headingBlock?.heading && <RichText data={headingBlock.heading} />}
          </h1>
        </Banner>
      </section>

      {/* REEL / VIDEO */}
      <section id="reel" aria-label="Showreel video" className="relative">
        <motion.div
          style={{
            opacity: overlayOpacity,
            background: 'linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 95%)',
          }}
          className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none z-[1]"
          aria-hidden
        />
        <motion.div
          className="z-[10] w-full h-screen overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            autoPlay
            loop
            muted
            controls={false}
            playsInline
            preload="auto"
            className="object-cover w-full h-full"
          >
            {/* Chrome/Firefox/Edge */}
            <source src="/images/banner-video-be-clear.av1.webm" type="video/webm" />
            <source src="/images/banner-video-be-clear.vp9.webm" type="video/webm" />
            {/* Universal fallback (must be real H.264) */}
            <source src="/images/banner-video-be-clear.h264.mp4" type="video/mp4" />
            {/* Optional (not ideal for web) */}
            <source src="/images/banner-video-be-clear.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </section>

      {/* SERVICES */}
      <Section
        id="services"
        aria-labelledby="services-label"
        className="service-section overflow-hidden mx-auto w-[90vw] my-[20vh]"
      >
        <SectionLabel>EXPERTISES</SectionLabel>
        <BigText data-scroll-speed="1.2">Service with excellence, award-winning results</BigText>
        <Accordion />
      </Section>

      {/* TRUSTED BY / LOGOS — this drives the transition */}
      <section
        id="trusted-by"
        aria-labelledby="trusted-by-label"
        className="relative"
        ref={trustedRef}
      >
        <div className="*:mx-auto mb-8 flex w-full *:justify-items-center text-inherit">
          <SectionLabel>TRUSTED BY</SectionLabel>
        </div>
        <SliderContainer />
      </section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="my-24" aria-label="Testimonials">
        <TestimonialCarousel />
      </Section>

      {/* EXTRA (children) */}
      <section id="extra" aria-label="Additional content">
        {children}
      </section>

      {/* PARALLAX FEATURE */}
      <section id="parallax" aria-label="Parallax feature" className="relative h-[300vh] w-full">
        <ZoomParallaxSection />
      </section>
    </main>
  )
}
