'use client'

import { motion, useScroll, useTransform, cubicBezier, useSpring } from 'framer-motion'
import Image from 'next/image'
import Banner from '../components/banner/HeaderBanner'
import RichText from '@/components/RichText'
import { useState, useEffect, useRef } from 'react'
import FallbackImage from '../components/fallback-image'
import Mike from '../../../../public/images/team/mike.webp'
import Chau from '../../../../public/images/team/chau.webp'
import Daniel from '../../../../public/images/team/daniel.webp'
import Edith from '../../../../public/images/team/edith.webp'
import Team from '../../../../public/images/team/be-clear-team.webp'
import MikeSolo from '../../../../public/images/team/mike-solo.webp'

type HeadingBlock = { id: string; heading?: any }

// dev-only column overlay (press “g” to toggle)
function GridOverlay() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') setOn((v) => !v)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  if (!on) return null
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] opacity-60"
      style={{
        background:
          'repeating-linear-gradient(90deg, rgba(246,215,215,0.85) 0, rgba(246,215,215,0.85) calc((100% - 11rem)/12), rgba(255,255,255,0) calc((100% - 11rem)/12), rgba(255,255,255,0) calc((100% - 11rem)/12 + 1rem))',
      }}
    />
  )
}

export default function HomeClient() {
  const [headingBlock, setHeadingBlock] = useState<HeadingBlock | null>(null)

  // basic scroll fade for the video overlay
  const { scrollY } = useScroll()
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0])

  // SMOOTH theme transition driven by the TEAM section with offset
  const teamRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress: teamProgress } = useScroll({
    target: teamRef,
    // Start blending when the top of #team is near the bottom (90%),
    // finish when it reaches 40% of the viewport.
    offset: ['start 90%', 'start 40%'],
  })
  const themeProgress = useSpring(teamProgress, { stiffness: 120, damping: 20, mass: 0.3 })

  // Animate body background/text color smoothly from dark -> light based on themeProgress
  useEffect(() => {
    const prev = {
      bg: document.body.style.backgroundColor,
      color: document.body.style.color,
      transition: document.body.style.transition,
    }
    // JS-driven; no CSS transition needed here
    document.body.style.transition = 'none'

    const unsub = themeProgress.on('change', (t) => {
      // background: black -> white
      const channel = Math.round(255 * t) // 0 -> 255
      document.body.style.backgroundColor = `rgb(${channel}, ${channel}, ${channel})`
      // text: white -> near-black for better readability at the end
      const txt = Math.round(255 - 215 * t) // 255 -> ~40
      document.body.style.color = `rgb(${txt}, ${txt}, ${txt})`
    })

    return () => {
      unsub()
      document.body.style.backgroundColor = prev.bg
      document.body.style.color = prev.color
      document.body.style.transition = prev.transition
    }
  }, [themeProgress])

  // Derive a boolean for class switches where needed (headings, dividers, etc.)
  const [isLight, setIsLight] = useState(false)
  useEffect(() => {
    const unsub = themeProgress.on('change', (t) => setIsLight(t >= 0.5))
    return () => unsub()
  }, [themeProgress])

  // fetch heading block
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

  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1)

  return (
    <main className={`flex-1 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
      <GridOverlay />

      {/* hero banner with dynamic heading block */}
      <section id="hero" aria-label="Hero">
        <Banner url="" website="https://example.com">
          <h1 className="font-montserrat normal-case">
            {headingBlock?.heading && <RichText data={headingBlock.heading} />}
          </h1>
        </Banner>
      </section>

      {/* video section */}
      <section id="reel" aria-label="Showreel video" className="relative">
        <motion.div
          className="z-[10] w-full h-screen overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: easeOutExpo }}
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
          {/* soft overlay that fades out on scroll */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ABOUT — founder photo left, heading + quote right */}
      <section
        id="founder"
        aria-labelledby="founder-title"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-start">
          <div className="col-span-12 md:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-[2px] bg-neutral-200">
              <FallbackImage
                src="/images/team/mike-solo.webp"
                alt="Michael Gatsi — Founder of Be Clear Media"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          <div className="col-span-12 md:col-start-7 md:col-end-13 flex flex-col justify-center">
            <h2
              id="founder-title"
              className={`font-semibold tracking-tight text-3xl sm:text-4xl lg:text-[44px] uppercase ${
                isLight ? '' : 'text-white'
              }`}
            >
              Be Clear Media
            </h2>

            <blockquote
              className={`mt-5 max-w-[48ch] text-base leading-7 ${
                isLight ? 'text-neutral-900/90' : 'text-white/90'
              }`}
            >
              <p>
                “We believe in creating a partnership with our clients for their success. We
                understand how impactful high-quality photos, videos, and real estate marketing
                tools are for boosting sales, increasing listing interest, and creating a
                professional presence. Let us make you stand out!”
              </p>
            </blockquote>

            <p className={`mt-4 text-sm ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              Michael Gatsi | Founder
            </p>
          </div>
        </div>
      </section>

      {/* spacer band */}
      <div
        ref={teamRef}
        id="team-group-photo"
        aria-hidden
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`relative w-full aspect-video rounded-[2px] ${isLight ? 'bg-neutral-200/60' : 'bg-white/10'}`}
        >
          <FallbackImage
            src="/images/team/be-clear-team.webp"
            alt="Be Clear Media Team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* services blurb */}
      <section
        id="services"
        aria-labelledby="services-title"
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24"
      >
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-8 lg:col-start-1">
            <h3
              id="services-title"
              className={`font-semibold tracking-tight text-[28px] sm:text-[32px] lg:text-[36px] leading-tight ${
                isLight ? '' : 'text-white'
              }`}
            >
              Premiere Real Estate
              <br className="hidden sm:block" />
              Photography
              <br className="hidden sm:block" />
              and Marketing Services
            </h3>

            <div
              className={`mt-5 space-y-4 text-[15px] leading-7 ${
                isLight ? 'text-neutral-900/90' : 'text-white/90'
              }`}
            >
              <p>
                We are a team of creatives with a goal to specialize in capturing stunning visuals
                of properties to help Sellers and Real Estate Agents showcase their listings in the
                best possible way. Led by Mike Gatsi, an experienced Photographer with years of
                marketing experience and especially a keen eye for detail and composition, our team
                is dedicated to delivering high quality images that truly capture the essence and
                beauty of each property we photograph.
              </p>
              <p>
                Our goal at Be Clear Media is to help our clients succeed by providing them with the
                tools they need to effectively market their properties! We are proud of the work we
                have done and we look forward to continuing to innovate and push boundaries of what
                is possible in the Real Estate Marketing realm! Contact us today and let us help you
                stand out!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* team grid (drives themeProgress via offset) */}
      <section
        id="team"
        aria-labelledby="team-title"
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28"
      >
        <h4
          id="team-title"
          className={`text-center text-sm font-semibold tracking-[0.2em] uppercase ${
            isLight ? 'text-neutral-900/80' : 'text-white/80'
          }`}
        >
          Meet the Team
        </h4>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { src: '/images/team/mike.webp', name: 'Michael Gatasi' },
            { src: '/images/team/chau.webp', name: 'Chau Dinh' },
            { src: '/images/team/edith.webp', name: 'Edith Cheng' },
            { src: '/images/team/daniel.webp', name: 'Daniel Shi' },
          ].map((m, i) => (
            <figure key={i} className="group">
              <div
                className={`relative aspect-[3/4] overflow-hidden rounded-[2px] ${
                  isLight ? 'bg-neutral-200' : 'bg-white/10'
                }`}
              >
                <FallbackImage
                  src={m.src}
                  alt={m.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <figcaption
                className={`mt-2 text-center text-sm ${
                  isLight ? 'text-neutral-700' : 'text-neutral-300'
                }`}
              >
                {m.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
