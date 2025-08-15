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
      className="max-h-screen h-full max-w-[90vw] overflow-hidden absolute flex justify-center my-auto w-full z-10 leading-[1.35] mx-[7.5vw]"
    >
      <div className="flex my-auto h-full text-white pt-[20vh] pb-[12.5vh]">
        <div className="my-auto mx-auto text-left">
          <div className="m-auto mb-4 text-[2.5rem] lg:text-[3rem] normal-case">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Banner
