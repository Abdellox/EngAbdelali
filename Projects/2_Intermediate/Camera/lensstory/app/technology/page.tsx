'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { technologyTopics, techCategories } from '@/data/technologySecrets'

export default function Technology() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const filteredTopics = selectedCategory === 'All'
    ? technologyTopics
    : technologyTopics.filter(topic => topic.category === selectedCategory)

  const selectedItem = technologyTopics.find(topic => topic.id === selectedTopic)

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Technology Secrets</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deep technical explanations made simple - understand how cameras really work
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {techCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-lens-blue text-white'
                  : 'glass-effect hover:bg-steel-grey'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedTopic(topic.id)}
              className="glass-effect p-6 rounded-2xl cursor-pointer hover:border-lens-blue border-2 border-transparent transition-all"
            >
              <div className="text-lens-blue text-sm font-semibold mb-2">
                {topic.category}
              </div>
              <h3 className="text-2xl font-bold mb-3">{topic.title}</h3>
              <p className="text-gray-300 mb-4">{topic.description}</p>
              <button className="text-lens-blue hover:underline">
                Learn more →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTopic(null)}
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
                  <div className="text-lens-blue font-semibold mb-2">{selectedItem.category}</div>
                  <h2 className="text-4xl font-bold mb-2">{selectedItem.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="text-4xl hover:text-lens-blue transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-lens-blue">Overview</h3>
                  <p className="text-gray-300 text-lg">{selectedItem.description}</p>
                </div>

                <div className="glass-effect p-6 rounded-xl bg-lens-blue/5 border-2 border-lens-blue/30">
                  <h3 className="text-xl font-bold mb-3 text-lens-blue">Detailed Explanation</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedItem.explanation}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-lens-blue">Key Points</h3>
                  <div className="space-y-3">
                    {selectedItem.keyPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 glass-effect p-4 rounded-lg"
                      >
                        <div className="text-lens-blue font-bold text-xl">•</div>
                        <p className="text-gray-300">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-steel-grey/50 p-6 rounded-xl text-center">
                  <div className="text-6xl mb-3">📊</div>
                  <p className="text-gray-400 text-sm">Interactive diagram placeholder</p>
                  <p className="text-gray-500 text-xs mt-2">{selectedItem.diagram}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
