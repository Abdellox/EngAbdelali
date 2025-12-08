import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Deals from './pages/Deals'
import PizzaBuilder from './pages/PizzaBuilder'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/build" element={<PizzaBuilder />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
