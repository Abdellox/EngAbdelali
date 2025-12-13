import { useState } from 'react'
import { Link } from 'react-router-dom'
import { countries } from '../data/countries'
import FoodModal from '../components/FoodModal'

function FoodBrowser() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [spicyFilter, setSpicyFilter] = useState('all')
  const [selectedFood, setSelectedFood] = useState(null)

  const allFoods = countries.flatMap(country =>
    country.foods.map(food => ({
      ...food,
      country: country.name,
      countryId: country.id,
      flag: country.flag
    }))
  )

  const filteredFoods = allFoods.filter(food => {
    const matchesType = typeFilter === 'all' || food.type === typeFilter
    const matchesSpicy = spicyFilter === 'all' || 
      (spicyFilter === 'mild' && food.spicy <= 1) ||
      (spicyFilter === 'spicy' && food.spicy >= 2)
    return matchesType && matchesSpicy
  })

  return (
    <div className="container">
      <h1>Global Food Browser</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
        Explore {allFoods.length} dishes from around the world
      </p>

      <div className="section">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <strong>Type:</strong>
            <button className={`btn ${typeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTypeFilter('all')}>All</button>
            <button className={`btn ${typeFilter === 'main' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTypeFilter('main')}>Main</button>
            <button className={`btn ${typeFilter === 'street' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTypeFilter('street')}>Street</button>
            <button className={`btn ${typeFilter === 'dessert' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTypeFilter('dessert')}>Dessert</button>
          </div>
          <div>
            <strong>Spice:</strong>
            <button className={`btn ${spicyFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSpicyFilter('all')}>All</button>
            <button className={`btn ${spicyFilter === 'mild' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSpicyFilter('mild')}>Mild</button>
            <button className={`btn ${spicyFilter === 'spicy' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSpicyFilter('spicy')}>Spicy</button>
          </div>
        </div>

        <div className="region-grid">
          {filteredFoods.map((food, index) => (
            <div 
              key={index} 
              className="food-card"
              onClick={() => setSelectedFood(food)}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon">{food.image}</div>
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{food.flag}</span>
                <Link 
                  to={`/country/${food.countryId}`} 
                  style={{ color: 'var(--primary)', fontSize: '0.9rem' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {food.country}
                </Link>
              </div>
              <div className="spicy-level">
                Spicy: {'🌶️'.repeat(food.spicy) || '✓'}
              </div>
              <button className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                View Recipe
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedFood && (
        <FoodModal 
          item={selectedFood} 
          type="food"
          onClose={() => setSelectedFood(null)} 
        />
      )}
    </div>
  )
}

export default FoodBrowser
