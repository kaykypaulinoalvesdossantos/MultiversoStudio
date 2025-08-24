"use client"

import { useState, useEffect } from "react"
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

  // Prevenir scroll do body quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex items-center justify-center overflow-y-auto p-2 md:p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-5xl grid grid-cols-1 md:grid-cols-12 bg-white shadow-2xl rounded-lg md:rounded-none border border-white/20 max-h-[95vh] overflow-y-auto relative">
        
        {/* ESQUERDA: Imagem */}
        <div className="md:col-span-6 border-0 md:border-r md:border-gray-200 border-b border-b-gray-200 md:border-b-0 flex items-center justify-center relative">
          <figure className="relative w-full aspect-[4/5] md:aspect-[3/4] bg-gray-50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col md:flex-row gap-1 md:gap-2">
              {product.badge && (
                <span className="bg-black text-white text-[10px] md:text-[11px] font-semibold px-1.5 py-0.5 md:px-2 md:py-1 font-gotham-bold">
                  {product.badge}
                </span>
              )}
              {product.freeShipping && (
                <span className="bg-gray-200 text-gray-900 text-[10px] md:text-[11px] font-semibold px-1.5 py-0.5 md:px-2 md:py-1 font-gotham-bold">
                  FRETE GRÁTIS
                </span>
              )}
          </div>

            {/* Botão fechar */}
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 md:top-3 md:right-3 text-black text-lg md:text-xl font-bold px-1.5 md:px-2 py-1 hover:bg-white/80 transition-colors font-gotham-black bg-white/60 rounded-full w-8 h-8 md:w-auto md:h-auto md:bg-transparent md:rounded-none flex items-center justify-center"
            >
              ✕
            </button>
          </figure>
              </div>

        {/* DIREITA: Opções */}
        <div className="md:col-span-6 flex flex-col p-4 md:p-6 space-y-4 md:space-y-6">
          
          {/* Título */}
          <header className="space-y-1 md:space-y-2">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-gotham-bold">
              {product.store}
            </p>
            <h1 className="text-sm md:text-lg lg:text-xl font-black uppercase leading-snug font-gotham-black">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-xs md:text-sm font-gotham-medium">4.9 (567)</span>
                  </div>
          </header>

          {/* Preço */}
          <div className="flex items-baseline gap-2 md:gap-3">
            <div className="text-xl md:text-2xl font-black font-gotham-black">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
                      </div>
            {product.originalPrice && (
              <div className="text-xs md:text-sm text-gray-400 line-through font-gotham-medium">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </div>
                  )}
                </div>

          {/* STEP 1: Modelo */}
          <section>
            <p className="text-xs font-bold uppercase mb-2 md:mb-3 font-gotham-bold">MODELO</p>
                      <div className="grid grid-cols-2 gap-1.5 md:gap-2">
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
            <p className="text-xs font-bold uppercase mb-2 md:mb-3 font-gotham-bold">TAMANHO</p>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-1.5 md:gap-2">
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
            <p className="text-xs font-bold uppercase mb-2 md:mb-3 font-gotham-bold">COR</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
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
          <section className="mt-auto space-y-3 md:space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm space-y-1 md:space-y-0">
              <span className="font-gotham-medium">Quantidade</span>
              <span className="font-gotham-bold">
                Total: <strong className="text-base md:text-lg">R$ {totalPrice.toFixed(2).replace(".", ",")}</strong>
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
              className={`w-full px-4 md:px-6 py-3 md:py-4 font-black tracking-widest uppercase font-gotham-black text-sm md:text-lg relative overflow-hidden group transition-all ${
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
          @apply inline-flex items-center justify-center border border-gray-300 bg-white px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-gray-900
                 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white 
                 hover:bg-gray-50 font-gotham-medium cursor-pointer;
        }
        
        .qb-swatch {
          @apply inline-flex items-center gap-1 md:gap-2 border border-gray-300 bg-white px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm hover:bg-gray-50 
                 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white
                 cursor-pointer;
        }
        
        .qb-dot {
          @apply h-3 w-3 md:h-4 md:w-4 border border-gray-300 rounded-full;
        }
        
        .qb-step {
          @apply h-8 w-8 md:h-9 md:w-9 border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors duration-200
                 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base;
        }
      `}</style>
    </div>
  )
}
