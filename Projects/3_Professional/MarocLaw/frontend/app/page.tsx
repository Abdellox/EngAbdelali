'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, FileSearch, BookOpen, Clock, Shield, Link as LinkIcon } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'Instant Answers',
      description: 'Get immediate responses to your legal questions powered by advanced AI'
    },
    {
      icon: FileSearch,
      title: 'Document Analysis',
      description: 'Upload and analyze legal documents with AI-powered insights'
    },
    {
      icon: BookOpen,
      title: 'Case Research',
      description: 'Search through thousands of legal precedents and regulations'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access legal assistance anytime, anywhere, on any device'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with enterprise-grade security'
    },
    {
      icon: LinkIcon,
      title: 'Citation Sources',
      description: 'Every answer includes verified sources and legal references'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">LegalMind AI</Link>
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-primary transition">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition">About</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-primary transition">Pricing</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition">Contact</Link>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-primary">
                Login
              </Link>
              <Link href="/signup" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Your AI-Powered Legal Assistant
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Get instant answers to legal questions with advanced AI technology. Fast, accurate, and always available.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <Link href="/signup" className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary-hover transition transform hover:scale-105">
              Start Free Trial
            </Link>
            <Link href="/assistant" className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition">
              Try Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who trust LegalMind AI</p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-white text-primary rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LegalMind AI</h3>
              <p className="text-gray-400">Making legal knowledge accessible through AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/assistant" className="text-gray-400 hover:text-white">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 LegalMind AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
