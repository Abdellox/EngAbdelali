'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pitch-black via-steel-grey to-pitch-black">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-lens-blue rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-9xl mb-8"
          >
            📷
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Camera: <span className="gradient-text">Our Second Eyes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            A Journey Through Light, Time & Technology
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-lens-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Explore History
            </motion.a>
            <motion.a
              href="/timeline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-lens-blue transition-colors"
            >
              View Timeline
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-gray-400 text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-lens-blue rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
