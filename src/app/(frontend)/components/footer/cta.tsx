'use client'

import { motion, useReducedMotion, Variants, cubicBezier } from 'framer-motion'
import Link from 'next/link'
import localFont from 'next/font/local'
import clsx from 'clsx'

// Move font to /app/fonts or /src/fonts and use woff2 if possible
const dinamit = localFont({
  src: [
    {
      path: '../../../../../public/fonts/dinamit/Dinamit_Bold_Trial_A.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-dinamit',
  display: 'swap',
})

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion()

  // Reusable cubic-bezier eases
  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1)
  const easeStandard = cubicBezier(0.76, 0, 0.24, 1)

  const textVariants: Variants = {
    rest: {
      fill: 'rgba(255,255,255,0)',
      stroke: 'rgba(255,255,255,1)',
      strokeWidth: 2,
      y: 0,
      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
    },
    hover: prefersReducedMotion
      ? { fill: 'rgba(255,255,255,1)', strokeWidth: 0 }
      : {
          fill: 'rgba(255,255,255,1)',
          strokeWidth: 0,
          y: -4,
          transition: { type: 'spring', stiffness: 260, damping: 20 },
        },
  }

  const underlineVariants: Variants = {
    rest: { scaleX: 0, opacity: 0 },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.45, ease: easeOutExpo, delay: 0.05 },
    },
  }

  return (
    <section className={clsx('relative isolate h-[100vh] overflow-hidden backdrop-blur-xl')}>
      {/* background video (decorative) */}
      <motion.video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={(e) => console.warn('Video failed to load', e)}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: easeOutExpo }}
      >
        {/* AV1 (best size/quality) */}
        <source src="/video/testimonial.av1.webm" type='video/webm; codecs="av01"' />
        {/* VP9 WebM (widely supported in Chromium/Firefox, some Safari miss) */}
        <source src="/video/testimonial.vp9.webm" type='video/webm; codecs="vp9,opus"' />
        {/* Universal fallback (H.264) */}
        <source src="/video/testimonial.mp4" type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"' />
      </motion.video>

      {/* noise + gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-repeat"
        style={{
          background:
            "url('https://www.gryphonliving.com/static/media/background_noise.735964358a992a7fe340.png'), linear-gradient(rgba(16,27,62,0) 0%, rgb(16,27,62) 95%)",
          backgroundSize: '300px 300px, cover',
        }}
      />

      {/* CTA (entire overlay is the link target) */}
      <Link
        href="https://beclearmedia.as.me/schedule/6d555a9d"
        aria-label="Book now"
        className={clsx('group absolute inset-0 z-20 grid place-items-center', dinamit.variable)}
      >
        <motion.svg
          viewBox="0 0 800 200"
          className="w-[min(1200px,92vw)] h-auto"
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <motion.rect
            x="10%"
            y="142"
            width="80%"
            height="6"
            rx="3"
            fill="white"
            style={{ originX: 0.5 }}
            variants={underlineVariants}
          />
          <motion.text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="90"
            fontWeight="700"
            style={{
              fontFamily: 'var(--font-dinamit), system-ui, sans-serif',
              letterSpacing: '-0.05em',
            }}
            variants={textVariants}
          >
            BOOK NOW
          </motion.text>
        </motion.svg>
      </Link>

      {/* badges */}
      <div className="absolute bottom-4 left-0 md:left-auto md:right-4 z-30 ">
        <Link href="https://instagram.com/beclearmedia" target="_blank" rel="noopener noreferrer">
          <motion.span
            className="text-white/95 rounded-full px-4 py-2 shadow-lg"
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.25, ease: easeStandard }}
          >
            Designed by BECLEARDESIGN
          </motion.span>
        </Link>
      </div>
      <div className="absolute bottom-8 md:bottom-4  left-4 z-30">
        <small className="select-none text-white/90">ALL RIGHTS RESERVED © BE CLEAR MEDIA</small>
      </div>
    </section>
  )
}
