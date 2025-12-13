import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { checkAuth } from './store/slices/authSlice'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Community from './pages/Community'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import Search from './pages/Search'
import SavedPosts from './pages/SavedPosts'
import CreateCommunity from './pages/CreateCommunity'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/r/:communityName" element={<Community />} />
        <Route path="/r/:communityName/post/:postId" element={<Post />} />
        <Route path="/submit" element={<CreatePost />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<SavedPosts />} />
        <Route path="/create-community" element={<CreateCommunity />} />
      </Route>
    </Routes>
  )
}

export default App