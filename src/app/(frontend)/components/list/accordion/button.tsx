import React from 'react'
import { motion } from 'framer-motion'
import { AnimationConfig } from './AnimationConfig'
import localFont from 'next/font/local'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

const dinamit = localFont({
  src: [
    {
      path: '../../../../../../public/fonts/dinamit/Dinamit_Bold_Trial_A.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-dinamit',
  display: 'swap',
})

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      transition={{
        duration: AnimationConfig.VERY_FAST,
        ease: AnimationConfig.EASING as any,
      }}
      initial={{
        backgroundColor: 'rgba(0,0,0,1)',
        color: '#fff',
      }}
      whileHover={{
        backgroundColor: 'rgba(255,255,255,1)',
        color: '#000',
      }}
      className={clsx(
        'text-white *:text-white font-medium text-small leading-none rounded-full px-6 py-4 border-solid border border-gray-full',
        dinamit.variable,
      )}
    >
      {children}
    </motion.button>
  )
}

export default Button
