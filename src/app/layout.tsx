import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vandoko - AI-Powered Market Intelligence for Auto Dealers',
  description: 'Real-time inventory tracking and competitive insights that turn market pressure into market dominance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navigation />
        <div className="pt-24">
          {children}
        </div>
      </body>
    </html>
  )
}