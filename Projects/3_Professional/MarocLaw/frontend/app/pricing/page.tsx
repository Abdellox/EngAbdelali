'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for trying out LegalMind AI',
      features: [
        { text: '10 questions per month', included: true },
        { text: 'Basic chat interface', included: true },
        { text: 'Email support', included: true },
        { text: 'Community access', included: true },
        { text: 'Document upload', included: false },
        { text: 'Priority support', included: false },
        { text: 'Export conversations', included: false },
      ],
      cta: 'Get Started',
      href: '/signup',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For professionals and frequent users',
      features: [
        { text: 'Unlimited questions', included: true },
        { text: 'Advanced chat interface', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Document upload (10/month)', included: true },
        { text: 'Export conversations', included: true },
        { text: 'Advanced search', included: true },
        { text: 'API access', included: false },
      ],
      cta: 'Start Free Trial',
      href: '/signup',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For teams and organizations',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Unlimited documents', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'SLA guarantee', included: true },
      ],
      cta: 'Contact Sales',
      href: '/contact',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">LegalMind AI</Link>
            <div className="flex gap-4">
              <Link href="/" className="px-4 py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link href="/about" className="px-4 py-2 text-gray-700 hover:text-primary">About</Link>
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for you. All plans include access to our AI-powered legal assistant.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-4 ring-primary transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <Link
                  href={plan.href}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-hover'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I change plans?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! Pro plan includes a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What's your refund policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 LegalMind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
