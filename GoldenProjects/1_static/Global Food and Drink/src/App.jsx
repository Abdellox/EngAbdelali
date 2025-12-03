import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Countries from './pages/Countries'
import CountryDetail from './pages/CountryDetail'
import FoodBrowser from './pages/FoodBrowser'
import DrinkExplorer from './pages/DrinkExplorer'
import DailyFeature from './pages/DailyFeature'
import About from './pages/About'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <Router>
      <div className="app">
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/countries" element={<Countries searchQuery={searchQuery} />} />
          <Route path="/country/:id" element={<CountryDetail />} />
          <Route path="/foods" element={<FoodBrowser />} />
          <Route path="/drinks" element={<DrinkExplorer />} />
          <Route path="/daily" element={<DailyFeature />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
