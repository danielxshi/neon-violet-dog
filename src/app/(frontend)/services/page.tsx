'use client'

import Image from 'next/image'
import Section from '../components/section/Section'
import Accordion from '../components/list/accordion/accordion'
import Banner from '../components/banner/ShortBanner'
export default function PricingPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Banner */}
      <Banner title="Services" subtitle="Be Clear Media" image="" />
      <Section
        data-scroll-section
        className="service-section overflow-hidden mx-auto w-[90vw] my-[20vh]"
      >
        <Accordion />
      </Section>
    </main>
  )
}
