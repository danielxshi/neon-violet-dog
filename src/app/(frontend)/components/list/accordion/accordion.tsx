import React, { useState } from 'react'

import LinkListItem from './LinkedListItem'
import LinkList from './LinkedList'
import Button from './button'

import ProjectMessages from '../../../../JSON/ProjectMessages'
import { AnimatePresence } from 'framer-motion'
import { DelayMotion } from './DelayMotion'

const ServiceList = () => {
  const MAX_INITIAL_LIST = 4
  const STAGGER_DELAY = 150
  const [isViewingFullList, setIsViewingFullList] = useState(false)

  return (
    <>
      <LinkList>
        <AnimatePresence>
          {ProjectMessages.ServiceMessages.map(
            ({ Title, Message, Link }, index) =>
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
                    name={Title}
                    description={Message}
                    href={Link}
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
