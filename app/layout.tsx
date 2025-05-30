import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { NAME, SITE_URL } from './data'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: {
    default: NAME,
    template: `%s | ${NAME}`,
  },
  description: `Software and tech blog by ${NAME}`,
  metadataBase: new URL(SITE_URL),
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-background tracking-tight antialiased`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute='class'
          storageKey='theme'
          defaultTheme='system'
        >
          <div className='flex min-h-screen w-full flex-col font-[family-name:var(--font-geist)]'>
            <div
              className='relative mx-auto flex w-full max-w-screen-sm flex-1 flex-col space-y-8 px-4
                pt-12'
            >
              <Header />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
