'use client'

import React from 'react'

interface BigTextProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  children: React.ReactNode
}

const BigText: React.FC<BigTextProps> = ({ children, id, ...props }) => {
  return <p className="font-serif text-big tracking-big-text">{children}</p>
}

export default BigText
