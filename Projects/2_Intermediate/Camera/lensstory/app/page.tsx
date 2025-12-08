'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Hero from '@/components/Hero'
import FeaturedCameras from '@/components/FeaturedCameras'
import ComparisonSlider from '@/components/ComparisonSlider'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Camera: <span className="gradient-text">Our Second Eyes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From ancient optical experiments to AI-powered computational photography, 
            cameras have transformed how we see, remember, and share our world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <InfoCard 
            title="2,500+ Years"
            description="From Camera Obscura concepts to modern imaging"
            icon="📜"
          />
          <InfoCard 
            title="50+ Camera Types"
            description="Comprehensive database of all camera categories"
            icon="📸"
          />
          <InfoCard 
            title="Deep Tech Insights"
            description="Understand the secrets behind every innovation"
            icon="🔬"
          />
        </div>

        <ComparisonSlider />
      </section>

      <FeaturedCameras />

      <section className="py-20 px-6 bg-steel-grey">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            How Cameras Changed <span className="gradient-text">Human Civilization</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <ImpactCard 
              title="Preserved History"
              description="Photography captured moments that would have been lost forever, from wars to celebrations."
            />
            <ImpactCard 
              title="Scientific Discovery"
              description="Cameras revealed the invisible: X-rays, microscopic worlds, and distant galaxies."
            />
            <ImpactCard 
              title="Social Connection"
              description="Billions share their lives daily through images, connecting across continents."
            />
            <ImpactCard 
              title="Artistic Expression"
              description="A new medium for creativity that democratized visual storytelling."
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-8">Ready to Explore?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Journey through time and discover how light became memory
            </p>
            <Link href="/timeline">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-lens-blue text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Start the Timeline Journey →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function InfoCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-effect p-8 rounded-2xl text-center"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-lens-blue">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

function ImpactCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="p-6 border-l-4 border-lens-blue"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}
