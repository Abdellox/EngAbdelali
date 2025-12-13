import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Post } from '../../types'
import api from '../../services/api'

interface PostsState {
  posts: Post[]
  currentPost: Post | null
  isLoading: boolean
  error: string | null
  sortBy: 'hot' | 'new' | 'top'
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  sortBy: 'hot',
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ communityName, sortBy = 'hot' }: { communityName?: string; sortBy?: string }) => {
    const params = new URLSearchParams()
    if (communityName) params.append('community', communityName)
    params.append('sort', sortBy)
    
    const response = await api.get(`/posts?${params}`)
    return response.data
  }
)

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId: string) => {
    const response = await api.get(`/posts/${postId}`)
    return response.data
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: { title: string; content?: string; type: string; communityId: string; url?: string }) => {
    const response = await api.post('/posts', postData)
    return response.data
  }
)

export const votePost = createAsyncThunk(
  'posts/votePost',
  async ({ postId, voteType }: { postId: string; voteType: 'up' | 'down' | null }) => {
    const response = await api.post(`/posts/${postId}/vote`, { type: voteType })
    return { postId, ...response.data }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch posts'
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.currentPost = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload)
      })
      .addCase(votePost.fulfilled, (state, action) => {
        const { postId, votes, userVote } = action.payload
        const post = state.posts.find(p => p.id === postId)
        if (post) {
          post.votes = votes
          post.userVote = userVote
        }
        if (state.currentPost?.id === postId) {
          state.currentPost.votes = votes
          state.currentPost.userVote = userVote
        }
      })
  },
})

export const { setSortBy, clearCurrentPost } = postsSlice.actions
export default postsSlice.reducer