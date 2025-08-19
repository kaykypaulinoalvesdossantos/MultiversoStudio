"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  store: string
  quantity: number
  size?: string
  color?: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  // Mock de itens do carrinho - em produção viria de um contexto/estado global
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Camiseta Cafézini Garganttinni - Edição Limitada",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Sacocheio.tv",
      quantity: 2,
      size: "M",
      color: "Preto"
    },
    {
      id: 2,
      name: "Caneca Cafézini Premium - Cerâmica",
      price: 45.9,
      originalPrice: 55.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Sacocheio.tv",
      quantity: 1
    }
  ])

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId))
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalDiscount = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  )
  const total = subtotal

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold">Carrinho</h2>
            <Badge variant="secondary" className="ml-2">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </Badge>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Carrinho vazio</h3>
                <p className="text-gray-500">Adicione produtos para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4 p-4 border border-gray-200 rounded-lg">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600 truncate">{item.store}</p>
                          <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                          {item.size && (
                            <p className="text-xs text-gray-500">Tamanho: {item.size}</p>
                          )}
                          {item.color && (
                            <p className="text-xs text-gray-500">Cor: {item.color}</p>
                          )}
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">
                            R$ {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              R$ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Desconto</span>
                    <span className="font-medium text-green-600">-R$ {totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
