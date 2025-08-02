import localFont from 'next/font/local'

// const montserratt = localFont({
//   src: [
//     {
//       path: '../fonts/montserrat/Montserrat-VariableFont_wght.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
// })

// const montserrattBold = localFont({
//   src: [
//     {
//       path: '../fonts/montserrat/Montserrat-Bold.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
// })

//Montserrat-Bold.ttf

type Props = {
  children?: React.ReactNode
  style?: string
  // title?: string;
  style2?: string
  overline?: string
}

const Banner = ({ children, style, style2, overline }: Props) => {
  return (
    <section className={`banner-container container ${style}`}>
      <div className={`m-auto h-full flex h-fit flex-col ${style2}`}>
        <h1
          className={`text-center text-xl md:text-5xl md:w-58rem m-auto ${montserratt.className}`}
        >
          {children}
          {/* We're a{" "}
          <strong className={` ${montserrattBold.className}`}>
            multi-disciplinary
          </strong>{" "}
          Real Estate development firm focusing on developing properties that
          connect{" "}
          <strong className={` ${montserrattBold.className}`}>Nature</strong>,{" "}
          <strong className={` ${montserrattBold.className}`}>
            Architecture
          </strong>
          ,{" "}
          <strong className={` ${montserrattBold.className}`}>
            Technology
          </strong>
          , and{" "}
          <strong className={` ${montserrattBold.className}`}>
            Functionality
          </strong>
          . */}
        </h1>
        <div className="flex justify-center flex-col m-auto w-fit text-center mt-8">
          <p>{overline}</p>
        </div>
      </div>
    </section>
  )
}

export default Banner
