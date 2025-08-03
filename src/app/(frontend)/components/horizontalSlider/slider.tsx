'use client'

import React, { useRef, useEffect } from 'react'

interface Props {
  className?: string
  children: React.ReactNode
  speed?: number // smaller = faster
}

const SliderContainer: React.FC<Props> = ({ children, className = '', speed = 30 }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let reqId: number

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 3) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft += 0.5
      }
      reqId = requestAnimationFrame(scroll)
    }

    scroll()

    return () => cancelAnimationFrame(reqId)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`overflow-x-hidden whitespace-nowrap max-w-full pointer-events-none ${className}`}
    >
      <div className="inline-flex">
        {children}
        {children}
        {children}
      </div>
    </div>
  )
}

export const SliderItem: React.FC<{ width: number; children: React.ReactNode }> = ({
  width,
  children,
}) => (
  <div className="inline-flex justify-center items-center mx-4" style={{ width }}>
    {children}
  </div>
)

export default SliderContainer
