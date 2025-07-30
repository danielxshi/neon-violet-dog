'use client'

import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative h-screen">
      {/* Noise overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]"
        style={{
          background: `url("https://www.gryphonliving.com/static/media/background_noise.735964358a992a7fe340.png"), linear-gradient(rgba(16, 27, 62, 0) 0%, rgb(16, 27, 62) 95%)`,
        }}
      ></div>

      {/* Centered content */}
      <div className="absolute flex items-center justify-center h-full w-full z-[999]">
        <h1 className="text-6xl font-bold text-center text-[#efefef]">
          Have an idea? <br /> Tell us
        </h1>
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-[0]"
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
  )
}
