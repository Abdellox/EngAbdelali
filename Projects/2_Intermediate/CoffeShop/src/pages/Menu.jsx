import React, { useState } from 'react'
import { menuItems, categories } from '../data/menuData'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { showToast } from '../components/Toast'
import './Menu.css'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (item) => {
    addToCart(item)
    showToast(`${item.name} added to cart!`)
  }

  const handleToggleFavorite = (item) => {
    toggleFavorite(item)
    showToast(isFavorite(item.id) ? 'Removed from favorites' : 'Added to favorites!')
  }

  return (
    <div className="menu container">
      <h1>Our Menu</h1>
      
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search drinks..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-card card">
            {item.badge && <span className={`badge badge-${item.badge}`}>{item.badge}</span>}
            <div className="menu-image">{item.image}</div>
            <h3>{item.name}</h3>
            <p className="menu-description">{item.description}</p>
            <div className="menu-footer">
              <span className="price">${item.price.toFixed(2)}</span>
              <div className="menu-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleToggleFavorite(item)}
                  title={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(item.id) ? '❤️' : '🤍'}
                </button>
                <button className="btn-primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No items found. Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}

export default Menu
