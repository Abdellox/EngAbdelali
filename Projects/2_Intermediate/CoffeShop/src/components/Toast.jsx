import React from 'react'
import './Toast.css'

const Toast = () => {
  return <div id="toast" className="toast"></div>
}

export const showToast = (message, type = 'success') => {
  const toast = document.getElementById('toast')
  if (toast) {
    toast.textContent = message
    toast.className = `toast ${type} show`
    setTimeout(() => {
      toast.className = 'toast'
    }, 3000)
  }
}

export default Toast
