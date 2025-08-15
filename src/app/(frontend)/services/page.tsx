'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Section from '../components/section/Section'
import Banner from '../components/banner/ShortBanner'
import FallbackImage from '../components/fallback-image'

type Service = {
  id: string
  title: string
  description: string
  extendedDescription?: string
}

export default function Accordion() {
  const [services, setServices] = useState<Service[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/services?limit=100`)
        const res = await fetch('/api/services?limit=100') // adjust the limit as needed
        const data = await res.json()
        setServices(data.docs)
      } catch (err) {
        console.error('Failed to fetch services:', err)
      }
    }
    fetchServices()
  }, [])

  return (
    <main>
      <Banner title="Services" subtitle="Be Clear Media" image="" />
      <Section
        data-scroll-section
        className="service-section overflow-hidden mx-auto w-[90vw] my-[20vh]"
      >
        <div className="space-y-4">
          <h2 className="uppercase font-semibold tracking-widest text-sm">Expertises</h2>
          <h3 className="text-4xl md:text-5xl font-semibold mb-12 leading-tight">
            Service with excellence, <br /> award-winning results
          </h3>

          {services.map((item, idx) => (
            <div key={item.id} className="border-t border-black/20 pt-6">
              <button
                onClick={() => toggle(idx)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <h4 className="text-xl md:text-2xl font-medium">{item.title}</h4>
                  <p className="text-sm  max-w-3xl">{item.description}</p>
                </div>
                <ChevronDown
                  className={clsx(
                    'transition-transform duration-300',
                    openIndex === idx && 'rotate-180',
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && item.extendedDescription && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden pt-8  text-sm flex md:flex-row flex-col justify-between md:w-4/5"
                  >
                    <div className="w-full md:w-1/2 pr-8">
                      <p className="whitespace-pre-line">{item.extendedDescription}</p>
                    </div>

                    {/* Masked image reveal */}
                    <motion.div
                      key="masked-image"
                      initial={{
                        clipPath: 'inset(0 100% 0 0 round 12px)', // hidden from right
                      }}
                      animate={{
                        clipPath: 'inset(0 0% 0 0 round 12px)', // fully revealed
                      }}
                      exit={{
                        clipPath: 'inset(0 100% 0 0 round 12px)',
                      }}
                      transition={{
                        duration: prefersReduced ? 0 : 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ willChange: 'clip-path' }}
                      className="relative mt-4 md:mt-0 md:ml-6 rounded-lg shadow-lg overflow-hidden w-full md:w-1/2"
                    >
                      <motion.div
                        initial={{ scale: 1.06, filter: 'blur(8px)' }}
                        animate={{ scale: 1, filter: 'blur(0px)' }}
                        exit={{ scale: 1.02, filter: 'blur(4px)' }}
                        transition={{
                          duration: prefersReduced ? 0 : 1.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full h-[500px]"
                      >
                        <FallbackImage
                          src="https://images.squarespace-cdn.com/content/v1/64584eb1237e40538b7c4084/e525cdf7-9ac6-4b8d-b651-91ceea861ac9/IMG_8430.jpg"
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={false}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
