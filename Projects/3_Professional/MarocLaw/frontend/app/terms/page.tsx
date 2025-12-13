'use client'

import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">LegalMind AI</Link>
            <Link href="/" className="px-4 py-2 text-gray-700 hover:text-primary">Back to Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: December 3, 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using LegalMind AI, you accept and agree to be bound by these Terms of Service. 
              If you do not agree, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600">
              LegalMind AI provides an AI-powered legal information assistant. Our service offers general 
              legal information and is not a substitute for professional legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide accurate account information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service lawfully and ethically</li>
              <li>Not share your account with others</li>
              <li>Understand this is not legal advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Uses</h2>
            <p className="text-gray-600 mb-4">You may not use LegalMind AI to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Engage in illegal activities</li>
              <li>Violate any laws or regulations</li>
              <li>Harass, abuse, or harm others</li>
              <li>Distribute malware or harmful code</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Scrape or copy our content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600">
              All content, features, and functionality of LegalMind AI are owned by us and protected by 
              copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimers</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800 font-semibold">
                IMPORTANT: LegalMind AI provides general legal information only, not legal advice. 
                Do not rely on our service for specific legal matters. Always consult a licensed attorney.
              </p>
            </div>
            <p className="text-gray-600">
              The service is provided "as is" without warranties of any kind. We do not guarantee accuracy, 
              completeness, or reliability of information provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-600">
              We reserve the right to terminate or suspend your account at any time for violations of these terms 
              or for any other reason at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
            <p className="text-gray-600">
              These terms are governed by the laws of the United States. Any disputes shall be resolved in 
              the courts of [Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these terms, contact us at legal@legalmind.ai
            </p>
          </section>
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
