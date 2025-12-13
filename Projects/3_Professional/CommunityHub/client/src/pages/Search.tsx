import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, Users, FileText } from 'lucide-react'
import api from '../services/api'
import PostCard from '../components/Post/PostCard'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [activeTab, setActiveTab] = useState<'posts' | 'communities' | 'users'>('posts')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any>({})

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(searchTerm)}&type=all`)
      setSearchResults(response.data)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults({})
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { key: 'posts', label: 'Posts', icon: FileText },
    { key: 'communities', label: 'Communities', icon: Users },
    { key: 'users', label: 'Users', icon: Users },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      // Update URL
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search header */}
      <div className="card p-6">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Reddit Clone"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
            />
          </div>
        </form>

        {/* Search tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-white text-reddit-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search results */}
      <div className="space-y-4">
        {query && (
          <div className="text-sm text-gray-600">
            Search results for "{query}"
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Posts results */}
            {activeTab === 'posts' && (
              <div className="space-y-4">
                {searchResults.posts?.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Communities results */}
            {activeTab === 'communities' && (
              <div className="space-y-4">
                {searchResults.communities?.map((community: any) => (
                  <div key={community.id} className="card p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-reddit-blue rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {community.displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 hover:text-reddit-blue cursor-pointer">
                          r/{community.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{community.description}</p>
                        <p className="text-sm text-gray-500">
                          {community.memberCount.toLocaleString()} members
                        </p>
                      </div>
                      <button className="btn-primary">Join</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Users results */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                {searchResults.users?.map((user: any) => (
                  <div key={user.id} className="card p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-reddit-orange rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 hover:text-reddit-blue cursor-pointer">
                          u/{user.username}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {user.karma.toLocaleString()} karma
                        </p>
                      </div>
                      <button className="btn-secondary">Follow</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!isLoading && query && (!searchResults[activeTab] || searchResults[activeTab].length === 0) && (
          <div className="card p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search