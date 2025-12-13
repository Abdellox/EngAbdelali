import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { FaStar, FaUsers, FaClock, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    sort: 'latest'
  });

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await courseAPI.getCourses(filters);
      setCourses(data.courses);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['programming', 'design', 'business', 'music', 'language', 'science', 'math', 'other'];
  const levels = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Browse Courses</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-primary-600" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="input-field"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                className="input-field"
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                className="input-field"
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{courses.length} courses found</p>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map(course => (
                <Link key={course._id} to={`/courses/${course._id}`}>
                  <div className="card hover:scale-105 transition-transform">
                    <img
                      src={course.thumbnail || 'https://via.placeholder.com/400x200?text=Course'}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                        {course.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={course.teacher?.avatar || 'https://via.placeholder.com/40'}
                        alt={course.teacher?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{course.teacher?.name}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{course.rating?.toFixed(1) || '0.0'}</span>
                        <span>({course.totalReviews || 0})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUsers />
                        <span>{course.enrolledStudents?.length || 0} students</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        ${course.price}
                      </span>
                      <button className="btn-primary text-sm">View Details</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
