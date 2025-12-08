import { useState, useEffect } from 'react'
import { deals } from '../data/menuData'
import './Deals.css'

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const newTimeLeft = {}
      
      deals.forEach(deal => {
        const endDate = new Date(deal.validUntil)
        const diff = endDate - now
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((diff % (1000 * 60)) / 1000)
          
          newTimeLeft[deal.id] = { days, hours, minutes, seconds }
        }
      })
      
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="deals-page fade-in">
      <div className="deals-header">
        <div className="container">
          <h1>🔥 Hot Deals & Specials</h1>
          <p>Limited time offers you don't want to miss!</p>
        </div>
      </div>

      <div className="container">
        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="deal-card card">
              <div className="deal-badges">
                {deal.badges.map(badge => (
                  <span key={badge} className="badge badge-hot">{badge}</span>
                ))}
              </div>
              
              <h2>{deal.title}</h2>
              <p className="deal-description">{deal.description}</p>
              
              <div className="deal-pricing">
                <span className="original-price">${deal.originalPrice}</span>
                <span className="deal-price">${deal.dealPrice}</span>
                <span className="savings">Save ${(deal.originalPrice - deal.dealPrice).toFixed(2)}</span>
              </div>

              {timeLeft[deal.id] && (
                <div className="countdown">
                  <div className="countdown-label">⏰ Ends in:</div>
                  <div className="countdown-timer">
                    <div className="time-unit">
                      <span className="time-value">{timeLeft[deal.id].days}</span>
                      <span className="time-label">Days</span>
                    </div>
                    <div className="time-unit">
                      <span className="time-value">{timeLeft[deal.id].hours}</span>
                      <span className="time-label">Hours</span>
                    </div>
                    <div className="time-unit">
                      <span className="time-value">{timeLeft[deal.id].minutes}</span>
                      <span className="time-label">Min</span>
                    </div>
                    <div className="time-unit">
                      <span className="time-value">{timeLeft[deal.id].seconds}</span>
                      <span className="time-label">Sec</span>
                    </div>
                  </div>
                </div>
              )}

              <button className="btn-primary">Claim Deal</button>
            </div>
          ))}
        </div>

        <section className="coupon-section">
          <h2 className="section-title">🎟️ Coupon Codes</h2>
          <div className="coupons-grid">
            <div className="coupon-card card">
              <div className="coupon-code">FIRST20</div>
              <p>20% off your first order</p>
            </div>
            <div className="coupon-card card">
              <div className="coupon-code">PIZZA50</div>
              <p>$5 off orders over $50</p>
            </div>
            <div className="coupon-card card">
              <div className="coupon-code">FREESIDE</div>
              <p>Free side with any large pizza</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Deals
