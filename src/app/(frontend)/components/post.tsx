// app/components/PostsSection.tsx
import Section from './section/Section'
import { getPosts } from '@/lib/getPosts'
import PostCard from './post/PostClient'

export type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  image?: {
    url: string
    alt?: string
  }
}

export default async function PostsSection() {
  const posts = await getPosts()

  return (
    <Section className="mx-4" data-scroll-section>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <PostCard posts={posts} />
    </Section>
  )
}
