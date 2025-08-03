'use client'

import { useState } from 'react'
import Image from 'next/image'
import Banner from '../components/banner/ShortBanner'
const categories = ['PACKAGE', 'PHOTO', 'VIDEO', 'MATTERPORT', 'FLOORPLAN', 'DRONE', 'REELS']

const pricingData: Record<string, { title: string; price?: number; description?: string }[]> = {
  VIDEO: [
    {
      title: 'Videography (Horizontal Version)',
      price: 375,
      description: `Additional Drone +$100\n4K Listing video of the property (60 - 180 seconds)\nAdditional $150 for Instagram Reel version. Also includes a complimentary drone.\nExtra $50 for community shots request\n(3 day turnaround time)\n1st video revision is free and $50 each revision after`,
    },
    {
      title: 'PREMIUM Instagram Reel (Vertical Version) - VIRAL VIDEO',
      price: 450,
      description: `Comes with all the effects, 3D text fonts and trendy transitions`,
    },
    {
      title: 'Basic Instagram Reel Only (Vertical Version)',
      price: 325,
      description: `$200 if added to regular video`,
    },
  ],
  PHOTO: [
    {
      title: 'Standard Photo Package',
      price: 200,
      description: `25-35 professional real estate photos\nDelivered in 24 hours`,
    },
  ],
  PACKAGE: [],
  MATTERPORT: [],
  FLOORPLAN: [],
  DRONE: [],
  REELS: [],
}

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState('VIDEO')

  return (
    <main className="flex flex-col">
      {/* Hero Banner */}
      <Banner title="Services" subtitle="Be Clear Media" image="/images/hero-banner.jpg" />

      {/* About Section */}
      <section className="px-6 md:px-16 py-16 bg-white text-black grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
        <div className="flex justify-center">
          <Image
            src="/images/michael.jpg"
            alt="Michael Gatasi"
            width={400}
            height={400}
            className="rounded-lg object-cover"
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

        <div className="space-y-10">
          {pricingData[selectedCategory]?.length > 0 ? (
            pricingData[selectedCategory].map((item, i) => (
              <div key={i}>
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
        </div>
      </section>
    </main>
  )
}
