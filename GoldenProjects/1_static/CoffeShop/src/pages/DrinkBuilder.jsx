import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/Toast'
import './DrinkBuilder.css'

const DrinkBuilder = () => {
  const [base, setBase] = useState('espresso')
  const [milk, setMilk] = useState('whole')
  const [sweetness, setSweetness] = useState(3)
  const [toppings, setToppings] = useState([])
  const { addToCart } = useCart()

  const bases = [
    { id: 'espresso', name: 'Espresso', price: 3.50 },
    { id: 'cold-brew', name: 'Cold Brew', price: 4.00 },
    { id: 'matcha', name: 'Matcha', price: 4.50 },
    { id: 'decaf', name: 'Decaf', price: 3.50 }
  ]

  const milks = [
    { id: 'whole', name: 'Whole Milk', price: 0 },
    { id: 'oat', name: 'Oat Milk', price: 0.75 },
    { id: 'soy', name: 'Soy Milk', price: 0.50 },
    { id: 'almond', name: 'Almond Milk', price: 0.50 }
  ]

  const availableToppings = [
    { id: 'caramel', name: 'Caramel Drizzle', icon: '🍯', price: 0.50 },
    { id: 'foam', name: 'Cold Foam', icon: '☁️', price: 0.75 },
    { id: 'whipped', name: 'Whipped Cream', icon: '🍦', price: 0.50 },
    { id: 'chocolate', name: 'Chocolate Syrup', icon: '🍫', price: 0.50 }
  ]

  const toggleTopping = (toppingId) => {
    setToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(t => t !== toppingId)
        : [...prev, toppingId]
    )
  }

  const calculatePrice = () => {
    const basePrice = bases.find(b => b.id === base)?.price || 0
    const milkPrice = milks.find(m => m.id === milk)?.price || 0
    const toppingsPrice = toppings.reduce((sum, t) => {
      const topping = availableToppings.find(at => at.id === t)
      return sum + (topping?.price || 0)
    }, 0)
    return basePrice + milkPrice + toppingsPrice
  }

  const handleAddToCart = () => {
    const customDrink = {
      id: `custom-${Date.now()}`,
      name: 'Custom Drink',
      price: calculatePrice(),
      description: `${bases.find(b => b.id === base)?.name} with ${milks.find(m => m.id === milk)?.name}`,
      image: '☕',
      customization: { base, milk, sweetness, toppings }
    }
    addToCart(customDrink)
    showToast('Custom drink added to cart!')
  }

  return (
    <div className="drink-builder container">
      <h1>Build Your Perfect Drink</h1>

      <div className="builder-container">
        <div className="builder-options">
          <div className="option-group">
            <h3>Choose Your Base</h3>
            <div className="option-buttons">
              {bases.map(b => (
                <button
                  key={b.id}
                  className={`option-btn ${base === b.id ? 'selected' : ''}`}
                  onClick={() => setBase(b.id)}
                >
                  {b.name} (+${b.price.toFixed(2)})
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h3>Choose Your Milk</h3>
            <div className="option-buttons">
              {milks.map(m => (
                <button
                  key={m.id}
                  className={`option-btn ${milk === m.id ? 'selected' : ''}`}
                  onClick={() => setMilk(m.id)}
                >
                  {m.name} {m.price > 0 && `(+$${m.price.toFixed(2)})`}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h3>Sweetness Level</h3>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="5"
                value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-value">
                {sweetness === 0 ? 'No Sugar' : sweetness === 5 ? 'Extra Sweet' : `Level ${sweetness}`}
              </div>
            </div>
          </div>

          <div className="option-group">
            <h3>Add Toppings</h3>
            <div className="toppings-grid">
              {availableToppings.map(t => (
                <button
                  key={t.id}
                  className={`topping-btn ${toppings.includes(t.id) ? 'selected' : ''}`}
                  onClick={() => toggleTopping(t.id)}
                >
                  <span>{t.icon}</span>
                  <span>{t.name} (+${t.price.toFixed(2)})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="builder-preview">
          <div className="preview-card card">
            <div className="preview-cup">☕</div>
            <h2>Your Custom Drink</h2>
            <div className="preview-details">
              <p><strong>Base:</strong> <span>{bases.find(b => b.id === base)?.name}</span></p>
              <p><strong>Milk:</strong> <span>{milks.find(m => m.id === milk)?.name}</span></p>
              <p><strong>Sweetness:</strong> <span>Level {sweetness}</span></p>
              {toppings.length > 0 && (
                <p><strong>Toppings:</strong> <span>{toppings.length} selected</span></p>
              )}
            </div>
            <div className="preview-price">${calculatePrice().toFixed(2)}</div>
            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrinkBuilder
