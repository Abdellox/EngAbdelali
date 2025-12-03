import './FoodModal.css'

function FoodModal({ item, type, onClose }) {
  if (!item) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="modal-icon">{item.image}</div>
          <h2>{item.name}</h2>
          <p className="modal-description">{item.description}</p>
        </div>

        {item.history && (
          <div className="modal-section">
            <h3>📜 History</h3>
            <p>{item.history}</p>
          </div>
        )}

        {item.recipe && item.recipe.length > 0 && (
          <div className="modal-section">
            <h3>👨‍🍳 Recipe</h3>
            <ol className="recipe-steps">
              {item.recipe.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {type === 'food' && (
          <div className="modal-info">
            <span className="info-badge">Type: {item.type}</span>
            <span className="info-badge">Spicy: {'🌶️'.repeat(item.spicy) || '✓'}</span>
          </div>
        )}

        {type === 'drink' && (
          <div className="modal-info">
            <span className="info-badge">Type: {item.type}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodModal
