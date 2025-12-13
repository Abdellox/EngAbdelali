import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { FiDownload, FiEye, FiStar, FiGithub, FiExternalLink, FiUser, FiCalendar } from 'react-icons/fi';

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      // If it's a GitHub project, open GitHub instead
      if (project.file_path === 'github-project' && project.github_url) {
        window.open(project.github_url, '_blank');
        toast.success('Opening GitHub repository!');
      } else {
        window.location.href = `http://localhost:5000/api/projects/${id}/download`;
        toast.success('Download started!');
      }
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handleRate = async (value) => {
    if (!user) {
      toast.error('Please login to rate');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/projects/${id}/rate`, { rating: value });
      setRating(value);
      toast.success('Rating submitted!');
      fetchProject();
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/projects/${id}/comment`, { comment });
      setComment('');
      toast.success('Comment posted!');
      fetchProject();
    } catch (error) {
      toast.error('Failed to post comment');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {project.screenshot && (
            <img
              src={`http://localhost:5000/uploads/${project.screenshot}`}
              alt={project.title}
              className="w-full h-96 object-cover rounded-xl mb-6"
            />
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">
                {project.category_icon} {project.category_name}
              </span>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`cursor-pointer ${star <= (rating || project.avg_rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRate(star)}
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({project.rating_count} ratings)
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>

            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="flex items-center space-x-1">
                <FiUser />
                <span>by {project.author_username}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiDownload />
                <span>{project.downloads} downloads</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiEye />
                <span>{project.views} views</span>
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{project.description}</p>
            </div>

            {project.requirements && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Requirements</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{project.requirements}</p>
              </div>
            )}

            {/* Comments */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Comments</h2>
              
              {user && (
                <form onSubmit={handleComment} className="mb-8">
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows="3"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Post Comment
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {project.comments?.map((c) => (
                  <div key={c.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{c.username}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{c.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2 mb-4"
            >
              {project.file_path === 'github-project' ? <FiGithub /> : <FiDownload />}
              <span>{project.file_path === 'github-project' ? 'View on GitHub' : 'Download Project'}</span>
            </button>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Language</h3>
                <p className="text-gray-600 dark:text-gray-400">{project.language}</p>
              </div>

              {project.technology && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Technology</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.technology}</p>
                </div>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <FiExternalLink />
                  <span>Live Demo</span>
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <FiGithub />
                  <span>GitHub Repository</span>
                </a>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Uploaded</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
