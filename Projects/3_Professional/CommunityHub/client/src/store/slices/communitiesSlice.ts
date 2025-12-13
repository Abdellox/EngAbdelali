import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Community } from '../../types'
import api from '../../services/api'

interface CommunitiesState {
  communities: Community[]
  currentCommunity: Community | null
  isLoading: boolean
  error: string | null
}

const initialState: CommunitiesState = {
  communities: [],
  currentCommunity: null,
  isLoading: false,
  error: null,
}

export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async () => {
    const response = await api.get('/communities')
    return response.data
  }
)

export const fetchCommunity = createAsyncThunk(
  'communities/fetchCommunity',
  async (name: string) => {
    const response = await api.get(`/communities/${name}`)
    return response.data
  }
)

export const joinCommunity = createAsyncThunk(
  'communities/joinCommunity',
  async (communityId: string) => {
    const response = await api.post(`/communities/${communityId}/join`)
    return { communityId, ...response.data }
  }
)

export const leaveCommunity = createAsyncThunk(
  'communities/leaveCommunity',
  async (communityId: string) => {
    const response = await api.post(`/communities/${communityId}/leave`)
    return { communityId, ...response.data }
  }
)

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    clearCurrentCommunity: (state) => {
      state.currentCommunity = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.isLoading = false
        state.communities = action.payload
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch communities'
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.currentCommunity = action.payload
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        const { communityId } = action.payload
        const community = state.communities.find(c => c.id === communityId)
        if (community) {
          community.isMember = true
          community.memberCount += 1
        }
        if (state.currentCommunity?.id === communityId) {
          state.currentCommunity.isMember = true
          state.currentCommunity.memberCount += 1
        }
      })
      .addCase(leaveCommunity.fulfilled, (state, action) => {
        const { communityId } = action.payload
        const community = state.communities.find(c => c.id === communityId)
        if (community) {
          community.isMember = false
          community.memberCount -= 1
        }
        if (state.currentCommunity?.id === communityId) {
          state.currentCommunity.isMember = false
          state.currentCommunity.memberCount -= 1
        }
      })
  },
})

export const { clearCurrentCommunity } = communitiesSlice.actions
export default communitiesSlice.reducer