'use client'

import React from 'react'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ children, id, ...props }) => {
  return (
    <section className="my-[8em] mx-4" id={id} {...props}>
      {children}
    </section>
  )
}

export default Section
