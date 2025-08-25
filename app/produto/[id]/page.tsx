"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  const [selectedModel, setSelectedModel] = useState("REGULAR")
  const [selectedSize, setSelectedSize] = useState("P")
  const [selectedColor, setSelectedColor] = useState("PRETO")
  const [quantity, setQuantity] = useState(1)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Dados do produto
  const product = {
    id: productId,
    name: productId === "multiverso-100" 
      ? "CAMISETA MULTIVERSO DE 100% — LOGO OFICIAL"
      : "CAMISETA MULTIVERSO ESTÚDIO — LOGO OFICIAL",
    store: "MULTIVERSO ESTÚDIO",
    price: productId === "multiverso-100" ? 79.90 : 69.90,
    originalPrice: productId === "multiverso-100" ? 99.90 : 89.90,
    badge: productId === "multiverso-100" ? "LIMITADA" : "EXCLUSIVO",
    freeShipping: true,
    image: "/placeholder.svg",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ]
  }

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

  const handleQuickBuy = () => {
    setIsQuickBuyOpen(true)
  }

  const handleAddToCart = () => {
    // Adicionar ao carrinho via localStorage
    addToCart(product.id, selectedModel, selectedSize, selectedColor, quantity)
  }

  const addToCart = (productId: string, type: string, size: string, color: string, quantity: number) => {
    // Buscar carrinho existente
    const existingCart = localStorage.getItem('multiverso-cart')
    let cartItems = existingCart ? JSON.parse(existingCart) : []

    // Verificar se o item já existe
    const existingItemIndex = cartItems.findIndex((item: any) => 
      item.productId === productId &&
      item.type === type &&
      item.color === color &&
      item.size === size
    )

    if (existingItemIndex >= 0) {
      // Se já existe, aumenta a quantidade
      cartItems[existingItemIndex].quantity += quantity
    } else {
      // Se não existe, adiciona novo item
      const newItem = {
        id: `${Date.now()}-${Math.random()}`,
        productId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        type,
        color,
        size,
        quantity,
        store: product.store
      }
      cartItems.push(newItem)
    }

    // Salvar no localStorage
    localStorage.setItem('multiverso-cart', JSON.stringify(cartItems))
    
    // Mostrar confirmação
    alert(`Produto adicionado ao carrinho!\nTipo: ${type}\nCor: ${color}\nTamanho: ${size}\nQuantidade: ${quantity}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Mobile Layout - Imagem em cima, informações embaixo */}
      <div className="md:hidden">
        {/* Galeria de Imagens Mobile */}
        <section className="relative pt-20">
          {/* Badges */}
          <div className="absolute z-10 left-4 top-24 flex gap-2">
            <span className="bg-black text-white text-xs font-bold px-2 py-1 font-gotham-bold">
              {product.badge}
            </span>
            {product.freeShipping && (
              <span className="bg-white text-black text-xs font-bold px-2 py-1 font-gotham-bold border border-gray-300">
                FRETE GRÁTIS
              </span>
            )}
          </div>

          {/* Carrossel de imagens */}
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {product.images.map((image, index) => (
              <div key={index} className="min-w-full snap-start">
                <div className="aspect-[3/4] bg-gray-50">
                  <Image
                    src={image}
                    width={400}
                    height={533}
                    className="w-full h-full object-contain"
                    alt={`${product.name} - Imagem ${index + 1}`}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center py-4 gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-black scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Informações do Produto Mobile */}
        <section className="px-4 py-6 bg-white">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-gotham-bold mb-1">
                {product.store}
              </p>
              <h1 className="text-xl font-black uppercase leading-tight font-gotham-black mb-3">
                {product.name}
              </h1>
              <div className="flex items-center space-x-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600">4.9 (567)</span>
              </div>
            </div>

            {/* Preço */}
            <div className="flex items-baseline gap-3 border-b border-gray-100 pb-6">
              <span className="text-3xl font-black font-gotham-black">
                R$ {(product.price * quantity).toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-gotham-medium">
                  R$ {(product.originalPrice * quantity).toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>

            {/* Descrição */}
            <p className="text-sm text-gray-600 font-gotham-book leading-relaxed">
              {productId === "multiverso-100" 
                ? "Camiseta premium 100% algodão com estampa exclusiva. Produção sob demanda garante qualidade máxima."
                : "Camiseta oficial do Multiverso Estúdio. Feita sob demanda com materiais de alta qualidade."
              }
            </p>

            {/* Seleções */}
            <div className="space-y-6">
              {/* Modelo */}
              <div>
                <p className="text-sm font-bold uppercase mb-3 font-gotham-bold">MODELO</p>
                <div className="grid grid-cols-2 gap-2">
                  {models.map((model) => (
                    <label key={model} className="cursor-pointer">
                      <input
                        type="radio"
                        name="modelo-mobile"
                        value={model}
                        checked={selectedModel === model}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="sr-only peer"
                      />
                      <span className="block border border-gray-300 bg-white px-3 py-2.5 text-sm text-center text-gray-900 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:bg-gray-50 font-gotham-medium">
                        {model}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tamanho */}
              <div>
                <p className="text-sm font-bold uppercase mb-3 font-gotham-bold">TAMANHO</p>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        type="radio"
                        name="tamanho-mobile"
                        value={size}
                        checked={selectedSize === size}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="sr-only peer"
                      />
                      <span className="block border border-gray-300 bg-white px-3 py-2.5 text-sm text-center text-gray-900 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white hover:bg-gray-50 font-gotham-medium">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cor */}
              <div>
                <p className="text-sm font-bold uppercase mb-3 font-gotham-bold">COR</p>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <label key={color.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="cor-mobile"
                        value={color.value}
                        checked={selectedColor === color.value}
                        onChange={(e) => setSelectedColor(color.value)}
                        className="sr-only peer"
                      />
                      <span className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-2.5 text-sm hover:bg-gray-50 transition-all duration-200 peer-checked:border-black peer-checked:bg-black peer-checked:text-white font-gotham-medium">
                        <span className={`w-4 h-4 border border-gray-300 rounded-full ${color.hex}`}></span>
                        {color.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantidade */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold uppercase font-gotham-bold">QUANTIDADE</p>
                  <span className="text-sm text-gray-600 font-gotham-medium">
                    Total: R$ {(product.price * quantity).toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-12 h-12 border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-gotham-bold text-lg"
                    disabled={quantity <= 1}
                  >
                    –
                  </button>
                  <span className="w-16 text-center font-gotham-medium text-lg">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-12 h-12 border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-gotham-bold text-lg"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Botão Comprar */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex gap-3">
                <Button
                  onClick={handleQuickBuy}
                  className="flex-1 py-4 font-black tracking-widest uppercase bg-black hover:bg-gray-800 text-white text-lg font-gotham-black shadow-lg"
                >
                  COMPRAR AGORA
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 font-black tracking-widest uppercase bg-white hover:bg-gray-100 text-black border-2 border-black text-lg font-gotham-black shadow-lg"
                >
                  ADICIONAR
                </Button>
              </div>
              
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Produção e envio em 5-10 dias úteis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Troca grátis em até 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Desktop Layout (mantém o existente ou simplifica) */}
      <div className="hidden md:block">
        <section className="max-w-7xl mx-auto px-8 pt-24 pb-12 grid grid-cols-12 gap-12">
          {/* Imagens */}
          <div className="col-span-8">
            <div className="sticky top-8">
              <div className="aspect-[3/4] bg-gray-50 mb-4">
                <Image
                  src={product.images[currentImageIndex]}
                  width={600}
                  height={800}
                  className="w-full h-full object-contain"
                  alt={product.name}
                />
              </div>
              <div className="flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-black scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="col-span-4">
            <div className="sticky top-8 space-y-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-gotham-bold mb-2">
                  {product.store}
                </p>
                <h1 className="text-2xl font-black uppercase leading-tight font-gotham-black mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-black font-gotham-black">
                    R$ {(product.price * quantity).toFixed(2).replace(".", ",")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through font-gotham-medium">
                      R$ {(product.originalPrice * quantity).toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
              </div>

              {/* Restante das seleções igual ao mobile mas com layout desktop */}
              <div className="flex gap-3">
                <Button
                  onClick={handleQuickBuy}
                  className="flex-1 py-4 font-black tracking-widest uppercase bg-black hover:bg-gray-800 text-white text-lg font-gotham-black"
                >
                  COMPRAR AGORA
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 font-black tracking-widest uppercase bg-white hover:bg-gray-100 text-black border-2 border-black text-lg font-gotham-black"
                >
                  ADICIONAR
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Modal */}
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        product={product}
      />
    </div>
  )
}
