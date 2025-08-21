'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './style.module.scss'

export default function BookNowButton() {
  return (
    <Link href="https://beclearmedia.as.me/schedule/6d555a9d">
      <div className={`${styles.button} rounded-full`}>
        <motion.div
          className={styles.slider}
          initial={{ y: 0 }}
          whileHover={{ y: '-50%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.el}>
            <PerspectiveText label="Book Now" />
          </div>
          <div className={styles.el}>
            <PerspectiveText label="Let's Go" />
          </div>
        </motion.div>
      </div>
    </Link>
  )
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
    </div>
  )
}
