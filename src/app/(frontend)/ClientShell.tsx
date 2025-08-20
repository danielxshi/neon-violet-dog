'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Loader from './components/loading'
import { motion, AnimatePresence } from 'framer-motion'
import NavbarClient from './components/header/navbar'
import Footer from './components/footer'
import Lenis from '@studio-freight/lenis'

export default function ClientShell({ children }: { children: React.ReactNode; preview: boolean }) {
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState(pathname === '/')
  const [showAdminBar, setShowAdminBar] = useState(false)

  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (pathname === '/') {
      const loaderTimeout = setTimeout(() => {
        setShowLoader(false)
        setTimeout(() => setShowAdminBar(true), 100)
      }, 4500)
      return () => clearTimeout(loaderTimeout)
    } else {
      setShowLoader(false)
      setShowAdminBar(true)
    }
  }, [pathname])

  // Lenis init (once)
  useEffect(() => {
    // respect reduced motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: prefersReduced ? 0.6 : 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      // smoothTouch: false, // Removed as it's not a valid property
      wheelMultiplier: 1,
      // lerp is alternative; avoid mixing with duration for consistency
    })

    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    // pause on tab hidden to save CPU
    const onVis = () => {
      if (document.hidden) {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      } else if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // pause smoothing while loader is visible
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (showLoader) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [showLoader])

  // optional: scroll to top on route change (without smooth to avoid disorientation)
  // useEffect(() => {
  //   lenisRef.current?.scrollTo(0, { immediate: true })
  // }, [pathname])

  if (showLoader) return <Loader />

  return (
    <>
      <AnimatePresence mode="wait">
        {showAdminBar && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              willChange: 'transform, opacity',
              zIndex: 999,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
            }}
            layout
          >
            <NavbarClient />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        {children}
        {pathname !== '/contact' && <Footer />}
      </main>
    </>
  )
}
