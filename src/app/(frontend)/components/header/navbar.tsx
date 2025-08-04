'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../../../../../public/images/BE CLEAR MEDIA-logo.png'
import localFont from 'next/font/local'
import BookNowButton from '../buttons/button'
import useGsapMenu from './useGsapMenu'
import styles from './style.module.scss'

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

export default function NavbarClient() {
  const [hideNav, setHideNav] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const { overlayRef, contentRef, isOpen, toggleMenu } = useGsapMenu({ defaultOpen: false })

  useEffect(() => {
    setMounted(true)
  }, [])

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
      className={`z-[999] absolute left-0 top-0 w-[100vw] backdrop-blur-sm transition-colors duration-300 ${
        hideNav ? '' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-20 px-4 lg:px-8 w-full">
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

        <div className="flex justify-center w-1/3">
          <ul className="hidden sm:flex gap-6 text-sm">
            {tempMenu.map((item: MenuItem) => (
              <li key={item.title}>
                <Link href={item.path}>
                  <span
                    className={`transition-all pb-1 ${dinamit.className} ${
                      pathname === item.path
                        ? 'text-white border-b-2 border-white'
                        : 'text-white hover:text-blueGradient-start'
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.navRight}>
          <BookNowButton />
          <button onClick={toggleMenu} className={styles.hamburgerButton} aria-label="Toggle Menu">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {mounted && (
        <div
          ref={overlayRef}
          className={styles.menuOverlay}
          style={{
            clipPath: isOpen
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
              : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          }}
        >
          <div
            ref={contentRef}
            className={`flex flex-col items-center gap-6 ${styles.menuContent}`}
          >
            <button onClick={toggleMenu} className={styles.closeButton} aria-label="Close Menu">
              ✕
            </button>

            {tempMenu.map((item, idx) => (
              <Link key={item.title} href={item.path} onClick={toggleMenu}>
                <span className={`${styles.menuLink} menu-link`} data-index={idx}>
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  )
}
