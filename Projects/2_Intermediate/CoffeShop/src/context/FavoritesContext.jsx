import React, { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id)
      if (exists) {
        return prev.filter(fav => fav.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isFavorite = (id) => favorites.some(fav => fav.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
