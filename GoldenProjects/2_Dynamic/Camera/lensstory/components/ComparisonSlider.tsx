'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="glass-effect p-8 rounded-2xl">
      <h3 className="text-3xl font-bold mb-8 text-center">
        Ancient vs Modern: <span className="gradient-text">The Evolution</span>
      </h3>
      
      <div className="relative h-96 rounded-xl overflow-hidden">
        {/* Ancient Camera Side */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 to-orange-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🏛️</div>
            <h4 className="text-2xl font-bold">Camera Obscura</h4>
            <p className="text-gray-300">400 BC - 1600s</p>
            <ul className="mt-4 text-left max-w-xs mx-auto space-y-2">
              <li>✓ Pinhole projection</li>
              <li>✓ No permanent image</li>
              <li>✓ Room-sized device</li>
              <li>✓ Manual observation</li>
            </ul>
          </div>
        </div>

        {/* Modern Camera Side */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="text-center">
            <div className="text-8xl mb-4">📱</div>
            <h4 className="text-2xl font-bold">Smartphone Camera</h4>
            <p className="text-gray-300">2007 - Present</p>
            <ul className="mt-4 text-left max-w-xs mx-auto space-y-2">
              <li>✓ Multi-lens system</li>
              <li>✓ AI processing</li>
              <li>✓ Pocket-sized</li>
              <li>✓ Instant sharing</li>
            </ul>
          </div>
        </motion.div>

        {/* Slider */}
        <div
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-pitch-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Interactive Area */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      <p className="text-center text-gray-400 mt-4">
        Drag the slider to compare ancient and modern camera technology
      </p>
    </div>
  )
}
