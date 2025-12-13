import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Comment } from '../../types'
import api from '../../services/api'

interface CommentsState {
  comments: Comment[]
  isLoading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: string) => {
    const response = await api.get(`/posts/${postId}/comments`)
    return response.data
  }
)

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, content, parentId }: { postId: string; content: string; parentId?: string }) => {
    const response = await api.post(`/posts/${postId}/comments`, { content, parentId })
    return response.data
  }
)

export const voteComment = createAsyncThunk(
  'comments/voteComment',
  async ({ commentId, voteType }: { commentId: string; voteType: 'up' | 'down' | null }) => {
    const response = await api.post(`/comments/${commentId}/vote`, { type: voteType })
    return { commentId, ...response.data }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch comments'
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const newComment = action.payload
        if (newComment.parentId) {
          // Add to replies
          const addToReplies = (comments: Comment[]): boolean => {
            for (const comment of comments) {
              if (comment.id === newComment.parentId) {
                if (!comment.replies) comment.replies = []
                comment.replies.push(newComment)
                return true
              }
              if (comment.replies && addToReplies(comment.replies)) {
                return true
              }
            }
            return false
          }
          addToReplies(state.comments)
        } else {
          state.comments.push(newComment)
        }
      })
      .addCase(voteComment.fulfilled, (state, action) => {
        const { commentId, votes, userVote } = action.payload
        const updateVote = (comments: Comment[]) => {
          for (const comment of comments) {
            if (comment.id === commentId) {
              comment.votes = votes
              comment.userVote = userVote
              return
            }
            if (comment.replies) {
              updateVote(comment.replies)
            }
          }
        }
        updateVote(state.comments)
      })
  },
})

export const { clearComments } = commentsSlice.actions
export default commentsSlice.reducer