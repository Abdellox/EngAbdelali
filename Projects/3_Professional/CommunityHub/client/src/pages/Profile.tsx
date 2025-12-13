import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Award, MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const Profile = () => {
  const { username } = useParams<{ username: string }>()

  // Mock user data - in real app, fetch from API
  const user = {
    id: '1',
    username: username || 'user',
    email: 'user@example.com',
    avatar: '',
    bio: 'Just a regular Reddit user who loves to discuss interesting topics.',
    karma: 1234,
    createdAt: '2023-01-15T00:00:00Z'
  }

  const stats = [
    { label: 'Post Karma', value: '856', icon: Award },
    { label: 'Comment Karma', value: '378', icon: MessageCircle },
    { label: 'Total Karma', value: user.karma.toLocaleString(), icon: Award },
  ]

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="card p-6">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-reddit-blue rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              u/{user.username}
            </h1>
            
            {user.bio && (
              <p className="text-gray-700 mb-4">{user.bio}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDistanceToNow(new Date(user.createdAt))} ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-reddit-orange bg-opacity-10 rounded-lg">
                <Icon className="w-5 h-5 text-reddit-orange" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="space-y-4">
          {/* Mock activity items */}
          <div className="border-l-4 border-reddit-orange pl-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <span>Posted in</span>
              <span className="font-medium text-gray-900">r/technology</span>
              <span>•</span>
              <span>2 hours ago</span>
            </div>
            <h3 className="font-medium text-gray-900">
              The Future of AI in Web Development
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              15 upvotes • 8 comments
            </p>
          </div>
          
          <div className="border-l-4 border-reddit-blue pl-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <span>Commented in</span>
              <span className="font-medium text-gray-900">r/programming</span>
              <span>•</span>
              <span>5 hours ago</span>
            </div>
            <h3 className="font-medium text-gray-900">
              Best practices for React performance optimization
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              12 upvotes
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <span>Joined</span>
              <span className="font-medium text-gray-900">r/webdev</span>
              <span>•</span>
              <span>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile