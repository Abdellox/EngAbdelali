import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'programming',
    level: 'beginner',
    price: 0,
    syllabus: [{ title: '', description: '', duration: 0 }],
    tags: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        isPublished: true
      };

      await courseAPI.createCourse(courseData);
      toast.success('Course created successfully!');
      navigate('/dashboard/teacher');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const addSyllabusItem = () => {
    setFormData({
      ...formData,
      syllabus: [...formData.syllabus, { title: '', description: '', duration: 0 }]
    });
  };

  const removeSyllabusItem = (index) => {
    setFormData({
      ...formData,
      syllabus: formData.syllabus.filter((_, i) => i !== index)
    });
  };

  const updateSyllabusItem = (index, field, value) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[index][field] = value;
    setFormData({ ...formData, syllabus: newSyllabus });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Create New Course</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          {/* Basic Info */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Course Title *</label>
            <input
              type="text"
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Complete Web Development Bootcamp"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              className="input-field"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Describe what students will learn in this course..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="music">Music</option>
                <option value="language">Language</option>
                <option value="science">Science</option>
                <option value="math">Math</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Level *</label>
              <select
                className="input-field"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Price (USD) *</label>
            <input
              type="number"
              className="input-field"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
            <p className="text-sm text-gray-500 mt-1">Set to 0 for free courses</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              className="input-field"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., javascript, react, web development"
            />
          </div>

          {/* Syllabus */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Course Syllabus</label>
              <button
                type="button"
                onClick={addSyllabusItem}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <FaPlus /> Add Section
              </button>
            </div>

            <div className="space-y-4">
              {formData.syllabus.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Section {index + 1}</h4>
                    {formData.syllabus.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSyllabusItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Section title"
                      value={item.title}
                      onChange={(e) => updateSyllabusItem(index, 'title', e.target.value)}
                    />
                    <textarea
                      className="input-field"
                      rows="2"
                      placeholder="Section description"
                      value={item.description}
                      onChange={(e) => updateSyllabusItem(index, 'description', e.target.value)}
                    />
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Duration (minutes)"
                      value={item.duration}
                      onChange={(e) => updateSyllabusItem(index, 'duration', Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/teacher')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}