import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CodeShare</h3>
            <p className="text-sm">Your hub for programming projects. Browse, upload, and share code with the community.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projects" className="hover:text-blue-400 transition">Browse Projects</Link></li>
              <li><Link to="/upload" className="hover:text-blue-400 transition">Upload Project</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projects?category=java" className="hover:text-blue-400 transition">Java</Link></li>
              <li><Link to="/projects?category=python" className="hover:text-blue-400 transition">Python</Link></li>
              <li><Link to="/projects?category=javascript" className="hover:text-blue-400 transition">JavaScript</Link></li>
              <li><Link to="/projects?category=php" className="hover:text-blue-400 transition">PHP</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition"><FiGithub size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><FiTwitter size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><FiLinkedin size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><FiMail size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 CodeShare. All rights reserved. | <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link> | <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
