import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Users, Calendar, Shield } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { fetchCommunity, joinCommunity, leaveCommunity } from '../store/slices/communitiesSlice'
import { fetchPosts } from '../store/slices/postsSlice'
import PostCard from '../components/Post/PostCard'
import { formatDistanceToNow } from 'date-fns'

const Community = () => {
  const { communityName } = useParams<{ communityName: string }>()
  const { currentCommunity } = useAppSelector((state) => state.communities)
  const { posts, isLoading } = useAppSelector((state) => state.posts)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (communityName) {
      dispatch(fetchCommunity(communityName))
      dispatch(fetchPosts({ communityName }))
    }
  }, [dispatch, communityName])

  const handleJoinLeave = () => {
    if (!currentCommunity || !user) return

    if (currentCommunity.isMember) {
      dispatch(leaveCommunity(currentCommunity.id))
    } else {
      dispatch(joinCommunity(currentCommunity.id))
    }
  }

  if (!currentCommunity) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Community not found</h2>
          <p className="text-gray-600">The community you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Community header */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-reddit-blue rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {currentCommunity.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentCommunity.displayName}
              </h1>
              <p className="text-gray-600">r/{currentCommunity.name}</p>
            </div>
          </div>
          
          {user && (
            <button
              onClick={handleJoinLeave}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentCommunity.isMember
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'btn-primary'
              }`}
            >
              {currentCommunity.isMember ? 'Leave' : 'Join'}
            </button>
          )}
        </div>

        <p className="mt-4 text-gray-700">{currentCommunity.description}</p>

        <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{currentCommunity.memberCount.toLocaleString()} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDistanceToNow(new Date(currentCommunity.createdAt))} ago</span>
          </div>
          {currentCommunity.isModerator && (
            <div className="flex items-center space-x-1 text-reddit-orange">
              <Shield className="w-4 h-4" />
              <span>Moderator</span>
            </div>
          )}
        </div>
      </div>

      {/* Community rules */}
      {currentCommunity.rules && (
        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Community Rules</h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700">{currentCommunity.rules}</p>
          </div>
        </div>
      )}

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
          <p className="text-gray-600">Be the first to post in this community!</p>
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

export default Community