import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <main className="flex-1">
            <Outlet />
          </main>
          <aside className="w-80 hidden lg:block">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Layout