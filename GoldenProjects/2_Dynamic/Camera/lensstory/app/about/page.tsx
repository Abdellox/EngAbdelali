'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">LensStory</span>
          </h1>
          <p className="text-2xl text-gray-300">
            The Camera: Our Second Eyes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <section className="glass-effect p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 text-lens-blue">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              LensStory exists to preserve and share the complete history of cameras and imaging technology. 
              We believe that understanding how cameras evolved helps us appreciate the incredible technology 
              we use every day and inspires the next generation of innovators.
            </p>
          </section>

          <section className="glass-effect p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 text-lens-blue">Why Cameras Matter</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Cameras are humanity's "second eyes" - they extend our vision across time and space. 
              They've transformed civilization in profound ways:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-lens-blue pl-4">
                <h3 className="font-bold text-xl mb-2">Preserving Memory</h3>
                <p className="text-gray-300">
                  Photography captures moments that would otherwise be lost forever, creating a visual 
                  record of human history.
                </p>
              </div>
              <div className="border-l-4 border-lens-blue pl-4">
                <h3 className="font-bold text-xl mb-2">Scientific Discovery</h3>
                <p className="text-gray-300">
                  From X-rays to telescopes, cameras reveal worlds invisible to the naked eye, 
                  advancing human knowledge.
                </p>
              </div>
              <div className="border-l-4 border-lens-blue pl-4">
                <h3 className="font-bold text-xl mb-2">Social Connection</h3>
                <p className="text-gray-300">
                  Billions of people share their lives through images daily, connecting across 
                  continents and cultures.
                </p>
              </div>
              <div className="border-l-4 border-lens-blue pl-4">
                <h3 className="font-bold text-xl mb-2">Artistic Expression</h3>
                <p className="text-gray-300">
                  Photography democratized visual art, giving everyone the tools to create and 
                  share their vision.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-effect p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 text-lens-blue">What You'll Find Here</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📜</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Complete Timeline</h3>
                  <p className="text-gray-300">
                    2,500 years of optical innovation, from Camera Obscura to AI-powered computational photography
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">📷</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Camera Encyclopedia</h3>
                  <p className="text-gray-300">
                    Every type of camera ever created, from film to digital, consumer to scientific
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔬</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Technology Secrets</h3>
                  <p className="text-gray-300">
                    Deep technical explanations made simple - understand how cameras really work
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">⚖️</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Compare & Contrast</h3>
                  <p className="text-gray-300">
                    See how technology evolved by comparing cameras from different eras
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Hall of Fame</h3>
                  <p className="text-gray-300">
                    The most iconic and influential cameras that shaped photography history
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-effect p-8 rounded-2xl bg-gradient-to-br from-lens-blue/10 to-transparent border-2 border-lens-blue/30">
            <h2 className="text-3xl font-bold mb-4 text-lens-blue">The Cultural Impact</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Photography has fundamentally changed human civilization. Before cameras, only the wealthy 
              could afford painted portraits. Historical events were recorded through text and drawings, 
              subject to interpretation and bias.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              The camera democratized image-making and created objective visual records. It exposed 
              social injustices, documented wars, captured scientific phenomena, and allowed ordinary 
              people to preserve their family histories.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Today, with billions of cameras in pockets worldwide, we're creating a visual record of 
              human experience at an unprecedented scale. Understanding this technology's history helps 
              us appreciate its profound impact on society.
            </p>
          </section>

          <section className="glass-effect p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Join the Journey</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Whether you're a photographer, historian, engineer, or simply curious about technology, 
              LensStory offers something for everyone. Explore the timeline, discover camera types, 
              and understand the secrets behind the images we create every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/timeline" className="bg-lens-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                Explore Timeline
              </a>
              <a href="/camera-types" className="glass-effect px-8 py-3 rounded-full font-semibold hover:bg-steel-grey transition-colors">
                Browse Cameras
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  )
}
