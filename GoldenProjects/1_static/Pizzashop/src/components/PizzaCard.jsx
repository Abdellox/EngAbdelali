import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Toast from './Toast'
import './PizzaCard.css'

const PizzaCard = ({ pizza }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart()
  const [selectedSize, setSelectedSize] = useState('M')
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: pizza.id,
      name: pizza.name,
      price: pizza.price[selectedSize],
      size: selectedSize,
      image: pizza.image
    })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <>
      <div className="pizza-card card">
        <div className="pizza-image-container">
          <img src={pizza.image} alt={pizza.name} className="pizza-image" />
          <button 
            className={`favorite-btn ${isFavorite(pizza.id) ? 'active' : ''}`}
            onClick={() => toggleFavorite(pizza)}
          >
            {isFavorite(pizza.id) ? '❤️' : '🤍'}
          </button>
          {pizza.badges && pizza.badges.map(badge => (
            <span key={badge} className={`badge badge-${badge.toLowerCase().replace(' ', '-')}`}>
              {badge}
            </span>
          ))}
        </div>
        
        <div className="pizza-info">
          <h3 className="pizza-name">{pizza.name}</h3>
          <p className="pizza-category">{pizza.category}</p>
          <p className="pizza-description">{pizza.description}</p>
          
          <div className="size-selector">
            {Object.keys(pizza.price).map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          
          <div className="pizza-footer">
            <span className="pizza-price">${pizza.price[selectedSize]}</span>
            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {showToast && <Toast message={`${pizza.name} added to cart!`} />}
    </>
  )
}

export default PizzaCard
