import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import localFont from 'next/font/local'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.scss'
import { getServerSideURL } from '@/utilities/getURL'
import ClientShell from './ClientShell' // adjust path as needed

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

const montserratt = localFont({
  src: [
    {
      path: '../../../public/fonts/montserrat/Montserrat-VariableFont_wght.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})

const montserrattBold = localFont({
  src: [
    {
      path: '../../../public/fonts/montserrat/Montserrat-Bold.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" className={`${montserratt.className}`}>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <ClientShell preview={isEnabled}>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  )
}
