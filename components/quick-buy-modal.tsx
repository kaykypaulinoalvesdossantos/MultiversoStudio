"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface QuickBuyModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    image: string
    price: number
    originalPrice?: number
    store: string
    badge?: string
    discount?: string
    freeShipping?: boolean
  } | null
}

export default function QuickBuyModal({ isOpen, onClose, product }: QuickBuyModalProps) {
  const [selectedModel, setSelectedModel] = useState("REGULAR")
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("PRETO")
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !product) return null

  const totalPrice = product.price * quantity

  const models = ["REGULAR", "OVERSIZED", "BABYLOOK", "INFANTIL"]
  const sizes = ["PP", "P", "M", "G", "GG", "XG", "EXG"]
  const colors = [
    { name: "PRETO", value: "PRETO", hex: "bg-black" },
    { name: "BRANCO", value: "BRANCO", hex: "bg-white border border-gray-300" },
    { name: "CINZA", value: "CINZA", hex: "bg-gray-500" },
    { name: "AZUL", value: "AZUL", hex: "bg-blue-700" }
  ]

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleBuy = () => {
    if (!selectedModel || !selectedSize || !selectedColor) {
      alert("Por favor, selecione modelo, tamanho e cor")
      return
    }
    
    // Aqui você pode implementar a lógica de compra
    console.log("Compra rápida:", {
      product: product.name,
      model: selectedModel,
      size: selectedSize,
      color: selectedColor,
      quantity,
      totalPrice
    })
    
    onClose()
  }

  // Função para verificar se todas as opções foram selecionadas
  const isFormComplete = selectedModel && selectedSize && selectedColor

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-12 bg-white shadow-2xl border border-white/20">
        
        {/* ESQUERDA: Imagem */}
        <div className="md:col-span-6 border-r border-gray-200 flex items-center justify-center relative">
          <figure className="relative w-full aspect-[3/4] bg-gray-50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.badge && (
                <span className="bg-black text-white text-[11px] font-semibold px-2 py-1 font-gotham-bold">
                  {product.badge}
                </span>
              )}
              {product.freeShipping && (
                <span className="bg-gray-200 text-gray-900 text-[11px] font-semibold px-2 py-1 font-gotham-bold">
                  FRETE GRÁTIS
                </span>
              )}
            </div>
            
            {/* Botão fechar */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-black text-xl font-bold px-2 hover:bg-white/80 transition-colors font-gotham-black"
            >
              ✕
            </button>
          </figure>
        </div>

        {/* DIREITA: Opções */}
        <div className="md:col-span-6 flex flex-col p-6 space-y-6">
          
          {/* Título */}
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-gotham-bold">
              {product.store}
            </p>
            <h1 className="text-lg md:text-xl font-black uppercase leading-snug font-gotham-black">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm font-gotham-medium">4.9 (567)</span>
            </div>
          </header>

          {/* Preço */}
          <div className="flex items-baseline gap-3">
            <div className="text-2xl font-black font-gotham-black">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through font-gotham-medium">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </div>
            )}
          </div>

          {/* STEP 1: Modelo */}
          <section>
            <p className="text-xs font-bold uppercase mb-3 font-gotham-bold">MODELO</p>
            <div className="grid grid-cols-2 gap-2">
              {models.map((model) => (
                <label key={model} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="modelo"
                    value={model}
                    checked={selectedModel === model}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="peer sr-only"
                  />
                  <span className="qb-chip group-hover:bg-gray-50">
                    {model}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* STEP 2: Tamanho */}
          <section>
            <p className="text-xs font-bold uppercase mb-3 font-gotham-bold">TAMANHO</p>
            <div className="grid grid-cols-7 gap-2">
              {sizes.map((size) => (
                <label key={size} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="tamanho"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="peer sr-only"
                  />
                  <span className="qb-chip group-hover:bg-gray-50">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* STEP 3: Cor */}
          <section>
            <p className="text-xs font-bold uppercase mb-3 font-gotham-bold">COR</p>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <label key={color.value} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="cor"
                    value={color.value}
                    checked={selectedColor === color.value}
                    onChange={(e) => setSelectedColor(color.value)}
                    className="peer sr-only"
                  />
                  <span className="qb-swatch group-hover:bg-gray-50">
                    <span className={`qb-dot ${color.hex}`}></span>
                    <em className="font-gotham-medium">{color.name}</em>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* STEP 4: Quantidade + CTA */}
          <section className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-gotham-medium">Quantidade</span>
              <span className="font-gotham-bold">
                Total: <strong className="text-lg">R$ {totalPrice.toFixed(2).replace(".", ",")}</strong>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="qb-step font-gotham-bold hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                –
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-14 text-center border border-gray-300 py-2 font-gotham-medium focus:ring-2 focus:ring-black focus:border-black transition-all"
                min="1"
                max="10"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="qb-step font-gotham-bold hover:bg-gray-100"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
            
            <Button 
              onClick={handleBuy}
              disabled={!isFormComplete}
              className={`w-full px-6 py-4 font-black tracking-widest uppercase font-gotham-black text-lg relative overflow-hidden group transition-all ${
                isFormComplete 
                  ? "bg-black hover:bg-gray-800 text-white" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10">
                {isFormComplete ? "COMPRAR AGORA" : "SELECIONE AS OPÇÕES"}
              </span>
              {isFormComplete && (
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Button>

            {/* Status das seleções */}
            <div className="text-xs text-gray-500 space-y-1">
              <div className={`flex items-center gap-2 ${selectedModel ? "text-green-600" : "text-gray-400"}`}>
                <span>{selectedModel ? "✓" : "○"}</span>
                <span>Modelo: {selectedModel || "Não selecionado"}</span>
              </div>
              <div className={`flex items-center gap-2 ${selectedSize ? "text-green-600" : "text-gray-400"}`}>
                <span>{selectedSize ? "✓" : "○"}</span>
                <span>Tamanho: {selectedSize || "Não selecionado"}</span>
              </div>
              <div className={`flex items-center gap-2 ${selectedColor ? "text-green-600" : "text-gray-400"}`}>
                <span>{selectedColor ? "✓" : "○"}</span>
                <span>Cor: {selectedColor || "Não selecionado"}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Estilos CSS */}
      <style jsx>{`
        .qb-chip {
          @apply inline-flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white 
                 hover:bg-gray-50 font-gotham-medium cursor-pointer;
        }
        
        .qb-swatch {
          @apply inline-flex items-center gap-2 border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 
                 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white
                 cursor-pointer;
        }
        
        .qb-dot {
          @apply h-4 w-4 border border-gray-300 rounded-full;
        }
        
        .qb-step {
          @apply h-9 w-9 border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors duration-200
                 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed;
        }
      `}</style>
    </div>
  )
}
