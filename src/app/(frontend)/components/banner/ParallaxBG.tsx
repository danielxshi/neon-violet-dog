'use client'
import { Parallax } from 'react-parallax'

type Props = {
  children?: React.ReactNode
  style?: string
  url: string
}

const ParallaxBG = ({ children, style, url }: Props) => {
  return (
    // <section className={`${props.style}`}>{children}</section>

    <div className={`parallax-bg-container relative h-screen flex ${style}`}>
      {/* <div className="z-10 block relative gallery-bg">{children}</div> */}

      <Parallax
        // blur={{ min: 0, max: 5 }}
        bgImage={url}
        bgImageAlt="the dog"
        className=""
        strength={-300}
      >
        {children}
      </Parallax>
    </div>
  )
}

export default ParallaxBG
