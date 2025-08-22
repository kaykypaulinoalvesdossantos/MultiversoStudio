"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"
import ProductCard from "@/components/lojas/saco-cheio/product-card"
import Marquee from "react-fast-marquee"

interface Product {
  id: string
  name: string
  program: string
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
}

interface Program {
  id: string
  name: string
  type: string
  status: "active" | "coming-soon"
  products: number
}

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

export default function SacoCheioPage() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState("")
  const [freeShipping, setFreeShipping] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)

  const programs: Program[] = [
    { id: "psc", name: "Saco Cheio", type: "Podcast", status: "active", products: 12 },
    { id: "tpfm", name: "Tarja Preta FM", type: "Programa", status: "active", products: 8 },
    { id: "aderiva", name: "À Deriva", type: "Podcast", status: "active", products: 6 },
    { id: "enn", name: "Essa Noite Não", type: "Programa", status: "coming-soon", products: 0 },
    { id: "t31", name: "3 Contra 1", type: "Programa", status: "coming-soon", products: 0 }
  ]

  const products: Product[] = [
    {
      id: "psc-shirt-logo",
      name: "Camiseta — Podcast Saco Cheio (Logo)",
      program: "psc",
      category: "camiseta",
      color: "preto",
      sizes: ["p", "m", "g", "gg"],
      price: 89.9,
      originalPrice: 119.9,
      frete: true,
      image: "/imgs/sacocheio/psc-shirt.png",
      sold: 2345,
      isNew: true,
      badge: "novo frete grátis",
      store: "SacoCheio.tv",
      rating: 4.8,
      reviews: 234
    },
    {
      id: "aderiva-mug",
      name: "Caneca — À Deriva (Estúdio)",
      program: "aderiva",
      category: "caneca",
      color: "branco",
      sizes: [],
      price: 49.9,
      originalPrice: 69.9,
      frete: true,
      image: "/imgs/sacocheio/aderiva-mug.png",
      sold: 856,
      isNew: false,
      badge: "29% off frete grátis",
      store: "SacoCheio.tv",
      rating: 4.5,
      reviews: 120
    },
    {
      id: "tpfm-shirt-90s",
      name: "Camiseta — Tarja Preta FM (90s)",
      program: "tpfm",
      category: "camiseta",
      color: "preto",
      sizes: ["m", "g", "gg"],
      price: 79.9,
      frete: false,
      image: "/imgs/sacocheio/tpfm-shirt.png",
      sold: 1230,
      isNew: true,
      badge: "exclusivo",
      store: "SacoCheio.tv",
      rating: 4.9,
      reviews: 300
    },
    {
      id: "poster-nyc",
      name: "Pôster — NYC",
      program: "psc",
      category: "poster",
      color: "azul",
      sizes: [],
      price: 59.9,
      frete: false,
      image: "/imgs/sacocheio/poster-nyc.png",
      sold: 420,
      isNew: true,
      store: "SacoCheio.tv",
      rating: 4.7,
      reviews: 180
    },
    {
      id: "enn-shirt-smile",
      name: "Camiseta — Essa Noite Não (Smile Sad)",
      program: "enn",
      category: "camiseta",
      color: "cinza",
      sizes: ["pp", "p", "m", "g"],
      price: 89.9,
      originalPrice: 109.9,
      frete: true,
      image: "/imgs/sacocheio/enn-shirt.png",
      sold: 310,
      isNew: false,
      badge: "frete grátis",
      store: "SacoCheio.tv",
      rating: 4.6,
      reviews: 150
    },
    {
      id: "3x1-sticker",
      name: "Adesivo — 3 Contra 1 (Pack)",
      program: "t31",
      category: "acessorio",
      color: "preto",
      sizes: [],
      price: 39.9,
      frete: false,
      image: "/imgs/sacocheio/3x1-sticker.png",
      sold: 90,
      isNew: true,
      store: "SacoCheio.tv",
      rating: 4.8,
      reviews: 100
    }
  ]

  const categories = [
    { id: "camiseta", name: "Camisetas", count: 456 },
    { id: "caneca", name: "Canecas", count: 234 },
    { id: "poster", name: "Pôsteres", count: 189 },
    { id: "acessorio", name: "Acessórios", count: 167 }
  ]

  const colors = [
    { id: "preto", name: "Preto" },
    { id: "branco", name: "Branco" },
    { id: "cinza", name: "Cinza" },
    { id: "azul", name: "Azul" }
  ]

  const sizes = ["PP", "P", "M", "G", "GG", "XG"]

  // Dados de tipos e cores para os produtos
  const productTypes: ProductType[] = [
    { id: "overside", name: "Overside", price: 89.9, originalPrice: 119.9 },
    { id: "basica", name: "Básica", price: 79.9, originalPrice: 99.9 }
  ]

  // Produto com mais de 2 tipos (mostra botão infinito)
  const productTypesMany: ProductType[] = [
    { id: "overside", name: "Overside", price: 89.9, originalPrice: 119.9 },
    { id: "basica", name: "Básica", price: 79.9, originalPrice: 99.9 },
    { id: "premium", name: "Premium", price: 129.9, originalPrice: 159.9 },
    { id: "limited", name: "Limited", price: 149.9, originalPrice: 189.9 }
  ]

  const productColors: ProductColor[] = [
    { name: "Preto", value: "black", image: "/imgs/sacocheio/psc-shirt.png" },
    { name: "Branco", value: "white", image: "/imgs/sacocheio/psc-shirt-white.png" },
    { name: "Azul", value: "blue", image: "/imgs/sacocheio/psc-shirt-blue.png" },
    { name: "Vermelho", value: "red", image: "/imgs/sacocheio/psc-shirt-red.png" }
  ]

  const handleQuickBuy = (product: Product) => {
    setQuickBuyProduct(product)
    setIsQuickBuyOpen(true)
  }

  const handleQuickBuyProduct = (productId: string, type: string, color: string, size: string) => {
    // Aqui você pode implementar a lógica para adicionar ao carrinho
    console.log(`Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
    
    // Por enquanto, vamos abrir o modal de quick buy
    const product = products.find(p => p.id === productId)
    if (product) {
      setQuickBuyProduct(product)
      setIsQuickBuyOpen(true)
    }
  }

  const toggleFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case "program":
        setSelectedPrograms(prev => 
          prev.includes(value) 
            ? prev.filter(p => p !== value)
            : [...prev, value]
        )
        break
      case "category":
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(c => c !== value)
            : [...prev, value]
        )
        break
      case "color":
        setSelectedColors(prev => 
          prev.includes(value) 
            ? prev.filter(c => c !== value)
            : [...prev, value]
        )
        break
      case "size":
        setSelectedSizes(prev => 
          prev.includes(value) 
            ? prev.filter(s => s !== value)
            : [...prev, value]
        )
        break
    }
  }

  const clearFilters = () => {
    setSelectedPrograms([])
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange("")
    setFreeShipping(false)
  }

  const filteredProducts = products.filter(product => {
    const programMatch = selectedPrograms.length === 0 || selectedPrograms.includes(product.program)
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color)
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size))
    const priceMatch = !priceRange || (() => {
      const [min, max] = priceRange.split("-").map(Number)
      if (max) {
        return product.price >= min && product.price <= max
      }
      return product.price >= min
    })()
    const freteMatch = !freeShipping || product.frete

    return programMatch && categoryMatch && colorMatch && sizeMatch && priceMatch && freteMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "sold-desc":
        return b.sold - a.sold
      case "new-desc":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  return (
    <main className="bg-black text-white font-gotham min-h-screen">
      <Navbar />
      
      {/* HERO Multiverso → SacoCheio */}
      <header className="relative isolate overflow-hidden pt-20">
        {/* Fundo estético: gradiente + grid + radiais */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-neutral-950 via-black to-neutral-950"></div>
        <svg className="absolute inset-0 -z-10 w-full h-full opacity-[0.07] text-neutral-700">
          <defs>
            <pattern id="mv-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mv-grid)"/>
        </svg>
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>
        <div className="pointer-events-none absolute -bottom-32 right-[-10%] h-96 w-96 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-14">
          <nav className="flex items-center gap-3 text-[11px] text-neutral-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-white">Multiverso</Link>
            <span>/</span>
            <span className="text-white">SacoCheio.tv</span>
          </nav>

          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase font-gotham-black">
                Loja SacoCheio
              </h1>
              <p className="mt-2 text-sm md:text-base text-neutral-300 leading-7 max-w-2xl font-gotham-book">
                Produtos oficiais que <span className="text-white">ajudam a manter os programas</span> no ar. Feitos sob demanda, com
                frete para <span className="text-white">todo o mundo</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-neutral-300">
                <span className="px-2 py-1 border border-neutral-700 font-gotham-bold uppercase">4,8 • avaliação</span>
                <span className="px-2 py-1 border border-neutral-700 font-gotham-bold uppercase">frete mundial</span>
                <span className="px-2 py-1 border border-neutral-700 font-gotham-bold uppercase">sob demanda</span>
              </div>
            </div>

            <div className="grid gap-2 text-right">
              <Link href="#produtos" className="px-4 py-2 border border-yellow-500 text-yellow-500 font-bold uppercase hover:bg-yellow-500 hover:text-black transition font-gotham-bold">
                Ver Produtos
              </Link>
              <Link href="#programas" className="px-4 py-2 border border-neutral-700 font-bold uppercase hover:bg-neutral-900 transition font-gotham-bold">
                Por Programa
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de coleções */}
      <nav className="py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-wrap gap-3 text-sm uppercase">
          <a className="px-3 py-2 border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition font-gotham-bold" href="#cat-camisetas">Camisetas</a>
          <a className="px-3 py-2 border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition font-gotham-bold" href="#cat-canecas">Canecas</a>
          <a className="px-3 py-2 border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition font-gotham-bold" href="#cat-posters">Pôsteres</a>
          <a className="px-3 py-2 border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition font-gotham-bold" href="#promo">Promoções</a>
          <a className="px-3 py-2 border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition font-gotham-bold" href="#lancamentos">Lançamentos</a>
        </div>
      </nav>

      {/* Destaques */}
      <section id="lancamentos" className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide font-gotham-bold">Destaques</h2>
            <Link href="#produtos" className="text-sm underline underline-offset-4 text-neutral-300 hover:text-white font-gotham-medium uppercase">ver todos</Link>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  badge: product.badge,
                  store: product.store,
                  rating: product.rating,
                  reviews: product.reviews,
                  sold: product.sold
                }}
                types={productTypes}
                colors={productColors}
                sizes={sizes}
                onQuickBuy={handleQuickBuyProduct}
              />
            ))}
            
          </div>
        </div>
      </section>

      {/* Filtros + Grid */}
      <main id="produtos" className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-12 gap-8">
        {/* mobile toggle */}
        <div className="col-span-12 md:hidden">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full border border-neutral-700 px-3 py-2 text-sm font-gotham-bold"
          >
            Filtros
          </Button>
        </div>

        {/* filtros */}
        <aside className={`col-span-12 md:col-span-3 space-y-7 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide font-gotham-bold">Programa</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => toggleFilter("program", program.id)}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm border border-neutral-700 bg-black text-white transition ${
                    selectedPrograms.includes(program.id) ? 'border-yellow-500 text-yellow-500' : 'hover:bg-neutral-900'
                  } font-gotham-bold`}
                >
                  {program.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide font-gotham-bold">Categoria</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleFilter("category", category.id)}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm border border-neutral-700 bg-black text-white transition ${
                    selectedCategories.includes(category.id) ? 'border-yellow-500 text-yellow-500' : 'hover:bg-neutral-900'
                  } font-gotham-bold`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide font-gotham-bold">Cor</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => toggleFilter("color", color.id)}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm border border-neutral-700 bg-black text-white transition ${
                    selectedColors.includes(color.id) ? 'border-yellow-500 text-yellow-500' : 'hover:bg-neutral-900'
                  } font-gotham-bold`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide font-gotham-bold">Tamanho</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleFilter("size", size)}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm border border-neutral-700 bg-black text-white transition ${
                    selectedSizes.includes(size) ? 'border-yellow-500 text-yellow-500' : 'hover:bg-neutral-900'
                  } font-gotham-bold`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide font-gotham-bold">Preço</h3>
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="mt-3 w-full bg-black border border-neutral-700 px-3 py-2 text-sm font-gotham-medium"
            >
              <option value="">Todas as faixas</option>
              <option value="0-60">Até R$ 60</option>
              <option value="60-100">R$ 60 — R$ 100</option>
              <option value="100-200">R$ 100 — R$ 200</option>
              <option value="200-9999">Acima de R$ 200</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide font-gotham-bold">Extras</h3>
            <label className="mt-3 flex items-center gap-2 text-sm text-neutral-300 font-gotham-medium uppercase">
              <input 
                type="checkbox" 
                checked={freeShipping}
                onChange={(e) => setFreeShipping(e.target.checked)}
                className="accent-yellow-500"
              /> 
              Frete grátis
            </label>
          </div>

          <div className="flex gap-2 rounded-none">
            <Button 
              onClick={clearFilters}
              className="flex-1 border border-neutral-700 px-3 py-2 text-sm font-gotham-bold rounded-none"
            >
              Limpar
            </Button>
            <Button className="flex-1 border border-yellow-500 text-yellow-500 px-3 py-2 text-sm font-gotham-bold rounded-none">
              Aplicar
            </Button>
          </div>
        </aside>

        {/* grid */}
        <section className="col-span-12 md:col-span-9">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide font-gotham-bold">Produtos Oficiais</h2>
            <span className="text-xs text-neutral-400 font-gotham-medium">
              mostrando <span>{sortedProducts.length}</span>
            </span>
            <div className="ml-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-neutral-700 px-3 py-2 text-sm font-gotham-medium"
              >
                <option value="">Ordenar</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="sold-desc">Mais vendidos</option>
                <option value="new-desc">Novidades</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  badge: product.badge,
                  store: product.store,
                  rating: product.rating,
                  reviews: product.reviews,
                  sold: product.sold
                }}
                types={productTypes}
                colors={productColors}
                sizes={sizes}
                onQuickBuy={handleQuickBuyProduct}
              />
            ))}
          </div>

          {/* Por programa */}
          <section id="programas" className="mt-12 pt-8">
            <h3 className="text-lg font-bold uppercase tracking-wide font-gotham-bold">Por Programa</h3>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
              {programs.map((program) => (
                <div key={program.id} className={`bg-white p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ${program.status === "coming-soon" ? "opacity-60" : ""}`}>
                  <p className="text-[11px] text-neutral-400 uppercase font-gotham-bold">{program.type}</p>
                  <h4 className="font-semibold font-gotham-bold">{program.name}</h4>
                  <p className="text-xs text-neutral-400 mt-2 font-gotham-medium">
                    {program.status === "active" ? `${program.products} produtos ativos` : "Em breve"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>

      {/* Fecho */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide font-gotham-bold">
            Obrigado por apoiar o SacoCheio
          </h3>
          <p className="mt-2 text-sm md:text-base text-neutral-300 leading-7 max-w-3xl font-gotham-book">
            Cada peça financia novos episódios, quadros e eventos. Essa loja existe dentro do <span className="text-white">Multiverso</span>.
          </p>
          <div className="mt-5">
            <Link href="#lancamentos" className="px-4 py-2 font-bold border border-yellow-500 text-yellow-500 uppercase hover:bg-yellow-500 hover:text-black transition font-gotham-bold inline-block">
              Ver Novidades
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quick Buy Modal */}
      {quickBuyProduct && (
        <QuickBuyModal
          product={quickBuyProduct}
          isOpen={isQuickBuyOpen}
          onClose={() => setIsQuickBuyOpen(false)}
        />
      )}

      <style jsx>{`
        .stripe-btn {
          position: relative;
          overflow: hidden;
        }
        
        .stripe-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            115deg,
            rgba(0, 0, 0, 0.18) 0,
            rgba(0, 0, 0, 0.18) 12px,
            transparent 12px,
            transparent 24px
          );
          transform: translateX(-30%);
          animation: mv 2.2s linear infinite;
          opacity: 0.85;
        }
        
        @keyframes mv {
          to {
            transform: translateX(30%);
          }
        }
      `}</style>
    </main>
  )
}
