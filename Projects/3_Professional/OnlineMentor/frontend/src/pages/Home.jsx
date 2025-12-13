import { Link } from 'react-router-dom';
import { FaSearch, FaVideo, FaStar, FaCertificate } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Learn From Expert Teachers</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with qualified teachers, join live courses, and master new skills at your own pace
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/courses" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Browse Courses
            </Link>
            <Link to="/register" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LearnHub?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaVideo className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Classes</h3>
              <p className="text-gray-600">Interactive video sessions with expert teachers</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
              <p className="text-gray-600">Choose teachers based on real student feedback</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Discovery</h3>
              <p className="text-gray-600">Find courses by skill, category, or teacher</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Certificates</h3>
              <p className="text-gray-600">Earn certificates upon course completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-8">Join thousands of students already learning on our platform</p>
          <Link to="/register" className="btn-primary inline-block">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
