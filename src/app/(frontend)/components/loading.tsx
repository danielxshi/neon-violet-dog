'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import Image from 'next/image'
import localFont from 'next/font/local'
import bg from '../../../../public/images/lrglogo.png'

gsap.registerPlugin(CustomEase)

const pragati = localFont({
  src: [
    {
      path: '../../../../public/fonts/Dinamit_Bold_Trial_A.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})

export default function Loader() {
  const [show, setShow] = useState(true)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  function splitTextIntoSpans(selector: string) {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      el.innerHTML =
        el.textContent
          ?.split('')
          .map((char) => (char === ' ' ? `<span>&nbsp;&nbsp;</span>` : `<span>${char}</span>`))
          .join('') || ''
    })
  }

  useGSAP(() => {
    splitTextIntoSpans('.header h1')

    const tl = gsap.timeline()
    animationRef.current = tl

    tl.to('.hero', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 0.35,
      ease: 'power3.out',
    })

    tl.to('.hero-img', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 1,
      y: 0,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.204,0.59 0.362,0.738 0.554,0.918 0.61,0.963 1,1',
      ),
    })

    tl.to('.header h1 span', {
      y: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.out',
    })

    tl.to('.hero-img', {
      scale: 1.2,
    })

    tl.to('.overlay', {
      width: '100%',
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.1,
    })

    tl.to('.overlay', {
      background: '#efefef',
      opacity: 1,
      transform: 'translate(0%, 0%) scale(1)',
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.1,
      onComplete: () => setShow(false),
    })

    return () => {
      animationRef.current?.kill()
    }
  })

  return (
    <div className="landing-container">
      {show && (
        <section className="hero relative overflow-hidden">
          <div className="overlay absolute inset-0 bg-black opacity-50 z-10"></div>

          <div className="header relative z-20 text-center space-y-4 py-12">
            <h1 className={`${pragati.className} text-4xl uppercase`}>JIAHAUS</h1>
            <h1 style={{ fontSize: 28 }} className="text-sm tracking-wider">
              MARKETING
            </h1>
          </div>

          <div className="hero-img relative z-10">
            <Image
              src={bg}
              alt="Logo Background"
              style={{
                objectFit: 'contain',
                width: '100%',
              }}
              priority
            />
          </div>
        </section>
      )}
    </div>
  )
}
