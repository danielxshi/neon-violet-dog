'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Section from '../components/section/Section'
import Banner from '../components/banner/ShortBanner'
import FallbackImage from '../components/fallback-image'

type Media = {
  id?: string
  url?: string
  alt?: string
  filename?: string
}

type Service = {
  id: string
  title: string
  description: string
  extendedDescription?: string
  heroImage?: Media | null
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
        // Depth ensures heroImage is populated even if defaultPopulate is bypassed
        const res = await fetch('/api/services?limit=100&depth=2', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
        const data = await res.json()
        setServices(data.docs ?? [])
      } catch (err) {
        console.error('Failed to fetch services:', err)
      }
    }
    fetchServices()
  }, [])

  return (
    <main>
      <Banner
        title="Services"
        subtitle="Be Clear Media"
        image="/images/team/be-clear-team-colored.webp"
      />
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
            <div key={item.id} className="border-t border-white/50 pt-6">
              <button
                onClick={() => toggle(idx)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <h4 className="text-xl md:text-2xl font-medium">{item.title}</h4>
                  <p className="text-sm max-w-3xl">{item.description}</p>
                </div>
                <ChevronDown
                  className={clsx(
                    'transition-transform duration-300',
                    openIndex === idx && 'rotate-180',
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    // ⬇️ remove height variants; just animate opacity + translate
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-8 text-sm flex md:flex-row flex-col justify-between md:w-4/5"
                  >
                    <div className="w-full md:w-1/2 pr-8">
                      {item.extendedDescription ? (
                        <p className="whitespace-pre-line">{item.extendedDescription}</p>
                      ) : (
                        <p className="opacity-70">More details coming soon.</p>
                      )}
                    </div>

                    {/* Masked image reveal */}
                    <motion.div
                      key="masked-image"
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0% 0 0)' }}
                      exit={{ clipPath: 'inset(0 100% 0 0)' }}
                      transition={{ duration: prefersReduced ? 0 : 1.0, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mt-4 md:mt-0 md:ml-6 shadow-lg overflow-hidden w-full md:w-1/2"
                    >
                      <motion.div
                        // ⬇️ transforms run on GPU; avoid filter (paint-heavy) for smoother perf
                        initial={{ scale: 1.04 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 1.01 }}
                        transition={{
                          duration: prefersReduced ? 0 : 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full h-[300px] transform-gpu"
                      >
                        <FallbackImage
                          src={item.heroImage?.url || '/images/fallback.jpg'}
                          alt={item.heroImage?.alt || item.title}
                          fill
                          className="object-contain object-top"
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
