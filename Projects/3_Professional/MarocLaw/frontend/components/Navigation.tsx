import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            LegalMind AI
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition">
              About
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary transition">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition">
              Contact
            </Link>
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
  )
}
