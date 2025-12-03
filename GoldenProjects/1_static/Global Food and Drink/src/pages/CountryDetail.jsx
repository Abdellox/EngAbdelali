import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { countries } from '../data/countries'
import FoodModal from '../components/FoodModal'

function CountryDetail() {
  const { id } = useParams()
  const country = countries.find(c => c.id === id)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalType, setModalType] = useState(null)

  if (!country) {
    return (
      <div className="container">
        <h1>Country not found</h1>
        <Link to="/countries" className="btn btn-primary">Back to Countries</Link>
      </div>
    )
  }

  const getSpicyIndicator = (level) => {
    return '🌶️'.repeat(level) || '✓'
  }

  return (
    <div className="container">
      <div className="hero" style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '4rem' }}>{country.flag}</span>
          <div>
            <h1>{country.name}</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{country.greeting}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>🍽️ Signature Foods</h2>
        <div className="region-grid">
          {country.foods.map((food, index) => (
            <div 
              key={index} 
              className="food-card"
              onClick={() => {
                setSelectedItem(food)
                setModalType('food')
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon">{food.image}</div>
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <div className="spicy-level">
                Spicy: {getSpicyIndicator(food.spicy)}
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                Type: {food.type}
              </div>
              <button className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>🥤 Famous Drinks</h2>
        <div className="region-grid">
          {country.drinks.map((drink, index) => (
            <div 
              key={index} 
              className="drink-card"
              onClick={() => {
                setSelectedItem(drink)
                setModalType('drink')
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon">{drink.image}</div>
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                Type: {drink.type}
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>📚 Cultural Food Facts</h2>
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 3px 10px var(--shadow)' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {country.culturalFacts.map((fact, index) => (
              <li key={index} style={{ padding: '1rem 0', borderBottom: index < country.culturalFacts.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                <span style={{ marginRight: '0.5rem' }}>✨</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <Link to="/countries" className="btn btn-primary">Back to Countries</Link>
      </div>

      {selectedItem && (
        <FoodModal 
          item={selectedItem} 
          type={modalType}
          onClose={() => {
            setSelectedItem(null)
            setModalType(null)
          }} 
        />
      )}
    </div>
  )
}

export default CountryDetail
