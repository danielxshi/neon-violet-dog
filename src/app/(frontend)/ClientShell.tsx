'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Loader from './components/loading'
import { motion, AnimatePresence } from 'framer-motion'
import NavbarClient from './components/header/navbar'
import Footer from './components/footer'
import Lenis from '@studio-freight/lenis'

export default function ClientShell({
  children,
  preview,
}: {
  children: React.ReactNode
  preview: boolean
}) {
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState(pathname === '/')
  const [showAdminBar, setShowAdminBar] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Shop'
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

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

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
            }}
            layout
          >
            <NavbarClient siteName={siteName} />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="relative">
        {children}
        <Footer />
      </main>
    </>
  )
}
