'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, FileText, Settings, LogOut, Plus, Trash2 } from 'lucide-react'
import { chatAPI, authAPI } from '@/lib/api'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [userRes, sessionsRes] = await Promise.all([
        authAPI.getMe(),
        chatAPI.getSessions()
      ])
      setUser(userRes.data)
      setSessions(sessionsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Delete this conversation?')) return
    try {
      await chatAPI.deleteSession(sessionId)
      setSessions(sessions.filter(s => s.id !== sessionId))
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">LegalMind AI</Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user?.full_name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <MessageSquare className="w-8 h-8 text-primary mb-2" />
            <div className="text-3xl font-bold">{sessions.length}</div>
            <div className="text-gray-600">Conversations</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <FileText className="w-8 h-8 text-primary mb-2" />
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-600">Documents</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <MessageSquare className="w-8 h-8 text-primary mb-2" />
            <div className="text-3xl font-bold">Free</div>
            <div className="text-gray-600">Plan</div>
          </div>
          <Link href="/assistant" className="bg-primary text-white rounded-xl p-6 shadow hover:bg-primary-hover transition flex items-center justify-center gap-2">
            <Plus className="w-6 h-6" />
            <span className="font-semibold">New Chat</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Recent Conversations</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sessions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No conversations yet. Start a new chat to get started!
              </div>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="p-6 hover:bg-gray-50 flex justify-between items-center">
                  <Link href={`/assistant?session=${session.id}`} className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(session.updated_at).toLocaleDateString()}
                    </p>
                  </Link>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
