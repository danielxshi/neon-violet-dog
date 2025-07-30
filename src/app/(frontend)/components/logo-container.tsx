'use client'

import React from 'react'

interface LogoContainerProps {
  children: React.ReactNode
}

const LogoContainer: React.FC<LogoContainerProps> = ({ children }) => {
  return <div className="grid grid-cols-3 gap-3 px-12 pt-[1em]">{children}</div>
}

export default LogoContainer
