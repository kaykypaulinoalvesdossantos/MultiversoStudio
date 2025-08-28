"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"
import ProductCard from "@/components/lojas/sara-lee-jones/product-card"

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

interface Category {
  id: string
  name: string
  count: number
  slug: string
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

export default function SaraLeeJonesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState("")
  const [freeShipping, setFreeShipping] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)

  const categories: Category[] = [
    { id: "camisetas", name: "Camisetas", count: 72, slug: "camisetas" },
    { id: "canecas", name: "Canecas", count: 32, slug: "canecas" },
    { id: "decoracao", name: "Decoracao", count: 15, slug: "decoracao" }
  ]

  const colors = ["Verde", "Laranja", "Preto", "Branco", "Rosa"]
  const sizes = ["P", "M", "G", "GG"]

  // Dados para o novo componente ProductCard
  const productTypes: ProductType[] = [
    { id: "original", name: "Original", price: 89.9, originalPrice: 119.9 },
    { id: "premium", name: "Premium", price: 109.9, originalPrice: 139.9 }
  ]

  const productColors: ProductColor[] = [
    { name: "Preto", value: "black", image: "/imgs/saralee/camiseta-pumpkin.png" },
    { name: "Branco", value: "white", image: "/imgs/saralee/camiseta-pumpkin.png" },
    { name: "Laranja", value: "orange", image: "/imgs/saralee/camiseta-pumpkin.png" }
  ]

  const products: Product[] = [
    {
      id: "slj-camiseta-pumpkin",
      name: "Camiseta Cozy Pumpkin",
      category: "camisetas",
      color: "laranja",
      sizes: ["p", "m", "g", "gg"],
      price: 89.9,
      originalPrice: 119.9,
      frete: true,
      image: "/imgs/saralee/camiseta-pumpkin.png",
      sold: 156,
      isNew: true,
      badge: "novo frete gratis",
      store: "Sara Lee Jones",
      rating: 4.9,
      reviews: 89
    },
    {
      id: "slj-caneca-pumpkin",
      name: "Caneca Pumpkin Vibes",
      category: "canecas",
      color: "verde",
      sizes: [],
      price: 49.9,
      originalPrice: 69.9,
      frete: false,
      image: "/imgs/saralee/caneca.png",
      sold: 234,
      isNew: false,
      badge: "exclusivo",
      store: "Sara Lee Jones",
      rating: 4.8,
      reviews: 156,
      isExclusive: true
    },
    {
      id: "slj-camiseta-halloween",
      name: "Camiseta Halloween Vibes",
      category: "camisetas",
      color: "preto",
      sizes: ["p", "m", "g", "gg"],
      price: 79.9,
      originalPrice: 99.9,
      frete: true,
      image: "/imgs/saralee/camiseta-halloween.png",
      sold: 98,
      isNew: true,
      badge: "novo",
      store: "Sara Lee Jones",
      rating: 4.7,
      reviews: 67
    },
    {
      id: "slj-decor-pumpkin",
      name: "Decoracao Pumpkin Cozy",
      category: "decoracao",
      color: "laranja",
      sizes: [],
      price: 129.9,
      originalPrice: 159.9,
      frete: false,
      image: "/imgs/saralee/decor-pumpkin.png",
      sold: 45,
      isNew: false,
      badge: "exclusivo",
      store: "Sara Lee Jones",
      rating: 4.9,
      reviews: 34,
      isExclusive: true
    }
  ]

  const handleQuickBuy = (product: Product) => {
    setQuickBuyProduct(product)
    setIsQuickBuyOpen(true)
  }

  const handleQuickBuyFromCard = (productId: string, type: string, color: string, size: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      setQuickBuyProduct(product)
      setIsQuickBuyOpen(true)
    }
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleColorFilter = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const handleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const filteredProducts = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false
    if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) return false
    if (freeShipping && !product.frete) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "sales":
        return b.sold - a.sold
      case "newest":
        return b.isNew ? 1 : -1
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="bg-white text-neutral-900 font-sans pt-20">
                 {/* HERO com identidade */}
         <section className="relative isolate overflow-hidden">
          {/* fundo com verde claro e laranja */}
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-green-100 via-white to-orange-50"></div>
          <svg className="absolute inset-0 -z-10 w-full h-full opacity-[0.07] text-green-300">
            <defs>
              <pattern id="slj-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#slj-grid)"/>
          </svg>

          <div className="max-w-6xl mx-auto px-6 pt-10 pb-10 md:pt-14 md:pb-14">
            <div className="flex items-center gap-3 text-xs text-neutral-500 uppercase tracking-widest">
              <Link href="/" className="hover:text-orange-600">Multiverso</Link>
              <span>/</span>
              <span className="text-orange-600 font-semibold">Sara Lee Jones</span>
            </div>

            <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-orange-700 uppercase">
                  Loja Sara Lee Jones
                </h1>
                <p className="mt-2 text-sm md:text-base text-neutral-700 leading-7 max-w-2xl">
                  Produtos oficiais de Sara Lee Jones. Estampas autorais inspiradas em livros, aboboras, Halloween e vibes cozy.  
                  Feitos sob demanda, com frete para o mundo todo.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-neutral-600 uppercase">
                  <span className="px-2 py-1 border border-green-200 bg-green-50 text-green-800">4,9 • avaliacao</span>
                  <span className="px-2 py-1 border border-orange-200 bg-orange-50 text-orange-800">frete mundial</span>
                  <span className="px-2 py-1 border border-neutral-300">produzido sob demanda</span>
                </div>
              </div>

              <div className="grid gap-2 text-right">
                <a href="#produtos" className="px-4 py-2 border border-orange-500 text-orange-600 font-bold uppercase hover:bg-orange-500 hover:text-white transition">
                  Ver Produtos
                </a>
                <a href="#colecoes" className="px-4 py-2 border border-green-300 text-green-700 font-bold uppercase hover:bg-green-200 transition">
                  Colecoes
                </a>
              </div>
            </div>
          </div>
        </section>

                 {/* BARRA de categorias */}
         <nav id="colecoes" className="bg-green-50/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3 text-sm">
            {categories.map((category) => (
              <a 
                key={category.id}
                className="px-3 py-2 border border-green-300 hover:border-orange-500 hover:text-orange-600 transition" 
                href={`#cat-${category.slug}`}
              >
                {category.name}
              </a>
            ))}
            <a className="px-3 py-2 border border-green-300 hover:border-orange-500 hover:text-orange-600 transition" href="#lancamentos">
              Lancamentos
            </a>
          </div>
        </nav>

                 {/* DESTAQUES */}
         <section>
          <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
            <div className="flex items-end justify-between">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-orange-700">Destaques</h2>
              <a href="#produtos" className="text-sm underline underline-offset-4 text-neutral-500 hover:text-orange-600 uppercase">ver todos</a>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="lancamentos">
              {products.filter(p => p.isNew).slice(0, 4).map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  types={productTypes}
                  colors={productColors}
                  sizes={sizes}
                  onQuickBuy={handleQuickBuyFromCard}
                />
              ))}
            </div>
          </div>
        </section>

                 {/* FILTROS + GRID */}
         <section id="produtos">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
            {/* TOP (mobile) */}
            <div className="col-span-12 md:hidden">
              <button 
                onClick={toggleFilters}
                className="w-full border border-green-300 py-2 text-sm font-semibold uppercase"
              >
                Filtros
              </button>
            </div>

            {/* FILTROS */}
            <aside className={`col-span-12 md:col-span-3 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-orange-700">Categorias</h3>
                <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryFilter(category.id)}
                        className={`hover:text-orange-600 ${selectedCategories.includes(category.id) ? 'text-orange-600 font-semibold' : ''}`}
                      >
                        {category.name} ({category.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-orange-700">Cores</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorFilter(color)}
                      className={`px-2 py-1 border text-xs transition ${
                        selectedColors.includes(color) 
                          ? 'border-orange-500 bg-orange-50 text-orange-700' 
                          : 'border-neutral-300 hover:border-orange-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-orange-700">Tamanhos</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeFilter(size)}
                      className={`px-2 py-1 border text-xs transition ${
                        selectedSizes.includes(size) 
                          ? 'border-orange-500 bg-orange-50 text-orange-700' 
                          : 'border-neutral-300 hover:border-orange-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={freeShipping}
                    onChange={(e) => setFreeShipping(e.target.checked)}
                    className="rounded border-neutral-300"
                  />
                  <span className="text-neutral-600">Frete gratis</span>
                </label>
              </div>
            </aside>

            {/* GRID */}
            <div className="col-span-12 md:col-span-9">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold uppercase tracking-wide text-orange-700">Todos os Produtos</h2>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-neutral-300 text-sm px-2 py-1"
                >
                  <option value="">Ordenar</option>
                  <option value="price-asc">Menor preco</option>
                  <option value="price-desc">Maior preco</option>
                  <option value="rating">Melhor avaliacao</option>
                  <option value="sales">Mais vendidos</option>
                  <option value="newest">Novidades</option>
                </select>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    types={productTypes}
                    colors={productColors}
                    sizes={sizes}
                    onQuickBuy={handleQuickBuyFromCard}
                  />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-500">Nenhum produto encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        </section>

                 {/* FECHO */}
         <section>
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
            <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-green-700">
              Obrigada por apoiar a Sara Lee Jones
            </h3>
            <p className="mt-2 text-sm md:text-base text-neutral-600 leading-7 max-w-3xl mx-auto">
              Cada peca financia novos projetos criativos, estampas autorais e colecoes sazonais.  
              Continue explorando e compartilhando esse universo!
            </p>
            <div className="mt-5">
              <a 
                href="#lancamentos" 
                className="px-4 py-2 font-bold border border-orange-500 text-orange-600 uppercase hover:bg-orange-500 hover:text-white transition"
              >
                Ver Novidades
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de Compra Rapida */}
      {isQuickBuyOpen && quickBuyProduct && (
        <QuickBuyModal
          isOpen={isQuickBuyOpen}
          onClose={() => setIsQuickBuyOpen(false)}
          product={quickBuyProduct}
        />
      )}
    </div>
  )
}
