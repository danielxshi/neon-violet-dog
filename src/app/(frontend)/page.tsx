import dynamic from 'next/dynamic'
import PostsSection from './components/post'
import HomeClient from './components/HomeClient'

// No 'use client' here – this is a server component

export default function HomePage() {
  return (
    <HomeClient>
      <section data-scroll-section>
        <PostsSection />
      </section>
    </HomeClient>
  )
}
