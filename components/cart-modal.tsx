"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Minus, Plus, ShoppingCart } from "lucide-react"
import Marquee from "react-fast-marquee"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { freightService } from "@/lib"
import { useCustomerAuth } from "@/hooks/use-customer-auth"

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
  const { isLoggedIn, customer } = useCustomerAuth()
  const [couponCode, setCouponCode] = useState("")
  const [cepCode, setCepCode] = useState("")
  const router = useRouter()

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

  // Carregar endereço automaticamente quando usuário estiver logado
  useEffect(() => {
    const loadCustomerAddress = async () => {
      if (isLoggedIn && customer && isOpen) {
        try {
          // Buscar perfil completo do usuário para pegar endereços
          const profile = await fetch('https://api.multiversoestudiocrm.com.br/api/public/customers/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('customerToken')}`,
              'Content-Type': 'application/json'
            }
          }).then(res => res.json());

          if (profile.success && profile.customer.addresses && profile.customer.addresses.length > 0) {
            // Pegar o endereço padrão ou o primeiro disponível
            const defaultAddress = profile.customer.addresses.find((addr: any) => addr.isDefault) || profile.customer.addresses[0];
            
            if (defaultAddress && defaultAddress.zipCode) {
              setCepCode(defaultAddress.zipCode);
              
              // Calcular frete automaticamente
              setIsCalculatingFreight(true);
              try {
                const result = await freightService.calculateFreight(items, defaultAddress.zipCode);
                if (result.success && result.freightOptions.length > 0) {
                  const firstFreight = result.freightOptions[0];
                  setFreightPrice(firstFreight.custom_price || firstFreight.price);
                }
              } catch (error) {
                console.error('Erro ao calcular frete:', error);
                setFreightPrice(15.90); // Frete padrão
              } finally {
                setIsCalculatingFreight(false);
              }
            }
          }
        } catch (error) {
          console.error('Erro ao carregar endereço:', error);
        }
      }
    };

    loadCustomerAddress();
  }, [isLoggedIn, customer, isOpen, items]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [freightPrice, setFreightPrice] = useState(0)
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false)
  const total = subtotal + freightPrice

  const freeShippingThreshold = 299.0
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  
  // Calcular frete grátis baseado no valor do pedido
  const shouldShowFreeShipping = subtotal >= freeShippingThreshold && freightPrice === 0

  const buttonTexts = ["COMPRAR", "FINALIZAR", "CHECKOUT", "PAGAR", "COMPRAR"]

  const handleCheckout = () => {
    onClose() // Fechar modal
    router.push('/checkout') // Redirecionar para checkout
  }

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
              {shouldShowFreeShipping ? (
                <div className="relative p-4 border-b border-white/20">
                  <p className="text-sm font-bold text-green-400 mb-2 drop-shadow-2xl font-gotham-bold">
                    🎉 Frete Grátis! Pedido acima de R$ {freeShippingThreshold.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              ) : remainingForFreeShipping > 0 ? (
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
              ) : null}

              <div className="relative p-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
                <div className="flex justify-between text-sm text-white mb-2 font-gotham-medium drop-shadow-xl">
                  <span>Produtos: R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {freightPrice > 0 && (
                  <div className="flex justify-between text-sm text-white mb-2 font-gotham-medium drop-shadow-xl">
                    <span>Frete: R$ {freightPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
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
                    placeholder={isLoggedIn ? "SEU CEP CARREGADO AUTOMATICAMENTE" : "DIGITE O SEU CEP"}
                    value={cepCode}
                    onChange={(e) => setCepCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-white/30 text-sm font-medium focus:outline-none bg-white/10 backdrop-blur-md text-white placeholder-white/80 shadow-xl font-gotham-medium focus:border-white/50 transition-all"
                  />
                  <button 
                    onClick={async () => {
                      if (cepCode.replace(/\D/g, '').length === 8) {
                        setIsCalculatingFreight(true);
                        try {
                          const result = await freightService.calculateFreight(items, cepCode);
                          if (result.success && result.freightOptions.length > 0) {
                            // Usar o primeiro frete disponível
                            const firstFreight = result.freightOptions[0];
                            setFreightPrice(firstFreight.custom_price || firstFreight.price);
                          }
                        } catch (error) {
                          console.error('Erro ao calcular frete:', error);
                          setFreightPrice(15.90); // Frete padrão
                        } finally {
                          setIsCalculatingFreight(false);
                        }
                      }
                    }}
                    disabled={isCalculatingFreight || cepCode.replace(/\D/g, '').length !== 8}
                    className="px-6 py-3 bg-white text-black text-sm font-bold hover:bg-black hover:text-white hover:backdrop-blur-md border border-white/30 transition-all duration-200 shadow-xl font-gotham-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculatingFreight ? 'Calculando...' : 'Aplicar'}
                  </button>
                </div>
                {isLoggedIn && cepCode && (
                  <div className="mt-2 text-sm text-green-400">
                    ✅ Endereço carregado automaticamente
                  </div>
                )}
                {freightPrice > 0 && (
                  <div className="mt-2 text-sm text-white/80">
                    Frete: {freightService.formatFreightPrice(freightPrice)}
                  </div>
                )}
              </div>

              <div className="relative p-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
                <div className="flex justify-between items-center text-xl font-bold text-white drop-shadow-2xl font-gotham-black">
                  <span>TOTAL</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
                {freightPrice > 0 && (
                  <div className="text-xs text-white/80 mt-1 text-center">
                    Inclui frete de R$ {freightPrice.toFixed(2).replace(".", ",")}
                  </div>
                )}
              </div>

              <div className="relative p-4">
                <button 
                  onClick={handleCheckout}
                  className="group relative overflow-hidden w-full bg-white/10 backdrop-blur-md text-white py-4 text-lg font-bold hover:bg-white/20 border border-white/20 transition-all duration-300 shadow-xl font-gotham-black cursor-pointer"
                >
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
