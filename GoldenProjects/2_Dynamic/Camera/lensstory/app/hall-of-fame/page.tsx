'use client'

import { motion } from 'framer-motion'

const famousCameras = [
  {
    id: 1,
    name: 'Kodak Brownie',
    year: '1900',
    significance: 'Made photography accessible to everyone',
    description: 'The first truly affordable camera for the masses, selling for just $1. It democratized photography and launched Kodak\'s dominance.',
    icon: '📦',
    impact: 'Cultural Revolution'
  },
  {
    id: 2,
    name: 'Leica I',
    year: '1925',
    significance: 'Created the 35mm format standard',
    description: 'Oskar Barnack\'s masterpiece established 35mm as the professional standard for nearly a century.',
    icon: '🎞️',
    impact: 'Technical Standard'
  },
  {
    id: 3,
    name: 'Polaroid SX-70',
    year: '1972',
    significance: 'Instant photography perfected',
    description: 'The first instant SLR camera with folding design. A marvel of engineering that produced instant prints.',
    icon: '⚡',
    impact: 'Innovation Milestone'
  },
  {
    id: 4,
    name: 'Nikon F',
    year: '1959',
    significance: 'Professional SLR standard',
    description: 'Established Nikon as a professional brand and set the template for modern SLR design.',
    icon: '🏆',
    impact: 'Professional Standard'
  },
  {
    id: 5,
    name: 'Canon AE-1',
    year: '1976',
    significance: 'First microprocessor-controlled camera',
    description: 'Brought electronic automation to the masses and made SLRs accessible to enthusiasts.',
    icon: '💻',
    impact: 'Electronic Revolution'
  },
  {
    id: 6,
    name: 'Sony Alpha 7',
    year: '2013',
    significance: 'Full-frame mirrorless revolution',
    description: 'Proved that mirrorless could match DSLR quality in a compact body, changing the industry forever.',
    icon: '🔮',
    impact: 'Industry Shift'
  },
  {
    id: 7,
    name: 'Hasselblad 500C',
    year: '1957',
    significance: 'The Moon Camera',
    description: 'Medium format excellence. Modified versions went to the moon with Apollo missions.',
    icon: '🌙',
    impact: 'Historic Achievement'
  },
  {
    id: 8,
    name: 'iPhone Camera',
    year: '2007-Present',
    significance: 'Put a camera in every pocket',
    description: 'Made photography ubiquitous and social. More photos are taken with iPhones than any other camera.',
    icon: '📱',
    impact: 'Mass Adoption'
  },
  {
    id: 9,
    name: 'GoPro HERO',
    year: '2004',
    significance: 'Action camera pioneer',
    description: 'Created an entirely new category and changed how we capture adventure and sports.',
    icon: '🏄',
    impact: 'New Category'
  },
  {
    id: 10,
    name: 'Canon EOS 5D Mark II',
    year: '2008',
    significance: 'DSLR video revolution',
    description: 'First affordable full-frame camera with HD video, revolutionizing independent filmmaking.',
    icon: '🎬',
    impact: 'Filmmaking Tool'
  },
  {
    id: 11,
    name: 'Leica M3',
    year: '1954',
    significance: 'Rangefinder perfection',
    description: 'Considered by many as the finest rangefinder ever made. Set the standard for precision and quality.',
    icon: '💎',
    impact: 'Design Excellence'
  },
  {
    id: 12,
    name: 'Google Pixel',
    year: '2016-Present',
    significance: 'Computational photography leader',
    description: 'Proved that software and AI could overcome hardware limitations, pioneering Night Sight and HDR+.',
    icon: '🤖',
    impact: 'AI Innovation'
  }
]

export default function HallOfFame() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Hall of Fame</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The most iconic and influential cameras that shaped photography history
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {famousCameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-2xl overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-lens-blue via-steel-grey to-pitch-black flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                {camera.icon}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{camera.name}</h3>
                    <div className="text-lens-blue font-semibold">{camera.year}</div>
                  </div>
                  <div className="text-3xl">🏆</div>
                </div>
                
                <div className="mb-4">
                  <div className="inline-block bg-lens-blue/20 text-lens-blue px-3 py-1 rounded-full text-sm font-semibold">
                    {camera.impact}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">Significance</h4>
                  <p className="text-gray-300 text-sm">{camera.significance}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lens-blue mb-2">Story</h4>
                  <p className="text-gray-300 text-sm">{camera.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-effect p-8 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">What Makes a Camera Legendary?</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold mb-2">Innovation</h3>
              <p className="text-sm text-gray-300">Introduced groundbreaking technology</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold mb-2">Impact</h3>
              <p className="text-sm text-gray-300">Changed how people photograph</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold mb-2">Longevity</h3>
              <p className="text-sm text-gray-300">Influenced design for decades</p>
            </div>
            <div>
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-bold mb-2">Legacy</h3>
              <p className="text-sm text-gray-300">Beloved by photographers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
