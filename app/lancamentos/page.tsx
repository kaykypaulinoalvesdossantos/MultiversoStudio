"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"
import ProductCard from "@/components/lojas/pagina-principal/product-card"
import Marquee from "react-fast-marquee"

interface Product {
  id: string
  title: string
  brand: string
  price: number
  originalPrice: number
  image: string
  badges: string[]
  rating: number
  reviews: number
  savings?: string
  cashback?: string
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

export default function LancamentosPage() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState("Todos")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filters = ["Todos", "Esta semana", "Este mês", "Pré-venda", "Exclusivos"]
  const categories = ["Camisetas", "Moletons", "Acessórios"]
  const stores = ["Multiverso Estúdio", "Parceiro X", "Parceiro Y"]
  const ratings = [4, 3]

  // Dados para o novo componente ProductCard
  const productTypes: ProductType[] = [
    { id: "overside", name: "Overside", price: 89.9, originalPrice: 119.9 },
    { id: "basica", name: "Básica", price: 79.9, originalPrice: 99.9 }
  ]

  const productColors: ProductColor[] = [
    { name: "Preto", value: "black", image: "/imgs/produtos/prod-01-2300x3066.png" },
    { name: "Branco", value: "white", image: "/imgs/produtos/prod-02-2300x3066.png" },
    { name: "Azul", value: "blue", image: "/imgs/produtos/prod-03-2300x3066.png" }
  ]

  const sizes = ["PP", "P", "M", "G", "GG", "XG"]

