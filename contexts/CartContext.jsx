'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, useState, useRef } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'UPDATE_QTY': {
      if (action.qty < 1) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'HYDRATE':
      return action.state
    default:
      return state
  }
}

const INITIAL = { items: [] }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('njc-cart')
      if (saved) dispatch({ type: 'HYDRATE', state: JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('njc-cart', JSON.stringify(state))
    } catch {}
  }, [state])

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD', product })
    setToast(product.name)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const updateQty = useCallback((id, qty) => {
    dispatch({ type: 'UPDATE_QTY', id, qty })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const freeShipping = subtotal >= 50

  return (
    <CartContext.Provider
      value={{ items: state.items, subtotal, totalItems, freeShipping, addToCart, removeFromCart, updateQty, clearCart, toast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
