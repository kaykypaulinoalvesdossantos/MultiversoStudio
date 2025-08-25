"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Minus, Plus } from "lucide-react"
import Marquee from "react-fast-marquee"
import { useCart } from "@/contexts/cart-context"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice?: number
  color: string
  size: string
  type: string
  quantity: number
  image: string
  store: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, getTotalProducts } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [cepCode, setCepCode] = useState("")

  // Carregar carrinho do localStorage quando modal abrir
  useEffect(() => {
    if (isOpen) {
      const savedCart = localStorage.getItem('multiverso-cart')
      if (savedCart) {
        try {
          // O contexto já carrega automaticamente, não precisamos fazer nada aqui
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error)
        }
      }
    }
  }, [isOpen])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('multiverso-cart', JSON.stringify(items))
    }
  }, [items])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  const freeShippingThreshold = 299.0
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const buttonTexts = ["COMPRAR", "FINALIZAR", "CHECKOUT", "PAGAR", "COMPRAR"]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white/10 backdrop-blur-md border-l border-white/20 shadow-2xl">
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-xl">
            <h2 className="text-lg font-bold text-white tracking-wide drop-shadow-2xl font-gotham-black">MOCHILA | {getTotalProducts()}</h2>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 hover:text-white hover:backdrop-blur-sm transition-all duration-200 border border-white/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-white/5 backdrop-blur-md">
            {items.length === 0 ? (
              <div className="relative flex h-full items-center justify-center">
                <p className="text-white font-medium drop-shadow-2xl font-gotham-medium">Sua mochila está vazio</p>
              </div>
            ) : (
              <div className="relative p-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="pb-4 border-b border-white/20 mb-4 bg-white/10 backdrop-blur-md p-4 shadow-xl border border-white/20"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-28 bg-white/90 backdrop-blur-sm border border-white/30 shadow-md">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={112}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-white mb-2 leading-tight uppercase drop-shadow-2xl font-gotham-bold">
                          {item.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-white drop-shadow-2xl font-gotham-black">
                            R$ {item.price.toFixed(2).replace(".", ",")}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-white/80 line-through drop-shadow-xl font-gotham-light">
                              R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white drop-shadow-xl font-gotham-medium">Tipo:</span>
                            <span className="text-xs text-white/80 font-gotham-medium">{item.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white drop-shadow-xl font-gotham-medium">Cor:</span>
                            <div className="w-3 h-3 bg-white border border-white/60 shadow-lg rounded-sm"></div>
                          </div>
                          <span className="text-xs text-white drop-shadow-xl font-gotham-medium">Tamanho: {item.size}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-white hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-sm font-bold text-white border-l border-r border-white/20 bg-white/10 backdrop-blur-md font-gotham-black drop-shadow-xl">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-white hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs font-bold text-white hover:bg-red-500/30 hover:backdrop-blur-sm px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-md shadow-xl transition-all duration-200 uppercase font-gotham-bold drop-shadow-xl"
                          >
                            REMOVER
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md border-t border-white/20 shadow-xl">
              {remainingForFreeShipping > 0 && (
                <div className="relative p-4 border-b border-white/20">
                  <p className="text-sm font-bold text-white mb-2 drop-shadow-2xl font-gotham-bold">
                    Faltam R$ {remainingForFreeShipping.toFixed(2).replace(".", ",")} para ganhar Frete Grátis!
                  </p>
                  <div className="w-full bg-white/10 backdrop-blur-md border border-white/30 h-3 shadow-inner">
                    <div
                      className="bg-white backdrop-blur-sm h-full transition-all duration-500 shadow-lg"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="relative p-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
                <div className="flex justify-between text-sm text-white mb-2 font-gotham-medium drop-shadow-xl">
                  <span>Produtos: R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  <span>Frete: R$ {shipping.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white font-gotham-black drop-shadow-xl">
                  <span>SUBTOTAL</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <div className="relative p-4 border-b border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="INSIRA O CUPOM"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-white/30 text-sm font-medium focus:outline-none bg-white/10 backdrop-blur-md text-white placeholder-white/80 shadow-xl font-gotham-medium focus:border-white/50 transition-all"
                  />
                  <button className="px-6 py-3 bg-white text-black text-sm font-bold hover:bg-black hover:text-white hover:backdrop-blur-md border border-white/30 transition-all duration-200 shadow-xl font-gotham-bold">
                    Aplicar
                  </button>
                </div>
              </div>

              <div className="relative p-4 border-b border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="DIGITE O SEU CEP"
                    value={cepCode}
                    onChange={(e) => setCepCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-white/30 text-sm font-medium focus:outline-none bg-white/10 backdrop-blur-md text-white placeholder-white/80 shadow-xl font-gotham-medium focus:border-white/50 transition-all"
                  />
                  <button className="px-6 py-3 bg-white text-black text-sm font-bold hover:bg-black hover:text-white hover:backdrop-blur-md border border-white/30 transition-all duration-200 shadow-xl font-gotham-bold">
                    Aplicar
                  </button>
                </div>
              </div>

              <div className="relative p-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
                <div className="flex justify-between items-center text-xl font-bold text-white drop-shadow-2xl font-gotham-black">
                  <span>TOTAL</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <div className="relative p-4">
                <button className="group relative overflow-hidden w-full bg-white/10 backdrop-blur-md text-white py-4 text-lg font-bold hover:bg-white/20 border border-white/20 transition-all duration-300 shadow-xl font-gotham-black">
                  <div className="relative z-10">
                    <Marquee
                      speed={50}
                      gradient={false}
                      className="text-current font-bold"
                    >
                      {buttonTexts.map((text, index) => (
                        <span key={index} className="mx-4">
                          {text}
                        </span>
                      ))}
                    </Marquee>
                  </div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
