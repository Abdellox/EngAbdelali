import { Link } from 'react-router-dom';
import { FaUser, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import useAuthStore from '../store/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            LearnHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="hover:text-primary-600">Courses</Link>
            <Link to="/teachers" className="hover:text-primary-600">Teachers</Link>
            
            {user ? (
              <>
                <Link to={`/dashboard/${user.role}`} className="hover:text-primary-600">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-600">Login</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/courses" className="block py-2 hover:text-primary-600">Courses</Link>
            <Link to="/teachers" className="block py-2 hover:text-primary-600">Teachers</Link>
            {user ? (
              <>
                <Link to={`/dashboard/${user.role}`} className="block py-2 hover:text-primary-600">
                  Dashboard
                </Link>
                <button onClick={logout} className="block py-2 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-primary-600">Login</Link>
                <Link to="/register" className="block py-2 hover:text-primary-600">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
