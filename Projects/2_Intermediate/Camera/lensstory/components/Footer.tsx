'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="glass-effect mt-20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">📷</span>
              <span className="text-2xl font-bold gradient-text">LensStory</span>
            </div>
            <p className="text-gray-400 text-sm">
              The complete evolution of cameras and imaging technology.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/timeline" className="hover:text-lens-blue transition-colors">Timeline</Link></li>
              <li><Link href="/camera-types" className="hover:text-lens-blue transition-colors">Camera Types</Link></li>
              <li><Link href="/technology" className="hover:text-lens-blue transition-colors">Technology</Link></li>
              <li><Link href="/compare" className="hover:text-lens-blue transition-colors">Compare</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Learn</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/hall-of-fame" className="hover:text-lens-blue transition-colors">Hall of Fame</Link></li>
              <li><Link href="/about" className="hover:text-lens-blue transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://en.wikipedia.org/wiki/History_of_the_camera" target="_blank" rel="noopener noreferrer" className="hover:text-lens-blue transition-colors">Camera History (Wikipedia)</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 LensStory. Educational resource for photography enthusiasts.
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <span>Made with ❤️ for photography lovers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
