import { useEffect, useState } from 'react'
import { Bookmark } from 'lucide-react'
import { useAppSelector } from '../hooks/redux'
import PostCard from '../components/Post/PostCard'
import api from '../services/api'
import { Post } from '../types'

const SavedPosts = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [savedPosts, setSavedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchSavedPosts()
    }
  }, [user])

  const fetchSavedPosts = async () => {
    try {
      const response = await api.get('/saved')
      setSavedPosts(response.data)
    } catch (error) {
      console.error('Fetch saved posts error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h2>
        <p className="text-gray-600">You need to be logged in to view saved posts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-center space-x-3">
          <Bookmark className="w-6 h-6 text-reddit-orange" />
          <h1 className="text-2xl font-bold text-gray-900">Saved Posts</h1>
        </div>
        <p className="text-gray-600 mt-2">Posts you've saved for later</p>
      </div>

      {/* Posts */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : savedPosts.length === 0 ? (
        <div className="card p-8 text-center">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved posts yet</h3>
          <p className="text-gray-600">
            When you save posts, they'll appear here for easy access later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedPosts