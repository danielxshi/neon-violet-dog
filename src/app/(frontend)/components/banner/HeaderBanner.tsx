'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  children?: React.ReactNode
  url: string
  excerpt?: string
  title?: string
  website: string
}

const Banner = ({ children, url, excerpt, title, website }: Props) => {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1, // half-second delay before animation starts
        },
      )
    }
  }, [])

  return (
    <div
      ref={bannerRef}
      className="max-h-screen h-[100svh] sm:max-w-[90vw] overflow-hidden absolute flex justify-center md:my-auto w-full z-10 leading-[1.35] sm:mx-[7.5vw]"
    >
      <div className="flex my-auto h-full text-white sm:pt-[20vh] pb-[8vh]">
        <div className="mb-0 mt-auto md:my-auto ml-4 mr-auto sm:mx-auto text-left">
          <div className="mb-4 text-[1.25rem] sm:w-full w-4/5 md:text-[2.5rem] lg:text-[3rem] normal-case">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
