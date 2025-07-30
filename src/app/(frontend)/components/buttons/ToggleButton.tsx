'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './togglebuttons.module.scss'

interface Props {
  primaryText: string
  maskedText: string
  onClick?: () => void
}

export default function MaskedButton({ primaryText, maskedText, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
      animate={{
        backgroundColor: isHovered ? '#0000FF' : '#fff', // Change background color on hover
        color: isHovered ? '#fff' : '#000', // Change text color on hover
        scale: isHovered ? 1.05 : 1, // Expand slightly on hover
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier easing for scale and background color
      }}
    >
      <span className={styles.mask}>
        <motion.span
          className={styles.text}
          initial={{ y: 0, letterSpacing: '0px' }}
          animate={{
            y: isHovered ? '-1.6em' : '0em',
            letterSpacing: isHovered ? '.05em' : '0px', // Animate letter spacing
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier easing
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ opacity: isHovered ? 0 : 1 }} // Animate opacity
            transition={{
              duration: 0.4,
              ease: 'easeInOut', // Smooth easing for opacity change
            }}
          >
            {primaryText}
          </motion.span>
          <span>{maskedText}</span>
        </motion.span>
      </span>
    </motion.button>
  )
}
