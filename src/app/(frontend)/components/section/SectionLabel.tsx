'use client'

import React from 'react'

interface SectionLabelProps {
  children: React.ReactNode
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
  return (
    <h2 className="font-mono text-small leading-none pb-4 uppercase tracking-widest opacity-50">
      {children}
    </h2>
  )
}

export default SectionLabel
