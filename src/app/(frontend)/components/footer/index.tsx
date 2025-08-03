import React from 'react'
import ToggleButton from '../../components/buttons/ToggleButton'
import CTASection from './cta'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../../public/images/BE CLEAR MEDIA-logo.png'
export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative h-[200vh] bg-black"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[200vh] w-full">
        <div className="flex flex-col w-full md:flex-row justify-between h-full px-8 md:px-20 pb-40 text-white font-light">
          {/* Left: Branding and Contact */}
          <div className="flex flex-col space-y-6 mt-auto mb-0 w-full">
            <footer className="bg-black text-white px-6 space-y-12">
              {/* Top logo */}
              <Link href="/">
                <Image
                  className="cursor-pointer"
                  src={Logo}
                  alt="Be Clear Media Logo"
                  width={140} // Adjust width as needed
                  height={70} // Adjust height as needed
                  priority // Ensures the logo loads quickly
                />
              </Link>

              {/* Main footer grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-sm pt-12">
                {/* Left block */}
                <div className="space-y-4 md:col-span-6">
                  <div className="font-bold uppercase text-lg leading-relaxed">
                    We would love to <br />
                    <span className="text-white font-extrabold">hear from you.</span>
                  </div>
                  <div>Become a client</div>
                  <div className="leading-relaxed">
                    Drop us a message via email. <br />
                    <a href="mailto:info@beclearmedia.com" className="text-white underline">
                      info@beclearmedia.com
                    </a>
                  </div>
                </div>

                <div className="col-start-[-1] col-span-6 flex flex-col md:flex-row gap-x-16 space-y-6 md:space-y-0">
                  {/* Address */}
                  <div className="space-y-4 *:space-y-4">
                    <div className="font-semibold">Our Address</div>
                    <p className="opacity-80">
                      203, 5188 Westminster Hwy, <br /> Richmond BC V7C 5S7
                    </p>
                    <p className="mt-2">(604) 618-8641</p>
                  </div>
                  {/* Follow Us */}
                  <div className="space-y-4 *:space-y-4">
                    <div className="font-semibold">Follow Us</div>
                    <ul>
                      <li>
                        <a href="#" className="hover:underline">
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          YouTube
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          TikTok
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Sitemap */}
                  <div className="space-y-4 *:space-y-4">
                    <div className="font-semibold">Sitemap</div>
                    <ul>
                      {['Home', 'Pricing', 'Services', 'Work', 'About', 'Contact'].map((page) => (
                        <li key={page}>
                          <Link href={`/${page.toLowerCase()}`} className="hover:underline">
                            {page}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* Right: Social Links */}
          {/* <div className="flex flex-col space-y-6 mt-auto mb-0 text-right">
            <a href="#" className="uppercase hover:underline">
              Wechat
            </a>
            <a href="#" className="uppercase hover:underline">
              Twitter
            </a>
            <a href="#" className="uppercase hover:underline">
              Facebook
            </a>
            <a href="#" className="uppercase hover:underline">
              Instagram
            </a>
            <a href="#" className="uppercase hover:underline">
              Little Red Book
            </a>

            <p className="text-xs text-neutral-400 mt-8">Website by JIAHAUS</p>
          </div> */}
        </div>
      </div>

      {/* Empty space for children */}
      <div className="absolute bottom-0 w-full h-[100vh]">
        <CTASection />
      </div>
    </div>
  )
}