  const handleQuickBuyProduct = (productId: string, type: string, color: string, size: string) => {
    console.log(`Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
    
    // Por enquanto, vamos abrir o modal de quick buy
    const product = products.find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsQuickBuyOpen(true)
    }
  }

  const products: Product[] = [
    {
      id: "1",
      title: "Lançamento Multiverso – Edição Especial",
      brand: "MULTIVERSO ESTÚDIO",
      price: 69.90,
      originalPrice: 89.90,
      image: "/imgs/produtos/prod-01-2300x3066.png",
      badges: ["Original", "22% OFF", "Frete grátis"],
      rating: 4.9,
      reviews: 567,
      savings: "Economize R$ 20,00",
      cashback: "Ganhe R$ 3,00 de cashback"
    },
    {
      id: "2",
      title: "Coleção RGB – Drop 01",
      brand: "PARCEIRO X",
      price: 139.90,
      originalPrice: 179.90,
      image: "/imgs/produtos/prod-02-2300x3066.png",
      badges: ["Exclusivo", "Frete grátis"],
      rating: 4.8,
      reviews: 420,
      savings: "Economize R$ 40,00"
    },
    {
      id: "3",
      title: "Edição Limitada Multiverso 100%",
      brand: "MULTIVERSO ESTÚDIO",
      price: 79.90,
      originalPrice: 99.90,
      image: "/imgs/produtos/multiverso-100-2300x3066.png",
      badges: ["LIMITADA", "Frete grátis"],
      rating: 4.9,
      reviews: 234,
      savings: "Economize R$ 20,00"
    },
    {
      id: "4",
      title: "Coleção Streetwear Premium",
      brand: "PARCEIRO Y",
      price: 189.90,
      originalPrice: 249.90,
      image: "/imgs/produtos/prod-03-2300x3066.png",
      badges: ["Premium", "24% OFF", "Frete grátis"],
      rating: 4.7,
      reviews: 156,
      savings: "Economize R$ 60,00"
    }
  ]

  const handleQuickBuy = (product: Product) => {
    setSelectedProduct(product)
    setIsQuickBuyOpen(true)
  }

  const handleProductClick = (productId: string) => {
    router.push(`/produto/${productId}`)
  }

  const filteredProducts = products.filter(product => {
    if (selectedCategory && !product.badges.some(badge => 
      badge.toLowerCase().includes(selectedCategory.toLowerCase())
    )) return false
    
    if (selectedStore && product.brand !== selectedStore) return false
    
    if (selectedRating && product.rating < selectedRating) return false
    
    return true
  })

  return (
    <main className="bg-white text-black font-gotham min-h-screen">
      <Navbar />
      
      {/* HERO */}
      <section className="relative pt-20">
        <div className="bg-[linear-gradient(120deg,#111,#7a4a00,#b35b00)] text-white">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="uppercase font-black text-3xl md:text-5xl tracking-wide font-gotham-black">
              LANÇAMENTOS
            </h1>
            <p className="text-base md:text-lg text-white/90 mt-3 font-gotham-book">
              Novidades da semana de criadores do Multiverso.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-gotham-bold">
                {products.length}+ produtos
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-gotham-bold">
                4.8 ★ média
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-gotham-bold">
                Frete grátis
              </span>
            </div>
          </div>
        </div>

        {/* Filtros rápidos */}
        <div className="max-w-6xl mx-auto px-6 -mt-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`chip-mobile transition-all duration-200 ${
                  selectedFilter === filter ? "active" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-12 gap-8">
        
        {/* SIDEBAR (desktop) */}
        <aside className="hidden md:block md:col-span-3">
          <div className="border border-gray-200 p-6 bg-white shadow-sm">
            <h3 className="uppercase text-sm font-semibold mb-6 font-gotham-bold tracking-wider">FILTROS</h3>
            
            {/* Subcategorias */}
            <details className="group border-t border-gray-100 pt-4 open">
              <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
                <span className="uppercase text-xs font-semibold text-gray-700 font-gotham-bold">SUBCATEGORIAS</span>
                <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
              </summary>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`chip-mobile text-left transition-all duration-200 ${
                      selectedCategory === category ? "active" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </details>

            {/* Lojas */}
            <details className="group border-t border-gray-100 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
                <span className="uppercase text-xs font-semibold text-gray-700 font-gotham-bold">LOJAS</span>
                <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
              </summary>
              <div className="grid gap-2">
                {stores.map((store) => (
                  <button
                    key={store}
                    onClick={() => setSelectedStore(selectedStore === store ? null : store)}
                    className={`chip-mobile text-left transition-all duration-200 ${
                      selectedStore === store ? "active" : ""
                    }`}
                  >
                    {store}
                  </button>
                ))}
              </div>
            </details>

            {/* Avaliação */}
            <details className="group border-t border-gray-100 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
                <span className="uppercase text-xs font-semibold text-gray-700 font-gotham-bold">AVALIAÇÃO</span>
                <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
              </summary>
              <div className="grid gap-2">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    className={`chip-mobile text-left transition-all duration-200 ${
                      selectedRating === rating ? "active" : ""
                    }`}
                  >
                    {rating}★ e acima
                  </button>
                ))}
              </div>
            </details>
          </div>
        </aside>

        {/* GRID DE PRODUTOS */}
        <section className="md:col-span-9">
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  badge: product.badges[0],
                  store: product.brand,
                  rating: product.rating,
                  reviews: product.reviews,
                  sold: Math.floor(Math.random() * 1000) + 100
                }}
                types={productTypes}
                colors={productColors}
                sizes={sizes}
                onQuickBuy={handleQuickBuyProduct}
              />
            ))}
          </div>
        </section>
      </section>

      {/* Modal de Compra Rápida */}
      {selectedProduct && (
        <QuickBuyModal
          isOpen={isQuickBuyOpen}
          onClose={() => setIsQuickBuyOpen(false)}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.title,
            image: selectedProduct.image,
            price: selectedProduct.price,
            originalPrice: selectedProduct.originalPrice,
            store: selectedProduct.brand,
            badge: selectedProduct.badges[0],
            freeShipping: selectedProduct.badges.includes("Frete grátis")
          }}
        />
      )}

      <Footer />

      {/* Estilos CSS */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .chip-mobile {
          border: 1px solid #e5e7eb;
          background: #fff;
          padding: 0.5rem 1rem;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          text-align: center;
          transition: all 0.2s ease;
          min-height: 40px;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .chip-mobile.active {
          background: #000;
          color: #fff;
          border-color: #000;
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .chip-mobile:hover:not(.active) {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </main>
  )
}
