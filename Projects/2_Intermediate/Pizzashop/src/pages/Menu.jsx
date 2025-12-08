import { useState } from 'react'
import { pizzas, sides, drinks, desserts } from '../data/menuData'
import PizzaCard from '../components/PizzaCard'
import './Menu.css'

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(pizzas.map(p => p.category))]

  const filteredPizzas = pizzas.filter(pizza => {
    const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pizza.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || pizza.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="menu-page fade-in">
      <div className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
          <p>Explore our delicious selection of handcrafted pizzas</p>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search pizzas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <section className="menu-section">
          <h2 className="section-title">🍕 Pizzas</h2>
          <div className="pizza-grid">
            {filteredPizzas.map(pizza => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">🍟 Sides</h2>
          <div className="items-grid">
            {sides.map(item => (
              <div key={item.id} className="menu-item card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <button className="btn-primary">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">🥤 Drinks</h2>
          <div className="items-grid">
            {drinks.map(item => (
              <div key={item.id} className="menu-item card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <button className="btn-primary">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">🍰 Desserts</h2>
          <div className="items-grid">
            {desserts.map(item => (
              <div key={item.id} className="menu-item card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <button className="btn-primary">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Menu
