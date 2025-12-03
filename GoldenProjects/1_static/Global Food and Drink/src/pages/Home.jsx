import { Link } from 'react-router-dom'
import { regions, countries } from '../data/countries'

function Home({ searchQuery }) {
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.foods.some(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const topFoods = [
    { name: 'Pizza', country: 'Italy', icon: '🍕' },
    { name: 'Sushi', country: 'Japan', icon: '🍣' },
    { name: 'Tacos', country: 'Mexico', icon: '🌮' },
    { name: 'Burger', country: 'USA', icon: '🍔' },
    { name: 'Curry', country: 'India', icon: '🍛' },
    { name: 'Croissant', country: 'France', icon: '🥐' }
  ]

  return (
    <div className="container">
      <div className="hero">
        <h1>🌍 WorldBite</h1>
        <p>Taste the World, One Country at a Time</p>
      </div>

      {searchQuery && (
        <div className="section">
          <h2>Search Results ({filteredCountries.length})</h2>
          <div className="country-grid">
            {filteredCountries.map(country => (
              <Link key={country.id} to={`/country/${country.id}`} className="country-card">
                <div className="flag">{country.flag}</div>
                <h3>{country.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!searchQuery && (
        <>
          <div className="section">
            <h2>Explore by Region</h2>
            <div className="region-grid">
              {Object.entries(regions).map(([key, region]) => (
                <div 
                  key={key} 
                  className="region-card"
                  style={{ borderTop: `4px solid ${region.color}` }}
                >
                  <h3>{region.name}</h3>
                  <p>{countries.filter(c => c.region === key).length} countries</p>
                  <Link to="/countries" className="btn btn-primary">Explore</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>Top Global Foods</h2>
            <div className="region-grid">
              {topFoods.map((food, index) => (
                <div key={index} className="food-card">
                  <div className="icon">{food.icon}</div>
                  <h3>{food.name}</h3>
                  <p>From {food.country}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>By The Numbers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px var(--shadow)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌍</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{countries.length}</div>
                <div style={{ color: 'var(--text-light)' }}>Countries</div>
              </div>
              <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px var(--shadow)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍽️</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                  {countries.reduce((acc, c) => acc + c.foods.length, 0)}
                </div>
                <div style={{ color: 'var(--text-light)' }}>Dishes</div>
              </div>
              <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px var(--shadow)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🥤</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                  {countries.reduce((acc, c) => acc + c.drinks.length, 0)}
                </div>
                <div style={{ color: 'var(--text-light)' }}>Drinks</div>
              </div>
              <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px var(--shadow)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📜</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {countries.reduce((acc, c) => acc + c.foods.length + c.drinks.length, 0)}
                </div>
                <div style={{ color: 'var(--text-light)' }}>Recipes</div>
              </div>
            </div>
          </div>

          <div className="section" style={{ textAlign: 'center' }}>
            <h2>Start Your Culinary Journey</h2>
            <Link to="/countries" className="btn btn-primary">Explore All Countries</Link>
            <Link to="/daily" className="btn btn-secondary">Food of the Day</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
