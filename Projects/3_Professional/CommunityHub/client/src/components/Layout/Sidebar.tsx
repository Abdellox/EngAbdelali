import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, TrendingUp, Plus } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchCommunities } from '../../store/slices/communitiesSlice'

const Sidebar = () => {
  const { communities, isLoading } = useAppSelector((state) => state.communities)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCommunities())
  }, [dispatch])

  return (
    <div className="space-y-6">
      {/* Popular Communities */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-reddit-orange" />
          <h3 className="font-semibold text-gray-900">Popular Communities</h3>
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {communities.slice(0, 10).map((community) => (
              <Link
                key={community.id}
                to={`/r/${community.name}`}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-reddit-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {community.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      r/{community.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {community.memberCount.toLocaleString()} members
                    </div>
                  </div>
                </div>
                {community.isMember && (
                  <div className="w-2 h-2 bg-reddit-orange rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Community */}
      {user && (
        <div className="card p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Plus className="w-5 h-5 text-reddit-blue" />
            <h3 className="font-semibold text-gray-900">Create Community</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Build and grow a community about something you care about.
          </p>
          <Link to="/create-community" className="w-full btn-secondary text-sm block text-center">
            Create Community
          </Link>
        </div>
      )}

      {/* Reddit Premium Ad */}
      <div className="card p-4 bg-gradient-to-r from-reddit-orange to-orange-600 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-reddit-orange text-xs font-bold">P</span>
          </div>
          <h3 className="font-semibold">Reddit Premium</h3>
        </div>
        <p className="text-sm mb-3 opacity-90">
          The best Reddit experience, with monthly Coins
        </p>
        <button className="w-full bg-white text-reddit-orange py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
          Try Now
        </button>
      </div>
    </div>
  )
}

export default Sidebar