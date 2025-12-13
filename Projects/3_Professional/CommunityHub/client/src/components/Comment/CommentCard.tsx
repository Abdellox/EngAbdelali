import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowDown, MessageCircle, MoreHorizontal } from 'lucide-react'
import { Comment } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { voteComment, createComment } from '../../store/slices/commentsSlice'
import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'

interface CommentCardProps {
  comment: Comment
  postId: string
}

const CommentCard = ({ comment, postId }: CommentCardProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleVote = (voteType: 'up' | 'down') => {
    if (!user) return
    
    const newVoteType = comment.userVote === voteType ? null : voteType
    dispatch(voteComment({ commentId: comment.id, voteType: newVoteType }))
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !replyContent.trim()) return

    setIsSubmitting(true)
    try {
      await dispatch(createComment({
        postId,
        content: replyContent,
        parentId: comment.id
      }))
      setReplyContent('')
      setShowReplyForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVoteColor = (type: 'up' | 'down') => {
    if (!comment.userVote) return 'text-gray-400'
    return comment.userVote === type ? 'text-reddit-orange' : 'text-gray-400'
  }

  return (
    <div className={`${comment.depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="py-3">
        {/* Comment header */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Link
            to={`/user/${comment.author.username}`}
            className="font-medium text-gray-900 hover:underline"
          >
            {comment.author.username}
          </Link>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
        </div>

        {/* Comment content */}
        <div className="prose prose-sm max-w-none mb-3">
          <ReactMarkdown>{comment.content}</ReactMarkdown>
        </div>

        {/* Comment actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleVote('up')}
              className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('up')}`}
              disabled={!user}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-900">
              {comment.votes}
            </span>
            <button
              onClick={() => handleVote('down')}
              className={`p-1 rounded hover:bg-gray-100 ${getVoteColor('down')}`}
              disabled={!user}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {user && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}

          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <form onSubmit={handleReply} className="mt-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!replyContent.trim() || isSubmitting}
                className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Replying...' : 'Reply'}
              </button>
            </div>
          </form>
        )}

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                postId={postId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentCard