import { Link } from 'react-router-dom'
import { countries } from '../data/countries'
import { useState, useEffect } from 'react'

function DailyFeature() {
  const [featured, setFeatured] = useState(null)

  useEffect(() => {
    // Get a consistent "random" item based on the day
    const today = new Date().toDateString()
    const allFoods = countries.flatMap(country =>
      country.foods.map(food => ({
        ...food,
        country: country.name,
        countryId: country.id,
        flag: country.flag,
        greeting: country.greeting
      }))
    )
    
    // Simple hash function for consistent daily selection
    let hash = 0
    for (let i = 0; i < today.length; i++) {
      hash = ((hash << 5) - hash) + today.charCodeAt(i)
      hash = hash & hash
    }
    
    const index = Math.abs(hash) % allFoods.length
    setFeatured(allFoods[index])
  }, [])

  if (!featured) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <h1>🌟 Food & Drink of the Day</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="hero" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>{featured.image}</div>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{featured.name}</h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>{featured.description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>{featured.flag}</span>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem' }}>From {featured.country}</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{featured.greeting}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '10px' }}>
            <strong>Type:</strong> {featured.type}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '10px' }}>
            <strong>Spicy:</strong> {'🌶️'.repeat(featured.spicy) || '✓'}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link to={`/country/${featured.countryId}`} className="btn btn-primary">
            Explore {featured.country} Cuisine
          </Link>
          <Link to="/foods" className="btn btn-secondary">
            Browse All Foods
          </Link>
        </div>
      </div>

      <div className="section" style={{ textAlign: 'center' }}>
        <h2>Come back tomorrow for a new featured dish!</h2>
        <p style={{ color: 'var(--text-light)' }}>
          Every day we showcase a different iconic food from around the world
        </p>
      </div>
    </div>
  )
}

export default DailyFeature
