'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Eye, Shield, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">LegalMind AI</Link>
            <div className="flex gap-4">
              <Link href="/" className="px-4 py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link href="/pricing" className="px-4 py-2 text-gray-700 hover:text-primary">Pricing</Link>
              <Link href="/contact" className="px-4 py-2 text-gray-700 hover:text-primary">Contact</Link>
              <Link href="/login" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About LegalMind AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making legal knowledge accessible to everyone through advanced AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To democratize access to legal information by leveraging cutting-edge AI technology. 
              We believe everyone deserves to understand their legal rights and obligations without 
              the complexity and cost traditionally associated with legal research.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <Eye className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A world where legal information is accessible, understandable, and actionable for everyone. 
              We envision a future where AI assists in bridging the gap between complex legal systems 
              and the people they serve.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-12 shadow-lg mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
              <p className="text-gray-600">
                We prioritize factual correctness and cite all sources to ensure reliable information
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Legal knowledge should be available to everyone, regardless of background or budget
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy</h3>
              <p className="text-gray-600">
                Your data is encrypted and protected with enterprise-grade security measures
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">How Our AI Works</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            LegalMind AI uses advanced Retrieval-Augmented Generation (RAG) technology to search through 
            thousands of legal documents and provide accurate, cited answers to your questions. Our system 
            combines semantic search with GPT-4 to deliver reliable legal information.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">1. Search</div>
              <p>We search our extensive legal database using semantic understanding</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">2. Analyze</div>
              <p>AI analyzes relevant documents and extracts key information</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">3. Respond</div>
              <p>Generate clear answers with citations and sources</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Important Legal Disclaimer</h3>
          <p className="text-yellow-700">
            LegalMind AI provides general legal information for educational purposes only. This is not legal advice 
            and should not be relied upon as such. For specific legal matters, please consult with a licensed attorney 
            in your jurisdiction.
          </p>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 LegalMind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
