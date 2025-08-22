"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  category: string
  color: string
  sizes: string[]
  price: number
  originalPrice?: number
  frete: boolean
  image: string
  sold: number
  isNew: boolean
  badge?: string
  store: string
  rating: number
  reviews: number
  isExclusive?: boolean
}

interface QuickBuyProductCardProps {
  product: Product
  onQuickBuy: (productId: string, type: string, color: string, size: string) => void
}

export default function QuickBuyProductCard({ product, onQuickBuy }: QuickBuyProductCardProps) {
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")

  const productTypes = [
    { id: "original", name: "Original", price: product.price, originalPrice: product.originalPrice },
    { id: "premium", name: "Premium", price: product.price + 20, originalPrice: (product.originalPrice || product.price) + 20 }
  ]

  const productColors = [
    { name: "Preto", value: "black", image: product.image },
    { name: "Branco", value: "white", image: product.image },
    { name: "Laranja", value: "orange", image: product.image }
  ]

  const sizes = product.sizes.length > 0 ? product.sizes : ["Único"]

  const handleQuickBuy = () => {
    if (!selectedType || !selectedColor || !selectedSize) {
      // Selecionar valores padrão se não houver seleção
      const type = selectedType || productTypes[0].id
      const color = selectedColor || productColors[0].value
      const size = selectedSize || sizes[0]
      
      onQuickBuy(product.id, type, color, size)
    } else {
      onQuickBuy(product.id, selectedType, selectedColor, selectedSize)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getCurrentPrice = () => {
    const type = productTypes.find(t => t.id === selectedType) || productTypes[0]
    return type.price
  }

  const getCurrentOriginalPrice = () => {
    const type = productTypes.find(t => t.id === selectedType) || productTypes[0]
    return type.originalPrice
  }

  return (
    <div className="bg-white border border-neutral-200 p-4 space-y-4">
      {/* Imagem e informações básicas */}
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-green-50 rounded-sm overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 text-sm leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 capitalize mt-1">{product.category}</p>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.isNew && (
              <span className="text-[10px] px-2 py-0.5 border border-orange-500 text-orange-600 bg-white">
                NOVO
              </span>
            )}
            {product.frete && (
              <span className="text-[10px] px-2 py-0.5 border border-green-300 text-green-700 bg-white">
                FRETE GRÁTIS
              </span>
            )}
            {product.isExclusive && (
              <span className="text-[10px] px-2 py-0.5 border border-green-300 text-green-700 bg-white">
                EXCLUSIVO
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Seleção de tipo */}
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-2">
          Tipo
        </label>
        <div className="grid grid-cols-2 gap-2">
          {productTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-2 text-xs border transition ${
                selectedType === type.id
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-neutral-300 hover:border-orange-400'
              }`}
            >
              <div className="font-medium">{type.name}</div>
              <div className="text-neutral-600">
                {formatPrice(type.price)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Seleção de cor */}
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-2">
          Cor
        </label>
        <div className="flex flex-wrap gap-2">
          {productColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`px-3 py-2 text-xs border transition ${
                selectedColor === color.value
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-neutral-300 hover:border-orange-400'
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* Seleção de tamanho */}
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-2">
          Tamanho
        </label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-2 text-xs border transition ${
                selectedSize === size
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-neutral-300 hover:border-orange-400'
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Preço e botão */}
      <div className="pt-2 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-orange-700">
              {formatPrice(getCurrentPrice())}
            </span>
            {getCurrentOriginalPrice() && getCurrentOriginalPrice() > getCurrentPrice() && (
              <span className="text-neutral-400 line-through text-sm">
                {formatPrice(getCurrentOriginalPrice()!)}
              </span>
            )}
          </div>
          
          {getCurrentOriginalPrice() && getCurrentOriginalPrice() > getCurrentPrice() && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
              {Math.round(((getCurrentOriginalPrice()! - getCurrentPrice()) / getCurrentOriginalPrice()!) * 100)}% OFF
            </span>
          )}
        </div>

        <Button
          onClick={handleQuickBuy}
          className="w-full bg-orange-500 text-white py-2 font-bold text-sm uppercase hover:bg-orange-600 transition"
        >
          Comprar Agora
        </Button>
      </div>
    </div>
  )
}
