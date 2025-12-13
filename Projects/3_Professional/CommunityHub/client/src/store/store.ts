import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import postsSlice from './slices/postsSlice'
import communitiesSlice from './slices/communitiesSlice'
import commentsSlice from './slices/commentsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    communities: communitiesSlice,
    comments: commentsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch