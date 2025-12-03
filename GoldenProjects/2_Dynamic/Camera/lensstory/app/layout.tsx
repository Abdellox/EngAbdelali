import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'LensStory - The Complete Evolution of Cameras',
  description: 'Explore the entire history of cameras, from Camera Obscura to AI-powered smartphone photography. A comprehensive guide to imaging technology.',
  keywords: 'camera history, photography, camera technology, DSLR, mirrorless, film cameras, digital cameras',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
