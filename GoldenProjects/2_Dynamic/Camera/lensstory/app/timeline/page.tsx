'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cameraHistory } from '@/data/cameraHistory'

const eras = ['All', 'Early Concepts', 'First Photography', 'Film Era', 'Digital Revolution', 'Smartphone Era', 'AI & Future']

export default function Timeline() {
  const [selectedEra, setSelectedEra] = useState('All')
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  const filteredHistory = selectedEra === 'All' 
    ? cameraHistory 
    : cameraHistory.filter(entry => entry.era === selectedEra)

  const selectedItem = cameraHistory.find(entry => entry.id === selectedEntry)

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The <span className="gradient-text">Complete Timeline</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Journey through 2,500 years of optical innovation, from ancient concepts to AI-powered imaging
          </p>
        </motion.div>

        {/* Era Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedEra === era
                  ? 'bg-lens-blue text-white'
                  : 'glass-effect hover:bg-steel-grey'
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lens-blue via-steel-grey to-lens-blue" />

          {/* Timeline entries */}
          <div className="space-y-12">
            {filteredHistory.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-lens-blue rounded-full border-4 border-pitch-black transform -translate-x-1/2 z-10" />

                {/* Content card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEntry(entry.id)}
                    className="glass-effect p-6 rounded-2xl cursor-pointer hover:border-lens-blue border-2 border-transparent transition-all"
                  >
                    <div className="text-lens-blue font-semibold mb-2">{entry.year}</div>
                    <h3 className="text-2xl font-bold mb-2">{entry.title}</h3>
                    <div className="text-sm text-gray-400 mb-3">{entry.era}</div>
                    <p className="text-gray-300 mb-4">{entry.description}</p>
                    <button className="text-lens-blue hover:underline">
                      Learn more →
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEntry(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-lens-blue font-semibold mb-2">{selectedItem.year}</div>
                  <h2 className="text-4xl font-bold mb-2">{selectedItem.title}</h2>
                  <div className="text-gray-400">{selectedItem.era}</div>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-4xl hover:text-lens-blue transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-lens-blue">Overview</h3>
                  <p className="text-gray-300">{selectedItem.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-lens-blue">How It Works</h3>
                  <p className="text-gray-300">{selectedItem.howItWorks}</p>
                </div>

                <div className="glass-effect p-6 rounded-xl border-2 border-lens-blue/30">
                  <h3 className="text-xl font-bold mb-3 text-lens-blue">💡 Fun Fact</h3>
                  <p className="text-gray-300">{selectedItem.funFact}</p>
                </div>

                <div className="glass-effect p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/5">
                  <h3 className="text-xl font-bold mb-3 text-yellow-400">🔐 Secret Innovation</h3>
                  <p className="text-gray-300">{selectedItem.secret}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
