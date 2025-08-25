"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Marquee from "react-fast-marquee"
import { useCart } from "@/contexts/cart-context"

interface ProductType {
  id: string
  name: string
  price: number
  originalPrice?: number
}

interface ProductColor {
  name: string
  value: string
  image: string
}

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    badge?: string
    discount?: string
    freeShipping?: boolean
    store: string
    rating: number
    reviews: number
    sold: number
  }
  types: ProductType[]
  colors: ProductColor[]
  sizes: string[]
  onQuickBuy?: (productId: string, type: string, color: string, size: string) => void
}

export default function ProductCard({ 
  product, 
  types, 
  colors, 
  sizes, 
  onQuickBuy 
}: ProductCardProps) {
  const [step, setStep] = useState<"initial" | "type" | "color" | "size">("initial")
  const [selectedType, setSelectedType] = useState<ProductType | null>(null)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isHoveringBuy, setIsHoveringBuy] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { addToCart } = useCart()

  // Compra rápida sempre disponível
  const hasQuickBuy = true

  const getCurrentImage = () => {
    if (selectedColor) {
      return selectedColor.image
    }
    return product.image
  }

  const handleTypeSelect = (type: ProductType) => {
    setSelectedType(type)
    setStep("color")
  }

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color)
    setStep("size")
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)

    // Adicionar ao carrinho via contexto
    if (selectedType && selectedColor) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        type: selectedType.name,
        color: selectedColor.name,
        size,
        quantity: 1,
        store: product.store
      })

      // Mostrar confirmação
      setShowConfirmation(true)
    }

    // Reset do estado após um delay para mostrar confirmação
    setTimeout(() => {
      setSelectedType(null)
      setSelectedColor(null)
      setSelectedSize(null)
      setStep("initial")
      setIsHoveringBuy(false)
      setShowConfirmation(false)
    }, 2000)
  }

  const handleMouseLeave = () => {
    // Só reseta se não estiver no meio de uma seleção
    if (step === "initial") {
      setIsHoveringBuy(false)
    }
  }

  const handleBuyHover = () => {
    if (hasQuickBuy) {
      setIsHoveringBuy(true)
      setStep("type")
    }
  }

  const handleBuyLeave = () => {
    if (step === "initial") {
      setIsHoveringBuy(false)
    }
  }

  const handleBuyClick = () => {
    if (hasQuickBuy) {
      setIsHoveringBuy(true)
      setStep("type")
    }
  }

  return (
    <div
      className="group cursor-pointer flex-shrink-0 w-full max-w-[280px] mx-auto"
      onMouseLeave={handleMouseLeave}
    >
      {/* Confirmação de produto adicionado */}
      {showConfirmation && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-green-500 text-white text-center py-2 font-bold text-sm animate-pulse">
          ✓ PRODUTO ADICIONADO AO CARRINHO!
        </div>
      )}

      <div className="relative aspect-[2300/3066] overflow-hidden bg-gray-50 mb-1">
        <Image
          src={getCurrentImage() || "/placeholder.svg?height=400&width=300"}
          alt={product.name}
          fill
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col space-y-0.5">
          {product.badge && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              {product.badge}
            </div>
          )}
          {product.discount && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              {product.discount}
            </div>
          )}
          {product.freeShipping && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              FRETE GRÁTIS
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col space-y-0.5">
          {colors.slice(0, 3).map((color) => (
            <div
              key={color.value}
              className={`w-4 h-4 border-2 cursor-pointer transition-all ${
                selectedColor?.value === color.value ? "border-gray-800 ring-2 ring-gray-400 ring-offset-1" : "border-white"
              } ${
                color.value === "black"
                  ? "bg-black"
                  : color.value === "white"
                    ? "bg-white"
                    : color.value === "blue"
                      ? "bg-blue-500"
                      : color.value === "red"
                        ? "bg-red-500"
                        : "bg-gray-400"
              }`}
              onClick={() => handleColorSelect(color)}
            />
          ))}
          <div className="w-4 h-4 bg-gray-400 border border-white text-black text-xs font-bold flex items-center justify-center cursor-pointer">
            +
          </div>
        </div>

        {/* Quick Buy Button - Bottom of image, full width */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          {/* Botão só aparece quando não está configurando o produto */}
          {!isHoveringBuy && (
            <Button
              className="w-full transition-opacity bg-black hover:bg-black text-white rounded-none font-bold uppercase opacity-100"
              onMouseEnter={handleBuyHover}
              onMouseLeave={handleBuyLeave}
              onClick={handleBuyClick}
            >
              {/* Marquee para estado inicial */}
              <Marquee
                speed={50}
                gradient={false}
                className="text-white font-bold"
              >
                {["COMPRAR", "COMPRAR", "COMPRAR", "COMPRAR"].map((text, index) => (
                  <span key={index} className="mx-2">
                    {text}
                  </span>
                ))}
              </Marquee>
            </Button>
          )}

          {/* Quick Buy Flow - Só aparece se hasQuickBuy = true */}
          {hasQuickBuy && isHoveringBuy && step === "type" && (
            <div className="opacity-100 transition-opacity flex bg-black">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type)}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-bold uppercase py-2 md:py-3 text-xs md:text-sm transition-colors"
                >
                  {type.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsHoveringBuy(false)
                  setStep("initial")
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold uppercase py-2 md:py-3 text-xs md:text-sm transition-colors px-2"
              >
                ✕
              </button>
            </div>
          )}

          {hasQuickBuy && isHoveringBuy && step === "color" && (
            <div className="opacity-100 transition-opacity bg-black">
              <div className="text-white text-xs font-bold uppercase mb-1 text-center py-1">{selectedType?.name}</div>
              <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-0">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorSelect(color)}
                    className="bg-black hover:bg-gray-800 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors border-r border-gray-600 last:border-r-0 md:flex-1"
                  >
                    {color.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("type")}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors px-2 border-t border-gray-600"
              >
                ← Voltar
              </button>
            </div>
          )}

          {hasQuickBuy && isHoveringBuy && step === "size" && (
            <div className="opacity-100 transition-opacity bg-black">
              <div className="text-white text-xs font-bold uppercase mb-1 text-center py-1">
                {selectedType?.name} - {selectedColor?.name}
              </div>
              <div className="grid grid-cols-3 md:flex gap-0">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="bg-black hover:bg-gray-800 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors border-r border-gray-600 last:border-r-0 md:flex-1"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("color")}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors px-2 border-t border-gray-600"
              >
                ← Voltar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1 px-1 md:px-0">
        {/* Store Name */}
        <p className="text-xs text-gray-600 uppercase font-bold font-gotham-bold">{product.store}</p>
        
        {/* Product Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-bold text-xs md:text-sm leading-tight uppercase text-black font-gotham-bold" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600">★ {product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-lg font-bold text-black font-gotham-black">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-gray-500 line-through font-gotham-medium">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
        
        {/* Payment Terms */}
        <div className="text-xs text-green-600 font-semibold font-gotham-bold">3X SEM JUROS</div>
        
        {/* Sales Count */}
        <div className="text-xs text-gray-500 font-medium font-gotham-medium">{product.sold} VENDIDOS</div>
      </div>
    </div>
  )
}
