import React, { useState, useEffect } from 'react'
import { dailySpecials, menuItems } from '../data/menuData'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/Toast'
import './Specials.css'

const Specials = () => {
  const [timeLeft, setTimeLeft] = useState(3600)
  const { addToCart } = useCart()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3600)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todaySpecial = dailySpecials.find(s => s.day === today)

  const combos = [
    { id: 'c1', name: 'Morning Boost', items: [menuItems[6], menuItems[21]], price: 7.99, savings: 1.26 },
    { id: 'c2', name: 'Sweet Treat', items: [menuItems[14], menuItems[23]], price: 9.49, savings: 0.76 },
    { id: 'c3', name: 'Classic Combo', items: [menuItems[0], menuItems[22]], price: 6.49, savings: 0.51 }
  ]

  const handleAddToCart = (item, discount = 0) => {
    const discountedItem = { ...item, price: item.price * (1 - discount / 100) }
    addToCart(discountedItem)
    showToast(`${item.name} added to cart!`)
  }

  return (
    <div className="specials container">
      <h1>Daily Specials</h1>

      {todaySpecial && (
        <div className="today-special">
          <div className="special-badge">Today's Special - {todaySpecial.discount}% OFF</div>
          <div className="special-content">
            <div className="special-image">{todaySpecial.item.image}</div>
            <div className="special-info">
              <h2>{todaySpecial.item.name}</h2>
              <p>{todaySpecial.item.description}</p>
              <div className="price-row">
                <span className="original-price">${todaySpecial.item.price.toFixed(2)}</span>
                <span className="special-price">
                  ${(todaySpecial.item.price * (1 - todaySpecial.discount / 100)).toFixed(2)}
                </span>
              </div>
              <div className="countdown">
                <span>⏰ Offer ends in: {formatTime(timeLeft)}</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => handleAddToCart(todaySpecial.item, todaySpecial.discount)}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="weekly-specials">
        <h2>Weekly Rotation</h2>
        <div className="weekly-grid">
          {dailySpecials.map(special => (
            <div key={special.day} className={`weekly-card card ${special.day === today ? 'active' : ''}`}>
              <div className="day-label">{special.day}</div>
              <div className="weekly-image">{special.item.image}</div>
              <h3>{special.item.name}</h3>
              <div className="discount-badge">{special.discount}% OFF</div>
              <div className="price">${(special.item.price * (1 - special.discount / 100)).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="combo-deals">
        <h2>Combo Deals</h2>
        <div className="combo-grid">
          {combos.map(combo => (
            <div key={combo.id} className="combo-card card">
              <h3>{combo.name}</h3>
              <div className="combo-items">
                {combo.items.map(item => (
                  <div key={item.id} className="combo-item">
                    <span className="combo-icon">{item.image}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="combo-footer">
                <div>
                  <div className="combo-price">${combo.price.toFixed(2)}</div>
                  <div className="combo-savings">Save ${combo.savings.toFixed(2)}</div>
                </div>
                <button className="btn-secondary" onClick={() => {
                  combo.items.forEach(item => addToCart(item))
                  showToast(`${combo.name} combo added to cart!`)
                }}>
                  Add Combo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Specials
