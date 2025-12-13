import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { fetchPost } from '../store/slices/postsSlice'
import { fetchComments, createComment } from '../store/slices/commentsSlice'
import PostCard from '../components/Post/PostCard'
import CommentCard from '../components/Comment/CommentCard'

const Post = () => {
  const { postId } = useParams<{ postId: string }>()
  const { currentPost } = useAppSelector((state) => state.posts)
  const { comments, isLoading } = useAppSelector((state) => state.comments)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  
  const [commentContent, setCommentContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId))
      dispatch(fetchComments(postId))
    }
  }, [dispatch, postId])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !postId || !commentContent.trim()) return

    setIsSubmitting(true)
    try {
      await dispatch(createComment({
        postId,
        content: commentContent
      }))
      setCommentContent('')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentPost) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600">The post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Post */}
      <PostCard post={currentPost} />

      {/* Comment form */}
      {user && (
        <div className="card p-4">
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment as {user.username}
              </label>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!commentContent.trim() || isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Commenting...' : 'Comment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments */}
      <div className="card p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comments ({comments.length})
        </h3>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                postId={postId!}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Post