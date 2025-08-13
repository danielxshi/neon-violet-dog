'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimationConfig } from './AnimationConfig'
import Link from 'next/link'
import Arrow from '../../../../../../public/images/icon-arrow-forward.svg'

type ArrowRightIconProps = {
  isHovering: boolean
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ isHovering }) => (
  <div className="w-[1em] h-[1em] overflow-hidden relative">
    {/* First Arrow (animates out) */}
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute h-[1em] w-[1em]"
      transition={{
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      }}
      initial={{ x: '0em', opacity: 1 }}
      animate={{ x: isHovering ? '1em' : '0em', opacity: isHovering ? 0 : 1 }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </motion.svg>

    {/* Second Arrow (animates in) */}
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute h-[1em] w-[1em]"
      transition={{
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      }}
      initial={{ x: '-1em', opacity: 0 }}
      animate={{ x: isHovering ? '0em' : '-1em', opacity: isHovering ? 1 : 0 }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </motion.svg>
  </div>
)

type LinkListItemProps = {
  id: string
  name: string
  description?: string
  href: string
}

const LinkListItem: React.FC<LinkListItemProps> = ({ id, name, description, href }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      className="border-b border-[rgba(0,0,0,.4)]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      transition={{
        duration: AnimationConfig.FAST,
        ease: AnimationConfig.EASING,
      }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0, x: '-5%' }}
      animate={{ opacity: isHovering ? 1 : 0.65, x: '0%' }}
    >
      <Link href={href}>
        <div className="reset-link cursor-pointer grid grid-cols-[2fr_8fr_1fr] md:grid-cols-[1fr_2fr_1fr] text-medium py-[1.2em] font-serif border-t border-[rgba(255,255,255,.17)]">
          <div className="font-mono font-light">{id}</div>
          <div>
            <h3>{name}</h3>
            {description && <p className="font-roboto text-tiny mt-[.5em]">{description}</p>}
          </div>
          <div className="ml-auto my-auto text-[1.2em]">
            <ArrowRightIcon isHovering={isHovering} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default LinkListItem
