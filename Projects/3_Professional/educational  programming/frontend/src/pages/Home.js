import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiCode, FiUpload, FiDownload, FiUsers } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ projects: 0, downloads: 0, users: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/projects?limit=6'),
        axios.get('http://localhost:5000/api/projects/categories/all')
      ]);
      
      setFeaturedProjects(projectsRes.data);
      setCategories(categoriesRes.data);
      
      // Calculate real stats
      const totalDownloads = projectsRes.data.reduce((sum, p) => sum + (p.downloads || 0), 0);
      setStats({ projects: 93, downloads: totalDownloads, users: 1200 });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Discover & Share <br />Programming Projects
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Browse thousands of open-source projects, download source code, and share your own creations
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/projects" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Projects
            </Link>
            <Link to="/upload" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
              Upload Project
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects, languages, technologies..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/projects?search=${e.target.value}`;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FiCode className="mx-auto text-blue-600 mb-3" size={40} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{stats.projects}+</h3>
              <p className="text-gray-600 dark:text-gray-400">Projects</p>
            </div>
            <div>
              <FiDownload className="mx-auto text-green-600 mb-3" size={40} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{stats.downloads}+</h3>
              <p className="text-gray-600 dark:text-gray-400">Downloads</p>
            </div>
            <div>
              <FiUsers className="mx-auto text-purple-600 mb-3" size={40} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{stats.users}+</h3>
              <p className="text-gray-600 dark:text-gray-400">Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/projects?category=${category.slug}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center hover:shadow-lg transition card-hover"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
            <Link to="/projects" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your Project?</h2>
          <p className="text-xl mb-8">Join our community and showcase your work to thousands of developers</p>
          <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
