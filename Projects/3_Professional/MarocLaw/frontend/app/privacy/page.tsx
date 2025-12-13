'use client'

import Link from 'next/link'

export default function Privacy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 3, 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Chat conversations and questions you ask</li>
              <li>Documents you upload for analysis</li>
              <li>Usage data and analytics</li>
              <li>Payment information (processed securely by third parties)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve our AI legal assistant service</li>
              <li>Process your questions and generate responses</li>
              <li>Maintain and secure your account</li>
              <li>Send service updates and notifications</li>
              <li>Analyze usage patterns to improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures including encryption, secure servers, 
              and regular security audits. Your data is stored on secure servers with enterprise-grade protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We use third-party services including OpenAI for AI processing, payment processors for billing, 
              and analytics tools. These services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Update your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookie Policy</h2>
            <p className="text-gray-600">
              We use cookies to maintain your session, remember preferences, and analyze usage. 
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of significant 
              changes via email or through our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this privacy policy, please contact us at privacy@legalmind.ai
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
