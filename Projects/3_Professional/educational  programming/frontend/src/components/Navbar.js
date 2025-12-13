import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiUpload, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CS</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">CodeShare</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Projects
            </Link>
            
            {user ? (
              <>
                <Link to="/upload" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  <FiUpload />
                  <span>Upload</span>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  <FiUser />
                  <span>Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <FiSettings />
                    <span>Admin</span>
                  </Link>
                )}
                <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition">
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </>
            )}

            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-4 py-3 space-y-3">
            <Link to="/projects" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Projects</Link>
            {user ? (
              <>
                <Link to="/upload" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Upload</Link>
                <Link to="/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Dashboard</Link>
                {user.role === 'admin' && <Link to="/admin" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Admin</Link>}
                <button onClick={handleLogout} className="block w-full text-left text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Login</Link>
                <Link to="/register" className="block text-blue-600 font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
