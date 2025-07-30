import dynamic from 'next/dynamic'
import PostsSection from './components/post'
import HomeClient from './components/HomeClient'

export default function HomePage() {
  return (
    <HomeClient>
      <section data-scroll-section>
        <PostsSection />
      </section>
    </HomeClient>
  )
}
