import { useEffect } from 'react'
import { TrendingUp, Clock, Trophy } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { fetchPosts, setSortBy } from '../store/slices/postsSlice'
import PostCard from '../components/Post/PostCard'
import QuickStats from '../components/Dashboard/QuickStats'

const Home = () => {
  const { posts, isLoading, sortBy } = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts({ sortBy }))
  }, [dispatch, sortBy])

  const handleSortChange = (newSortBy: 'hot' | 'new' | 'top') => {
    dispatch(setSortBy(newSortBy))
  }

  const sortOptions = [
    { key: 'hot', label: 'Hot', icon: TrendingUp },
    { key: 'new', label: 'New', icon: Clock },
    { key: 'top', label: 'Top', icon: Trophy },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <QuickStats />
      
      {/* Sort options */}
      <div className="card p-4">
        <div className="flex items-center space-x-4">
          {sortOptions.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleSortChange(key as 'hot' | 'new' | 'top')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === key
                  ? 'bg-reddit-orange text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
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
      ) : posts.length === 0 ? (
        <div className="card p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">Be the first to create a post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home