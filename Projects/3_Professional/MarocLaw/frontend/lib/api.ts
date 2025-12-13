import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const authAPI = {
  signup: (data: { email: string; password: string; full_name: string }) =>
    api.post('/api/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
}

// Chat
export const chatAPI = {
  sendMessage: (data: { content: string; session_id?: string }) =>
    api.post('/api/chat/message', data),
  getSessions: () => api.get('/api/chat/sessions'),
  getMessages: (sessionId: string) =>
    api.get(`/api/chat/sessions/${sessionId}/messages`),
  deleteSession: (sessionId: string) =>
    api.delete(`/api/chat/sessions/${sessionId}`),
}
