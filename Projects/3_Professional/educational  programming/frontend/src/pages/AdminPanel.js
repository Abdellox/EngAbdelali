import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCheck, FiX, FiTrash2, FiUsers, FiCode } from 'react-icons/fi';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingProjects, setPendingProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pendingRes, usersRes, statsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/pending-projects'),
        axios.get('http://localhost:5000/api/admin/users'),
        axios.get('http://localhost:5000/api/admin/stats')
      ]);

      setPendingProjects(pendingRes.data);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/projects/${id}/status`, { status: 'approved' });
      toast.success('Project approved');
      fetchData();
    } catch (error) {
      toast.error('Failed to approve project');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/projects/${id}/status`, { status: 'rejected' });
      toast.success('Project rejected');
      fetchData();
    } catch (error) {
      toast.error('Failed to reject project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/projects/${id}`);
      toast.success('Project deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      toast.success('User deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <FiUsers className="text-blue-600 mb-2" size={30} />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <FiCode className="text-green-600 mb-2" size={30} />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Projects</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <FiCheck className="text-yellow-600 mb-2" size={30} />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingProjects}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Approval</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDownloads}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Downloads</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-4 font-medium ${activeTab === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Pending Projects ({pendingProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Users ({users.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingProjects.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">No pending projects</p>
              ) : (
                pendingProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>By: {project.author_username}</span>
                          <span>Language: {project.language}</span>
                          <span>Category: {project.category_name}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleApprove(project.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          title="Approve"
                        >
                          <FiCheck />
                        </button>
                        <button
                          onClick={() => handleReject(project.id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          title="Reject"
                        >
                          <FiX />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
