import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Specials from './pages/Specials'
import DrinkBuilder from './pages/DrinkBuilder'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Toast from './components/Toast'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <div className="app">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/specials" element={<Specials />} />
                <Route path="/drink-builder" element={<DrinkBuilder />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  )
}

export default App
