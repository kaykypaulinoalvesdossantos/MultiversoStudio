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
  // Desempacotar os params usando React.use() - SEMPRE primeiro
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  // TODOS os hooks devem vir ANTES de qualquer lógica condicional
  const [selectedModel, setSelectedModel] = useState("REGULAR")
  const [selectedSize, setSelectedSize] = useState("P")
  const [selectedColor, setSelectedColor] = useState("PRETO")
  const [quantity, setQuantity] = useState(1)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // useEffect deve vir DEPOIS de todos os useState
  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0)
  }, [])

  // Dados do produto (em produção real, viria de uma API)
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
    image: productId === "multiverso-100" 
      ? "/imgs/produtos/multiverso-100-2300x3066.png"
      : "/imgs/produtos/prod-01-2300x3066.png",
    images: productId === "multiverso-100" 
      ? [
          "/imgs/produtos/multiverso-100-2300x3066.png",
          "/imgs/produtos/multiverso-100-02-2300x3066.png",
          "/imgs/produtos/multiverso-100-03-2300x3066.png"
        ]
      : [
          "/imgs/produtos/prod-01-2300x3066.png",
          "/imgs/produtos/prod-02-2300x3066.png",
          "/imgs/produtos/prod-03-2300x3066.png"
        ],
    description: productId === "multiverso-100"
      ? "Malha premium 100% algodão, modelagens Regular / Oversized / Babylook / Infantil. Estampa oficial do Multiverso de 100% - Edição Limitada."
      : "Malha premium, modelagens Regular / Oversized / Babylook / Infantil. Estampa oficial do Multiverso Estúdio."
  }

  // Dados estáticos
  const models = ["REGULAR", "OVERSIZED", "BABYLOOK", "INFANTIL"]
  const sizes = ["PP", "P", "M", "G", "GG", "XG", "EXG"]
  const colors = [
    { name: "PRETO", value: "PRETO", hex: "bg-black" },
    { name: "BRANCO", value: "BRANCO", hex: "bg-white ring-1 ring-gray-300" },
    { name: "CINZA", value: "CINZA", hex: "bg-gray-600" },
    { name: "AZUL", value: "AZUL", hex: "bg-[#1e3a8a]" }
  ]

  const totalPrice = product.price * quantity

  // Funções de manipulação
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleQuickBuy = () => {
    setIsQuickBuyOpen(true)
  }

  const scrollToImage = (index: number) => {
    setCurrentImageIndex(index)
    const gallery = document.getElementById('galeria')
    if (gallery) {
      const imageWidth = gallery.clientWidth
      gallery.scrollTo({ left: index * imageWidth, behavior: 'smooth' })
    }
  }

  const handlePrevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : product.images.length - 1
    scrollToImage(newIndex)
  }

  const handleNextImage = () => {
    const newIndex = currentImageIndex < product.images.length - 1 ? currentImageIndex + 1 : 0
    scrollToImage(newIndex)
  }

  // Renderização da página
  return (
    <main className="bg-white text-black font-gotham min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 md:px-6 pt-24 text-[11px] md:text-xs text-gray-500 uppercase tracking-wider font-gotham-medium">
        <a href="/" className="hover:text-black transition-colors">MULTIVERSO</a> /
        <a href="/vestuario" className="hover:text-black transition-colors">VESTUÁRIO</a> /
        <span className="text-gray-800">
          {productId === "multiverso-100" ? "MULTIVERSO DE 100%" : "CAMISETAS"}
        </span>
      </nav>

      {/* GRID: agora já em md (tablet) vira 12 colunas */}
      <section className="max-w-7xl mx-auto px-0 md:px-8 pb-28 md:pb-24 grid md:grid-cols-12 md:gap-12">
        
        {/* ESQ: título/infos (aparece de md pra cima) */}
        <header className="hidden md:block md:col-span-3 pt-8">
          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-gotham-bold mb-2">
              {product.store}
          </p>
          <h1 className="uppercase font-black tracking-wide leading-tight text-[24px] xl:text-[28px] font-gotham-black mb-6">
            {product.name}
          </h1>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-2xl font-black font-gotham-black">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-sm text-gray-400 line-through font-gotham-medium">
              R$ {product.originalPrice?.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-8 font-gotham-book leading-relaxed">
            {productId === "multiverso-100" 
              ? "100% algodão premium · 5–10 dias úteis de produção"
              : "Feito sob demanda · 5–10 dias úteis de produção"
            }
          </p>

          {/* Menus recolhíveis compactos */}
          <details className="group border-t border-gray-100 pt-6 open">
            <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
              <span className="uppercase text-xs font-semibold font-gotham-bold text-gray-800">Descrição</span>
              <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black text-gray-600">+</span>
            </summary>
            <p className="text-sm text-gray-700 leading-relaxed font-gotham-book">
              {product.description}
            </p>
          </details>
          <details className="group border-t border-gray-100 pt-6">
            <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
              <span className="uppercase text-xs font-semibold font-gotham-bold text-gray-800">Trocas e Devoluções</span>
              <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black text-gray-600">+</span>
            </summary>
            <p className="text-sm text-gray-700 leading-relaxed font-gotham-book">
              7 dias corridos para arrependimento. Veja termos em{" "}
              <a className="underline hover:text-black transition-colors font-gotham-medium" href="/trocas">
                /trocas
              </a>.
            </p>
          </details>
        </header>

        {/* CENTRO: galeria lateral (vai pro lado) */}
        <section className="relative md:col-span-6">
          <div className="absolute z-10 left-4 top-4 flex gap-3">
            <span className="px-3 py-2 text-xs font-semibold bg-black text-white font-gotham-bold">
              {product.badge}
            </span>
            {product.freeShipping && (
              <span className="px-3 py-2 text-xs font-semibold bg-gray-100 text-gray-900 font-gotham-bold">
                FRETE GRÁTIS
              </span>
            )}
      </div>

          <div className="relative">
            <button 
              type="button" 
              onClick={handlePrevImage}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white transition-all duration-300 font-gotham-black text-2xl text-gray-800 hover:text-black shadow-lg backdrop-blur-sm"
            >
              ‹
            </button>
            <button 
              type="button" 
              onClick={handleNextImage}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white transition-all duration-300 font-gotham-black text-2xl text-gray-800 hover:text-black shadow-lg backdrop-blur-sm"
            >
              ›
            </button>

            <div 
              id="galeria"
              className="flex overflow-x-auto snap-x snap-mandatory gap-0 scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {product.images.map((image, index) => (
                <figure key={index} className="min-w-full md:min-w-[640px] lg:min-w-[720px] snap-start bg-white">
                  <div className="aspect-[3/4] grid place-items-center">
              <Image
                      src={image}
                      width={2300}
                      height={3066}
                      className="w-full h-full object-contain"
                      alt={`Imagem ${index + 1}`}
                      priority={index === 0}
                    />
              </div>
                </figure>
              ))}
            </div>

            {/* Indicadores de imagem */}
            <div className="hidden md:flex justify-center mt-6 gap-3">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToImage(index)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    index === currentImageIndex 
                      ? "bg-black scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* DIR: painel quadrado/sticky a partir de md (tablet/desktop) */}
        <aside className="hidden md:block md:col-span-3">
          <div className="sticky top-8 bg-white p-8 shadow-lg">
            
            {/* Modelo */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase text-gray-700 mb-4 font-gotham-bold tracking-wider">MODELO</p>
              <div className="grid grid-cols-2 gap-3">
                {models.map((model) => (
                  <label key={model} className="chip cursor-pointer">
                    <input 
                      type="radio" 
                      name="modelo" 
                      value={model}
                      checked={selectedModel === model}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className="font-gotham-bold text-sm">{model}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tamanho */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase text-gray-700 mb-4 font-gotham-bold tracking-wider">TAMANHO</p>
              <div className="grid grid-cols-4 gap-2">
                {sizes.slice(0, 4).map((size) => (
                  <label key={size} className="chip cursor-pointer">
                    <input 
                      type="radio" 
                      name="tamanho" 
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className="font-gotham-bold text-sm">{size}</span>
                  </label>
                ))}
                </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {sizes.slice(4).map((size) => (
                  <label key={size} className="chip cursor-pointer">
                    <input 
                      type="radio" 
                      name="tamanho" 
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className="font-gotham-bold text-sm">{size}</span>
                  </label>
                ))}
              </div>
                </div>

            {/* Cor */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase text-gray-700 mb-4 font-gotham-bold tracking-wider">COR</p>
              <div className="grid grid-cols-2 gap-3">
                {colors.map((color) => (
                  <label key={color.value} className="swatch cursor-pointer">
                    <input 
                      type="radio" 
                      name="cor" 
                      value={color.value}
                      checked={selectedColor === color.value}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className={`dot ${color.hex}`}></span>
                    <em className="font-gotham-bold text-sm">{color.name}</em>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantidade + CTA */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase text-gray-700 font-gotham-bold tracking-wider">QUANTIDADE</p>
                <span className="text-sm text-gray-700 font-gotham-medium">
                  TOTAL: <strong className="text-lg font-gotham-bold">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <button 
                  type="button" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="stepBtn font-gotham-bold hover:bg-gray-50 transition-colors"
                >
                  –
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border border-gray-200 py-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent font-gotham-medium text-sm"
                />
                <button 
                  type="button" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="stepBtn font-gotham-bold hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleQuickBuy}
                className={`stripe-btn w-full py-4 font-black tracking-widest uppercase transition-all duration-300 font-gotham-black text-lg ${
                  productId === "multiverso-100"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-[#A8E6A3] hover:bg-[#9DD592] text-black shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                COMPRAR
              </Button>
            </div>
          </div>
        </aside>
      </section>

      {/* NOVA ESTRUTURA RESPONSIVA PARA MOBILE E TABLET */}
      <div className="md:hidden">
        {/* Seção de informações do produto */}
        <section className="px-6 py-8 bg-gray-50">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-black uppercase tracking-wide text-black mb-4 font-gotham-black">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-2xl font-black font-gotham-black">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-sm text-gray-400 line-through font-gotham-medium">
                R$ {product.originalPrice?.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-6 font-gotham-book leading-relaxed">
              {productId === "multiverso-100" 
                ? "100% algodão premium · 5–10 dias úteis de produção"
                : "Feito sob demanda · 5–10 dias úteis de produção"
              }
            </p>
          </div>
        </section>

        {/* Seção de seleções */}
        <section className="px-6 py-8 bg-white">
          <div className="max-w-md mx-auto space-y-8">
            
            {/* Modelo */}
            <div>
              <p className="text-sm font-semibold uppercase text-gray-700 mb-4 font-gotham-bold tracking-wider">MODELO</p>
              <div className="grid grid-cols-2 gap-3">
                {models.map((model) => (
                  <label key={model} className="chip-mobile cursor-pointer">
                    <input 
                      type="radio" 
                      name="modelo-mobile" 
                      value={model}
                      checked={selectedModel === model}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className="font-gotham-bold text-sm">{model}</span>
                  </label>
                  ))}
                </div>
            </div>

            {/* Tamanho */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold uppercase text-gray-700 font-gotham-bold tracking-wider">TAMANHO</p>
                <a className="text-xs underline text-gray-600 hover:text-black transition-colors font-gotham-medium" href="/duvidas#produtos">
                  tabela
                </a>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {sizes.slice(0, 4).map((size) => (
                  <label key={size} className="chip-mobile cursor-pointer">
                    <input 
                      type="radio" 
                      name="tamanho-mobile" 
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className="font-gotham-bold text-sm">{size}</span>
                  </label>
                ))}
                    </div>
              <div className="grid grid-cols-3 gap-2">
                {sizes.slice(4).map((size) => (
                  <label key={size} className="chip-mobile cursor-pointer">
                    <input 
                      type="radio" 
                      name="tamanho-mobile" 
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className="font-gotham-bold text-sm">{size}</span>
                  </label>
                  ))}
                </div>
            </div>

            {/* Cor */}
            <div>
              <p className="text-sm font-semibold uppercase text-gray-700 mb-4 font-gotham-bold tracking-wider">COR</p>
              <div className="grid grid-cols-2 gap-3">
                {colors.map((color) => (
                  <label key={color.value} className="swatch-mobile cursor-pointer">
                    <input 
                      type="radio" 
                      name="cor-mobile" 
                      value={color.value}
                      checked={selectedColor === color.value}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="peer sr-only" 
                    />
                    <span className={`dot-mobile ${color.hex}`}></span>
                    <em className="font-gotham-bold text-sm">{color.name}</em>
                  </label>
                  ))}
                </div>
            </div>

            {/* Quantidade */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold uppercase text-gray-700 font-gotham-bold tracking-wider">QUANTIDADE</p>
                <span className="text-sm text-gray-700 font-gotham-medium">
                  TOTAL: <strong className="text-lg font-gotham-bold">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="stepBtn-mobile font-gotham-bold hover:bg-gray-50 transition-colors"
                >
                  –
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-20 text-center border border-gray-200 py-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent font-gotham-medium text-sm"
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="stepBtn-mobile font-gotham-bold hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botão de Compra */}
            <div className="pt-6">
              <Button
                onClick={handleQuickBuy}
                className={`stripe-btn w-full py-4 font-black tracking-widest uppercase transition-all duration-300 font-gotham-black text-lg ${
                  productId === "multiverso-100"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-[#A8E6A3] hover:bg-[#9DD592] text-black shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                COMPRAR
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de Compra Rápida */}
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        product={product}
      />

      <Footer />

      {/* Estilos CSS */}
      <style jsx>{`
        .chip > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 0.5rem;
          border: 1px solid #e5e7eb;
          background: #fff;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          min-height: 44px;
          width: 100%;
          text-align: center;
        }
        
        .chip > input.peer:checked + span {
          background: #000;
          color: #fff;
          border-color: #000;
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .chip:hover > span {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .swatch {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid #e5e7eb;
          background: #fff;
          padding: 0.75rem 1rem;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          transition: all 0.2s ease;
          min-height: 44px;
          width: 100%;
          justify-content: flex-start;
        }
        
        .swatch em {
          font-style: normal;
        }
        
        .swatch:hover {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .swatch > input.peer:checked + span.dot + em {
          color: #000;
        }
        
        .swatch > input.peer:checked + span.dot {
          transform: scale(1.1);
          box-shadow: 0 0 0 2px #000;
        }
        
        .dot {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        
        .stepBtn {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          transition: all 0.2s ease;
          font-size: 18px;
          color: #374151;
        }
        
        .stepBtn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: scale(1.05);
        }
        
        .stripe-btn {
          position: relative;
          overflow: hidden;
          border: none;
          font-weight: 900;
        }
        
        .stripe-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.7;
          pointer-events: none;
          background: repeating-linear-gradient(
            115deg,
            rgba(0, 0, 0, 0.12) 0,
            rgba(0, 0, 0, 0.12) 12px,
            transparent 12px,
            transparent 24px
          );
          transform: translateX(-30%);
          animation: mv-stripe 2.2s linear infinite;
        }
        
        .stripe-btn:hover::before {
          opacity: 0.9;
        }
        
        /* Estilo específico para Multiverso de 100% */
        .stripe-btn[class*="from-purple-600"]::before {
          background: repeating-linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.15) 0,
            rgba(255, 255, 255, 0.15) 12px,
            transparent 12px,
            transparent 24px
          );
        }
        
        @keyframes mv-stripe {
          to {
            transform: translateX(30%);
          }
        }
        
        #galeria::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* NOVAS CLASSES MOBILE - ESTRUTURA RESPONSIVA */
        .chip-mobile {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          background: #fff;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          text-align: center;
          transition: all 0.2s ease;
          min-height: 48px;
          cursor: pointer;
          position: relative;
          min-width: 0;
        }
        
        .chip-mobile > input.peer:checked + span {
          background: #000;
          color: #fff;
          border-color: #000;
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .chip-mobile:hover {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .swatch-mobile {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 0.75rem 1.25rem;
          border: 1px solid #e5e7eb;
          background: #fff;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          transition: all 0.2s ease;
          min-height: 48px;
          cursor: pointer;
          position: relative;
        }
        
        .swatch-mobile em {
          font-style: normal;
          padding-left: 0.25rem;
        }
        
        .swatch-mobile > input.peer:checked + span.dot-mobile + em {
          color: #000;
        }
        
        .swatch-mobile > input.peer:checked + span.dot-mobile {
          transform: scale(1.1);
          box-shadow: 0 0 0 2px #000;
        }
        
        .swatch-mobile:hover {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .dot-mobile {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        
        .stepBtn-mobile {
          width: 3rem;
          height: 3rem;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          transition: all 0.2s ease;
          font-size: 20px;
          color: #374151;
        }
        
        .stepBtn-mobile:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: scale(1.05);
        }
      `}</style>
    </main>
  )
}
