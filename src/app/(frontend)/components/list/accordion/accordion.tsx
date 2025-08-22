import { useState, useEffect } from 'react'

import LinkListItem from './LinkedListItem'
import LinkList from './LinkedList'
import Button from './button'
import { AnimatePresence } from 'framer-motion'
import { DelayMotion } from './DelayMotion'

type Service = {
  id: string
  title: string
  description: string
  extendedDescription?: string
  order?: number // ← NEW
}

const ServiceList = () => {
  const MAX_INITIAL_LIST = 4
  const STAGGER_DELAY = 150
  const [isViewingFullList, setIsViewingFullList] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    async function fetchServices() {
      try {
        // ask Payload to sort by `order` ascending
        const res = await fetch('/api/services?limit=100&sort=order', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
        const data = await res.json()

        // fallback client sort: missing `order` go to end; then A→Z by title
        interface ApiResponse {
          docs?: Service[]
        }

        const docs: Service[] = ((data as ApiResponse).docs ?? []).slice().sort((a, b) => {
          const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY
          const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY
          if (ao !== bo) return ao - bo
          return a.title.localeCompare(b.title)
        })

        setServices(docs)
      } catch (err) {
        console.error('Failed to fetch services:', err)
      }
    }
    fetchServices()
  }, [])

  const visible = isViewingFullList ? services : services.slice(0, MAX_INITIAL_LIST)

  return (
    <>
      <LinkList>
        <AnimatePresence>
          {visible.map((item, index) => (
            <DelayMotion delay={index * STAGGER_DELAY} key={item.id}>
              <LinkListItem
                id={String(index + 1)}
                name={item.title}
                description={item.description}
                href="/services"
              />
            </DelayMotion>
          ))}
        </AnimatePresence>
      </LinkList>

      {!isViewingFullList && visible.length < services.length && (
        <div className="mt-[1.5em] flex justify-center md:justify-start md:pl-[25%] w-full">
          <Button onClick={() => setIsViewingFullList(true)}>View More Services</Button>
        </div>
      )}
    </>
  )
}

export default ServiceList
