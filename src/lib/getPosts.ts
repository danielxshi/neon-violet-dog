export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?limit=10`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // for ISR
  })

  if (!res.ok) {
    console.error('Failed to fetch posts')
    return []
  }

  const json = await res.json()
  return json.docs
}
