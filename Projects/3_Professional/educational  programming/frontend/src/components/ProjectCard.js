import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiEye, FiStar, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover">
        {project.screenshot ? (
          <img 
            src={`http://localhost:5000/uploads/${project.screenshot}`} 
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-6xl">{project.category_icon || '📦'}</span>
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                {project.category_name || project.language}
              </span>
              {project.github_url && (
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1">
                  <FiGithub size={12} />
                  <span>Open Source</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1 text-yellow-500">
              <FiStar size={14} />
              <span className="text-sm">{project.avg_rating?.toFixed(1) || '0.0'}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {project.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <FiDownload size={14} />
                <span>{project.downloads || 0}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiEye size={14} />
                <span>{project.views || 0}</span>
              </span>
            </div>
            <span className="text-xs">by {project.author_username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
