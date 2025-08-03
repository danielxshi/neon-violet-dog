'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '../components/section/Section'
import Banner from '../components/banner/ShortBanner'

type Service = {
  id: string
  title: string
  description: string
  extendedDescription?: string
}

export default function Accordion() {
  const [services, setServices] = useState<Service[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/services?limit=100`)
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
                  <p className="text-sm text-black/70 max-w-3xl">{item.description}</p>
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
                    className="overflow-hidden text-sm text-black/70 max-w-3xl"
                  >
                    <p className="pt-2 whitespace-pre-line">{item.extendedDescription}</p>
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
