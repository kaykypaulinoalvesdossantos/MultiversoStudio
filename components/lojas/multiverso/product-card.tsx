"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Marquee from "react-fast-marquee"

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

  // Se há mais de 2 tipos, não mostra compra rápida
  const hasQuickBuy = types.length <= 2

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

    if (onQuickBuy && selectedType && selectedColor) {
      onQuickBuy(product.id, selectedType.name, selectedColor.name, size)
    } else {
      // Fallback para alert (pode ser removido depois)
      alert(`Produto adicionado ao carrinho!\nTipo: ${selectedType?.name}\nCor: ${selectedColor?.name}\nTamanho: ${size}`)
    }

    // Reset do estado
    setSelectedType(null)
    setSelectedColor(null)
    setSelectedSize(null)
    setStep("initial")
    setIsHoveringBuy(false)
  }

  const handleMouseLeave = () => {
    setStep("initial")
    setSelectedType(null)
    setSelectedColor(null)
    setSelectedSize(null)
    setIsHoveringBuy(false)
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

  const getBadgeBackground = (badge: string) => {
    if (badge.includes("novo") || badge.includes("off")) {
      return "bg-yellow-500"
    }
    if (badge.includes("frete grátis") || badge.includes("exclusivo")) {
      return "bg-white border border-gray-300"
    }
    return "bg-yellow-500"
  }

  return (
    <div
      className="group cursor-pointer"
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[2300/3066] overflow-hidden bg-gray-50 mb-1">
        <Image
          src={getCurrentImage() || "/placeholder.svg?height=400&width=300"}
          alt={product.name}
          fill
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-0.5">
          {product.badge && (
            <div className={`text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer ${getBadgeBackground(product.badge)} text-black`}>
              {product.badge}
            </div>
          )}
          {product.discount && (
            <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer bg-yellow-500">
              {product.discount}
            </div>
          )}
          {product.freeShipping && (
            <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer bg-white border border-gray-300">
              FRETE GRÁTIS
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div className="absolute top-4 right-4 flex flex-col space-y-0.5">
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
          {!isHoveringBuy && (
            <Button
              className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black hover:bg-black text-white rounded-none font-bold uppercase"
              onMouseEnter={handleBuyHover}
              onMouseLeave={handleBuyLeave}
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
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-bold uppercase py-3 text-sm transition-colors"
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}

          {hasQuickBuy && isHoveringBuy && step === "color" && (
            <div className="opacity-100 transition-opacity bg-black">
              <div className="text-white text-xs font-bold uppercase mb-1 text-center py-1">{selectedType?.name}</div>
              <div className="flex">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorSelect(color)}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-bold uppercase py-2 text-xs transition-colors border-r border-gray-600 last:border-r-0"
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasQuickBuy && isHoveringBuy && step === "size" && (
            <div className="opacity-100 transition-opacity bg-black">
              <div className="text-white text-xs font-bold uppercase mb-1 text-center py-1">
                {selectedType?.name} - {selectedColor?.name}
              </div>
              <div className="flex flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-bold uppercase py-2 text-xs transition-colors border-r border-gray-600 last:border-r-0"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        {/* Store Name */}
        <p className="text-xs text-gray-600 uppercase font-bold font-gotham-bold">{product.store}</p>
        
        {/* Product Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-bold text-sm leading-tight uppercase text-black font-gotham-bold">
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
          <span className="text-lg font-bold text-black font-gotham-black">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through font-gotham-medium">
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
