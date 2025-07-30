'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import PostItem from './PostItem' // separate component

type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  projectType?: string
  website?: string
  image?: {
    url: string
    alt?: string
  }
}

interface Props {
  posts: Post[]
}

export default function PostClient({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 gap-y-0">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
