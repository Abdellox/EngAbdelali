'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cameraHistory } from '@/data/cameraHistory'

export default function Compare() {
  const [camera1, setCamera1] = useState(cameraHistory[1].id) // Daguerreotype
  const [camera2, setCamera2] = useState(cameraHistory[12].id) // Computational Photography

  const cam1 = cameraHistory.find(c => c.id === camera1)
  const cam2 = cameraHistory.find(c => c.id === camera2)

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Compare Cameras</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how camera technology evolved by comparing any two innovations side-by-side
          </p>
        </motion.div>

        {/* Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <label className="block text-lg font-semibold mb-3">Select First Camera</label>
            <select
              value={camera1}
              onChange={(e) => setCamera1(e.target.value)}
              className="w-full glass-effect px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lens-blue"
            >
              {cameraHistory.map(cam => (
                <option key={cam.id} value={cam.id} className="bg-pitch-black">
                  {cam.year} - {cam.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3">Select Second Camera</label>
            <select
              value={camera2}
              onChange={(e) => setCamera2(e.target.value)}
              className="w-full glass-effect px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lens-blue"
            >
              {cameraHistory.map(cam => (
                <option key={cam.id} value={cam.id} className="bg-pitch-black">
                  {cam.year} - {cam.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison */}
        {cam1 && cam2 && (
          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard camera={cam1} side="left" />
            <ComparisonCard camera={cam2} side="right" />
          </div>
        )}

        {/* Evolution Summary */}
        {cam1 && cam2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-effect p-8 rounded-2xl border-2 border-lens-blue/30"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="gradient-text">Evolution Summary</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">📅</div>
                <div className="text-2xl font-bold text-lens-blue mb-2">
                  {calculateYearDifference(cam1.year, cam2.year)} years
                </div>
                <div className="text-gray-400">Time Difference</div>
              </div>
              <div>
                <div className="text-4xl mb-2">🔄</div>
                <div className="text-2xl font-bold text-lens-blue mb-2">
                  {cam1.era} → {cam2.era}
                </div>
                <div className="text-gray-400">Era Evolution</div>
              </div>
              <div>
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-lens-blue mb-2">
                  Revolutionary
                </div>
                <div className="text-gray-400">Impact Level</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

function ComparisonCard({ camera, side }: { camera: any; side: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect rounded-2xl overflow-hidden"
    >
      <div className="h-48 bg-gradient-to-br from-lens-blue to-steel-grey flex items-center justify-center text-6xl">
        📷
      </div>
      <div className="p-6">
        <div className="text-lens-blue font-semibold mb-2">{camera.year}</div>
        <h3 className="text-3xl font-bold mb-2">{camera.title}</h3>
        <div className="text-sm text-gray-400 mb-4">{camera.era}</div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lens-blue mb-2">Description</h4>
            <p className="text-gray-300 text-sm">{camera.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lens-blue mb-2">How It Works</h4>
            <p className="text-gray-300 text-sm">{camera.howItWorks}</p>
          </div>

          <div className="glass-effect p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/30">
            <h4 className="font-semibold text-yellow-400 mb-2">🔐 Secret</h4>
            <p className="text-gray-300 text-sm">{camera.secret}</p>
          </div>

          <div className="glass-effect p-4 rounded-lg bg-lens-blue/5 border border-lens-blue/30">
            <h4 className="font-semibold text-lens-blue mb-2">💡 Fun Fact</h4>
            <p className="text-gray-300 text-sm">{camera.funFact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function calculateYearDifference(year1: string, year2: string): number {
  const extractYear = (yearStr: string): number => {
    const match = yearStr.match(/\d{4}/)
    return match ? parseInt(match[0]) : 0
  }
  
  const y1 = extractYear(year1)
  const y2 = extractYear(year2)
  return Math.abs(y2 - y1)
}
