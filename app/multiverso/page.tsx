"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"
import ProductCard from "@/components/lojas/multiverso/product-card"
import Marquee from "react-fast-marquee"
import MultiversoExclusiveProductsSection from "@/components/multiverso-exclusive-products-section"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge: string
  badgeColor: string
  store: string
  category: string
  rating: number
  reviews: number
  sales: number
  savings?: string
  isMultiversoOriginal?: boolean
}

interface Universe {
  id: string
  name: string
  description: string
  logo: string
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

export default function MultiversoPage() {
  const router = useRouter()
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Dados para o novo componente ProductCard
  const productTypes: ProductType[] = [
    { id: "overside", name: "Overside", price: 89.9, originalPrice: 119.9 },
    { id: "basica", name: "Básica", price: 79.9, originalPrice: 99.9 }
  ]

  const productColors: ProductColor[] = [
    { name: "Preto", value: "black", image: "/imgs/produtos/p1.png" },
    { name: "Branco", value: "white", image: "/imgs/camiseta.png" },
    { name: "Azul", value: "blue", image: "/imgs/produtos/logo.png" }
  ]

  const sizes = ["PP", "P", "M", "G", "GG", "XG"]

  const handleQuickBuyProduct = (productId: string, type: string, color: string, size: string) => {
    console.log(`Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
    
    // Por enquanto, vamos abrir o modal de quick buy
    const product = [...featuredProducts, ...launchProducts, ...mainProducts].find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsQuickBuyOpen(true)
    }
  }

  // Universos parceiros
  const universes: Universe[] = [
    {
      id: "1",
      name: "SacoCheio.tv",
      description: "Coleções com humor ácido",
      logo: "/logos/universo-01.svg",
      slug: "sacocheio"
    },
    {
      id: "2",
      name: "Cinemagraph",
      description: "Movimento e silêncio",
      logo: "/logos/universo-02.svg",
      slug: "cinemagraph"
    },
    {
      id: "3",
      name: "Música Indie",
      description: "Som que veste",
      logo: "/logos/universo-03.svg",
      slug: "musica-indie"
    },
    {
      id: "4",
      name: "Gaming",
      description: "HUDs vestíveis",
      logo: "/logos/universo-04.svg",
      slug: "gaming"
    }
  ]

  // Produtos em destaque
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Camiseta — Logo Oficial",
      price: 69.90,
      originalPrice: 89.90,
      image: "/imgs/produtos/p1.png",
      badge: "ORIGINAL",
      badgeColor: "border-gray-300",
      store: "Multiverso Estúdio",
      category: "camisetas",
      rating: 4.9,
      reviews: 567,
      sales: 2345
    },
    {
      id: "2",
      name: "Hoodie — Edição Limitada",
      price: 149.90,
      originalPrice: 189.90,
      image: "/imgs/camiseta.png",
      badge: "EXCLUSIVO",
      badgeColor: "border-black",
      store: "Multiverso Estúdio",
      category: "hoodies",
      rating: 4.8,
      reviews: 234,
      sales: 1234
    },
    {
      id: "3",
      name: "Caneca — Multiverso",
      price: 49.90,
      originalPrice: 69.90,
      image: "/imgs/produtos/logo.png",
      badge: "FRETE GRÁTIS",
      badgeColor: "border-gray-300",
      store: "Multiverso Estúdio",
      category: "canecas",
      rating: 4.7,
      reviews: 189,
      sales: 856
    },
    {
      id: "4",
      name: "Pôster — Arte Exclusiva",
      price: 39.90,
      image: "/imgs/produtos/p1.png",
      badge: "EDIÇÃO LIMITADA",
      badgeColor: "border-black",
      store: "Multiverso Estúdio",
      category: "posters",
      rating: 4.6,
      reviews: 145,
      sales: 567
    }
  ]

  // Lançamentos exclusivos
  const launchProducts: Product[] = [
    {
      id: "5",
      name: "Camiseta Multiverso Estúdio — Edição Especial",
      price: 89.90,
      originalPrice: 119.90,
      image: "/imgs/camiseta.png",
      badge: "LANÇAMENTO",
      badgeColor: "border-black",
      store: "Multiverso Estúdio",
      category: "camisetas",
      rating: 4.8,
      reviews: 2345,
      sales: 2345,
      savings: "Economize R$ 30,00"
    },
    {
      id: "6",
      name: "Moletom — Coleção Inverno",
      price: 179.90,
      originalPrice: 229.90,
      image: "/imgs/produtos/logo.png",
      badge: "NOVO",
      badgeColor: "border-gray-300",
      store: "Multiverso Estúdio",
      category: "moletons",
      rating: 4.9,
      reviews: 456,
      sales: 789,
      savings: "Economize R$ 50,00"
    },
    {
      id: "7",
      name: "Boné — Estilo Street",
      price: 59.90,
      originalPrice: 79.90,
      image: "/imgs/produtos/p1.png",
      badge: "22% OFF",
      badgeColor: "border-black",
      store: "Multiverso Estúdio",
      category: "acessorios",
      rating: 4.7,
      reviews: 234,
      sales: 456,
      savings: "Economize R$ 20,00"
    },
    {
      id: "8",
      name: "Tote Bag — Sustentável",
      price: 34.90,
      image: "/imgs/camiseta.png",
      badge: "ECO-FRIENDLY",
      badgeColor: "border-gray-300",
      store: "Multiverso Estúdio",
      category: "bolsas",
      rating: 4.8,
      reviews: 123,
      sales: 234
    }
  ]

  // Produtos principais
  const mainProducts: Product[] = [
    {
      id: "9",
      name: "Camiseta Multiverso Estúdio — Logo Oficial",
      price: 69.90,
      originalPrice: 89.90,
      image: "/imgs/produtos/logo.png",
      badge: "ORIGINAL",
      badgeColor: "border-black",
      store: "Multiverso Estúdio",
      category: "camisetas",
      rating: 4.9,
      reviews: 2345,
      sales: 2345,
      savings: "Economize R$ 20,00"
    },
    {
      id: "10",
      name: "Camiseta — Design Minimalista",
      price: 79.90,
      originalPrice: 99.90,
      image: "/imgs/produtos/p1.png",
      badge: "MINIMALISTA",
      badgeColor: "border-gray-300",
      store: "Multiverso Estúdio",
      category: "camisetas",
      rating: 4.8,
      reviews: 1234,
      sales: 1890,
      savings: "Economize R$ 20,00"
    },
    {
      id: "11",
      name: "Camiseta — Arte Urbana",
      price: 84.90,
      originalPrice: 104.90,
      image: "/imgs/camiseta.png",
      badge: "ARTE URBANA",
      badgeColor: "border-black",
      store: "Multiverso Estúdio",
      category: "camisetas",
      rating: 4.7,
      reviews: 890,
      sales: 1456,
      savings: "Economize R$ 20,00"
    },
    {
      id: "12",
      name: "Camiseta — Vintage Style",
      price: 74.90,
      originalPrice: 94.90,
      image: "/imgs/produtos/logo.png",
      badge: "VINTAGE",
      badgeColor: "border-gray-300",
      store: "Multiverso Estúdio",
      category: "camisetas",
      rating: 4.6,
      reviews: 567,
      sales: 890,
      savings: "Economize R$ 20,00"
    }
  ]

  // Categorias
  const categories = [
    { name: "Canecas", count: 234, slug: "canecas" },
    { name: "Vestuário", count: 456, slug: "vestuario" },
    { name: "Gaming", count: 189, slug: "gaming" }
  ]

  const handleQuickBuy = (product: Product) => {
    setSelectedProduct(product)
    setIsQuickBuyOpen(true)
  }

  const handleProductClick = (productId: string) => {
    router.push(`/produto/${productId}`)
  }

  return (
    <main className="bg-white text-black font-gotham min-h-screen">
      <Navbar />

      {/* HERO com fundo estético monocromático */}
      <section className="relative isolate overflow-hidden pt-20">
        {/* Camada 1: gradiente de base */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

        {/* Camada 2: grid geométrico (SVG pattern) */}
        <svg className="absolute inset-0 -z-10 w-full h-full opacity-10 text-gray-300">
          <defs>
            <pattern id="mv-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mv-grid)" />
        </svg>

        {/* Camada 3: radiais (sombras suaves) */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),transparent_60%)]"></div>
        <div className="pointer-events-none absolute -bottom-32 right-[-10%] h-96 w-96 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),transparent_60%)]"></div>

        {/* Camada 4: leve vinheta vertical */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/5 via-transparent to-black/5"></div>

        {/* Camada 5: ruído sutil (SVG filter) */}
        <svg className="absolute inset-0 -z-10 w-full h-full opacity-[0.06] mix-blend-multiply">
          <filter id="mv-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.7"/>
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#mv-noise)" />
        </svg>

        {/* Conteúdo do HERO */}
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-8 md:pt-14 md:pb-12 relative">
          <p className="text-[11px] tracking-widest text-gray-500 uppercase font-gotham-bold">multiverso estúdio</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-black tracking-tight font-gotham-black uppercase">
            Uma jornada exploratória simbiótica
                  </h1>
          <p className="mt-3 text-sm md:text-base text-gray-700 leading-7 max-w-3xl font-gotham-book">
            Lojas dentro de lojas. Cada universo com sua própria física estética.
            Aqui, criadores e exploradores co-criam peças únicas — do rascunho ao ritual de uso.
          </p>

          {/* micro-métricas */}
          <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase">
            <span className="px-2 py-1 border border-gray-300 font-gotham-bold">4,9 • avaliação</span>
            <span className="px-2 py-1 border border-gray-300 font-gotham-bold">+1,2k produtos</span>
            <span className="px-2 py-1 border border-gray-300 font-gotham-bold">frete grátis</span>
                  </div>
                </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <h2 className="text-lg md:text-xl font-bold uppercase font-gotham-bold">Manifesto</h2>
              </div>
          <div className="md:col-span-7 text-sm md:text-base text-gray-700 leading-7 space-y-4 font-gotham-book">
            <p>Não vendemos só produtos. Abrimos portais. Cada peça nasce da simbiose entre a identidade do artista e o imaginário do explorador.</p>
            <p>O Multiverso é processo vivo: decisões, anseios, esperança e visão. Uma prática contínua de olhar e atravessar.</p>
          </div>
        </div>
      </section>

      {/* PORTAL (cartão reto + imagem PNG transparente) */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-12">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 md:p-6 lg:p-8">
              <h3 className="text-base md:text-lg font-semibold uppercase font-gotham-bold">Portal</h3>
              <p className="mt-2 text-sm text-gray-700 leading-7 font-gotham-book">Escolha por onde começar: lojas parceiras, coleções originais ou personalizáveis.</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3 text-[11px]">
                <Link href="/lancamentos" className="px-3 py-2 font-bold border border-gray-900 hover:bg-black hover:text-white transition font-gotham-bold text-center">
                  Entrar no portal
                </Link>
                <Link href="/personalizaveis" className="px-3 py-2 font-bold border border-gray-300 hover:bg-gray-50 transition font-gotham-bold text-center">
                  Personalizáveis
                </Link>
              </div>
            </div>
          </div>
          <figure className="lg:col-span-6 bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[3/4] grid place-items-center">
              {/* PNG com fundo transparente 3:4 */}
              <div className="w-full h-full bg-gray-50 grid place-items-center">
                <p className="text-gray-400 text-sm px-4 text-center">Peça destaque — fundo transparente</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* UNIVERSOS (cartas retas) */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold uppercase font-gotham-bold">Universos</h2>
            <Link href="/parceiros" className="text-sm underline underline-offset-4 font-gotham-medium uppercase self-start sm:self-auto">ver todos</Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {universes.map((universe) => (
              <Link key={universe.id} className="bg-white hover:shadow-xl transition-shadow duration-300 group" href={`/u/${universe.slug}`}>
                <div className="aspect-square bg-gray-50 grid place-items-center">
                  <div className="max-h-[70%] opacity-80 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-base md:text-lg">{universe.name.charAt(0)}</span>
                    </div>
                  </div>
                      </div>
                <div className="p-3 md:p-4">
                  <p className="text-sm font-semibold leading-snug font-gotham-bold">{universe.name}</p>
                  <p className="text-[11px] md:text-[12px] text-gray-600 mt-1 font-gotham-medium">{universe.description}</p>
                    </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTAQUES (grade minimalista) */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold uppercase font-gotham-bold">Destaques do Multiverso</h2>
            <Link href="/lancamentos" className="text-sm underline underline-offset-4 font-gotham-medium uppercase self-start sm:self-auto">ver lançamentos</Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
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
                  sold: product.sales
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

      {/* LANÇAMENTOS EXCLUSIVOS (comerciais) */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold uppercase font-gotham-bold">Lançamentos Exclusivos</h2>
            <Link href="/lancamentos" className="text-sm underline underline-offset-4 font-gotham-medium uppercase self-start sm:self-auto">Ver Todos</Link>
                  </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {launchProducts.map((product) => (
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
                  sold: product.sales
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

      {/* EXPLORAR POR CATEGORIA */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-lg md:text-xl font-bold uppercase font-gotham-bold">Explore por Categoria</h2>
          <p className="mt-1 text-sm text-gray-600 font-gotham-book">Descubra produtos únicos organizados por categoria</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categoria/${category.slug}`} className="bg-white hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-square bg-gray-50 grid place-items-center relative overflow-hidden">
                  <span className="text-xs md:text-sm font-semibold group-hover:underline font-gotham-bold z-10 relative px-2 text-center">{category.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                <div className="p-2 md:p-3">
                  <p className="text-[10px] md:text-xs text-gray-600 font-gotham-medium">{category.count} produtos disponíveis</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] md:text-xs text-green-600 font-gotham-bold">Ver produtos</span>
                    <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                  </div>
                      </div>
              </Link>
            ))}
            
            {/* Categorias adicionais */}
            <Link href="/categoria/musica" className="bg-white hover:shadow-xl transition-shadow duration-300 group">
              <div className="aspect-square bg-gray-50 grid place-items-center relative overflow-hidden">
                <span className="text-xs md:text-sm font-semibold group-hover:underline font-gotham-bold z-10 relative px-2 text-center">Música</span>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
              <div className="p-2 md:p-3">
                <p className="text-[10px] md:text-xs text-gray-600 font-gotham-medium">167 produtos disponíveis</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] md:text-xs text-green-600 font-gotham-bold">Ver produtos</span>
                  <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/categoria/kits" className="bg-white hover:shadow-xl transition-shadow duration-300 group">
              <div className="aspect-square bg-gray-50 grid place-items-center relative overflow-hidden">
                <span className="text-xs md:text-sm font-semibold group-hover:underline font-gotham-bold z-10 relative px-2 text-center">Kits</span>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
              <div className="p-2 md:p-3">
                <p className="text-[10px] md:text-xs text-gray-600 font-gotham-medium">89 produtos disponíveis</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] md:text-xs text-green-600 font-gotham-bold">Ver produtos</span>
                  <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/categoria/lancamentos" className="bg-white hover:shadow-xl transition-shadow duration-300 group">
              <div className="aspect-square bg-gray-50 grid place-items-center relative overflow-hidden">
                <span className="text-xs md:text-sm font-semibold group-hover:underline font-gotham-bold z-10 relative px-2 text-center">Lançamentos</span>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
              <div className="p-2 md:p-3">
                <p className="text-[10px] md:text-xs text-gray-600 font-gotham-medium">67 produtos disponíveis</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] md:text-xs text-green-600 font-gotham-bold">Ver produtos</span>
                  <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                        </div>
                      </div>
            </Link>
                            </div>
                          </div>
      </section>

      {/* FILTROS + GRID PRODUTOS */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-12 gap-4 md:gap-8">

          {/* TOPO (mobile): botão mostra/oculta filtros */}
          <div className="col-span-12 md:hidden">
                            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full border text-black rounded-none border-gray-900 py-3 text-sm font-semibold uppercase font-gotham-bold bg-white hover:bg-gray-50"
                            >
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                            </Button>
          </div>

          {/* FILTROS */}
          <aside className={`col-span-12 md:col-span-3 space-y-6 uppercase ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div>
              <h3 className="text-sm font-bold uppercase font-gotham-bold">Categorias</h3>
              <ul className="mt-2 space-y-1 text-sm font-gotham-medium uppercase">
                <li><Link href="#" className="hover:text-gray-600 block py-1">Multiverso Original (45)</Link></li>
                <li><Link href="#" className="hover:text-gray-600 block py-1">Todos os Produtos (1247)</Link></li>
                <li><Link href="#" className="hover:text-gray-600 block py-1">Camisetas (456)</Link></li>
                <li><Link href="#" className="hover:text-gray-600 block py-1">Canecas (234)</Link></li>
                <li><Link href="#" className="hover:text-gray-600 block py-1">Moletons (189)</Link></li>
                <li><Link href="#" className="hover:text-gray-600 block py-1">Acessórios (167)</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-gotham-bold">Cores</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">Preto</span>
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">Branco</span>
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">Azul</span>
                          </div>
                        </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-gotham-bold">Tamanhos</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">PP</span>
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">P</span>
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">M</span>
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">G</span>
                <span className="px-2 py-1 border border-gray-300 text-xs font-gotham-medium cursor-pointer hover:border-black">GG</span>
              </div>
            </div>
          </aside>

          {/* GRID */}
          <div className="col-span-12 md:col-span-9">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-bold uppercase font-gotham-bold">Produtos Multiverso Original</h2>
              <select className="border text-sm px-3 py-2 font-gotham-medium w-full sm:w-auto">
                <option>Ordenar</option>
                <option>Mais vendidos</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
              </select>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {mainProducts.map((product) => (
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
                    sold: product.sales
                  }}
                  types={productTypes}
                  colors={productColors}
                  sizes={sizes}
                  onQuickBuy={handleQuickBuyProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PRODUTOS EXCLUSIVOS MULTIVERSO */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold uppercase font-gotham-black mb-4">
              PRODUTOS EXCLUSIVOS MULTIVERSO
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-gotham-book max-w-2xl mx-auto">
              Descubra nossa coleção exclusiva de produtos criados especialmente para os verdadeiros exploradores do Multiverso
            </p>
          </div>

          {/* Carrossel de Produtos Exclusivos */}
          <div className="relative">
            {/* Setas de Navegação */}
            <button
              onClick={() => (window as any).multiversoExclusiveNavigation?.prevProducts()}
              disabled={!(window as any).multiversoExclusiveNavigation?.currentProductIndex || (window as any).multiversoExclusiveNavigation.currentProductIndex <= 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => (window as any).multiversoExclusiveNavigation?.nextProducts()}
              disabled={!(window as any).multiversoExclusiveNavigation?.currentProductIndex || !(window as any).multiversoExclusiveNavigation?.products || (window as any).multiversoExclusiveNavigation.currentProductIndex >= ((window as any).multiversoExclusiveNavigation.products.length - 4)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Componente de Produtos Exclusivos */}
            <MultiversoExclusiveProductsSection />
          </div>
        </div>
      </section>

      {/* FECHO */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-base md:text-lg font-semibold uppercase font-gotham-bold">Continuidade</h3>
          <p className="mt-2 text-sm md:text-base text-gray-700 leading-7 max-w-3xl font-gotham-book">
            Essa jornada não termina — ela expande. Novos universos, novas peças, novos encontros.
            Quando quiser, o portal está aberto.
          </p>
          <div className="mt-5">
            <Link href="/lancamentos" className="px-4 uppercase py-2 font-bold border border-gray-900 hover:bg-black hover:text-white transition font-gotham-bold inline-block">
              Seguir explorando
            </Link>
      </div>
    </div>
      </section>

      {/* Modal de Compra Rápida */}
      {selectedProduct && (
        <QuickBuyModal
          isOpen={isQuickBuyOpen}
          onClose={() => setIsQuickBuyOpen(false)}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            image: selectedProduct.image,
            price: selectedProduct.price,
            originalPrice: selectedProduct.originalPrice || 0,
            store: selectedProduct.store,
            badge: selectedProduct.badge,
            freeShipping: true
          }}
        />
      )}

      <Footer />

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
