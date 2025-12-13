import { useEffect, useState } from 'react'
import { TrendingUp, Users, MessageCircle, ThumbsUp } from 'lucide-react'
import api from '../../services/api'

const QuickStats = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCommunities: 0,
    totalComments: 0,
    totalVotes: 0
  })

  useEffect(() => {
    // In a real app, you'd have a stats endpoint
    // For now, we'll show some mock data
    setStats({
      totalPosts: 234,
      totalCommunities: 12,
      totalComments: 1456,
      totalVotes: 3421
    })
  }, [])

  const statItems = [
    { label: 'Posts', value: stats.totalPosts, icon: MessageCircle, color: 'text-blue-600' },
    { label: 'Communities', value: stats.totalCommunities, icon: Users, color: 'text-green-600' },
    { label: 'Comments', value: stats.totalComments, icon: MessageCircle, color: 'text-purple-600' },
    { label: 'Votes', value: stats.totalVotes, icon: ThumbsUp, color: 'text-reddit-orange' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statItems.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="card p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-100`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-xl font-semibold text-gray-900">{value.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuickStats