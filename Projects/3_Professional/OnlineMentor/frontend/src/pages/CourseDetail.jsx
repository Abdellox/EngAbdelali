import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseAPI, reviewAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import { FaStar, FaUsers, FaClock, FaBook, FaVideo, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const [courseRes, reviewsRes] = await Promise.all([
        courseAPI.getCourse(id),
        reviewAPI.getCourseReviews(id)
      ]);

      setCourse(courseRes.data.course);
      setReviews(reviewsRes.data.reviews);
    } catch (error) {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.info('Please login to enroll');
      navigate('/login');
      return;
    }

    try {
      setEnrolling(true);
      await courseAPI.enrollCourse(id);
      toast.success('Enrolled successfully!');
      fetchCourseData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  const isEnrolled = user && course.enrolledStudents?.includes(user.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {course.category}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {course.level}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl mb-6">{course.description}</p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{course.rating?.toFixed(1) || '0.0'}</span>
                <span>({course.totalReviews || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers />
                <span>{course.enrolledStudents?.length || 0} students enrolled</span>
              </div>
            </div>

            <Link to={`/teachers/${course.teacher._id}`} className="flex items-center gap-3 hover:opacity-80">
              <img
                src={course.teacher.avatar || 'https://via.placeholder.com/50'}
                alt={course.teacher.name}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <p className="text-sm opacity-80">Instructor</p>
                <p className="font-semibold">{course.teacher.name}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Syllabus */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FaBook className="text-primary-600" />
                  Course Syllabus
                </h2>
                <div className="space-y-4">
                  {course.syllabus.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-primary-600 pl-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      {item.duration && (
                        <p className="text-sm text-gray-500 mt-1">
                          <FaClock className="inline mr-1" />
                          {item.duration} minutes
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
              
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review._id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.student?.avatar || 'https://via.placeholder.com/50'}
                          alt={review.student?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.student?.name}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                  size={14}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <img
                src={course.thumbnail || 'https://via.placeholder.com/400x200?text=Course'}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-primary-600 mb-2">${course.price}</p>
                {course.price === 0 && <p className="text-green-600 font-semibold">FREE</p>}
              </div>

              {isEnrolled ? (
                <div className="text-center">
                  <div className="bg-green-100 text-green-700 py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2">
                    <FaCheckCircle />
                    <span className="font-semibold">You're enrolled!</span>
                  </div>
                  <Link to="/dashboard/student" className="btn-primary w-full block">
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn-primary w-full"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUsers className="text-primary-600" />
                  <span>{course.enrolledStudents?.length || 0} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaVideo className="text-primary-600" />
                  <span>{course.lessons?.length || 0} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaClock className="text-primary-600" />
                  <span>{course.totalDuration || 0} minutes total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}