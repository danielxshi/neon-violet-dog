'use client'

type Props = {
  children?: React.ReactNode
  url: string
  excerpt?: string
  title?: string
  website: string
}

const Banner = ({ children, url, excerpt, title, website }: Props) => {
  return (
    <div className="max-h-screen h-full max-w-[90vw] overflow-hidden absolute flex justify-center  my-auto w-full z-10 leading-[1.35] mx-[7.5vw]">
      <div className="flex my-auto h-full text-white pt-[20vh] pb-[12.5vh] ">
        <div className="my-auto mx-auto text-left">
          <h1 className={`m-auto mb-4 text-[2.5rem] lg:text-[3rem] normal-case`}>{children} </h1>
        </div>
      </div>
    </div>
  )
}

export default Banner
