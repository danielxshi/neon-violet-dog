'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../../../../../public/images/BE CLEAR MEDIA-logo.png'
import localFont from 'next/font/local'
import BookNowButton from '../buttons/button'
import styles from './style.module.scss'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from '@studio-freight/lenis'
import FallbackImage from '../fallback-image'

CustomEase.create('hop', '.87, 0, .13, 1')
gsap.registerPlugin(SplitText, CustomEase)

const dinamit = localFont({
  src: [
    {
      path: '../../../../../public/fonts/dinamit/Dinamit_Regular_Trial_A.otf',
      weight: '400',
      style: 'normal',
    },
  ],
})

interface MenuItem {
  title: string
  path: string
}

const tempMenu: MenuItem[] = [
  { title: 'Work', path: '/work' },
  { title: 'Services', path: '/services' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'Contact', path: '/contact' },
]

const hamburgerMenu: MenuItem[] = [
  { title: 'Home', path: '/' },
  { title: 'Work', path: '/work' },
  { title: 'About', path: '/about' },
  { title: 'Services', path: '/services' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'Contact', path: '/contact' },
]

export default function NavbarClient() {
  const [hideNav, setHideNav] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const lenis = useRef<Lenis | null>(null)
  const splitsRef = useRef<SplitText[]>([])

  useEffect(() => {
    lenis.current = new Lenis()
    const raf = (time: number) => {
      lenis.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const transition = { type: 'spring' as const, stiffness: 700, damping: 35 }

  const toggleMenu = (opts?: { onClosed?: () => void }) => {
    if (isAnimating) return
    setIsAnimating(true)

    const content = contentRef.current
    const overlay = overlayRef.current
    if (!content || !overlay) return

    splitsRef.current.forEach((split) => split.revert())
    splitsRef.current = []

    const linkEls = content.querySelectorAll('.menu-link')

    if (!isOpen) {
      // OPEN
      linkEls.forEach((el) => {
        const split = new SplitText(el as HTMLElement, { type: 'lines', linesClass: 'line' })
        splitsRef.current.push(split)
        split.lines.forEach((line) => {
          const wrapper = document.createElement('div')
          wrapper.classList.add('line-mask')
          wrapper.style.overflow = 'hidden'
          wrapper.style.display = 'block'
          line.parentNode?.insertBefore(wrapper, line)
          wrapper.appendChild(line)
        })
      })

      gsap.set(
        splitsRef.current.flatMap((split) => split.lines),
        {
          y: '-110%',
          opacity: 1,
          force3D: true,
        },
      )

      const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) })
      lenis.current?.stop()

      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'hop',
      })

      tl.to(
        splitsRef.current.flatMap((split) => split.lines),
        { y: '0%', duration: 2, ease: 'hop', stagger: -0.075 },
        0.25,
      )

      tl.call(() => setIsOpen(true))
    } else {
      // CLOSE
      const tl = gsap.timeline({
        onComplete: () => {
          lenis.current?.start()
          setIsOpen(false)
          setIsAnimating(false)
          splitsRef.current.forEach((split) => split.revert())
          splitsRef.current = []
          opts?.onClosed?.() // run callback after closing
        },
      })

      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
      })
    }
  }

  const handleMenuLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isAnimating) {
      e.preventDefault()
      return
    }
    if (isOpen) {
      e.preventDefault()
      toggleMenu({ onClosed: () => router.push(href) })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setHideNav(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hideNav ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`z-[999] absolute px-4 lg:px-8 max-w-[100vw] left-0 top-0 w-[100vw] backdrop-blur-sm transition-colors duration-300 ${
        hideNav ? '' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-20  w-full">
        <div className="flex items-center w-1/3 gap-4">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="Be Clear Media Logo"
              width={100}
              height={50}
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex justify-center w-1/3">
          <ul className="hidden sm:flex gap-6 text-sm">
            {tempMenu.map((item) => (
              <li key={item.title}>
                <Link href={item.path}>
                  <span
                    className={`transition-all pb-1 ${dinamit.className} ${
                      pathname === item.path
                        ? 'text-white border-b-2 border-white'
                        : 'text-white hover:opacity-80'
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.navRight} gap-3 md:w-1/3 w-3/4`}>
          <BookNowButton />
          <motion.button
            type="button"
            onClick={() => toggleMenu()}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            whileTap={{ scale: 0.96 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              style={{ overflow: 'visible' }}
            >
              <motion.line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{ closed: { y: 0, rotate: 0 }, open: { y: 5, rotate: 45 } }}
                transition={transition}
              />
              <motion.line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.15 }}
              />
              <motion.line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{ closed: { y: 0, rotate: 0 }, open: { y: -5, rotate: -45 } }}
                transition={transition}
              />
            </motion.svg>
          </motion.button>
        </div>
      </div>

      <div
        ref={overlayRef}
        className={styles.menuOverlay}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: isOpen
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        }}
      >
        <div
          ref={contentRef}
          className={`flex flex-col items-center gap-6 h-screen w-screen ${styles.menuContent}`}
        >
          <div className={`${styles.closeButton} flex items-start justify-end gap-3 p-6`}>
            <Link
              href="/contact"
              onClick={(e) => handleMenuLink(e, '/contact')}
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white hover:text-black focus:outline-none"
            >
              Contact Us
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => toggleMenu()}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/30 hover:bg-white hover:text-black"
            >
              ×
            </button>
          </div>

          <div className="grid h-full w-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="relative hidden overflow-hidden lg:block">
              <FallbackImage
                src="/hero-placeholder.jpg"
                alt="Showreel background"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
            </div>

            <aside className="relative flex w-full h-[500px] my-auto flex-col bg-black text-white">
              <div className="grid flex-1 grid-cols-12 px-6 pb-6 lg:px-12 lg:pb-10">
                <nav className="col-span-12 lg:col-span-8">
                  <ul className="space-y-4 lg:space-y-5 flex flex-col">
                    {hamburgerMenu.map((item, idx) => (
                      <Link
                        key={item.title}
                        href={item.path}
                        onClick={(e) => handleMenuLink(e, item.path)}
                      >
                        <span
                          className={`${styles.menuLink} h-full w-full menu-link text-4xl font-semibold leading-tight tracking-tight hover:opacity-80 md:text-5xl`}
                          data-index={idx}
                        >
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </ul>
                </nav>

                <div className="col-span-12 mt-auto flex items-end justify-between pt-10 text-sm text-neutral-300">
                  <Link
                    href="/en"
                    onClick={(e) => handleMenuLink(e, '/en')}
                    className="hover:text-white"
                  >
                    English
                  </Link>
                  <div className="text-right">
                    <div>(604) 618-8641</div>
                    <div>
                      <a href="mailto:info@beclearmedia.com" className="hover:text-white">
                        info@beclearmedia.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
