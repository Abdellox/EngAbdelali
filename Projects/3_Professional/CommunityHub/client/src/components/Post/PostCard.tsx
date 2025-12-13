import { Link } from 'react-router-dom'
import { ArrowUp, ArrowDown, MessageCircle, Share, Bookmark, BookmarkCheck } from 'lucide-react'
import { Post } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { votePost } from '../../store/slices/postsSlice'
import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import api from '../../services/api'
import { useState } from 'react'

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [isSaved, setIsSaved] = useState(post.saved || false)
  const [isSaving, setIsSaving] = useState(false)

  const handleVote = (voteType: 'up' | 'down') => {
    if (!user) return
    
    const newVoteType = post.userVote === voteType ? null : voteType
    dispatch(votePost({ postId: post.id, voteType: newVoteType }))
  }

  const handleSave = async () => {
    if (!user || isSaving) return

    setIsSaving(true)
    try {
      const response = await api.post(`/saved/${post.id}`)
      setIsSaved(response.data.saved)
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const getVoteColor = (type: 'up' | 'down') => {
    if (!post.userVote) return 'text-gray-400'
    return post.userVote === type ? 'text-reddit-orange' : 'text-gray-400'
  }

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex space-x-3">
        {/* Vote buttons */}
        <div className="flex flex-col items-center space-y-1">
          <button
            onClick={() => handleVote('up')}
            className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('up')}`}
            disabled={!user}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-900">
            {post.votes}
          </span>
          <button
            onClick={() => handleVote('down')}
            className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('down')}`}
            disabled={!user}
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          {/* Post header */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Link
              to={`/r/${post.community.name}`}
              className="font-medium text-gray-900 hover:underline"
            >
              r/{post.community.name}
            </Link>
            <span>•</span>
            <span>Posted by</span>
            <Link
              to={`/user/${post.author.username}`}
              className="hover:underline"
            >
              u/{post.author.username}
            </Link>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>

          {/* Post title */}
          <Link
            to={`/r/${post.community.name}/post/${post.id}`}
            className="block mb-3"
          >
            <h2 className="text-lg font-medium text-gray-900 hover:text-reddit-blue">
              {post.title}
            </h2>
          </Link>

          {/* Post content based on type */}
          {post.type === 'text' && post.content && (
            <div className="prose prose-sm max-w-none mb-3">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          )}

          {post.type === 'image' && post.imageUrl && (
            <div className="mb-3">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}

          {post.type === 'link' && post.url && (
            <div className="mb-3">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-reddit-blue hover:underline"
              >
                {post.url}
              </a>
            </div>
          )}

          {/* Post actions */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Link
              to={`/r/${post.community.name}/post/${post.id}`}
              className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.commentCount} Comments</span>
            </Link>
            
            <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            {user && (
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${
                  isSaved ? 'text-reddit-orange' : 'text-gray-600'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard