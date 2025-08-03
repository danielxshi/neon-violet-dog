'use client'

import { motion } from 'framer-motion'
import Banner from '../components/banner/HeaderBanner'

interface Props {
  children?: React.ReactNode
}

export default function HomeClient({ children }: Props) {
  return (
    <main className="flex-1">
      <Banner
        title="We're a multi-disciplinary Real Estate development firm focusing on developing properties that connect Nature, Architecture, Technology, and Functionality."
        url=""
        website="https://example.com"
      ></Banner>
      <section className="relative">
        {/* Noise overlay */}
        {/* <div
          className="absolute top-0 left-0 w-full h-[calc(100%+1px)] pointer-events-none z-[1]"
          style={{
            background: `url("https://www.gryphonliving.com/static/media/background_noise.735964358a992a7fe340.png"), linear-gradient(rgba(16, 27, 62, 0) 0%, rgb(16, 27, 62) 95%)`,
          }}
        ></div> */}

        <motion.div
          className="z-[10] w-full h-screen overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src="https://player.vimeo.com/progressive_redirect/playback/838386999/rendition/720p/file.mp4?loc=external&log_user=0&signature=776cddfad94830fa3fcb98d0ac080d53d04db6e6cadf2d72d4215c7ee1c1c1b4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </motion.div>
      </section>
    </main>
  )
}
