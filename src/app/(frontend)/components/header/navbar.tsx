'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../../../../../public/images/BE CLEAR MEDIA-logo.png'

interface Props {
  siteName: string
}

const tempMenu = [
  { title: 'Work', path: '/work' },
  { title: 'Services', path: '/Services' },
  { title: 'Pricing', path: '/ricing' },
  { title: 'Contact', path: '/contact' },
]

export default function NavbarClient({ siteName }: Props) {
  const [hideNav, setHideNav] = useState(false)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

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
        {/* Left Logo */}
        <div className="flex items-center w-1/3 gap-4">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="Be Clear Media Logo"
              width={100} // Adjust width as needed
              height={50} // Adjust height as needed
              priority // Ensures the logo loads quickly
            />
          </Link>
        </div>

        {/* Center menu */}
        <div className="flex justify-center w-1/3">
          <ul className="hidden sm:flex gap-6 text-sm font-medium">
            {tempMenu.map((item) => (
              <li key={item.title}>
                <Link href={item.path}>
                  <span
                    className={`transition-colors ${
                      pathname === item.path
                        ? ' dark:text-white'
                        : 'text-white dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Logo or Hamburger Icon */}

        {/* Right Hamburger Icon */}
        <div className="flex justify-end w-1/3 items-center gap-4">
          <a
            href="https://example.com/book-now" // Replace with the actual URL
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block bg-black text-white px-4 py-2 rounded-sm text-xs font-medium hover:bg-blue-700 transition"
          >
            Book Now
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-black absolute top-20 left-0 w-full shadow-lg">
          <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
            {tempMenu.map((item) => (
              <li key={item.title}>
                <Link href={item.path}>
                  <span
                    className={`block transition-colors ${
                      pathname === item.path
                        ? 'dark:text-white'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                    onClick={() => setMenuOpen(false)} // Close menu on click
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.nav>
  )
}
