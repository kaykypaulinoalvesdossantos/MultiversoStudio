"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X, Star, Plus, Minus, ShoppingCart } from "lucide-react"

interface QuickBuyModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  onAddToCart?: (product: any, options: any) => void
}

export default function QuickBuyModal({ product, isOpen, onClose, onAddToCart }: QuickBuyModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [quantity, setQuantity] = useState(1)

  const sizes = ["PP", "P", "M", "G", "GG", "XG", "EXG"]
  const types = ["Regular", "Oversized", "Babylook", "Infantil"]
  const colors = [
    { name: "Preto", value: "#000000" },
    { name: "Branco", value: "#FFFFFF" },
    { name: "Cinza", value: "#808080" },
    { name: "Azul", value: "#0066CC" },
  ]

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, {
        size: selectedSize,
        color: selectedColor,
        type: selectedType,
        quantity,
      })
    }
    onClose()
  }

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Compra Rápida</h2>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <Badge className={`${product.badgeColor} text-white text-xs`}>{product.badge}</Badge>
                  {product.discount && <Badge className="bg-green-500 text-white text-xs">{product.discount}</Badge>}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{product.store}</p>
                  <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl font-bold">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Type Selection */}
                {product.name.toLowerCase().includes("camiseta") && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Tipo</Label>
                    <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                      <div className="grid grid-cols-2 gap-2">
                        {types.map((type) => (
                          <div key={type} className="relative">
                            <RadioGroupItem value={type} id={type} className="sr-only" />
                            <Label
                              htmlFor={type}
                              className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                                selectedType === type
                                  ? "border-black bg-black text-white"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Size Selection */}
                {(product.name.toLowerCase().includes("camiseta") ||
                  product.name.toLowerCase().includes("moletom")) && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Tamanho</Label>
                    <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                      <div className="grid grid-cols-4 gap-2">
                        {sizes.map((size) => (
                          <div key={size} className="relative">
                            <RadioGroupItem value={size} id={size} className="sr-only" />
                            <Label
                              htmlFor={size}
                              className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                                selectedSize === size
                                  ? "border-black bg-black text-white"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Color Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Cor</Label>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                    <div className="grid grid-cols-2 gap-2">
                      {colors.map((color) => (
                        <div key={color.name} className="relative">
                          <RadioGroupItem value={color.name} id={color.name} className="sr-only" />
                          <Label
                            htmlFor={color.name}
                            className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedColor === color.name
                                ? "border-black bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div
                              className="w-6 h-6 rounded-full border-2 border-gray-300"
                              style={{ backgroundColor: color.value }}
                            />
                            <span>{color.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Quantity */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Quantidade</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">R$ {(product.price * quantity).toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-black hover:bg-gray-800 h-12 text-lg"
              onClick={handleAddToCart}
              disabled={
                (product.name.toLowerCase().includes("camiseta") && (!selectedSize || !selectedType)) || !selectedColor
              }
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
