import { useState, useEffect } from 'react'

import LinkListItem from './LinkedListItem'
import LinkList from './LinkedList'
import Button from './button'

import ProjectMessages from '../../../../JSON/ProjectMessages'
import { AnimatePresence } from 'framer-motion'
import { DelayMotion } from './DelayMotion'

type Service = {
  id: string
  title: string
  description: string
  extendedDescription?: string
}

const ServiceList = () => {
  const MAX_INITIAL_LIST = 4
  const STAGGER_DELAY = 150
  const [isViewingFullList, setIsViewingFullList] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services?limit=100') // adjust the limit as needed
        const data = await res.json()
        setServices(data.docs)
      } catch (err) {
        console.error('Failed to fetch services:', err)
      }
    }
    fetchServices()
  }, [])

  return (
    <>
      <LinkList>
        <AnimatePresence>
          {services.map(
            (item, index) =>
              (index < MAX_INITIAL_LIST || isViewingFullList) && (
                <DelayMotion
                  delay={
                    isViewingFullList
                      ? (index - MAX_INITIAL_LIST) * STAGGER_DELAY
                      : index * STAGGER_DELAY
                  }
                  key={index}
                >
                  <LinkListItem
                    id={String(index + 1)}
                    name={item.title}
                    description={item.description}
                    href={`/services/${item.id}`}
                  />
                </DelayMotion>
              ),
          )}
        </AnimatePresence>
      </LinkList>
      {!isViewingFullList && (
        <div className="mt-[.5em] flex justify-center md:justify-start md:pl-[25%] w-full">
          <Button onClick={() => setIsViewingFullList(true)}>View More Services</Button>
        </div>
      )}
    </>
  )
}

export default ServiceList
