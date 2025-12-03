'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/camera-types', label: 'Camera Types' },
    { href: '/technology', label: 'Technology' },
    { href: '/compare', label: 'Compare' },
    { href: '/hall-of-fame', label: 'Hall of Fame' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <span className="text-3xl">📷</span>
              <span className="text-2xl font-bold gradient-text">LensStory</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ color: '#1E90FF' }}
                  className="text-aperture-white hover:text-lens-blue transition-colors cursor-pointer"
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-aperture-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="block py-2 hover:text-lens-blue transition-colors">
                  {link.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
