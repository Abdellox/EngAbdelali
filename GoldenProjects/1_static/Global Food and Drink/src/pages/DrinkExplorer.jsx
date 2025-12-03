import { useState } from 'react'
import { Link } from 'react-router-dom'
import { countries } from '../data/countries'
import FoodModal from '../components/FoodModal'

function DrinkExplorer() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedDrink, setSelectedDrink] = useState(null)

  const allDrinks = countries.flatMap(country =>
    country.drinks.map(drink => ({
      ...drink,
      country: country.name,
      countryId: country.id,
      flag: country.flag
    }))
  )

  const filteredDrinks = allDrinks.filter(drink =>
    typeFilter === 'all' || drink.type === typeFilter
  )

  const drinkTypes = ['all', 'soft', 'tea', 'coffee', 'alcohol', 'cocktail', 'hot']

  return (
    <div className="container">
      <h1>Global Drink Explorer</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
        Discover {allDrinks.length} beverages from around the world
      </p>

      <div className="section">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {drinkTypes.map(type => (
            <button
              key={type}
              className={`btn ${typeFilter === type ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTypeFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="region-grid">
          {filteredDrinks.map((drink, index) => (
            <div 
              key={index} 
              className="drink-card"
              onClick={() => setSelectedDrink(drink)}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon">{drink.image}</div>
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{drink.flag}</span>
                <Link 
                  to={`/country/${drink.countryId}`} 
                  style={{ color: 'var(--primary)', fontSize: '0.9rem' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {drink.country}
                </Link>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                Type: {drink.type}
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                View Recipe
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedDrink && (
        <FoodModal 
          item={selectedDrink} 
          type="drink"
          onClose={() => setSelectedDrink(null)} 
        />
      )}
    </div>
  )
}

export default DrinkExplorer
