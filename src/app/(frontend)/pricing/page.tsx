'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Banner from '../components/banner/ShortBanner'
import FallbackImage from '../components/fallback-image'

type PricingItem = {
  id: string
  title: string
  price?: number
  description?: string
  category: string
}

const categories = ['PACKAGE', 'PHOTO', 'VIDEO', 'MATTERPORT', 'FLOORPLAN', 'DRONE', 'REELS']

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState('VIDEO')
  const [pricingData, setPricingData] = useState<Record<string, PricingItem[]>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/pricing?limit=100`) // adjust the limit as needed
        const data = await res.json()
        const grouped: Record<string, PricingItem[]> = {}

        for (const item of data.docs) {
          const cat = item.category?.toUpperCase()
          if (cat) {
            if (!grouped[cat]) grouped[cat] = []
            grouped[cat].push(item)
          }
        }

        setPricingData(grouped)
      } catch (error) {
        console.error('Failed to load pricing data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex flex-col bg-white text-black">
      <Banner title="Pricing" subtitle="Be Clear Media" image="/images/hero-banner.jpg" />

      {/* Intro Section */}
      <section className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
        <div className="flex justify-center h-[450px] overflow-hidden">
          <FallbackImage
            src="https://images.squarespace-cdn.com/content/v1/64584eb1237e40538b7c4084/e525cdf7-9ac6-4b8d-b651-91ceea861ac9/IMG_8430.jpg"
            alt="Michael Gatasi"
            width={400}
            height={400}
            className="rounded-sm object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold">BE CLEAR MEDIA</h2>
          <p>
            24 Hour Next Day Delivery on all Photography & Floorplan Services / Please allow 3 day
            turnaround delivery for Video. (All pricing subject to change without notice.)
            <br />
            <br />
            Additional travel fees apply to:
          </p>
          <p className="text-sm">
            Port Moody, Coquitlam, Port Coquitlam, Maple Ridge, Pitt Meadows, Langley, Abbotsford,
            Mission, Chilliwack, White Rock, Squamish, West Vancouver, North Vancouver, Harrison Hot
            Springs
          </p>
          <p className="text-xs opacity-70">Michael Gatasi | Founder</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 md:px-20 py-10">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-10 text-sm font-semibold tracking-wide overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`mr-6 pb-2 ${
                selectedCategory === cat
                  ? 'border-b-2 border-blue-600 text-blue-700'
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Pricing */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Section Label */}
            <h3 className="text-2xl font-semibold border-b pb-2 mb-6">
              {selectedCategory} PRICING
            </h3>

            {pricingData[selectedCategory]?.length > 0 ? (
              pricingData[selectedCategory].map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold max-w-xl">{item.title}</h4>
                    {item.price !== undefined && (
                      <p className="text-xl font-medium whitespace-nowrap">${item.price}</p>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm mt-2 whitespace-pre-line max-w-3xl text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No pricing available for this category yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}
