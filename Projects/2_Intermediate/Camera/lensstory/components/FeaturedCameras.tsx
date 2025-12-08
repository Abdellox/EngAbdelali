'use client'

import { motion } from 'framer-motion'

const featuredCameras = [
  {
    name: 'Camera Obscura',
    year: '5th Century BC',
    description: 'The first concept of projecting an image through a small hole.',
    icon: '🏛️',
    color: 'from-yellow-600 to-orange-600'
  },
  {
    name: 'Daguerreotype',
    year: '1839',
    description: 'The first successful photographic process by Louis Daguerre.',
    icon: '🖼️',
    color: 'from-gray-600 to-gray-800'
  },
  {
    name: '35mm Film Camera',
    year: '1913',
    description: 'Led to the portable photography revolution.',
    icon: '🎞️',
    color: 'from-green-600 to-teal-600'
  },
  {
    name: 'DSLR',
    year: '1999',
    description: 'Combined digital sensors with SLR mechanics.',
    icon: '📸',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    name: 'Smartphone Camera',
    year: '2007-Present',
    description: 'Computational photography surpassing traditional optics.',
    icon: '📱',
    color: 'from-purple-600 to-pink-600'
  },
  {
    name: 'AI Cameras',
    year: 'Future',
    description: 'Neural rendering and light field technology.',
    icon: '🤖',
    color: 'from-cyan-600 to-blue-600'
  }
]

export default function FeaturedCameras() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-pitch-black to-steel-grey">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Camera Innovations</span>
          </h2>
          <p className="text-xl text-gray-300">
            Key milestones that shaped photography history
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCameras.map((camera, index) => (
            <motion.div
              key={camera.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-effect p-8 rounded-2xl cursor-pointer group"
            >
              <div className={`text-6xl mb-4 bg-gradient-to-br ${camera.color} w-20 h-20 rounded-2xl flex items-center justify-center`}>
                {camera.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-lens-blue transition-colors">
                {camera.name}
              </h3>
              <div className="text-lens-blue font-semibold mb-3">{camera.year}</div>
              <p className="text-gray-300">{camera.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
