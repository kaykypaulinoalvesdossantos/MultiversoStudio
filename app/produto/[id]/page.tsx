"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedModel, setSelectedModel] = useState("REGULAR")
  const [selectedSize, setSelectedSize] = useState("P")
  const [selectedColor, setSelectedColor] = useState("PRETO")
  const [quantity, setQuantity] = useState(1)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Dados do produto (em produção real, viria de uma API)
  // Para acessar o Multiverso de 100% use: /produto/multiverso-100
  // Para acessar o Multiverso Estúdio use: /produto/multiverso-estudio
  const product = {
    id: params.id,
    name: params.id === "multiverso-100" 
      ? "CAMISETA MULTIVERSO DE 100% — LOGO OFICIAL"
      : "CAMISETA MULTIVERSO ESTÚDIO — LOGO OFICIAL",
    store: "MULTIVERSO ESTÚDIO",
    price: params.id === "multiverso-100" ? 79.90 : 69.90,
    originalPrice: params.id === "multiverso-100" ? 99.90 : 89.90,
    badge: params.id === "multiverso-100" ? "LIMITADA" : "EXCLUSIVO",
    freeShipping: true,
    image: params.id === "multiverso-100" 
      ? "/imgs/produtos/multiverso-100-2300x3066.png"
      : "/imgs/produtos/prod-01-2300x3066.png",
    images: params.id === "multiverso-100" 
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
    description: params.id === "multiverso-100"
      ? "Malha premium 100% algodão, modelagens Regular / Oversized / Babylook / Infantil. Estampa oficial do Multiverso de 100% - Edição Limitada."
      : "Malha premium, modelagens Regular / Oversized / Babylook / Infantil. Estampa oficial do Multiverso Estúdio."
  }

  const models = ["REGULAR", "OVERSIZED", "BABYLOOK", "INFANTIL"]
  const sizes = ["PP", "P", "M", "G", "GG", "XG", "EXG"]
  const colors = [
    { name: "PRETO", value: "PRETO", hex: "bg-black" },
    { name: "BRANCO", value: "BRANCO", hex: "bg-white ring-1 ring-gray-300" },
    { name: "CINZA", value: "CINZA", hex: "bg-gray-600" },
    { name: "AZUL", value: "AZUL", hex: "bg-[#1e3a8a]" }
  ]

  const totalPrice = product.price * quantity

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

  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-white text-black font-gotham min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 md:px-6 pt-24 text-[11px] md:text-xs text-gray-500 uppercase tracking-wider font-gotham-medium">
        <a href="/" className="hover:text-black transition-colors">MULTIVERSO</a> /
        <a href="/vestuario" className="hover:text-black transition-colors">VESTUÁRIO</a> /
        <span className="text-gray-800">
          {params.id === "multiverso-100" ? "MULTIVERSO DE 100%" : "CAMISETAS"}
        </span>
      </nav>

      {/* GRID: agora já em md (tablet) vira 12 colunas */}
      <section className="max-w-6xl mx-auto px-0 md:px-6 pb-28 md:pb-24 grid md:grid-cols-12 md:gap-8">
        
        {/* ESQ: título/infos (aparece de md pra cima) */}
        <header className="hidden md:block md:col-span-3 pt-2">
          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-gotham-bold">
              {product.store}
          </p>
          <h1 className="uppercase font-black tracking-wide leading-snug text-[22px] xl:text-[26px] font-gotham-black">
            {product.name}
          </h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-xl font-black font-gotham-black">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-xs text-gray-400 line-through font-gotham-medium">
              R$ {product.originalPrice?.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-2 font-gotham-book">
            {params.id === "multiverso-100" 
              ? "100% algodão premium · 5–10 dias úteis de produção"
              : "Feito sob demanda · 5–10 dias úteis de produção"
            }
          </p>

          {/* Menus recolhíveis compactos */}
          <details className="group border-t border-gray-300 mt-6 pt-3">
            <summary className="flex items-center justify-between cursor-pointer select-none">
              <span className="uppercase text-xs font-semibold font-gotham-bold">Descrição</span>
              <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
            </summary>
            <p className="mt-2 text-[13px] text-gray-800 leading-6 font-gotham-book">
              {product.description}
            </p>
          </details>
          <details className="group border-t border-gray-300 pt-3">
            <summary className="flex items-center justify-between cursor-pointer select-none">
              <span className="uppercase text-xs font-semibold font-gotham-bold">Trocas e Devoluções</span>
              <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
            </summary>
            <p className="mt-2 text-[13px] text-gray-800 leading-6 font-gotham-book">
              7 dias corridos para arrependimento. Veja termos em{" "}
              <a className="underline hover:text-gray-600 transition-colors" href="/trocas">
                /trocas
              </a>.
            </p>
          </details>
        </header>

        {/* CENTRO: galeria lateral (vai pro lado) */}
        <section className="relative md:col-span-6">
          <div className="absolute z-10 left-2 top-2 flex gap-2">
            <span className="px-2 py-1 text-[10px] font-semibold bg-black text-white font-gotham-bold">
              {product.badge}
            </span>
            {product.freeShipping && (
              <span className="px-2 py-1 text-[10px] font-semibold bg-gray-200 text-gray-900 font-gotham-bold">
                FRETE GRÁTIS
              </span>
            )}
      </div>

          <div className="relative">
            <button 
              type="button" 
              onClick={handlePrevImage}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-10 bg-black/5 hover:bg-black/10 transition-colors font-gotham-black text-2xl"
            >
              ‹
            </button>
            <button 
              type="button" 
              onClick={handleNextImage}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-10 bg-black/5 hover:bg-black/10 transition-colors font-gotham-black text-2xl"
            >
              ›
            </button>

            <div 
              id="galeria"
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {product.images.map((image, index) => (
                <figure key={index} className="min-w-full md:min-w-[640px] lg:min-w-[720px] snap-start border border-gray-300 bg-white">
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
            <div className="hidden md:flex justify-center mt-4 gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* DIR: painel quadrado/sticky a partir de md (tablet/desktop) */}
        <aside className="hidden md:block md:col-span-3">
          <div className="sticky top-6 border border-gray-800 p-5 bg-white">
            
            {/* Modelo */}
            <p className="text-[11px] font-semibold uppercase text-gray-700 mb-2 font-gotham-bold">MODELO</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
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
                  <span className="font-gotham-bold">{model}</span>
                </label>
              ))}
            </div>

            {/* Tamanho */}
            <details className="group border-t border-gray-300 pt-4 open">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-[11px] font-semibold uppercase text-gray-700 font-gotham-bold">TAMANHO</span>
                <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
              </summary>
            </details>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {sizes.map((size) => (
                <label key={size} className="chip cursor-pointer">
                  <input 
                    type="radio" 
                    name="tamanho" 
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="peer sr-only" 
                  />
                  <span className="font-gotham-bold">{size}</span>
                </label>
              ))}
            </div>

            {/* Cor */}
            <div className="border-t border-gray-300 pt-4 mt-4">
              <p className="text-[11px] font-semibold uppercase text-gray-700 mb-2 font-gotham-bold">COR</p>
                <div className="grid grid-cols-2 gap-2">
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
                    <em className="font-gotham-bold">{color.name}</em>
                  </label>
                  ))}
                </div>
            </div>

            {/* Quantidade + CTA */}
            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase text-gray-700 font-gotham-bold">QUANTIDADE</p>
                <span className="text-xs text-gray-700 font-gotham-medium">
                  TOTAL: <strong className="text-base font-gotham-bold">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </strong>
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="stepBtn font-gotham-bold"
                >
                  –
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-14 text-center border border-gray-300 py-2 outline-none focus:ring-2 focus:ring-black font-gotham-medium"
                />
                <button 
                  type="button" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="stepBtn font-gotham-bold"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleQuickBuy}
                className={`stripe-btn w-full mt-4 px-6 py-3 font-black tracking-widest uppercase text-black transition-colors font-gotham-black ${
                  params.id === "multiverso-100"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    : "bg-[#A8E6A3] hover:bg-[#9DD592]"
                }`}
              >
                COMPRAR
              </Button>
            </div>
          </div>
        </aside>
      </section>

      {/* MOBILE/TABLET PEQUENO: painel fixo com efeito vidro contendo tudo */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40">
        <div className="px-4 py-3 backdrop-blur-md bg-white/75 border-t border-white/60 shadow-[0_-1px_0_#e5e7eb_inset]">
          
          {/* LINHA 1: Tamanho (scroll-x se apertar) */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-gray-700 font-gotham-bold">Tamanho</span>
            <a className="text-[11px] underline text-gray-700 hover:text-black transition-colors font-gotham-medium" href="/duvidas#produtos">
              tabela
            </a>
                      </div>
          <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
            {sizes.map((size) => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`chip-m font-gotham-bold transition-colors ${
                  selectedSize === size ? "active" : ""
                }`}
              >
                {size}
              </button>
            ))}
        </div>

          {/* LINHA 2: Cor */}
          <div className="mt-3 text-[11px] uppercase tracking-wider text-gray-700 font-gotham-bold">Cor</div>
          <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
            {colors.map((color) => (
              <button 
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`swatch-m font-gotham-bold transition-all ${
                  selectedColor === color.value ? "active" : ""
                }`}
              >
                <span className={`dot ${color.hex}`}></span>
                <em>{color.name}</em>
              </button>
            ))}
          </div>

          {/* LINHA 3: Quantidade + CTA */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="stepBtn font-gotham-bold"
              >
                –
              </button>
              <input 
                type="number" 
                min="1" 
                max="10"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-14 text-center border border-gray-300 py-2 outline-none focus:ring-2 focus:ring-black font-gotham-medium"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="stepBtn font-gotham-bold"
              >
                +
              </button>
            </div>
            <Button 
              onClick={handleQuickBuy}
              className={`stripe-btn flex-1 px-6 py-3 font-black tracking-widest uppercase text-black transition-colors font-gotham-black ${
                params.id === "multiverso-100"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  : "bg-[#A8E6A3] hover:bg-[#9DD592]"
              }`}
            >
              COMPRAR
            </Button>
          </div>
        </div>
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
          padding: 0.45rem 0.65rem;
          border: 1px solid #d1d5db;
          background: #fff;
          font-size: 12px;
          font-weight: 700;
          color: #111;
          letter-spacing: 0.02em;
          transition: 0.15s;
        }
        
        .chip > input.peer:checked + span {
          background: #000;
          color: #fff;
          border-color: #000;
        }
        
        .swatch {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #d1d5db;
          background: #fff;
          padding: 0.45rem 0.65rem;
          font-size: 12px;
          font-weight: 700;
          color: #111;
        }
        
        .swatch em {
          font-style: normal;
        }
        
        .dot {
          width: 1rem;
          height: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 50%;
        }
        
        .stepBtn {
          width: 2.25rem;
          height: 2.25rem;
          border: 1px solid #d1d5db;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          transition: all 0.15s;
        }
        
        .stepBtn:hover {
          background: #f3f4f6;
        }
        
        .stripe-btn {
          position: relative;
          overflow: hidden;
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

        /* chips mobile compactos */
        .chip-m {
          border: 1px solid #d1d5db;
          background: #fff;
          padding: 0.35rem 0.55rem;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }
        
        .chip-m.active {
          background: #000;
          color: #fff;
          border-color: #000;
        }
        
        .swatch-m {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid #d1d5db;
          background: #fff;
          padding: 0.35rem 0.55rem;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }
        
        .swatch-m em {
          font-style: normal;
        }
        
        .swatch-m.active {
          outline: 2px solid #000;
          outline-offset: -2px;
        }
      `}</style>
    </main>
  )
}
