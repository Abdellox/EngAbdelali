import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map(i => 
          i.id === item.id && i.size === item.size 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
      return
    }
    setCart(prev => prev.map(item =>
      item.id === id && item.size === size ? { ...item, quantity } : item
    ))
  }

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isFavorite = (id) => favorites.some(item => item.id === id)

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
      isFavorite,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}
