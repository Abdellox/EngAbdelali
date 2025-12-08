'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cameraTypes, categories } from '@/data/cameraTypes'

export default function CameraTypes() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCameras = cameraTypes.filter(camera => {
    const matchesCategory = selectedCategory === 'All' || camera.category === selectedCategory
    const matchesSearch = camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         camera.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Camera Types</span> Encyclopedia
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore every type of camera ever created, from film to digital, consumer to scientific
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search cameras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-effect px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-lens-blue"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
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

        {/* Camera Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-2xl overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-steel-grey to-pitch-black flex items-center justify-center text-6xl">
                📷
              </div>
              <div className="p-6">
                <div className="text-lens-blue text-sm font-semibold mb-2">
                  {camera.category} • {camera.yearIntroduced}
                </div>
                <h3 className="text-2xl font-bold mb-3">{camera.name}</h3>
                <p className="text-gray-300 mb-4">{camera.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-green-400 mb-2">✓ Advantages</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {camera.advantages.slice(0, 3).map((adv, i) => (
                      <li key={i}>• {adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {camera.disadvantages.slice(0, 2).map((dis, i) => (
                      <li key={i}>• {dis}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lens-blue mb-2">Use Cases</h4>
                  <div className="flex flex-wrap gap-2">
                    {camera.useCases.slice(0, 3).map((useCase, i) => (
                      <span key={i} className="text-xs bg-lens-blue/20 px-3 py-1 rounded-full">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCameras.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No cameras found matching your criteria</p>
          </div>
        )}
      </div>
    </main>
  )
}
