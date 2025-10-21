import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'My personal portfolio website',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#020617', // Darkest color - matches notch areaasd scroll works now
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#020617' }}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="theme-color" content="#020617" />
        <meta name="msapplication-TileColor" content="#020617" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            color-scheme: dark;
          }
          html {
            background-color: #020617 !important;
          }
          body {
            background-color: #020617 !important;
            padding-top: env(safe-area-inset-top);
          }
          @supports (padding: max(0px)) {
            body {
              padding-top: max(env(safe-area-inset-top), 0px);
            }
          }
        `}} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
