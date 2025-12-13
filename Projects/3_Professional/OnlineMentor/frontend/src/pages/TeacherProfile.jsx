import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userAPI, reviewAPI } from '../services/api';
import { FaStar, FaEnvelope, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function TeacherProfile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherData();
  }, [id]);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      const [teacherRes, coursesRes, reviewsRes] = await Promise.all([
        userAPI.getUser(id),
        userAPI.getUserCourses(id),
        reviewAPI.getTeacherReviews(id)
      ]);

      setTeacher(teacherRes.data.user);
      setCourses(coursesRes.data.courses);
      setReviews(reviewsRes.data.reviews);
    } catch (error) {
      toast.error('Failed to load teacher profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Teacher not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Teacher Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={teacher.avatar || 'https://via.placeholder.com/200'}
              alt={teacher.name}
              className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
            />
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{teacher.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{teacher.rating?.toFixed(1) || '0.0'}</span>
                  <span className="text-gray-600">({teacher.totalReviews || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <FaUsers />
                  <span>{courses.reduce((acc, c) => acc + (c.enrolledStudents?.length || 0), 0)} students</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <FaGraduationCap />
                  <span>{courses.length} courses</span>
                </div>
              </div>

              {teacher.expertise && teacher.expertise.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Expertise:</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacher.expertise.map((skill, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {teacher.bio && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">About:</h3>
                  <p className="text-gray-700">{teacher.bio}</p>
                </div>
              )}

              <button className="btn-primary flex items-center gap-2">
                <FaEnvelope />
                Contact Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Courses by {teacher.name}</h2>
          
          {courses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">No courses available yet</p>
            </div>
          ) : (
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <FaStar className="text-yellow-500" />
                        <span>{course.rating?.toFixed(1) || '0.0'}</span>
                      </div>
                      <span className="text-xl font-bold text-primary-600">${course.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Student Reviews</h2>
          
          {reviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">No reviews yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review._id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.student?.avatar || 'https://via.placeholder.com/50'}
                      alt={review.student?.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.student?.name}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Course: {review.course?.title}</p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
