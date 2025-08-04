'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(CustomEase)
CustomEase.create('hop', '.87, 0, .13, 1')

export default function useGsapMenu() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    lenis.current = new Lenis()
    const raf = (time: number) => {
      lenis.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const toggleMenu = () => {
    if (isAnimating) return
    setIsAnimating(true)

    if (!isOpen) {
      lenis.current?.stop()
      const tl = gsap.timeline()
      tl.to(overlayRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'hop',
      }).call(() => {
        setIsAnimating(false)
        setIsOpen(true)
      })
    } else {
      const tl = gsap.timeline()
      tl.to(overlayRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
      }).call(() => {
        lenis.current?.start()
        setIsAnimating(false)
        setIsOpen(false)
      })
    }
  }

  return { overlayRef, contentRef, isOpen, toggleMenu }
}
