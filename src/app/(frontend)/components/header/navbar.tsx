'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  siteName: string
}

const tempMenu = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Work', path: '/work' },
  { title: 'Contact', path: '/contact' },
]

export default function NavbarClient({ siteName }: Props) {
  const [hideNav, setHideNav] = useState(false)
  const pathname = usePathname()

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // You can also add other logic here based on scroll position
      // For example, changing a header style when scrolled past a certain point
      if (window.scrollY > 500) {
        console.log('Scrolled past 100px')
        setHideNav(true)
      } else {
        setHideNav(false)
      }
    }

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // The empty dependency array ensures this effect runs only once on mount

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hideNav ? -100 : 0 }} // Correct syntax for Framer Motion
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`z-[999] absolute left-0 w-[100vw] backdrop-blur-sm transition-colors duration-300 ${
        hideNav ? '' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-20 px-4 lg:px-8 w-[100vw]">
        <div className="flex items-center w-1/3 gap-4">
          <ul className="hidden lg:flex gap-6 text-sm font-medium">
            {tempMenu.map((item) => (
              <li key={item.title}>
                <Link href={item.path}>
                  <span
                    className={`transition-colors ${
                      pathname === item.path
                        ? ' dark:text-white'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center w-1/3">
          <Link href="/">
            <span className="text-sm font-semibold uppercase tracking-widest  dark:text-white">
              {siteName}
            </span>
          </Link>
        </div>

        <div className="flex justify-end w-1/3 items-center">
          {/* Optional: Add hamburger icon */}
        </div>
      </div>
    </motion.nav>
  )
}
