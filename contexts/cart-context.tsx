"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice?: number
  image: string
  type: string
  color: string
  size: string
  quantity: number
  store: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalProducts: () => number
  getTotalPrice: () => number
  isInCart: (productId: string, type: string, color: string, size: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar carrinho do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('multiverso-cart')
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          // Verificar se o carrinho tem a estrutura correta
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart)
          } else {
            console.error('Carrinho salvo não é um array válido')
            localStorage.removeItem('multiverso-cart')
          }
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error)
          // Limpar carrinho corrompido
          localStorage.removeItem('multiverso-cart')
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('multiverso-cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const existingItemIndex = items.findIndex(
      existing => 
        existing.productId === item.productId &&
        existing.type === item.type &&
        existing.color === item.color &&
        existing.size === item.size
    )

    if (existingItemIndex >= 0) {
      // Se já existe, aumenta a quantidade
      setItems(prev => prev.map((existing, index) => 
        index === existingItemIndex 
          ? { ...existing, quantity: existing.quantity + item.quantity }
          : existing
      ))
    } else {
      // Se não existe, adiciona novo item
      setItems(prev => [...prev, { ...item, id: `${Date.now()}-${Math.random()}` }])
    }
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalProducts = () => {
    return items.reduce((total, item) => total + 1, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const isInCart = (productId: string, type: string, color: string, size: string) => {
    return items.some(item => 
      item.productId === productId &&
      item.type === type &&
      item.color === color &&
      item.size === size
    )
  }

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalProducts,
    getTotalPrice,
    isInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
